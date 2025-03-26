
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, CreditCard, BadgePercent, Bell } from "lucide-react";
import {
  LoyaltyUser,
  PointsTransaction,
  fetchUserLoyalty,
  createUserLoyalty,
  getUserTransactions,
  calculateTier,
  loyaltyTiers,
  trackLoyaltyEvent
} from "../frontend/lib/loyalty";
import LoyaltyTierCard from "../frontend/components/LoyaltyTierCard";
import PointsHistory from "../frontend/components/PointsHistory";
import ReferralSystem from "../frontend/components/ReferralSystem";

const Loyalty = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
  
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<LoyaltyUser | null>(null);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  // Load user data if available
  useEffect(() => {
    const checkExistingUser = async () => {
      const savedEmail = localStorage.getItem("loyalty_email");
      if (savedEmail) {
        setIsLoading(true);
        try {
          const userData = await fetchUserLoyalty(savedEmail);
          if (userData) {
            setUser(userData);
            loadUserTransactions(userData.id);
            trackLoyaltyEvent('loyalty_page_visit', {
              userId: userData.id,
              email: userData.email,
              tier: userData.tier
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkExistingUser();
  }, []);

  // Handle referral code from URL
  useEffect(() => {
    if (referralCode) {
      toast({
        title: "Code de parrainage détecté",
        description: `Le code "${referralCode}" sera appliqué lors de votre inscription.`,
      });
      
      trackLoyaltyEvent('referral_link_visited', {
        referralCode
      });
    }
  }, [referralCode, toast]);

  const loadUserTransactions = async (userId: string) => {
    setTransactionsLoading(true);
    try {
      const data = await getUserTransactions(userId);
      setTransactions(data.sort((a, b) => b.date.getTime() - a.date.getTime()));
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setTransactionsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
        variant: "destructive",
      });
      return;
    }

    if (!fullName) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre nom complet.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if user already exists
      const existingUser = await fetchUserLoyalty(email);

      if (existingUser) {
        setUser(existingUser);
        await loadUserTransactions(existingUser.id);
        localStorage.setItem("loyalty_email", email);
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace fidélité !",
        });
        
        trackLoyaltyEvent('loyalty_login', {
          userId: existingUser.id,
          email: existingUser.email
        });
      } else {
        // Create new user
        const newUser = await createUserLoyalty(email, fullName);
        setUser(newUser);
        await loadUserTransactions(newUser.id);
        localStorage.setItem("loyalty_email", email);
        
        toast({
          title: "Inscription réussie",
          description: "Vous êtes maintenant inscrit au programme de fidélité avec 100 points de bienvenue !",
        });
        
        trackLoyaltyEvent('loyalty_signup', {
          userId: newUser.id,
          email: newUser.email,
          referralCode: referralCode || null
        });
      }

      setEmail("");
      setFullName("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loyalty_email");
    setUser(null);
    setTransactions([]);
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous êtes maintenant déconnecté du programme de fidélité.",
    });
    
    trackLoyaltyEvent('loyalty_logout', {
      userId: user?.id,
      email: user?.email
    });
  };

  const handleRefresh = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const freshUserData = await fetchUserLoyalty(user.email);
      if (freshUserData) {
        setUser(freshUserData);
        await loadUserTransactions(freshUserData.id);
        
        toast({
          title: "Mise à jour réussie",
          description: "Vos données de fidélité ont été actualisées.",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'actualisation des données.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate next tier info
  const calculateNextTierInfo = () => {
    if (!user) return null;
    
    const currentTierIndex = loyaltyTiers.findIndex(tier => tier.name === user.tier);
    if (currentTierIndex === loyaltyTiers.length - 1) return null; // Already at highest tier
    
    const nextTier = loyaltyTiers[currentTierIndex + 1];
    const pointsToNextTier = nextTier.minPoints - user.points;
    const progress = ((user.points - loyaltyTiers[currentTierIndex].minPoints) / 
      (nextTier.minPoints - loyaltyTiers[currentTierIndex].minPoints)) * 100;
    
    return {
      nextTier,
      pointsToNextTier,
      progress: Math.max(0, Math.min(100, progress))
    };
  };

  const nextTierInfo = user ? calculateNextTierInfo() : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TrustBadge />
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Programme de Fidélité et Parrainage
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gagnez des récompenses en restant fidèle à nos services et en parrainant vos amis.
            </p>
          </div>

          {!user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Award size={24} className="text-primary mr-3" />
                <h2 className="text-2xl font-bold">Rejoindre le programme</h2>
              </div>

              {referralCode && (
                <div className="mb-6 p-3 bg-primary/10 rounded-md border border-primary/20">
                  <p className="text-sm">
                    Vous vous inscrivez avec le code de parrainage:{" "}
                    <span className="font-mono font-medium">{referralCode}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Nom complet
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Traitement en cours..." : "Rejoindre le programme"}
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                En rejoignant le programme, vous acceptez de recevoir des emails concernant
                vos points de fidélité et les offres spéciales.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* User Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">Bonjour, {user.name}</CardTitle>
                        <CardDescription>
                          Membre depuis {user.joinDate.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        Déconnexion
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="flex flex-col p-4 border rounded-lg">
                        <div className="text-muted-foreground text-sm font-medium">Points actuels</div>
                        <div className="text-3xl font-bold mt-1">{user.points}</div>
                      </div>
                      
                      <div className="flex flex-col p-4 border rounded-lg">
                        <div className="text-muted-foreground text-sm font-medium">Niveau de fidélité</div>
                        <div className="text-3xl font-bold mt-1 capitalize">{user.tier}</div>
                      </div>
                      
                      <div className="flex flex-col p-4 border rounded-lg">
                        <div className="text-muted-foreground text-sm font-medium">Parrainages</div>
                        <div className="text-3xl font-bold mt-1">{user.referrals}</div>
                      </div>
                    </div>
                    
                    {nextTierInfo && (
                      <div className="mt-6 p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Progression vers le niveau {nextTierInfo.nextTier.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user.points} / {nextTierInfo.nextTier.minPoints} points
                          </span>
                        </div>
                        <Progress value={nextTierInfo.progress} className="h-2" />
                        <p className="mt-2 text-xs text-muted-foreground">
                          Il vous manque <span className="font-medium">{nextTierInfo.pointsToNextTier} points</span> pour atteindre le niveau suivant
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                      {isLoading ? "Actualisation..." : "Actualiser"}
                    </Button>
                    <Button variant="outline" className="gap-1">
                      <Bell className="h-4 w-4 mr-1" />
                      Activer les notifications
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Tabs for different sections */}
              <Tabs defaultValue="tiers" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="tiers" className="gap-1">
                    <Award className="h-4 w-4 mr-1" />
                    Niveaux de fidélité
                  </TabsTrigger>
                  <TabsTrigger value="referrals" className="gap-1">
                    <BadgePercent className="h-4 w-4 mr-1" />
                    Parrainage
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-1">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Historique des points
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tiers" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {loyaltyTiers.map((tier) => (
                      <LoyaltyTierCard
                        key={tier.name}
                        tier={tier}
                        isCurrentTier={tier.name === user.tier}
                        isNextTier={nextTierInfo?.nextTier.name === tier.name}
                        pointsToNextTier={nextTierInfo?.nextTier.name === tier.name ? nextTierInfo.pointsToNextTier : undefined}
                      />
                    ))}
                  </div>
                  
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>Comment gagner plus de points</CardTitle>
                      <CardDescription>
                        Voici différentes façons d'augmenter votre solde de points
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-4 md:grid-cols-2">
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Effectuez des achats</h3>
                            <p className="text-sm text-muted-foreground">
                              Gagnez des points à chaque achat selon votre niveau de fidélité
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <BadgePercent className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Parrainez des amis</h3>
                            <p className="text-sm text-muted-foreground">
                              Recevez jusqu'à 600 points pour chaque ami qui rejoint avec votre code
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <Bell className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Participez aux événements</h3>
                            <p className="text-sm text-muted-foreground">
                              Obtenez des points bonus lors des promotions spéciales et événements
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Montez de niveau</h3>
                            <p className="text-sm text-muted-foreground">
                              Accumulez plus de points pour atteindre des niveaux supérieurs avec de meilleurs avantages
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="referrals">
                  <ReferralSystem 
                    referralCode={user.referralCode}
                    referrals={user.referrals}
                    userName={user.email}
                    onSuccess={handleRefresh}
                  />
                </TabsContent>
                
                <TabsContent value="history">
                  <PointsHistory 
                    transactions={transactions}
                    isLoading={transactionsLoading}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Loyalty;
