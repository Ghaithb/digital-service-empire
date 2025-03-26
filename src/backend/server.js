
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

// Nouveaux schémas pour le système de fidélité
const loyaltyUserSchema = new mongoose.Schema({
  id: String,
  email: { type: String, unique: true },
  name: String,
  points: { type: Number, default: 0 },
  tier: { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' },
  referralCode: { type: String, unique: true },
  referrals: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now }
});

const pointsTransactionSchema = new mongoose.Schema({
  id: String,
  userId: String,
  amount: Number,
  type: { type: String, enum: ['earned', 'spent', 'referral', 'signup'] },
  description: String,
  date: { type: Date, default: Date.now }
});

const LoyaltyUser = mongoose.model('LoyaltyUser', loyaltyUserSchema);
const PointsTransaction = mongoose.model('PointsTransaction', pointsTransactionSchema);

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

// Helper functions for loyalty
const calculateTier = (points) => {
  if (points >= 5000) return 'platinum';
  if (points >= 1000) return 'gold';
  if (points >= 500) return 'silver';
  return 'bronze';
};

const generateReferralCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'REF-';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

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
      
      // Ajouter des points de fidélité si l'utilisateur existe
      if (session.customer_email) {
        try {
          const loyaltyUser = await LoyaltyUser.findOne({ email: session.customer_email });
          
          if (loyaltyUser) {
            const amount = session.amount_total / 100;
            // Points earned depend on tier
            let pointMultiplier = 1;
            if (loyaltyUser.tier === 'silver') pointMultiplier = 1.5;
            if (loyaltyUser.tier === 'gold') pointMultiplier = 2;
            if (loyaltyUser.tier === 'platinum') pointMultiplier = 3;
            
            const pointsEarned = Math.round(amount * pointMultiplier);
            
            loyaltyUser.points += pointsEarned;
            loyaltyUser.tier = calculateTier(loyaltyUser.points);
            await loyaltyUser.save();
            
            // Create points transaction
            const transaction = new PointsTransaction({
              id: `tx_${Date.now()}`,
              userId: loyaltyUser.id,
              amount: pointsEarned,
              type: 'earned',
              description: `Achat de ${amount}€`,
              date: new Date()
            });
            
            await transaction.save();
            
            // Send notification email about earned points
            await sendLoyaltyPointsNotification(loyaltyUser.email, pointsEarned, loyaltyUser.points);
          }
        } catch (loyaltyError) {
          console.error('Erreur lors de l\'ajout des points de fidélité:', loyaltyError);
        }
      }
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

