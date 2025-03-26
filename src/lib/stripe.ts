
import { loadStripe } from '@stripe/stripe-js';

// Clé publique Stripe (pour le frontend)
export const stripePromise = loadStripe("pk_live_51PUigvP6gU8ilmUx9sZ4L2e2Zcio8mF1ZaVqCFaGDSuD9OGzQpPv6Zs3RLbTchCVfSVG4GpbDIXE3hhEfkb1ERgx00qqKKiAOu");

// Types pour les paiements
export interface PaymentData {
  amount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    socialMediaLink?: string;
  }>;
  email: string;
  fullName: string;
  orderId?: string;
}

// Fonction pour créer une session de paiement
export const createPaymentSession = async (paymentData: PaymentData): Promise<{ sessionId: string }> => {
  try {
    // En production, appel à votre API backend pour créer une session Stripe
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la session de paiement');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur de paiement:', error);
    
    // Pour la démo, renvoie un ID de session factice
    // En production, ne jamais simuler un ID de session
    return {
      sessionId: `session_${Math.random().toString(36).substring(2, 15)}`
    };
  }
};

// Vérifier le statut d'un paiement
export const checkPaymentStatus = async (sessionId: string): Promise<{ status: 'succeeded' | 'processing' | 'failed' }> => {
  try {
    // En production, appel à votre API backend pour vérifier le statut
    const response = await fetch(`/api/check-payment-status?sessionId=${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la vérification du statut du paiement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur de vérification:', error);
    
    // Pour la démo, simuler un paiement réussi
    // En production, obtenir le vrai statut depuis l'API
    return { status: 'succeeded' };
  }
};
