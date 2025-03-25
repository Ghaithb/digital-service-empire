
import { motion } from "framer-motion";
import { Star, Truck, ShieldCheck } from "lucide-react";

const TrustBadge = () => {
  return (
    <div className="w-full bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={18} 
                  fill="#00b67a" 
                  color="#00b67a" 
                  className="mx-0.5" 
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">
              Excellent sur Trustpilot
            </span>
          </motion.div>

          <div className="flex flex-row items-center space-x-6">
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center"
            >
              <Truck size={18} className="mr-2 text-primary" />
              <span className="text-sm font-medium">LIVRAISON EXPRESS : <span className="font-bold">24 HEURES</span></span>
            </motion.div>
            
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center"
            >
              <ShieldCheck size={18} className="mr-2 text-primary" />
              <span className="text-sm font-medium">PAIEMENT SÉCURISÉ</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
