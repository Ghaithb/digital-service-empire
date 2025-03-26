import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItemWithLink from "@/components/CartItemWithLink";
import CheckoutForm from "@/components/CheckoutForm";
import StripeWrapper from "@/components/StripeWrapper";
import StripePaymentForm from "@/components/StripePaymentForm";
import { CartItemWithLink as CartItemType, getCart, removeFromCart, updateCartItemQuantity, updateCartItemSocialLink, clearCart } from "@/lib/cart";
import { PaymentData } from "@/lib/stripe";
import { createOrder, updateOrderPaymentStatus } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  ChevronRight, 
  CreditCard, 
  Wallet, 
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<{ fullName: string; email: string } | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadedItems = getCart();
    setCartItems(loadedItems);
    setLoading(false);
    
    window.scrollTo(0, 0);
  }, []);
  
  const handleRemoveItem = (id: string, variantId?: string) => {
    removeFromCart(id, variantId);
    setCartItems(getCart());
    
    toast({
      title: "Service retiré",
      description: "Le service a été retiré de votre panier.",
    });
  };
  
  const handleUpdateQuantity = (id: string, quantity: number, variantId?: string) => {
    updateCartItemQuantity(id, quantity, variantId);
    setCartItems(getCart());
  };
  
  const handleUpdateSocialLink = (id: string, link: string, variantId?: string) => {
    updateCartItemSocialLink(id, link, variantId);
    setCartItems(getCart());
    
    toast({
      title: "Lien mis à jour",
      description: "Le lien du profil/publication a été mis à jour.",
    });
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.total, 0);
  };
  
  const handleProceedToCheckout = () => {
    const missingLinks = cartItems.filter(item => !item.socialMediaLink);
    if (missingLinks.length > 0) {
      toast({
        title: "Information manquante",
        description: "Veuillez renseigner tous les liens des réseaux sociaux pour vos services.",
        variant: "destructive",
      });
      return;
    }
    
    setShowCheckoutForm(true);
    setTimeout(() => {
      window.scrollTo({ 
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  const handlePaymentSubmit = (values: z.infer<typeof formSchema>) => {
    setCustomerInfo({
      fullName: values.fullName,
      email: values.email
    });
    
    const order = createOrder(cartItems, values.fullName, values.email);
    setCurrentOrderId(order.id);
    
    setShowPaymentForm(true);
    setIsProcessingPayment(true);
    
    toast({
      title: "Informations validées",
      description: "Veuillez procéder au paiement pour finaliser votre commande.",
    });
    
    setTimeout(() => {
      window.scrollTo({ 
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  const handlePaymentSuccess = (sessionId: string) => {
    if (currentOrderId) {
      updateOrderPaymentStatus(currentOrderId, 'completed', sessionId);
    }
    
    clearCart();
    
    navigate(`/order-confirmation?orderId=${currentOrderId}`);
  };
  
  const handlePaymentError = (error: string) => {
    if (currentOrderId) {
      updateOrderPaymentStatus(currentOrderId, 'failed');
    }
    
    toast({
      title: "Erreur de paiement",
      description: error,
      variant: "destructive",
    });
    
    setIsProcessingPayment(false);
  };
  
  const getPaymentData = (): PaymentData => {
    return {
      amount: calculateTotal(),
      items: cartItems.map(item => ({
        id: item.service.id,
        name: item.service.title + (item.variant ? ` (${item.variant.title})` : ''),
        quantity: item.quantity,
        price: item.variant?.price || item.service.price,
        socialMediaLink: item.socialMediaLink
      })),
      email: customerInfo?.email || '',
      fullName: customerInfo?.fullName || '',
      orderId: currentOrderId || undefined
    };
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
                  {cartItems.map((item, index) => (
                    <CartItemWithLink
                      key={`${item.service.id}-${item.variant?.id || 'standard'}-${index}`}
                      item={item}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={handleUpdateQuantity}
                      onUpdateSocialLink={handleUpdateSocialLink}
                    />
                  ))}
                </div>
                
                {showCheckoutForm && !showPaymentForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="bg-card p-6 rounded-xl"
                  >
                    <h2 className="text-xl font-medium mb-6">Informations de livraison</h2>
                    <CheckoutForm 
                      onSubmit={handlePaymentSubmit}
                      isProcessing={isProcessingPayment}
                    />
                  </motion.div>
                )}
                
                {showPaymentForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="bg-card p-6 rounded-xl"
                  >
                    <h2 className="text-xl font-medium mb-6">Paiement</h2>
                    <StripeWrapper>
                      <StripePaymentForm 
                        paymentData={getPaymentData()}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </StripeWrapper>
                  </motion.div>
                )}
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
                  
                  {!showCheckoutForm ? (
                    <Button 
                      className="w-full mb-4"
                      onClick={handleProceedToCheckout}
                    >
                      Passer à la caisse <ChevronRight size={16} className="ml-2" />
                    </Button>
                  ) : !showPaymentForm ? (
                    <Button 
                      variant="outline"
                      className="w-full mb-4"
                      onClick={() => setShowCheckoutForm(false)}
                    >
                      Modifier le panier <ChevronUp size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      className="w-full mb-4"
                      onClick={() => setShowPaymentForm(false)}
                      disabled={isProcessingPayment}
                    >
                      Modifier les informations <ChevronUp size={16} className="ml-2" />
                    </Button>
                  )}
                  
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
                      En passant votre commande, vous acceptez nos{" "}
                      <Link to="/legal" className="text-primary hover:underline">
                        conditions générales de vente
                      </Link>{" "}
                      et notre{" "}
                      <Link to="/legal" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>.
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

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Le nom complet doit contenir au moins 3 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Le numéro de carte doit contenir 16 chiffres.",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Format: MM/YY",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "Le CVV doit contenir 3 ou 4 chiffres.",
  }),
});

export default Cart;
