
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartItemWithLink as CartItemType } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Link as LinkIcon, Edit, ChevronUp, ChevronDown } from "lucide-react";

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
  const [isEditingLink, setIsEditingLink] = useState(!item.socialMediaLink);
  const [socialLink, setSocialLink] = useState(item.socialMediaLink || "");

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.service.id, newQuantity, item.variant?.id, itemIndex);
  };

  const handleSocialLinkSave = () => {
    onUpdateSocialLink(item.service.id, socialLink, item.variant?.id, itemIndex);
    setIsEditingLink(false);
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
          
          {isEditingLink ? (
            <div className="flex items-center gap-2 mt-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  className="pl-10 py-1 h-10 text-sm"
                  placeholder="Entrez le lien de votre profil"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                />
              </div>
              <Button 
                size="sm"
                className="h-10"
                onClick={handleSocialLinkSave}
              >
                Enregistrer
              </Button>
            </div>
          ) : (
            <div className="flex items-center text-sm text-muted-foreground mt-3">
              <LinkIcon size={14} className="mr-2" />
              <span className="truncate max-w-[200px] sm:max-w-xs">{socialLink}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsEditingLink(true)}
                className="h-6 w-6 ml-1"
              >
                <Edit size={12} />
              </Button>
            </div>
          )}
          
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
