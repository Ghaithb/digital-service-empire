
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  // Simuler un numéro de commande aléatoire
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-6 mb-6">
              <Check size={40} className="text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Commande confirmée !
            </h1>
            
            <p className="text-muted-foreground mb-6 max-w-lg">
              Merci pour votre achat. Votre commande a été traitée avec succès et est maintenant en cours de préparation.
            </p>
            
            <div className="bg-card p-6 rounded-xl w-full mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Commande #{orderNumber}</p>
                <p className="text-muted-foreground">
                  {new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex items-center">
                  <ShoppingBag size={18} className="mr-2 text-muted-foreground" />
                  <span>Services commandés</span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Vous recevrez un email avec les détails de votre commande et les instructions pour suivre son statut.
                </p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livraison estimée</span>
                  <span>24-72 heures</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Button asChild variant="outline">
                <Link to="/services">
                  Découvrir d'autres services
                </Link>
              </Button>
              
              <Button asChild>
                <Link to="/">
                  Retour à l'accueil <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default OrderConfirmation;
