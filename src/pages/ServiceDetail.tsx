
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceById, Service, ServiceVariant, getServiceTypeInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import ServiceVariantSelector from "@/components/ServiceVariantSelector";
import SocialMediaLinkInput from "@/components/SocialMediaLinkInput";
import { 
  ChevronLeft, 
  ShoppingCart, 
  Check, 
  Clock, 
  Shield, 
  ThumbsUp, 
  Award,
  Share 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ServiceVariant | null>(null);
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const serviceData = getServiceById(id);
      if (serviceData) {
        setService(serviceData);
        // Sélectionner la première variante par défaut ou celle marquée comme populaire
        if (serviceData.variants && serviceData.variants.length > 0) {
          const popularVariant = serviceData.variants.find(v => v.popular);
          const variant = popularVariant || serviceData.variants[0];
          setSelectedVariant(variant);
          setTotalPrice(variant.price);
        } else {
          setTotalPrice(serviceData.price);
        }
      } else {
        navigate("/services");
      }
    }
    
    window.scrollTo(0, 0);
  }, [id, navigate]);
  
  useEffect(() => {
    // Mettre à jour le prix total lorsque la quantité ou la variante change
    if (selectedVariant) {
      setTotalPrice(selectedVariant.price * quantity);
    } else if (service) {
      setTotalPrice(service.price * quantity);
    }
  }, [quantity, selectedVariant, service]);
  
  const handleAddToCart = () => {
    if (!service) return;
    
    if (!socialMediaLink) {
      toast({
        title: "Information manquante",
        description: "Veuillez entrer le lien de votre profil ou publication.",
        variant: "destructive",
      });
      return;
    }
    
    const variantInfo = selectedVariant ? ` (${selectedVariant.title})` : '';
    
    // Créer un objet représentant l'article à ajouter au panier
    const cartItem = {
      service: service,
      variant: selectedVariant,
      quantity: quantity,
      price: totalPrice,
      socialMediaLink: socialMediaLink,
    };
    
    // Stocker dans localStorage (version simple pour la démonstration)
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    toast({
      title: "Service ajouté au panier",
      description: `${quantity} × ${service.title}${variantInfo} a été ajouté à votre panier.`,
    });
    
    // Rediriger vers le panier
    navigate("/cart");
  };
  
  const getPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    return service?.price || 0;
  };
  
  const serviceType = selectedVariant?.type || service?.category;
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-16 h-16 rounded-full bg-primary/30"></div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <Button 
            variant="ghost" 
            className="mb-8 flex items-center"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-2" /> Retour
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-xl bg-muted"
            >
              <div 
                className={`w-full aspect-video ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
              >
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </motion.div>
            
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full mr-3"
                  style={{ 
                    backgroundColor: 
                      service.platform === 'instagram' ? '#E1306C' :
                      service.platform === 'facebook' ? '#1877F2' :
                      service.platform === 'twitter' ? '#1DA1F2' :
                      service.platform === 'youtube' ? '#FF0000' :
                      service.platform === 'tiktok' ? '#000000' :
                      service.platform === 'snapchat' ? '#FFFC00' : '#0077B5'
                  }}
                >
                  <service.icon size={20} className="text-white" />
                </div>
                
                {service.popular && (
                  <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
              
              <div className="flex items-center mb-4">
                <p className="text-xl font-bold">{totalPrice.toFixed(2)} €</p>
                {quantity > 1 && selectedVariant && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({selectedVariant.price.toFixed(2)} € par unité)
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              
              {/* Lien social media */}
              <SocialMediaLinkInput 
                value={socialMediaLink}
                onChange={setSocialMediaLink}
                serviceType={serviceType}
              />
              
              {/* Variants Selector */}
              {service.variants && service.variants.length > 0 && (
                <ServiceVariantSelector
                  service={service}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              )}
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Caractéristiques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-primary/10 rounded-full p-1">
                        <Check size={16} className="text-primary" />
                      </div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-8">
                <Clock size={18} className="mr-2" />
                <span>Livraison estimée: {service.deliveryTime}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Ajouter au panier
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Shield, text: "Paiement sécurisé" },
                  { icon: ThumbsUp, text: "Satisfaction garantie" },
                  { icon: Award, text: "Service de qualité" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <item.icon size={16} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Share size={14} />
                <span>Partager:</span>
                <div className="flex space-x-2">
                  {["Facebook", "Twitter", "WhatsApp"].map((platform) => (
                    <Button 
                      key={platform} 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3"
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default ServiceDetail;
