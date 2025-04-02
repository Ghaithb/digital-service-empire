
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Search, Filter, Calendar, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated blog posts data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const posts = [
        {
          id: "1",
          title: "Comment augmenter votre engagement sur Instagram en 2023",
          excerpt: "Découvrez les dernières stratégies pour améliorer l'engagement de votre audience sur Instagram et augmenter votre visibilité.",
          date: "12 Juin 2023",
          image: "/placeholder.svg",
          category: "Instagram",
          author: "Sophie Martin"
        },
        {
          id: "2",
          title: "Les tendances TikTok qui cartonnent en ce moment",
          excerpt: "Restez à jour avec les dernières tendances TikTok qui permettent d'augmenter votre portée et d'attirer de nouveaux abonnés.",
          date: "25 Juillet 2023",
          image: "/placeholder.svg",
          category: "TikTok",
          author: "Thomas Dubois"
        },
        {
          id: "3",
          title: "Guide complet pour monétiser votre chaîne YouTube",
          excerpt: "Tout ce que vous devez savoir pour transformer votre chaîne YouTube en source de revenus stable et croissante.",
          date: "8 Août 2023",
          image: "/placeholder.svg",
          category: "YouTube",
          author: "Julie Moreau"
        },
        {
          id: "4",
          title: "Pourquoi acheter des services sociaux est bénéfique pour votre marque",
          excerpt: "Une analyse des avantages de l'achat de services pour les réseaux sociaux et comment cela peut propulser votre marque.",
          date: "19 Septembre 2023",
          image: "/placeholder.svg",
          category: "Marketing",
          author: "Marc Lefebvre"
        },
        {
          id: "5",
          title: "Les meilleurs outils pour analyser vos performances sur les réseaux sociaux",
          excerpt: "Une sélection des outils les plus efficaces pour mesurer et améliorer vos performances sur toutes les plateformes sociales.",
          date: "3 Octobre 2023",
          image: "/placeholder.svg",
          category: "Outils",
          author: "Camille Durand"
        },
        {
          id: "6",
          title: "Comment créer une stratégie de contenu cohérente sur tous vos réseaux",
          excerpt: "Des conseils pratiques pour développer une stratégie de contenu unifiée qui renforce votre identité de marque.",
          date: "15 Octobre 2023",
          image: "/placeholder.svg",
          category: "Stratégie",
          author: "Antoine Laurent"
        }
      ];
      
      setBlogPosts(posts);
      setFilteredPosts(posts);
      setLoading(false);
    }, 800);
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(blogPosts);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = blogPosts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) || 
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery) ||
        post.author.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, blogPosts]);

  const handleDeletePost = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const updatedPosts = blogPosts.filter(post => post.id !== id);
      setBlogPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
      
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès.",
      });
    }, 500);
  };

  const handleEditPost = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/blog/edit/${id}`);
  };

  // Check if the user can create/edit posts (admin or regular user)
  const canManagePosts = isAuthenticated;

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Notre Blog
              </h1>
              <p className="text-muted-foreground">
                Découvrez nos articles sur les réseaux sociaux et le marketing digital
              </p>
            </div>
            
            {canManagePosts && (
              <Button onClick={() => navigate("/blog/new")} className="flex items-center">
                <PlusCircle size={16} className="mr-2" />
                Nouvel article
              </Button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Rechercher un article..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter size={16} className="mr-2" />
              Filtrer
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card border rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-semibold mb-2">Aucun article trouvé</h2>
                  <p className="text-muted-foreground">
                    Essayez avec une autre recherche ou revenez plus tard.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Link 
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="bg-card border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md group"
                    >
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-medium px-2.5 py-0.5 bg-primary/90 text-white rounded-full">
                            {post.category}
                          </span>
                        </div>
                        
                        {(isAdmin || (isAuthenticated && post.author === user?.name)) && (
                          <div className="absolute top-4 right-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                  <span className="sr-only">Actions</span>
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => handleEditPost(post.id, e)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Modifier</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={(e) => handleDeletePost(post.id, e)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Supprimer</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar size={14} className="mr-1" />
                          {post.date}
                        </div>
                        
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="text-sm font-medium">
                          Par {post.author}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Blog;
