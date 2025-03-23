
import { CartItem } from "./data";

export interface Order {
  id: string;
  items: CartItem[];
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
  items: CartItem[],
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
