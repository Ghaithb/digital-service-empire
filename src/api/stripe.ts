
// Ce fichier est destiné à être exécuté côté serveur.
// Pour l'instant, il est placé ici comme référence.

import Stripe from 'stripe';
import { PaymentData } from '../lib/stripe';

// Clé secrète Stripe (à utiliser uniquement côté serveur)
const stripe = new Stripe('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', {
  apiVersion: '2024-03-01',
});

// Créer une session de paiement
export const createCheckoutSession = async (paymentData: PaymentData) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: paymentData.items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            metadata: {
              socialMediaLink: item.socialMediaLink || ""
            }
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      customer_email: paymentData.email,
      metadata: {
        fullName: paymentData.fullName,
      },
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    throw new Error('Erreur lors de la création de la session de paiement');
  }
};

// Vérifier le statut d'un paiement
export const checkPaymentStatus = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return { 
      status: session.payment_status === 'paid' ? 'succeeded' : 
              session.payment_status === 'unpaid' ? 'processing' : 'failed'
    };
  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    throw new Error('Erreur lors de la vérification du statut du paiement');
  }
};
