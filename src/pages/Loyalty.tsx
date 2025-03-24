
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Award, Share2, Gift, Copy, Check } from "lucide-react";

const Loyalty = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const referralCode = "DIGI-FRIEND";
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Inscription réussie",
      description: "Vous êtes maintenant inscrit au programme de fidélité.",
    });
    
    setEmail("");
  };
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    
    toast({
      title: "Code copié",
      description: "Le code de parrainage a été copié dans le presse-papier.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Award size={24} className="text-primary mr-3" />
                <h2 className="text-2xl font-bold">Programme de Fidélité</h2>
              </div>
              
              <p className="mb-6 text-muted-foreground">
                Rejoignez notre programme de fidélité pour accumuler des points à chaque achat et les échanger contre des réductions sur vos prochaines commandes.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Inscrivez-vous</h3>
                    <p className="text-sm text-muted-foreground">Entrez votre email pour rejoindre le programme</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Cumulez des points</h3>
                    <p className="text-sm text-muted-foreground">Gagnez 1 point pour chaque euro dépensé</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Échangez vos points</h3>
                    <p className="text-sm text-muted-foreground">100 points = 10€ de réduction sur votre prochaine commande</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
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
                
                <Button type="submit" className="w-full">
                  Rejoindre le programme
                </Button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Share2 size={24} className="text-primary mr-3" />
                <h2 className="text-2xl font-bold">Programme de Parrainage</h2>
              </div>
              
              <p className="mb-6 text-muted-foreground">
                Parrainez vos amis et recevez une réduction de 10% sur votre prochaine commande pour chaque ami qui effectue un achat.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Partagez votre code</h3>
                    <p className="text-sm text-muted-foreground">Envoyez votre code de parrainage à vos amis</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Votre ami commande</h3>
                    <p className="text-sm text-muted-foreground">Ils obtiennent 10% de réduction sur leur première commande</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Vous êtes récompensé</h3>
                    <p className="text-sm text-muted-foreground">Recevez 10% de réduction sur votre prochaine commande</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg mb-6">
                <p className="text-sm font-medium mb-2">Votre code de parrainage :</p>
                <div className="flex">
                  <div className="flex-1 bg-background border rounded-l-md p-2 font-mono font-medium">
                    {referralCode}
                  </div>
                  <Button 
                    variant="default" 
                    className="rounded-l-none"
                    onClick={copyReferralCode}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="w-full" asChild>
                  <Link to="/services">
                    <Gift size={16} className="mr-2" />
                    Faire une commande
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Loyalty;
