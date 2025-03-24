
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, PackageCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";

const OrderTracking = () => {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [orderStatus, setOrderStatus] = useState<null | {
    id: string;
    status: "pending" | "processing" | "completed" | "cancelled";
    date: string;
    items: { name: string; quantity: number; status: string }[];
  }>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }
    
    // Demo order for testing
    setOrderStatus({
      id: orderId,
      status: "processing",
      date: "12 Octobre 2023",
      items: [
        { name: "Abonnés Instagram", quantity: 1000, status: "50% complété" },
        { name: "Likes TikTok", quantity: 500, status: "Complété" }
      ]
    });
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Suivre ma commande
              </h1>
              <p className="text-muted-foreground">
                Entrez votre numéro de commande et l'email utilisé lors de l'achat pour suivre l'état de votre commande.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-sm mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium mb-1">
                    Numéro de commande
                  </label>
                  <Input 
                    id="orderId" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="ex: ORD-12345" 
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
                
                <Button type="submit" className="w-full">
                  <Search size={16} className="mr-2" />
                  Suivre ma commande
                </Button>
              </form>
            </div>
            
            {orderStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-8 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Commande #{orderStatus.id}</h2>
                  <div className="flex items-center">
                    {orderStatus.status === "pending" && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <Clock size={12} className="mr-1" />
                        En attente
                      </span>
                    )}
                    {orderStatus.status === "processing" && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <PackageCheck size={12} className="mr-1" />
                        En cours
                      </span>
                    )}
                    {orderStatus.status === "completed" && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        Complétée
                      </span>
                    )}
                    {orderStatus.status === "cancelled" && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        Annulée
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Date de commande: {orderStatus.date}
                </p>
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left">Service</th>
                        <th className="px-4 py-3 text-left">Quantité</th>
                        <th className="px-4 py-3 text-left">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orderStatus.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">
                            {item.status === "Complété" ? (
                              <span className="text-green-600 flex items-center">
                                <CheckCircle size={14} className="mr-1" />
                                {item.status}
                              </span>
                            ) : (
                              <span className="text-blue-600">{item.status}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Besoin d'aide ? Contactez notre équipe de support à support@digiboost.fr</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default OrderTracking;
