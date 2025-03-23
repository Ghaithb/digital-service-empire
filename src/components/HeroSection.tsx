
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { serviceCategories, socialPlatforms } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const backgrounds = [
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=2070&q=80"
  ];
  
  // Cycle through backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgrounds.length]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images with crossfade transition */}
      <div className="absolute inset-0 w-full h-full">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentBackground === index ? 1 : 0
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block bg-primary/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              Services premium pour réseaux sociaux
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Propulsez votre présence digitale vers de nouveaux <span className="text-primary">sommets</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Boostez votre impact sur les réseaux sociaux avec nos services sur mesure de followers, likes, commentaires et avis authentiques.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button 
              size="lg" 
              className="text-base px-8"
              asChild
            >
              <Link to="/services">
                Découvrir nos services <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link to="/about">
                En savoir plus
              </Link>
            </Button>
          </motion.div>
          
          {/* Platform icons */}
          <motion.div variants={itemVariants}>
            <p className="text-sm text-white/60 mb-3">Plateformes disponibles:</p>
            <div className="flex justify-center space-x-6">
              {socialPlatforms.map((platform) => (
                <Link
                  key={platform.id}
                  to={`/services/platform/${platform.id}`}
                  className="flex flex-col items-center transition-transform hover:scale-110"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: platform.color }}
                  >
                    <platform.icon size={24} color="white" />
                  </div>
                  <span className="text-xs text-white/80">{platform.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#f8fafc" 
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,75C1200,75,1320,53,1380,42.7L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
