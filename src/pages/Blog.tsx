
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Comment augmenter votre engagement sur Instagram en 2023",
      excerpt: "Découvrez les dernières stratégies pour améliorer l'engagement de votre audience sur Instagram et augmenter votre visibilité.",
      date: "12 Juin 2023",
      image: "/placeholder.svg",
      category: "Instagram"
    },
    {
      id: 2,
      title: "Les tendances TikTok qui cartonnent en ce moment",
      excerpt: "Restez à jour avec les dernières tendances TikTok qui permettent d'augmenter votre portée et d'attirer de nouveaux abonnés.",
      date: "25 Juillet 2023",
      image: "/placeholder.svg",
      category: "TikTok"
    },
    {
      id: 3,
      title: "Guide complet pour monétiser votre chaîne YouTube",
      excerpt: "Tout ce que vous devez savoir pour transformer votre chaîne YouTube en source de revenus stable et croissante.",
      date: "8 Août 2023",
      image: "/placeholder.svg",
      category: "YouTube"
    },
    {
      id: 4,
      title: "Pourquoi acheter des services sociaux est bénéfique pour votre marque",
      excerpt: "Une analyse des avantages de l'achat de services pour les réseaux sociaux et comment cela peut propulser votre marque.",
      date: "19 Septembre 2023",
      image: "/placeholder.svg",
      category: "Marketing"
    },
    {
      id: 5,
      title: "Les meilleurs outils pour analyser vos performances sur les réseaux sociaux",
      excerpt: "Une sélection des outils les plus efficaces pour mesurer et améliorer vos performances sur toutes les plateformes sociales.",
      date: "3 Octobre 2023",
      image: "/placeholder.svg",
      category: "Outils"
    },
    {
      id: 6,
      title: "Comment créer une stratégie de contenu cohérente sur tous vos réseaux",
      excerpt: "Des conseils pratiques pour développer une stratégie de contenu unifiée qui renforce votre identité de marque.",
      date: "15 Octobre 2023",
      image: "/placeholder.svg",
      category: "Stratégie"
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
              Notre Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos derniers articles, conseils et astuces pour développer votre présence sur les réseaux sociaux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm"
              >
                <div className="aspect-video bg-muted">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center ml-3 text-xs text-muted-foreground">
                      <Calendar size={12} className="mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="inline-flex items-center text-primary font-medium text-sm"
                  >
                    Lire la suite <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Blog;
