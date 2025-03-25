
import { Service, ServiceVariant } from "./data";

export interface CartItemWithLink {
  service: Service;
  variant?: ServiceVariant | null;
  quantity: number;
  total: number;
  socialMediaLink?: string;
}

// Obtenir le contenu du panier depuis le localStorage
export const getCart = (): CartItemWithLink[] => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (error) {
    console.error("Erreur lors de la récupération du panier", error);
    return [];
  }
};

// Mettre à jour le panier dans le localStorage
export const updateCart = (cart: CartItemWithLink[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Ajouter un article au panier
export const addToCart = (item: CartItemWithLink): void => {
  const cart = getCart();
  
  // Vérifier si l'article existe déjà (même service et même variante)
  const existingItemIndex = cart.findIndex(
    cartItem => 
      cartItem.service.id === item.service.id && 
      ((!cartItem.variant && !item.variant) || 
       (cartItem.variant?.id === item.variant?.id))
  );
  
  if (existingItemIndex >= 0) {
    // Mettre à jour la quantité et le total
    cart[existingItemIndex].quantity += item.quantity;
    cart[existingItemIndex].total = cart[existingItemIndex].quantity * 
      (item.variant?.price || item.service.price);
  } else {
    // Ajouter le nouvel article
    cart.push(item);
  }
  
  updateCart(cart);
};

// Supprimer un article du panier
export const removeFromCart = (serviceId: string, variantId?: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(
    item => !(item.service.id === serviceId && 
             ((!variantId && !item.variant) || 
              (item.variant?.id === variantId)))
  );
  updateCart(updatedCart);
};

// Mettre à jour la quantité d'un article
export const updateCartItemQuantity = (
  serviceId: string, 
  quantity: number, 
  variantId?: string
): void => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    item => item.service.id === serviceId && 
           ((!variantId && !item.variant) || 
            (item.variant?.id === variantId))
  );
  
  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    cart[itemIndex].total = quantity * 
      (cart[itemIndex].variant?.price || cart[itemIndex].service.price);
    updateCart(cart);
  }
};

// Mettre à jour le lien social media d'un article
export const updateCartItemSocialLink = (
  serviceId: string,
  socialMediaLink: string,
  variantId?: string
): void => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    item => item.service.id === serviceId && 
           ((!variantId && !item.variant) || 
            (item.variant?.id === variantId))
  );
  
  if (itemIndex >= 0) {
    cart[itemIndex].socialMediaLink = socialMediaLink;
    updateCart(cart);
  }
};

// Vider le panier
export const clearCart = (): void => {
  localStorage.removeItem("cart");
};

// Calculer le total du panier
export const calculateCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.total, 0);
};
