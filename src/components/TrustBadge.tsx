
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TrustBadge = () => {
  return (
    <div className="w-full bg-primary/5 py-3">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
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
        </div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <span className="text-sm font-medium mr-2">LIVRAISON EXPRESS :</span>
          <span className="text-sm font-bold">24 HEURES</span>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBadge;
