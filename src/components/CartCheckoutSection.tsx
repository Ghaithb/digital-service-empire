
import React from "react";
import { motion } from "framer-motion";
import CheckoutForm from "@/components/CheckoutForm";
import StripeWrapper from "@/components/StripeWrapper";
import StripePaymentForm from "@/components/StripePaymentForm";
import { PaymentData } from "@/lib/stripe";
import { z } from "zod";

interface CartCheckoutSectionProps {
  showCheckoutForm: boolean;
  showPaymentForm: boolean;
  handlePaymentSubmit: (values: z.infer<typeof formSchema>) => void;
  isProcessingPayment: boolean;
  getPaymentData: () => PaymentData;
  handlePaymentSuccess: (sessionId: string) => void;
  handlePaymentError: (error: string) => void;
}

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

const CartCheckoutSection = ({
  showCheckoutForm,
  showPaymentForm,
  handlePaymentSubmit,
  isProcessingPayment,
  getPaymentData,
  handlePaymentSuccess,
  handlePaymentError
}: CartCheckoutSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default CartCheckoutSection;
