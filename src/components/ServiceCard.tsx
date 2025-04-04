import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Service, ServiceVariant } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Check, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { addToCart, CartItemWithLink } from "@/lib/cart";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
  index?: number;
}

const ServiceCard = ({ service, featured = false, index = 0 }: ServiceCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ServiceVariant | null>(
    service.variants && service.variants.length > 0 
      ? service.variants.find(v => v.popular) || service.variants[0]
      : null
  );
  
  const handleAddToCart = () => {
    const currentPrice = selectedVariant ? selectedVariant.price : service.price;
    
    const cartItem: CartItemWithLink = {
      service: service,
      variant: selectedVariant,
      quantity: 1,
      total: currentPrice,
      socialMediaLink: ""
    };
    
    addToCart(cartItem);
    
    const variantInfo = selectedVariant ? ` (${selectedVariant.title})` : '';
    
    toast({
      title: "Service ajouté au panier",
      description: `${service.title}${variantInfo} a été ajouté à votre panier.`,
      action: (
        <div className="flex gap-2 mt-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate('/cart')}
          >
            Passer au paiement
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              document.getElementById('toast-close')?.click();
            }}
          >
            Continuer
          </Button>
        </div>
      )
    });
  };
  
  const delay = index * 0.1;
  
  const currentPrice = selectedVariant ? selectedVariant.price : service.price;
  
  const hasVariants = service.variants && service.variants.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ y: -5 }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md bg-card">
        <div className="relative overflow-hidden">
          <div 
            className={`w-full aspect-video bg-muted ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover transition-all duration-300"
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>
          
          {service.popular && (
            <div className="absolute top-4 right-4">
              <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                Populaire
              </span>
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex items-center">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 
                  service.platform === 'instagram' ? '#E1306C' :
                  service.platform === 'facebook' ? '#1877F2' :
                  service.platform === 'twitter' ? '#1DA1F2' :
                  service.platform === 'youtube' ? '#FF0000' : '#000'
              }}
            >
              <service.icon size={16} className="text-white" />
            </div>
          </div>
        </div>
        
        <CardHeader className="pt-4 pb-2">
          <CardTitle className="text-xl">{service.title}</CardTitle>
          <CardDescription>{service.deliveryTime}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
          
          <div className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <Check size={16} className="text-primary mt-0.5" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
          
          {hasVariants && (
            <div className="mb-4">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-muted/50 hover:bg-muted w-full justify-between">
                      <span className="truncate max-w-[180px]">
                        {selectedVariant?.title || "Choisir une option"}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[220px] max-h-[300px] overflow-y-auto p-0">
                      <div className="p-1">
                        {service.variants?.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`flex items-start justify-between w-full p-2 text-left rounded-md transition-colors hover:bg-muted ${
                              selectedVariant?.id === variant.id ? "bg-muted" : ""
                            }`}
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium">{variant.title}</p>
                              <p className="text-xs text-muted-foreground">{variant.description}</p>
                            </div>
                            <div className="text-sm font-medium whitespace-nowrap">
                              {variant.price.toFixed(2)} €
                            </div>
                          </button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4">
          <div className="text-2xl font-medium">{currentPrice.toFixed(2)} €</div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="transition-all duration-300"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-2" /> 
              Ajouter
            </Button>
            <Button size="sm" asChild>
              <Link to={`/service/${service.id}`}>
                Détails
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
