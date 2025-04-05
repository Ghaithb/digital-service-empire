
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItemsList from "@/components/CartItemsList";
import CartSummary from "@/components/CartSummary";
import CartCheckoutSection from "@/components/CartCheckoutSection";
import EmptyCart from "@/components/EmptyCart";
import { CartItemWithLink as CartItemType, getCart, removeFromCart, updateCartItemQuantity, updateCartItemSocialLink, clearCart } from "@/lib/cart";
import { PaymentData } from "@/lib/stripe";
import { createOrder, updateOrderPaymentStatus } from "@/lib/orders";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Le nom complet doit contenir au moins 3 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }).optional(),
});

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<{ fullName: string; email: string; phoneNumber?: string } | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
      email: values.email,
      phoneNumber: values.phoneNumber
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
      items: cartItems.map((item, index) => ({
        id: item.service.id,
        name: `${item.service.title}${item.variant ? ` (${item.variant.title})` : ''} #${index + 1}`,
        quantity: item.quantity,
        price: item.variant?.price || item.service.price,
        socialMediaLink: item.socialMediaLink || ''
      })),
      email: customerInfo?.email || '',
      fullName: customerInfo?.fullName || '',
      phoneNumber: customerInfo?.phoneNumber || '',
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
                
                <CartCheckoutSection 
                  showCheckoutForm={showCheckoutForm}
                  showPaymentForm={showPaymentForm}
                  handlePaymentSubmit={handlePaymentSubmit}
                  isProcessingPayment={isProcessingPayment}
                  getPaymentData={getPaymentData}
                  handlePaymentSuccess={handlePaymentSuccess}
                  handlePaymentError={handlePaymentError}
                />
              </div>
              
              <div className="lg:col-span-1">
                <CartSummary 
                  cartItems={cartItems}
                  calculateTotal={calculateTotal}
                  handleProceedToCheckout={handleProceedToCheckout}
                  showCheckoutForm={showCheckoutForm}
                  showPaymentForm={showPaymentForm}
                  setShowCheckoutForm={setShowCheckoutForm}
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
