
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est là pour répondre à toutes vos questions. N'hésitez pas à nous contacter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nom
                    </label>
                    <Input id="name" placeholder="Votre nom" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Votre email" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Sujet
                  </label>
                  <Input id="subject" placeholder="Sujet de votre message" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Votre message" 
                    rows={6} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="mt-1 mr-4 text-primary" size={20} />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">support@digiboost.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare className="mt-1 mr-4 text-primary" size={20} />
                    <div>
                      <h3 className="font-medium">Chat en direct</h3>
                      <p className="text-muted-foreground">Disponible 24h/24, 7j/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mt-1 mr-4 text-primary" size={20} />
                    <div>
                      <h3 className="font-medium">Heures d'ouverture</h3>
                      <p className="text-muted-foreground">Lundi - Vendredi: 9h - 18h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">FAQ</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Combien de temps prend la livraison ?</h3>
                    <p className="text-muted-foreground">Notre livraison commence dans les 24 heures suivant votre commande et se poursuit progressivement pour garantir des résultats naturels.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Vos services sont-ils sûrs ?</h3>
                    <p className="text-muted-foreground">Oui, tous nos services respectent les conditions d'utilisation des plateformes et sont conçus pour garantir la sécurité de votre compte.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Quels moyens de paiement acceptez-vous ?</h3>
                    <p className="text-muted-foreground">Nous acceptons les cartes de crédit, PayPal, et les virements bancaires pour toutes vos commandes.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Contact;
