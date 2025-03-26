
import { CartItemWithLink } from "./cart";
import { Heart, User } from "lucide-react";

export interface Order {
  id: string;
  items: CartItemWithLink[];
  total: number;
  customerName: string;
  customerEmail: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderDate: Date;
  sessionId?: string;
}

// Simuler le stockage des commandes
const orders: Order[] = [];

// Créer une nouvelle commande
export const createOrder = (
  items: CartItemWithLink[],
  customerName: string,
  customerEmail: string
): Order => {
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const newOrder: Order = {
    id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    items,
    total,
    customerName,
    customerEmail,
    paymentStatus: 'pending',
    orderDate: new Date(),
  };
  
  orders.push(newOrder);
  return newOrder;
};

// Mettre à jour le statut de paiement d'une commande
export const updateOrderPaymentStatus = (
  orderId: string,
  status: 'pending' | 'completed' | 'failed',
  sessionId?: string
): Order | null => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return null;
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    paymentStatus: status,
    sessionId
  };
  
  return orders[orderIndex];
};

// Obtenir une commande par ID
export const getOrderById = (orderId: string): Order | null => {
  return orders.find(order => order.id === orderId) || null;
};

// Obtenir toutes les commandes d'un client
export const getOrdersByCustomerEmail = (email: string): Order[] => {
  return orders.filter(order => order.customerEmail === email);
};

// Obtenir toutes les commandes pour le tableau de bord admin
export const getAllOrders = (): Order[] => {
  return [...orders];
};

// Générer des commandes de démonstration pour le tableau de bord
export const generateDemoOrders = () => {
  // Générer quelques commandes de démonstration si la liste est vide
  if (orders.length === 0) {
    const demoItems: CartItemWithLink[] = [
      {
        service: {
          id: "instagram-followers-1000",
          title: "1000 Followers Instagram",
          description: "Augmentez votre audience Instagram avec 1000 followers réels.",
          price: 29.99,
          imageUrl: "/placeholder.svg",
          platform: "instagram",
          category: "followers",
          icon: User,
          popular: true,
          features: ["Livraison rapide", "Sécurisé", "Support 24/7", "Garantie de remboursement"],
          deliveryTime: "1-2 jours",
          variants: []
        },
        quantity: 1,
        total: 29.99,
        socialMediaLink: "https://www.instagram.com/exemple_utilisateur"
      }
    ];

    const demoItems2: CartItemWithLink[] = [
      {
        service: {
          id: "facebook-likes-500",
          title: "500 Likes Facebook",
          description: "Obtenez 500 likes sur vos publications Facebook.",
          price: 19.99,
          imageUrl: "/placeholder.svg",
          platform: "facebook",
          category: "likes",
          icon: Heart,
          popular: false,
          features: ["Livraison rapide", "Sécurisé", "Support 24/7", "Qualité supérieure"],
          deliveryTime: "24 heures",
          variants: []
        },
        quantity: 2,
        total: 39.98,
        socialMediaLink: "https://www.facebook.com/post/exemple"
      }
    ];

    const demoItems3: CartItemWithLink[] = [
      {
        service: {
          id: "instagram-followers-1000",
          title: "1000 Followers Instagram",
          description: "Augmentez votre audience Instagram avec 1000 followers réels.",
          price: 29.99,
          imageUrl: "/placeholder.svg",
          platform: "instagram",
          category: "followers",
          icon: User,
          popular: true,
          features: ["Livraison rapide", "Sécurisé", "Support 24/7", "Garantie de remboursement"],
          deliveryTime: "1-2 jours",
          variants: []
        },
        quantity: 1,
        total: 29.99,
        socialMediaLink: "https://www.instagram.com/autre_utilisateur"
      },
      {
        service: {
          id: "facebook-likes-500",
          title: "500 Likes Facebook",
          description: "Obtenez 500 likes sur vos publications Facebook.",
          price: 19.99,
          imageUrl: "/placeholder.svg",
          platform: "facebook",
          category: "likes",
          icon: Heart,
          popular: false,
          features: ["Livraison rapide", "Sécurisé", "Support 24/7", "Qualité supérieure"],
          deliveryTime: "24 heures",
          variants: []
        },
        quantity: 1,
        total: 19.99,
        socialMediaLink: "https://www.facebook.com/post/exemple2"
      }
    ];

    // Premier ordre: Complété (il y a 2 jours)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    orders.push({
      id: "ORD-1001",
      items: demoItems,
      total: 29.99,
      customerName: "Jean Dupont",
      customerEmail: "jean.dupont@example.com",
      paymentStatus: "completed",
      orderDate: twoDaysAgo,
      sessionId: "sess_" + Math.random().toString(36).substring(2, 15)
    });

    // Deuxième ordre: En attente (hier)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    orders.push({
      id: "ORD-1002",
      items: demoItems2,
      total: 39.98,
      customerName: "Marie Martin",
      customerEmail: "marie.martin@example.com",
      paymentStatus: "pending",
      orderDate: yesterday,
      sessionId: "sess_" + Math.random().toString(36).substring(2, 15)
    });

    // Troisième ordre: Échoué (aujourd'hui)
    orders.push({
      id: "ORD-1003",
      items: demoItems3,
      total: 49.98,
      customerName: "Pierre Bernard",
      customerEmail: "pierre.bernard@example.com",
      paymentStatus: "failed",
      orderDate: new Date(),
      sessionId: "sess_" + Math.random().toString(36).substring(2, 15)
    });
  }
};

// Générer des commandes de démonstration au chargement
generateDemoOrders();
