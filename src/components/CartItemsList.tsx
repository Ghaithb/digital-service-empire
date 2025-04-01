
import React from "react";
import { CartItemWithLink as CartItemType } from "@/lib/cart";
import CartItemWithLinkComponent from "@/components/CartItemWithLink";

interface CartItemsListProps {
  cartItems: CartItemType[];
  handleRemoveItem: (id: string, variantId?: string, index?: number) => void;
  handleUpdateQuantity: (id: string, quantity: number, variantId?: string, index?: number) => void;
  handleUpdateSocialLink: (id: string, link: string, variantId?: string, index?: number) => void;
}

const CartItemsList = ({
  cartItems,
  handleRemoveItem,
  handleUpdateQuantity,
  handleUpdateSocialLink
}: CartItemsListProps) => {
  return (
    <div className="bg-card p-6 rounded-xl mb-6">
      {cartItems.map((item, index) => (
        <CartItemWithLinkComponent
          key={`${item.service.id}-${item.variant?.id || 'default'}-${index}`}
          item={item}
          itemIndex={index}
          onRemove={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onUpdateSocialLink={handleUpdateSocialLink}
        />
      ))}
    </div>
  );
};

export default CartItemsList;
