
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const { service, quantity } = item;
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleIncrement = () => {
    onUpdateQuantity(service.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(service.id, quantity - 1);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center py-6 border-b gap-4">
      <div className="relative overflow-hidden w-full md:w-24 h-16 rounded bg-muted flex-shrink-0">
        <div className={`w-full h-full ${imageLoaded ? 'image-loaded' : 'image-loading'}`}>
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <Link 
          to={`/service/${service.id}`}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {service.title}
        </Link>
        <p className="text-sm text-muted-foreground">{service.deliveryTime}</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <Minus size={14} />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={handleIncrement}
        >
          <Plus size={14} />
        </Button>
      </div>
      
      <div className="text-base md:text-lg font-medium w-24 text-right">
        {(service.price * quantity).toFixed(2)} €
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(service.id)}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
