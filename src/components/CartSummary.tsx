
import React from "react";
import { Link } from "react-router-dom";
import { CartItemWithLink } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronUp, CreditCard, Wallet, Clock, Info } from "lucide-react";

interface CartSummaryProps {
  cartItems: CartItemWithLink[];
  calculateTotal: () => number;
  handleProceedToCheckout: () => void;
  showCheckoutForm: boolean;
  showPaymentForm: boolean;
  setShowCheckoutForm: (show: boolean) => void;
  setShowPaymentForm: (show: boolean) => void;
  isProcessingPayment: boolean;
}

const CartSummary = ({
  cartItems,
  calculateTotal,
  handleProceedToCheckout,
  showCheckoutForm,
  showPaymentForm,
  setShowCheckoutForm,
  setShowPaymentForm,
  isProcessingPayment
}: CartSummaryProps) => {
  return (
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
          <span className="text-lg font-bold">{calculateTotal().toFixed(2)} €</span>
        </div>
      </div>
      
      {!showCheckoutForm ? (
        <Button 
          className="w-full mb-4 py-6 text-lg"
          onClick={handleProceedToCheckout}
        >
          Passer à la caisse <ChevronRight size={20} className="ml-2" />
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
        <div className="text-sm text-center mb-2 font-medium">
          Méthodes de paiement acceptées
        </div>
        <div className="flex justify-center space-x-6 py-2">
          <CreditCard className="text-muted-foreground h-6 w-6" />
          <Wallet className="text-muted-foreground h-6 w-6" />
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground border-t pt-4">
        <p className="flex items-center mb-3">
          <Clock size={16} className="mr-2 text-primary" />
          Livraison rapide sous 24h à 72h
        </p>
        <p className="flex items-start">
          <Info size={16} className="mr-2 mt-1 shrink-0 text-primary" />
          <span>
            En passant votre commande, vous acceptez nos{" "}
            <Link to="/legal" className="text-primary hover:underline">
              conditions générales de vente
            </Link>{" "}
            et notre{" "}
            <Link to="/legal" className="text-primary hover:underline">
              politique de confidentialité
            </Link>.
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
