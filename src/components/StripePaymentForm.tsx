
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { createPaymentSession, PaymentData } from "@/lib/stripe";
import { useToast } from "@/hooks/use-toast";

interface StripePaymentFormProps {
  paymentData: PaymentData;
  onSuccess: (sessionId: string) => void;
  onError: (error: string) => void;
}

const StripePaymentForm = ({ paymentData, onSuccess, onError }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError("Erreur de chargement du formulaire de paiement");
      return;
    }

    setIsProcessing(true);

    try {
      // Vérifier si tous les liens sociaux sont renseignés
      const missingLinks = paymentData.items.filter(item => !item.socialMediaLink);
      if (missingLinks.length > 0) {
        toast({
          title: "Information manquante",
          description: "Veuillez renseigner tous les liens des réseaux sociaux pour vos services.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Créer une session de paiement
      const { sessionId } = await createPaymentSession(paymentData);
      
      // Dans un environnement de production, nous utiliserions stripe.redirectToCheckout
      // Pour rediriger vers la page de paiement Stripe
      if (process.env.NODE_ENV === 'production') {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId
        });
        
        if (error) {
          toast({
            title: "Erreur de redirection",
            description: error.message || "Une erreur est survenue lors de la redirection vers Stripe.",
            variant: "destructive",
          });
          onError(error.message || "Erreur de redirection");
          setIsProcessing(false);
          return;
        }
      } else {
        // Pour la démo, simuler une requête réussie
        toast({
          title: "Paiement en cours de traitement",
          description: "Votre paiement est en cours de validation...",
        });

        setTimeout(() => {
          onSuccess(sessionId);
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement.",
        variant: "destructive",
      });
      onError(typeof error === 'string' ? error : "Erreur lors du traitement de votre paiement");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-md bg-card">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        <p>🔒 Paiement sécurisé via Stripe. Vos données de carte sont cryptées et sécurisées.</p>
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? "Traitement en cours..." : "Payer et finaliser la commande"}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
