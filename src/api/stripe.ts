
// Ce fichier est destiné à être exécuté côté serveur.
// Pour l'instant, il est placé ici comme référence.

import Stripe from 'stripe';
import { PaymentData } from '../lib/stripe';

// Utiliser une variable d'environnement pour la clé secrète (à définir côté serveur)
// Ne jamais exposer la clé secrète dans le code frontend
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_51PUigvP6gU8ilmUxk1YuT2yLgcPhf8Vwn126PQV6eMJhDelgR0t4VIHXm44Y6s840qc4yJwygo700iU5efp9jRFG00SmPv6p4Z';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
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
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
      customer_email: paymentData.email,
      metadata: {
        fullName: paymentData.fullName,
        orderId: paymentData.orderId || "",
        allLinks: JSON.stringify(paymentData.items.map(item => item.socialMediaLink || ""))
      },
    });

    // Envoyer une notification par email au propriétaire du site
    await sendOrderNotification(paymentData, session.id);

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
    
    // Si le paiement est réussi, envoyer une notification de réussite
    if (session.payment_status === 'paid') {
      await sendPaymentSuccessNotification(session);
    }
    
    return { 
      status: session.payment_status === 'paid' ? 'succeeded' : 
              session.payment_status === 'unpaid' ? 'processing' : 'failed'
    };
  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    throw new Error('Erreur lors de la vérification du statut du paiement');
  }
};

// Fonction pour envoyer une notification lors de la création d'une commande
const sendOrderNotification = async (paymentData: PaymentData, sessionId: string) => {
  // Cette fonction serait implémentée côté serveur pour envoyer un email
  // Exemple d'implémentation avec un service d'emails comme Nodemailer ou SendGrid
  
  try {
    console.log('Envoi d\'une notification pour la nouvelle commande:', {
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: 'Nouvelle commande reçue',
      text: `
        Une nouvelle commande a été créée.
        Client: ${paymentData.fullName} (${paymentData.email})
        Montant: ${paymentData.amount}€
        ID de session Stripe: ${sessionId}
        
        Détails des services:
        ${paymentData.items.map(item => 
          `- ${item.name} (Quantité: ${item.quantity}, Prix: ${item.price}€)
           Lien social: ${item.socialMediaLink || 'Non fourni'}`
        ).join('\n')}
      `
    });
    
    // En production, utilisez un service d'emails réel
    // await sendEmail(...);
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
  }
};

// Fonction pour envoyer une notification après un paiement réussi
const sendPaymentSuccessNotification = async (session: Stripe.Checkout.Session) => {
  try {
    const customerEmail = session.customer_email || 'client@example.com';
    const customerName = session.metadata?.fullName || 'Client';
    const allLinks = session.metadata?.allLinks ? JSON.parse(session.metadata.allLinks) : [];
    
    console.log('Envoi d\'une notification de paiement réussi:', {
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: 'Paiement confirmé',
      text: `
        Un paiement a été confirmé.
        Client: ${customerName} (${customerEmail})
        ID de session Stripe: ${session.id}
        Montant: ${(session.amount_total || 0) / 100}€
        
        Liens sociaux fournis:
        ${allLinks.map((link: string) => `- ${link || 'Non fourni'}`).join('\n')}
        
        Merci de traiter cette commande rapidement.
      `
    });
    
    // En production, utilisez un service d'emails réel
    // await sendEmail(...);
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
  }
};
