
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, PlayCircle, Users, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";

const SpotifyServices = () => {
  // Example Spotify services
  const spotifyServices = [
    {
      id: "spotify-followers",
      title: "Abonnés Spotify",
      description: "Augmentez votre nombre d'abonnés et bénéficiez d'une meilleure visibilité sur la plateforme.",
      category: "followers" as const,
      platform: "spotify" as const,
      price: 19.99,
      icon: Users,
      imageUrl: "/placeholder.svg",
      popular: true,
      features: [
        "Abonnés de qualité",
        "Livraison progressive",
        "Répartition naturelle",
        "Support 24/7"
      ],
      deliveryTime: "2-3 jours",
      variants: []
    },
    {
      id: "spotify-plays",
      title: "Écoutes Spotify",
      description: "Augmentez le nombre d'écoutes de vos titres pour améliorer votre classement et votre visibilité.",
      category: "views" as const,
      platform: "spotify" as const,
      price: 24.99,
      icon: PlayCircle,
      imageUrl: "/placeholder.svg",
      popular: true,
      features: [
        "Écoutes organiques",
        "Sources diverses",
        "Augmente votre popularité",
        "Rapport détaillé"
      ],
      deliveryTime: "1-3 jours",
      variants: []
    },
    {
      id: "spotify-likes",
      title: "Likes Spotify",
      description: "Augmentez le nombre de likes sur vos titres pour attirer plus d'auditeurs.",
      category: "likes" as const,
      platform: "spotify" as const,
      price: 14.99,
      icon: Heart,
      imageUrl: "/placeholder.svg",
      popular: false,
      features: [
        "Likes de qualité",
        "Distribution naturelle",
        "Améliore votre algorithme",
        "Garantie de satisfaction"
      ],
      deliveryTime: "24 heures",
      variants: []
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1DB954]/10 mb-4">
            <Music size={32} className="text-[#1DB954]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Boostez votre présence sur Spotify
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Développez votre audience, augmentez vos streams et améliorez votre visibilité avec nos services spécialisés pour Spotify
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {spotifyServices.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link to="/services/platform/spotify">
              Voir tous les services Spotify <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpotifyServices;
