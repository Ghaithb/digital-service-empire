
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration de Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(stripeSecretKey);

// Configuration de MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Schéma pour les commandes
const orderSchema = new mongoose.Schema({
  id: String,
  items: Array,
  total: Number,
  customerName: String,
  customerEmail: String,
  paymentStatus: String,
  orderDate: Date,
  sessionId: String
});

const Order = mongoose.model('Order', orderSchema);

// Schéma pour les services
const serviceSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  platform: String,
  category: String,
  popular: Boolean,
  features: Array,
  deliveryTime: String,
  variants: Array
});

const Service = mongoose.model('Service', serviceSchema);

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint pour créer une session de paiement Stripe
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, items, email, fullName, orderId } = req.body;

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            metadata: {
              socialMediaLink: item.socialMediaLink || ''
            }
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      customer_email: email,
      metadata: {
        fullName,
        orderId: orderId || '',
        allLinks: JSON.stringify(items.map(item => ({ 
          serviceId: item.id,
          link: item.socialMediaLink || '',
          quantity: item.quantity
        })))
      },
    });

    // Sauvegarder la commande dans MongoDB
    const newOrder = new Order({
      id: orderId,
      items,
      total: amount,
      customerName: fullName,
      customerEmail: email,
      paymentStatus: 'pending',
      orderDate: new Date(),
      sessionId: session.id
    });

    await newOrder.save();

    // Envoyer une notification par email
    await sendOrderNotification(req.body, session.id);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
  }
});

// Endpoint pour vérifier le statut d'un paiement
app.get('/api/check-payment-status', async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Si le paiement est réussi, mettre à jour la commande et envoyer une notification
    if (session.payment_status === 'paid') {
      await Order.findOneAndUpdate(
        { sessionId },
        { paymentStatus: 'completed' }
      );
      
      await sendPaymentSuccessNotification(session);
    }
    
    res.json({ 
      status: session.payment_status === 'paid' ? 'succeeded' : 
              session.payment_status === 'unpaid' ? 'processing' : 'failed'
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification du statut du paiement' });
  }
});

// Endpoints pour le CRUD des services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des services' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du service' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du service' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await Service.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Service supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du service' });
  }
});

// Endpoints pour les commandes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
  }
});

// Fonction pour envoyer une notification lors de la création d'une commande
const sendOrderNotification = async (paymentData, sessionId) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
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
      `,
      html: `
        <h2>Nouvelle commande reçue</h2>
        <p><strong>Client:</strong> ${paymentData.fullName} (${paymentData.email})</p>
        <p><strong>Montant:</strong> ${paymentData.amount}€</p>
        <p><strong>ID de session Stripe:</strong> ${sessionId}</p>
        
        <h3>Détails des services:</h3>
        <ul>
          ${paymentData.items.map(item => `
            <li>
              <strong>${item.name}</strong> (Quantité: ${item.quantity}, Prix: ${item.price}€)<br>
              Lien social: ${item.socialMediaLink || 'Non fourni'}
            </li>
          `).join('')}
        </ul>
      `
    });
    
    console.log('Notification de commande envoyée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
  }
};

// Fonction pour envoyer une notification après un paiement réussi
const sendPaymentSuccessNotification = async (session) => {
  try {
    const customerEmail = session.customer_email || 'client@example.com';
    const customerName = session.metadata?.fullName || 'Client';
    const allLinks = session.metadata?.allLinks ? JSON.parse(session.metadata.allLinks) : [];
    
    // Email à l'administrateur
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'Paiement confirmé',
      text: `
        Un paiement a été confirmé.
        Client: ${customerName} (${customerEmail})
        ID de session Stripe: ${session.id}
        Montant: ${(session.amount_total || 0) / 100}€
        
        Liens sociaux fournis:
        ${allLinks.map(item => 
          `- Service: ${item.serviceId || 'N/A'}, Lien: ${item.link || 'Non fourni'}, Quantité: ${item.quantity || 1}`
        ).join('\n')}
        
        Merci de traiter cette commande rapidement.
      `,
      html: `
        <h2>Paiement confirmé</h2>
        <p><strong>Client:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>ID de session Stripe:</strong> ${session.id}</p>
        <p><strong>Montant:</strong> ${(session.amount_total || 0) / 100}€</p>
        
        <h3>Liens sociaux fournis:</h3>
        <ul>
          ${allLinks.map(item => `
            <li>
              <strong>Service:</strong> ${item.serviceId || 'N/A'}<br>
              <strong>Lien:</strong> ${item.link || 'Non fourni'}<br>
              <strong>Quantité:</strong> ${item.quantity || 1}
            </li>
          `).join('')}
        </ul>
        
        <p>Merci de traiter cette commande rapidement.</p>
      `
    });
    
    // Email au client
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      subject: 'Votre commande est confirmée',
      text: `
        Bonjour ${customerName},
        
        Nous vous confirmons que votre paiement a bien été reçu.
        Votre commande est en cours de traitement.
        
        Montant total: ${(session.amount_total || 0) / 100}€
        
        Nous allons traiter votre commande dans les plus brefs délais.
        
        Merci pour votre confiance,
        L'équipe
      `,
      html: `
        <h2>Votre commande est confirmée</h2>
        <p>Bonjour ${customerName},</p>
        
        <p>Nous vous confirmons que votre paiement a bien été reçu.<br>
        Votre commande est en cours de traitement.</p>
        
        <p><strong>Montant total:</strong> ${(session.amount_total || 0) / 100}€</p>
        
        <p>Nous allons traiter votre commande dans les plus brefs délais.</p>
        
        <p>Merci pour votre confiance,<br>
        L'équipe</p>
      `
    });
    
    console.log('Notifications de paiement réussi envoyées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi des notifications:', error);
  }
};

// Webhook Stripe pour recevoir les événements de paiement en temps réel
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Erreur de signature webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer les différents types d'événements
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Mettre à jour le statut de la commande dans la base de données
      await Order.findOneAndUpdate(
        { sessionId: session.id },
        { paymentStatus: 'completed' }
      );
      
      // Envoyer les notifications
      await sendPaymentSuccessNotification(session);
      break;
      
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      
      // Mettre à jour le statut de la commande
      const failedSession = await stripe.checkout.sessions.retrieve(
        failedPaymentIntent.metadata?.checkout_session_id
      );
      
      if (failedSession) {
        await Order.findOneAndUpdate(
          { sessionId: failedSession.id },
          { paymentStatus: 'failed' }
        );
      }
      break;
      
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  res.json({ received: true });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
