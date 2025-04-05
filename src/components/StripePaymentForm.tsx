
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { createPaymentSession, PaymentData, sendOrderNotifications } from "@/lib/stripe";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, CreditCard, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

interface StripePaymentFormProps {
  paymentData: PaymentData;
  onSuccess: (sessionId: string) => void;
  onError: (error: string) => void;
}

const StripePaymentForm = ({ paymentData, onSuccess, onError }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        ':-webkit-autofill': {
          color: '#424770',
        },
      },
      invalid: {
        color: '#9e2146',
        '::placeholder': {
          color: '#9e2146',
        },
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Erreur",
        description: "Stripe n'est pas encore chargé",
        variant: "destructive",
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError("Erreur de chargement du formulaire de paiement");
      return;
    }

    setIsProcessing(true);

    try {
      // Vérifie si tous les liens sociaux nécessaires sont renseignés
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

      // Pré-remplir les informations utilisateur si disponibles
      if (user) {
        paymentData.email = user.email;
        paymentData.fullName = user.name;
      }

      // Envoyer les notifications avant même le paiement en mode développement
      // pour faciliter les tests
      if (process.env.NODE_ENV === 'development') {
        sendOrderNotifications(paymentData);
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
      <div className="p-5 border rounded-md bg-card">
        <div className="mb-4 flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-primary" />
          <h3 className="font-medium">Informations de carte bancaire</h3>
        </div>
        
        <div className="p-4 border rounded-md bg-background">
          <CardElement 
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => setCardComplete(e.complete)} 
            className="py-2"
          />
        </div>
        
        <div className="mt-3 text-sm text-muted-foreground">
          Pour le test, utilisez le numéro 4242 4242 4242 4242, une date d'expiration future et un code CVC à 3 chiffres.
        </div>
      </div>
      
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Lock className="mr-2 h-4 w-4 text-green-500" />
          <p>Paiement sécurisé via Stripe. Vos données de carte sont cryptées et sécurisées.</p>
        </div>
        <div className="flex items-center">
          <Shield className="mr-2 h-4 w-4 text-green-500" />
          <p>Protection anti-fraude et garantie de remboursement incluses.</p>
        </div>
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          <p>Livraison garantie ou remboursement intégral.</p>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing || !cardComplete}
        className="w-full py-6 text-base font-medium"
      >
        {isProcessing ? "Traitement en cours..." : `Payer ${paymentData.amount.toFixed(2)} € et finaliser la commande`}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