// Nouveaux endpoints pour le système de fidélité
app.post('/api/loyalty/register', async (req, res) => {
  try {
    const { email, name, referralCode } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    let user = await LoyaltyUser.findOne({ email });
    
    if (user) {
      return res.json({ user, message: 'Utilisateur déjà inscrit' });
    }
    
    // Créer un nouvel utilisateur
    const userId = `user_${Date.now()}`;
    user = new LoyaltyUser({
      id: userId,
      email,
      name,
      points: 100, // Welcome bonus
      tier: 'bronze',
      referralCode: generateReferralCode(),
      referrals: 0,
      joinDate: new Date()
    });
    
    await user.save();
    
    // Ajouter la transaction de bienvenue
    const transaction = new PointsTransaction({
      id: `tx_${Date.now()}`,
      userId,
      amount: 100,
      type: 'signup',
      description: 'Bienvenue au programme de fidélité',
      date: new Date()
    });
    
    await transaction.save();
    
    // Vérifier le code de parrainage
    if (referralCode) {
      const referrer = await LoyaltyUser.findOne({ referralCode });
      
      if (referrer) {
        // Points awarded depend on tier
        let referralPoints = 200;
        if (referrer.tier === 'gold') referralPoints = 400;
        if (referrer.tier === 'platinum') referralPoints = 600;
        
        referrer.points += referralPoints;
        referrer.referrals += 1;
        referrer.tier = calculateTier(referrer.points);
        await referrer.save();
        
        // Créer une transaction pour le parrain
        const referralTransaction = new PointsTransaction({
          id: `tx_${Date.now() + 1}`,
          userId: referrer.id,
          amount: referralPoints,
          type: 'referral',
          description: `Parrainage de ${email}`,
          date: new Date()
        });
        
        await referralTransaction.save();
        
        // Envoyer une notification au parrain
        await sendReferralNotification(referrer.email, email, referralPoints);
      }
    }
    
    // Envoyer un email de bienvenue
    await sendWelcomeLoyaltyEmail(email, name);
    
    res.status(201).json({ user, message: 'Inscription réussie avec 100 points de bienvenue' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription au programme de fidélité' });
  }
});

app.get('/api/loyalty/user/:email', async (req, res) => {
  try {
    const user = await LoyaltyUser.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données de fidélité' });
  }
});

app.get('/api/loyalty/transactions/:userId', async (req, res) => {
  try {
    const transactions = await PointsTransaction.find({ userId: req.params.userId })
      .sort({ date: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des transactions' });
  }
});

app.post('/api/loyalty/redeem-referral', async (req, res) => {
  try {
    const { referralCode, email } = req.body;
    
    // Vérifier si le code existe
    const referrer = await LoyaltyUser.findOne({ referralCode });
    
    if (!referrer) {
      return res.status(404).json({ error: 'Code de parrainage invalide' });
    }
    
    // Vérifier que l'utilisateur ne s'auto-parraine pas
    if (referrer.email === email) {
      return res.status(400).json({ error: 'Vous ne pouvez pas utiliser votre propre code de parrainage' });
    }
    
    // Mettre à jour les informations du parrain
    let referralPoints = 200;
    if (referrer.tier === 'gold') referralPoints = 400;
    if (referrer.tier === 'platinum') referralPoints = 600;
    
    referrer.points += referralPoints;
    referrer.referrals += 1;
    referrer.tier = calculateTier(referrer.points);
    await referrer.save();
    
    // Créer une transaction pour le parrain
    const transaction = new PointsTransaction({
      id: `tx_${Date.now()}`,
      userId: referrer.id,
      amount: referralPoints,
      type: 'referral',
      description: `Parrainage de ${email}`,
      date: new Date()
    });
    
    await transaction.save();
    
    // Envoyer une notification au parrain
    await sendReferralNotification(referrer.email, email, referralPoints);
    
    res.json({ success: true, message: 'Code de parrainage validé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la validation du code de parrainage:', error);
    res.status(500).json({ error: 'Erreur lors de la validation du code de parrainage' });
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

// Nouvelles fonctions pour les notifications du programme de fidélité
const sendWelcomeLoyaltyEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Bienvenue dans notre programme de fidélité',
      html: `
        <h2>Bienvenue, ${name}!</h2>
        <p>Merci de vous être inscrit à notre programme de fidélité.</p>
        <p>Vous avez reçu 100 points de bienvenue pour démarrer.</p>
        <p>Vous pouvez gagner plus de points en:</p>
        <ul>
          <li>Effectuant des achats sur notre site</li>
          <li>Parrainant vos amis</li>
          <li>Participant à nos événements spéciaux</li>
        </ul>
        <p>Visitez votre <a href="${process.env.FRONTEND_URL}/loyalty">espace fidélité</a> pour voir votre solde de points et vos avantages.</p>
        <p>Merci,<br>L'équipe</p>
      `
    });
    
    console.log('Email de bienvenue envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
  }
};

const sendLoyaltyPointsNotification = async (email, pointsEarned, totalPoints) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Vous avez gagné des points de fidélité',
      html: `
        <h2>Félicitations!</h2>
        <p>Vous venez de gagner <strong>${pointsEarned} points</strong> pour votre achat récent.</p>
        <p>Votre solde actuel est de <strong>${totalPoints} points</strong>.</p>
        <p>Visitez votre <a href="${process.env.FRONTEND_URL}/loyalty">espace fidélité</a> pour voir vos avantages.</p>
        <p>Merci,<br>L'équipe</p>
      `
    });
    
    console.log('Notification de points envoyée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification de points:', error);
  }
};

const sendReferralNotification = async (email, referredEmail, pointsEarned) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Votre parrainage a été validé!',
      html: `
        <h2>Félicitations!</h2>
        <p>Votre ami (${referredEmail}) vient de rejoindre notre programme de fidélité grâce à votre parrainage.</p>
        <p>Vous avez gagné <strong>${pointsEarned} points</strong> en récompense!</p>
        <p>Continuez à parrainer vos amis pour gagner encore plus de points.</p>
        <p>Visitez votre <a href="${process.env.FRONTEND_URL}/loyalty">espace fidélité</a> pour voir votre solde mis à jour.</p>
        <p>Merci,<br>L'équipe</p>
      `
    });
    
    console.log('Notification de parrainage envoyée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification de parrainage:', error);
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
