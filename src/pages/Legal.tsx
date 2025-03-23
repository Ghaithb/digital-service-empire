
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyTermsSection from "@/components/PrivacyTermsSection";

const Legal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Mentions légales et CGV
          </h1>
          
          <PrivacyTermsSection />
          
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-4">Coordonnées</h2>
            <p className="text-muted-foreground mb-8">
              [Nom de votre entreprise]<br />
              Adresse: [Votre adresse]<br />
              Email: contact@votredomaine.com<br />
              Numéro de téléphone: [Votre numéro]<br />
              SIRET: [Votre numéro SIRET]<br />
              Directeur de la publication: [Nom du directeur]
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Hébergement</h2>
            <p className="text-muted-foreground mb-8">
              Ce site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur].
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Propriété intellectuelle</h2>
            <p className="text-muted-foreground">
              L'ensemble du contenu de ce site (textes, images, logos, etc.) est protégé par les 
              droits d'auteur. Toute reproduction, même partielle, est interdite sans autorisation 
              préalable.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Legal;
