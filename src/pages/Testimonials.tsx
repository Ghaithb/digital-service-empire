
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Star } from "lucide-react";

const Testimonials = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sophie Laurent",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "Service de qualité supérieure ! Les abonnés Instagram que j'ai reçus sont réels et engagés. Ma communauté a beaucoup grandi grâce à DigiBoost.",
      date: "15 Mai 2023",
      platform: "Instagram"
    },
    {
      id: 2,
      name: "Thomas Dubois",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "Très satisfait des services TikTok. La livraison a été rapide et j'ai vu une amélioration significative de la portée de mes vidéos.",
      date: "2 Juin 2023",
      platform: "TikTok"
    },
    {
      id: 3,
      name: "Julie Moreau",
      avatar: "/placeholder.svg",
      rating: 4,
      text: "Service client exceptionnel ! J'ai eu un petit problème avec ma commande et l'équipe a été très réactive et professionnelle.",
      date: "18 Juillet 2023",
      platform: "Spotify"
    },
    {
      id: 4,
      name: "Alexandre Martin",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "J'utilise DigiBoost depuis plus d'un an pour tous mes réseaux sociaux. Résultats constants et service fiable.",
      date: "29 Août 2023",
      platform: "Instagram, Youtube"
    },
    {
      id: 5,
      name: "Camille Bernard",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "Les services de DigiBoost ont été essentiels pour le lancement de ma marque. Les likes et abonnés ont donné à mon compte la crédibilité dont j'avais besoin.",
      date: "10 Septembre 2023",
      platform: "Facebook"
    },
    {
      id: 6,
      name: "Nicolas Petit",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "Incroyable rapport qualité-prix. J'ai testé plusieurs fournisseurs et DigiBoost est de loin le meilleur.",
      date: "5 Octobre 2023",
      platform: "Youtube"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TrustBadge />
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ce que nos clients disent de nous
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits qui ont utilisé nos services pour développer leur présence sur les réseaux sociaux.
            </p>
            
            <div className="flex justify-center items-center mt-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={24} 
                    fill="#00b67a" 
                    color="#00b67a" 
                    className="mx-1" 
                  />
                ))}
              </div>
              <span className="ml-3 font-medium">
                Note moyenne de 4.9/5 basée sur 856 avis
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.platform}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < testimonial.rating ? "#00b67a" : "#e4e5e7"} 
                          color={i < testimonial.rating ? "#00b67a" : "#e4e5e7"} 
                          className="mr-0.5" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{testimonial.text}</p>
                <p className="text-xs text-muted-foreground">{testimonial.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Testimonials;
