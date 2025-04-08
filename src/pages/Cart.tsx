
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItemsList from "@/components/CartItemsList";
import CartSummary from "@/components/CartSummary";
import EmptyCart from "@/components/EmptyCart";
import { CartItemWithLink as CartItemType, getCart, removeFromCart, updateCartItemQuantity, updateCartItemSocialLink, clearCart } from "@/lib/cart";
import { PaymentData } from "@/lib/stripe";
import { createOrder, updateOrderPaymentStatus } from "@/lib/orders";
import { useToast } from "@/hooks/use-toast";
import StripeWrapper from "@/components/StripeWrapper";
import StripePaymentForm from "@/components/StripePaymentForm";
import { useAuth } from "@/components/AuthContext";
import * as z from "zod";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    const loadedItems = getCart();
    setCartItems(loadedItems);
    setLoading(false);
    
    window.scrollTo(0, 0);
  }, []);
  
  const handleRemoveItem = (id: string, variantId?: string, index?: number) => {
    if (index !== undefined) {
      const newItems = [...cartItems];
      newItems.splice(index, 1);
      updateCart(newItems);
      setCartItems(newItems);
    } else {
      removeFromCart(id, variantId);
      setCartItems(getCart());
    }
    
    toast({
      title: "Service retiré",
      description: "Le service a été retiré de votre panier.",
    });
  };
  
  const handleUpdateQuantity = (id: string, quantity: number, variantId?: string, index?: number) => {
    if (index !== undefined) {
      const newItems = [...cartItems];
      if (newItems[index]) {
        newItems[index].quantity = quantity;
        newItems[index].total = quantity * (newItems[index].variant?.price || newItems[index].service.price);
        updateCart(newItems);
        setCartItems(newItems);
      }
    } else {
      updateCartItemQuantity(id, quantity, variantId);
      setCartItems(getCart());
    }
  };
  
  const handleUpdateSocialLink = (id: string, link: string, variantId?: string, index?: number) => {
    if (index !== undefined) {
      const newItems = [...cartItems];
      if (newItems[index]) {
        newItems[index].socialMediaLink = link;
        updateCart(newItems);
        setCartItems(newItems);
      }
    } else {
      updateCartItemSocialLink(id, link, variantId);
      setCartItems(getCart());
    }
    
    toast({
      title: "Lien mis à jour",
      description: "Le lien du profil/publication a été mis à jour.",
    });
  };
  
  const updateCart = (items: CartItemType[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
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
    
    // Créer directement la commande et afficher le formulaire de paiement
    const customerInfo = {
      fullName: user?.name || 'Client',
      email: user?.email || 'client@exemple.com',
      phoneNumber: ''
    };
    
    const order = createOrder(cartItems, customerInfo.fullName, customerInfo.email);
    setCurrentOrderId(order.id);
    
    setShowPaymentForm(true);
    setIsProcessingPayment(true);
    
    toast({
      title: "Prêt pour le paiement",
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
      items: cartItems.map((item, index) => ({
        id: item.service.id,
        name: `${item.service.title}${item.variant ? ` (${item.variant.title})` : ''} #${index + 1}`,
        quantity: item.quantity,
        price: item.variant?.price || item.service.price,
        socialMediaLink: item.socialMediaLink || ''
      })),
      email: user?.email || 'client@exemple.com',
      fullName: user?.name || 'Client',
      phoneNumber: '',
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
                <CartItemsList 
                  cartItems={cartItems}
                  handleRemoveItem={handleRemoveItem}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleUpdateSocialLink={handleUpdateSocialLink}
                />
                
                {showPaymentForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="bg-card p-6 rounded-xl mt-8"
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
                <CartSummary 
                  cartItems={cartItems}
                  calculateTotal={calculateTotal}
                  handleProceedToCheckout={handleProceedToCheckout}
                  showCheckoutForm={false}
                  showPaymentForm={showPaymentForm}
                  setShowCheckoutForm={() => {}}
                  setShowPaymentForm={setShowPaymentForm}
                  isProcessingPayment={isProcessingPayment}
                />
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Cart;
