
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
  phoneNumber?: string; // Conservé pour compatibilité
}

// Service d'envoi de notifications
export const sendOrderNotifications = async (orderData: PaymentData) => {
  try {
    // Préparation du contenu pour l'email et WhatsApp
    const itemsDetails = orderData.items.map(item => 
      `- Service: ${item.name}\n  Quantité: ${item.quantity}\n  Prix: ${item.price}€\n  Lien: ${item.socialMediaLink || 'Non fourni'}`
    ).join('\n\n');

    // Contenu de l'email plus détaillé et formaté
    const emailContent = `
NOUVELLE COMMANDE - ${orderData.orderId || 'ID non disponible'}
==================================================
CLIENT: ${orderData.fullName}
EMAIL: ${orderData.email}
MONTANT TOTAL: ${orderData.amount.toFixed(2)}€
DATE: ${new Date().toLocaleString('fr-FR')}

DÉTAILS DES SERVICES:
==================================================
${itemsDetails}

LIENS SOCIAUX:
==================================================
${orderData.items.map(item => `- ${item.name}: ${item.socialMediaLink || 'Non fourni'}`).join('\n')}

Cette commande a été reçue et est en attente de traitement.
`;

    const whatsappContent = `🛒 *NOUVELLE COMMANDE!* 🛒\n\nClient: ${orderData.fullName}\nMontant: ${orderData.amount.toFixed(2)}€\n\n${itemsDetails.replace(/\n/g, '\n')}`;

    // En mode production, appeler les API d'emails et WhatsApp
    // En mode développement, simuler l'envoi
    if (process.env.NODE_ENV === 'production') {
      // Appel à l'API d'emails (à implémenter)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'votre-email@exemple.com', // Remplacez par votre email
          subject: `📢 NOUVELLE COMMANDE #${orderData.orderId} - ${orderData.amount.toFixed(2)}€`,
          text: emailContent
        })
      });

      // Appel à l'API WhatsApp (si nécessaire)
      // Code pour WhatsApp maintenu pour compatibilité
    } else {
      console.log('=== SIMULATION D\'ENVOI D\'EMAIL ===');
      console.log('À: votre-email@exemple.com');
      console.log(`Sujet: 📢 NOUVELLE COMMANDE #${orderData.orderId} - ${orderData.amount.toFixed(2)}€`);
      console.log(emailContent);
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
