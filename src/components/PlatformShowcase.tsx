
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Music, 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter,
  Twitch,
  ThumbsUp,
  User,
  Heart,
  MessageCircle,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PlatformShowcase = () => {
  const platforms = [
    {
      id: "tiktok",
      name: "TikTok",
      icon: "/lovable-uploads/1846590a-0a6d-4fba-8291-ad537cf90948.png",
      color: "#000000",
      url: "/services/platform/tiktok"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "/lovable-uploads/09a5631b-7741-40bd-a561-26b2e307778b.png",
      color: "#E1306C",
      url: "/services/platform/instagram"
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "/lovable-uploads/2db9a18a-175a-4397-8315-948251425a1c.png",
      color: "#1877F2",
      url: "/services/platform/facebook"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: User,
      color: "#FF0000",
      url: "/services/platform/youtube"
    },
    {
      id: "twitter",
      name: "X / Twitter",
      icon: Twitter,
      color: "#000000",
      url: "/services/platform/twitter"
    },
    {
      id: "spotify",
      name: "Spotify",
      icon: Music,
      color: "#1DB954",
      url: "/services/platform/spotify"
    }
  ];

  const serviceTypes = [
    {
      id: "followers",
      name: "Abonnés",
      icon: User,
      color: "#E1306C",
      platform: "tiktok"
    },
    {
      id: "likes",
      name: "Likes",
      icon: Heart,
      color: "#E1306C",
      platform: "tiktok"
    },
    {
      id: "views",
      name: "Vues",
      icon: ThumbsUp,
      color: "#E1306C",
      platform: "tiktok"
    },
    {
      id: "shares",
      name: "Partages",
      icon: Share,
      color: "#E1306C",
      platform: "tiktok"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous avez le choix
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous proposons des services pour toutes les plateformes populaires
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col items-center"
            >
              <Link to={platform.url} className="w-full">
                <div className="bg-secondary/30 p-4 rounded-xl flex flex-col items-center transition-all hover:shadow-md">
                  {typeof platform.icon === "string" ? (
                    <img 
                      src={platform.icon} 
                      alt={platform.name} 
                      className="w-16 h-16 object-contain mb-3" 
                    />
                  ) : (
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: platform.color }}
                    >
                      <platform.icon size={30} color="white" />
                    </div>
                  )}
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="bg-secondary/20 p-6 rounded-xl mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold">ÉLIGIBLE MONÉTISATION TIKTOK (10K MINIMUM)</h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {serviceTypes.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <Link to={`/services/category/${service.id}`} className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-red-500 rounded-lg shadow-md flex items-center justify-center">
                      <service.icon size={40} color="white" />
                    </div>
                  </div>
                  <h4 className="font-medium text-lg">{service.name} TIKTOK</h4>
                  <div className="mt-2 flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          className="w-4 h-4 text-yellow-400 fill-current" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-primary font-medium">À partir de 3,00€</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link to="/services">
              Voir tous nos services
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
