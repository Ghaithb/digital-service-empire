
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartItemWithLink as CartItemType } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Link as LinkIcon } from "lucide-react";
import SocialMediaLinkInput from "./SocialMediaLinkInput";

interface CartItemWithLinkProps {
  item: CartItemType;
  onRemove: (id: string, variantId?: string, index?: number) => void;
  onUpdateQuantity: (id: string, quantity: number, variantId?: string, index?: number) => void;
  onUpdateSocialLink: (id: string, link: string, variantId?: string, index?: number) => void;
  itemIndex: number;
}

const CartItemWithLink = ({ 
  item, 
  onRemove, 
  onUpdateQuantity,
  onUpdateSocialLink,
  itemIndex
}: CartItemWithLinkProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [socialLink, setSocialLink] = useState(item.socialMediaLink || "");

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.service.id, newQuantity, item.variant?.id, itemIndex);
  };

  const handleSocialLinkChange = (newLink: string) => {
    setSocialLink(newLink);
    onUpdateSocialLink(item.service.id, newLink, item.variant?.id, itemIndex);
  };

  return (
    <div className="py-6 border-b last:border-0">
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
          <img 
            src={item.service.imageUrl} 
            alt={item.service.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <Link to={`/service/${item.service.id}`} className="font-medium hover:text-primary text-lg">
                {item.service.title}
              </Link>
              
              {item.variant && (
                <p className="text-sm text-muted-foreground">
                  Option: {item.variant.title}
                </p>
              )}
              
              <p className="text-sm text-muted-foreground mt-1">
                Item #{itemIndex + 1}
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemove(item.service.id, item.variant?.id, itemIndex)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
          
          <div className="mt-4">
            <SocialMediaLinkInput
              value={socialLink}
              onChange={handleSocialLinkChange}
              serviceType={item.service.category}
              index={itemIndex}
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-9 w-9 rounded-r-none"
              >
                -
              </Button>
              <div className="h-9 px-4 flex items-center justify-center">
                {quantity}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-9 w-9 rounded-l-none"
              >
                +
              </Button>
            </div>
            
            <div className="font-semibold text-lg">
              {item.total.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemWithLink;
