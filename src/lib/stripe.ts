
import { loadStripe } from '@stripe/stripe-js';

// Clé publique Stripe (pour le frontend)
// Cette clé est publique et peut être exposée côté client
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
    // Idéalement, cette API serait une fonction Supabase Edge Function pour une sécurité maximale
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez un en-tête d'autorisation si vous utilisez l'authentification
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur de paiement détails:', errorData);
      throw new Error('Erreur lors de la création de la session de paiement');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur de paiement:', error);
    
    // En mode développement uniquement, simule un ID de session
    if (process.env.NODE_ENV === 'development') {
      console.warn('Mode développement: Simulation d\'une session de paiement');
      return {
        sessionId: `session_${Math.random().toString(36).substring(2, 15)}`
      };
    }
    
    throw error;
  }
};

// Vérifier le statut d'un paiement
export const checkPaymentStatus = async (sessionId: string): Promise<{ status: 'succeeded' | 'processing' | 'failed' }> => {
  try {
    // En production, appel à votre API backend pour vérifier le statut
    // Idéalement, cette API serait une fonction Supabase Edge Function
    const response = await fetch(`/api/check-payment-status?sessionId=${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la vérification du statut du paiement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur de vérification:', error);
    
    // En mode développement uniquement, simule un paiement réussi
    if (process.env.NODE_ENV === 'development') {
      console.warn('Mode développement: Simulation d\'un paiement réussi');
      return { status: 'succeeded' };
    }
    
    throw error;
  }
};
