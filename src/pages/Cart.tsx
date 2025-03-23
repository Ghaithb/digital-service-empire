
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { CartItem as CartItemType, Service, getServiceById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronRight, CreditCard, Wallet, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Simulating cart loading from storage
  useEffect(() => {
    // In a real app, you'd load from localStorage or an API
    const mockCartItems: CartItemType[] = [
      {
        service: getServiceById("instagram-followers-1000")!,
        quantity: 1,
        total: getServiceById("instagram-followers-1000")!.price,
      },
      {
        service: getServiceById("facebook-likes-500")!,
        quantity: 2,
        total: getServiceById("facebook-likes-500")!.price * 2,
      },
    ];
    
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
  }, []);
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.service.id !== id));
    
    toast({
      title: "Service retiré",
      description: "Le service a été retiré de votre panier.",
    });
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.service.id === id 
          ? { ...item, quantity, total: item.service.price * quantity } 
          : item
      )
    );
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };
  
  const handleCheckout = () => {
    toast({
      title: "Commande en cours",
      description: "Redirection vers la page de paiement...",
    });
    
    // Simulate checkout process
    setTimeout(() => {
      setCartItems([]);
      toast({
        title: "Commande réussie",
        description: "Merci pour votre achat! Vous recevrez une confirmation par email.",
      });
    }, 2000);
  };
  
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
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Votre Panier
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="bg-card p-6 rounded-xl mb-6">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.service.id}
                      item={item}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-xl sticky top-24">
                  <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Sous-total ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})
                      </span>
                      <span>{calculateTotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TVA</span>
                      <span>0.00 €</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-lg">{calculateTotal().toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handleCheckout}
                  >
                    Payer maintenant <ChevronRight size={16} className="ml-2" />
                  </Button>
                  
                  <div className="flex flex-col space-y-3 mb-6">
                    <div className="text-sm text-muted-foreground text-center mb-2">
                      Méthodes de paiement acceptées
                    </div>
                    <div className="flex justify-center space-x-3">
                      <CreditCard className="text-muted-foreground" />
                      <Wallet className="text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="flex items-center mb-2">
                      <Clock size={14} className="mr-2" />
                      Livraison rapide sous 24h à 72h
                    </p>
                    <p>
                      En passant votre commande, vous acceptez nos conditions générales de vente et notre politique de confidentialité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-secondary py-20 px-4 rounded-xl text-center">
              <ShoppingCart size={64} className="mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-medium mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8">
                Parcourez notre catalogue pour découvrir des services qui boosteront votre présence en ligne.
              </p>
              <Button asChild>
                <Link to="/services">
                  Découvrir nos services
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Cart;
