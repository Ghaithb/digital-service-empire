
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedServices from "@/components/FeaturedServices";
import TestimonialSection from "@/components/TestimonialSection";
import { serviceCategories } from "@/lib/data";
import { ArrowRight, Sparkles, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Scroll to top on page load
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
      
      <main>
        <HeroSection />
        
        {/* Features section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi choisir nos services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous fournissons des services de qualité qui vous aident à développer votre présence en ligne efficacement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Livraison rapide",
                  description: "Tous nos services sont livrés dans les délais promis, souvent en quelques heures.",
                  icon: Clock,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Qualité premium",
                  description: "Nous fournissons uniquement des services de haute qualité pour des résultats authentiques.",
                  icon: Award,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  title: "Sécurité garantie",
                  description: "Vos comptes sont en sécurité avec nos méthodes conformes aux directives des plateformes.",
                  icon: Shield,
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Support 24/7",
                  description: "Notre équipe est disponible à tout moment pour répondre à vos questions.",
                  icon: Sparkles,
                  color: "bg-amber-100 text-amber-600",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="text-center p-6 rounded-xl bg-card hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-medium text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedServices />
        
        {/* Categories section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explorez nos catégories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre gamme complète de services pour tous les réseaux sociaux.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link 
                    to={`/services/category/${category.id}`} 
                    className="block h-full neo p-6 rounded-xl transition-all duration-300"
                  >
                    <div className="mb-4">
                      <category.icon size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="text-primary flex items-center text-sm font-medium">
                      Découvrir <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <TestimonialSection />
        
        {/* CTA section */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à propulser votre présence sur les réseaux sociaux ?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Rejoignez des milliers de créateurs de contenu qui font confiance à nos services pour développer leur audience et augmenter leur engagement.
              </p>
              <Button size="lg" asChild>
                <Link to="/services">
                  Commencer maintenant <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
