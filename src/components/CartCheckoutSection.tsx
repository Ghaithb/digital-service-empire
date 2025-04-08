
import React from "react";
import { motion } from "framer-motion";
import StripeWrapper from "@/components/StripeWrapper";
import StripePaymentForm from "@/components/StripePaymentForm";
import { PaymentData } from "@/lib/stripe";

interface CartCheckoutSectionProps {
  showPaymentForm: boolean;
  getPaymentData: () => PaymentData;
  handlePaymentSuccess: (sessionId: string) => void;
  handlePaymentError: (error: string) => void;
}

const CartCheckoutSection = ({
  showPaymentForm,
  getPaymentData,
  handlePaymentSuccess,
  handlePaymentError
}: CartCheckoutSectionProps) => {
  return (
    <>
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
