import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";

// Simulated blog posts data (in a real app, this would come from an API)
const blogPosts = [
  {
    id: "1",
    title: "Comment augmenter votre engagement sur Instagram en 2023",
    content: `
      <p>L'engagement sur Instagram est devenu un facteur clé pour les marques et les créateurs de contenu. Dans cet article, nous explorons les stratégies les plus efficaces pour augmenter votre engagement en 2023.</p>
      
      <h2>Comprendre l'algorithme d'Instagram</h2>
      <p>L'algorithme d'Instagram favorise le contenu qui génère des interactions rapides et significatives. Pour maximiser votre portée, publiez lorsque votre audience est la plus active et encouragez les interactions dans les premières heures suivant la publication.</p>
      
      <h2>Utiliser les fonctionnalités d'Instagram stratégiquement</h2>
      <p>Instagram propose plusieurs formats de contenu : posts, stories, reels, IGTV. Diversifiez votre approche en utilisant tous ces formats pour toucher différents segments de votre audience.</p>
      
      <h2>Créer du contenu de qualité</h2>
      <p>La qualité prime sur la quantité. Investissez dans de bons visuels, écrivez des légendes captivantes et créez du contenu qui apporte une réelle valeur à votre communauté.</p>
      
      <h2>Interagir avec votre communauté</h2>
      <p>Répondez aux commentaires, participez aux conversations et engagez-vous activement avec votre communauté. L'algorithme d'Instagram récompense les comptes qui entretiennent des relations authentiques avec leur audience.</p>
      
      <h2>Utiliser les hashtags efficacement</h2>
      <p>Les hashtags restent un moyen puissant d'augmenter la visibilité de vos publications. Utilisez un mélange de hashtags populaires et de niche pour maximiser votre portée.</p>
    `,
    excerpt: "Découvrez les dernières stratégies pour améliorer l'engagement de votre audience sur Instagram et augmenter votre visibilité.",
    date: "12 Juin 2023",
    image: "/placeholder.svg",
    category: "Instagram",
    author: "Sophie Martin"
  },
  // ... other posts would be here but are omitted for brevity
];

// Categories for blog posts
const categories = [
  "Instagram", 
  "TikTok", 
  "YouTube", 
  "Marketing", 
  "Outils", 
  "Stratégie",
  "Autre"
];

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Autre");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // For a real app, we would fetch the post data from an API if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simulate API call to get post data
      setTimeout(() => {
        const post = blogPosts.find(p => p.id === id);
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          setExcerpt(post.excerpt);
          setCategory(post.category);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, isEditMode]);

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    // Simulate saving to an API
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Succès",
        description: isEditMode 
          ? "Votre article a été mis à jour avec succès" 
          : "Votre article a été publié avec succès"
      });
      navigate("/blog");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div>
        <TrustBadge />
        <Navbar />
        <div className="min-h-screen flex justify-center items-center pt-32 pb-16">
          <div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate("/blog")} className="flex items-center">
              <ArrowLeft size={16} className="mr-2" /> Retour au blog
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">
              {isEditMode ? "Modifier l'article" : "Nouvel article"}
            </h1>
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center">
              {isSaving ? (
                <div className="animate-spin w-4 h-4 border-t-2 border-current rounded-full mr-2"></div>
              ) : (
                <Save size={16} className="mr-2" />
              )}
              {isEditMode ? "Mettre à jour" : "Publier"}
            </Button>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Titre de l'article" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Extrait</Label>
              <Textarea 
                id="excerpt" 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)} 
                placeholder="Un bref résumé de l'article" 
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Contenu</Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Contenu de l'article (supporte le HTML)" 
                rows={15}
                className="font-mono text-sm"
              />
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Auteur: <strong>{user?.name || "Utilisateur"}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Date: <strong>{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default BlogEditor;
