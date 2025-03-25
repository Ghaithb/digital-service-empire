
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Link as LinkIcon, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SocialMediaLinkInput from "@/components/SocialMediaLinkInput";

interface CartItemWithLinkProps {
  item: CartItem & { socialMediaLink?: string; };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateSocialLink: (id: string, link: string) => void;
}

const CartItemWithLink = ({ 
  item, 
  onRemove, 
  onUpdateQuantity,
  onUpdateSocialLink 
}: CartItemWithLinkProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isEditingLink, setIsEditingLink] = useState(!item.socialMediaLink);
  const [socialLink, setSocialLink] = useState(item.socialMediaLink || "");

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.service.id, newQuantity);
  };

  const handleSocialLinkSave = () => {
    onUpdateSocialLink(item.service.id, socialLink);
    setIsEditingLink(false);
  };

  return (
    <div className="py-4 border-b last:border-0">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-20 h-20 bg-muted rounded overflow-hidden shrink-0">
          <img 
            src={item.service.imageUrl} 
            alt={item.service.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <Link to={`/service/${item.service.id}`} className="font-medium hover:text-primary">
              {item.service.title}
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemove(item.service.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
          
          {item.service.variants && item.service.variants.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Option: {item.variant?.title || "Standard"}
            </p>
          )}
          
          {isEditingLink ? (
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  className="pl-8 py-1 h-8 text-sm"
                  placeholder="Entrez le lien de votre profil/publication"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={handleSocialLinkSave}
              >
                Enregistrer
              </Button>
            </div>
          ) : (
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <LinkIcon size={14} className="mr-1" />
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
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-7 w-7"
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-7 w-7"
              >
                +
              </Button>
            </div>
            
            <div className="font-medium">
              {(item.service.price * quantity).toFixed(2)} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemWithLink;
