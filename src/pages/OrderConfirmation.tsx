
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";
import { getOrderById, Order } from "@/lib/orders";
import { checkPaymentStatus } from "@/lib/stripe";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'succeeded' | 'processing' | 'failed' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (orderId) {
      // Récupérer les informations de la commande
      const orderData = getOrderById(orderId);
      
      if (orderData) {
        setOrder(orderData);
        
        // Vérifier le statut du paiement
        if (orderData.sessionId) {
          checkPaymentStatus(orderData.sessionId).then(result => {
            setPaymentStatus(result.status);
          });
        }
      }
    }
    
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 mx-auto pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
          <div className="animate-pulse w-16 h-16 rounded-full bg-primary/30"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-center">
              <div className="bg-destructive/10 rounded-full p-6 mb-6">
                <AlertCircle size={40} className="text-destructive" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Commande introuvable
              </h1>
              
              <p className="text-muted-foreground mb-6 max-w-lg">
                Nous n'avons pas pu trouver les détails de votre commande. Veuillez vérifier le lien ou contacter notre service client.
              </p>
              
              <Button asChild>
                <Link to="/">
                  Retour à l'accueil <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
              Merci pour votre achat, {order.customerName}. Votre commande a été traitée avec succès et est maintenant en cours de préparation.
            </p>
            
            <div className="bg-card p-6 rounded-xl w-full mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Commande #{order.id}</p>
                <p className="text-muted-foreground">
                  {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <ShoppingBag size={18} className="mr-2 text-muted-foreground" />
                    <span>Services commandés</span>
                  </div>
                  <span className="font-medium">{order.total.toFixed(2)} €</span>
                </div>
                
                <div className="space-y-3 mt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity} × {item.service.title}
                      </span>
                      <span>{(item.service.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-muted-foreground text-sm mt-4">
                  Un email de confirmation a été envoyé à {order.customerEmail}
                </p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Statut du paiement</span>
                  <span className={`${
                    paymentStatus === 'succeeded' ? 'text-green-500' : 
                    paymentStatus === 'processing' ? 'text-amber-500' : 
                    'text-red-500'
                  }`}>
                    {paymentStatus === 'succeeded' ? 'Payé' : 
                     paymentStatus === 'processing' ? 'En cours' : 
                     paymentStatus === 'failed' ? 'Échec' : 
                     'En attente'}
                  </span>
                </div>
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
