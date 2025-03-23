
import { loadStripe } from '@stripe/stripe-js';

// Remplacer par votre clé publique Stripe
export const stripePromise = loadStripe("pk_test_51BbH02LJKB5MBZnj0BXpOQDLTa4Oj0nVxVJyWgJMrNVYvhlM7st3bSxlFGmUht7KvgoDTJdJMRGbj4BQSxaGKnJV00BPrrrTOj");

// Types pour les paiements
export interface PaymentData {
  amount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  email: string;
  fullName: string;
}

// Fonction pour créer une session de paiement
export const createPaymentSession = async (paymentData: PaymentData): Promise<{ sessionId: string }> => {
  // En production, vous devriez appeler votre API backend
  // Simulons une réponse de l'API ici
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sessionId: `session_${Math.random().toString(36).substring(2, 15)}`
      });
    }, 1500);
  });
};

// Vérifier le statut d'un paiement
export const checkPaymentStatus = async (sessionId: string): Promise<{ status: 'succeeded' | 'processing' | 'failed' }> => {
  // Simuler une vérification de statut
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'succeeded' });
    }, 1000);
  });
};
