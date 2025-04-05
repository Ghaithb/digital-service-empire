
import { loadStripe } from '@stripe/stripe-js';
import { CartItemWithLink } from './cart';

// Clé publique Stripe (pour le frontend)
export const stripePromise = loadStripe("pk_test_51PUigvP6gU8ilmUx9sZ4L2e2Zcio8mF1ZaVqCFaGDSuD9OGzQpP");

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
  phoneNumber?: string; // Ajout du numéro de téléphone pour WhatsApp
}

// Service d'envoi de notifications
export const sendOrderNotifications = async (orderData: PaymentData) => {
  try {
    // Préparation du contenu pour l'email et WhatsApp
    const itemsDetails = orderData.items.map(item => 
      `- Service: ${item.name}\n  Quantité: ${item.quantity}\n  Prix: ${item.price}€\n  Lien: ${item.socialMediaLink || 'Non fourni'}`
    ).join('\n\n');

    const emailContent = `
Nouvelle commande reçue!
-----------------------
Client: ${orderData.fullName}
Email: ${orderData.email}
Téléphone: ${orderData.phoneNumber || 'Non fourni'}
Montant total: ${orderData.amount.toFixed(2)}€
ID commande: ${orderData.orderId}

Détails des services:
${itemsDetails}
`;

    const whatsappContent = `🛒 *Nouvelle commande!* 🛒\n\nClient: ${orderData.fullName}\nMontant: ${orderData.amount.toFixed(2)}€\n\n${itemsDetails.replace(/\n/g, '\n')}`;

    // En mode production, appeler les API d'emails et WhatsApp
    // En mode développement, simuler l'envoi
    if (process.env.NODE_ENV === 'production') {
      // Appel à l'API d'emails (à implémenter)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'votre-email@exemple.com', // Remplacez par votre email
          subject: `Nouvelle commande #${orderData.orderId}`,
          text: emailContent
        })
      });

      // Appel à l'API WhatsApp (à implémenter)
      if (orderData.phoneNumber) {
        await fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'votre-numero', // Remplacez par votre numéro WhatsApp
            text: whatsappContent
          })
        });
      }
    } else {
      console.log('=== SIMULATION D\'ENVOI D\'EMAIL ===');
      console.log(emailContent);
      console.log('=== SIMULATION D\'ENVOI WHATSAPP ===');
      console.log(whatsappContent);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des notifications:', error);
    return false;
  }
};

// Fonction pour créer une session de paiement
export const createPaymentSession = async (paymentData: PaymentData): Promise<{ sessionId: string }> => {
  try {
    // Envoyer les notifications lors de la création de la session
    await sendOrderNotifications(paymentData);
    
    // En production, appel à votre API backend pour créer une session Stripe
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
