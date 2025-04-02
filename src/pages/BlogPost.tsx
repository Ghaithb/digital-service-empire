
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadge from "@/components/TrustBadge";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulated blog posts data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
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
        {
          id: "2",
          title: "Les tendances TikTok qui cartonnent en ce moment",
          content: `
            <p>TikTok continue de dominer le paysage des médias sociaux avec ses tendances virales qui évoluent rapidement. Voici les tendances les plus populaires du moment et comment les intégrer dans votre stratégie.</p>
            
            <h2>Les challenges viraux</h2>
            <p>Les challenges restent un élément central de la culture TikTok. Participer aux challenges populaires ou en créer de nouveaux peut considérablement augmenter votre visibilité sur la plateforme.</p>
            
            <h2>Les transitions créatives</h2>
            <p>Les transitions fluides et innovantes captivent l'attention des utilisateurs. Maîtriser l'art des transitions peut transformer un contenu ordinaire en quelque chose d'extraordinaire.</p>
            
            <h2>L'authenticité avant tout</h2>
            <p>Contrairement à d'autres plateformes, TikTok privilégie l'authenticité à la perfection. Les contenus spontanés et authentiques ont souvent plus de succès que les productions trop léchées.</p>
            
            <h2>Le storytelling en format court</h2>
            <p>Raconter une histoire captivante en quelques secondes est un art que les créateurs les plus populaires de TikTok ont perfectionné. Concentrez-vous sur des récits concis avec un début accrocheur.</p>
            
            <h2>La musique comme élément clé</h2>
            <p>La musique est au cœur de l'expérience TikTok. Rester à l'affût des sons tendance et les intégrer rapidement à votre contenu peut significativement booster votre visibilité.</p>
          `,
          excerpt: "Restez à jour avec les dernières tendances TikTok qui permettent d'augmenter votre portée et d'attirer de nouveaux abonnés.",
          date: "25 Juillet 2023",
          image: "/placeholder.svg",
          category: "TikTok",
          author: "Thomas Dubois"
        },
        {
          id: "3",
          title: "Guide complet pour monétiser votre chaîne YouTube",
          content: `
            <p>Transformer votre passion pour la création de contenu YouTube en source de revenus est un objectif atteignable avec les bonnes stratégies. Découvrez comment monétiser efficacement votre chaîne.</p>
            
            <h2>Le Programme Partenaire YouTube</h2>
            <p>La première étape vers la monétisation est de rejoindre le Programme Partenaire YouTube, qui requiert 1000 abonnés et 4000 heures de visionnage sur 12 mois. Une fois admis, vous pourrez activer les revenus publicitaires.</p>
            
            <h2>Diversifier vos sources de revenus</h2>
            <p>Ne vous limitez pas aux revenus publicitaires. Explorez d'autres options comme le merchandising, les abonnements channel memberships, le Super Chat pendant les diffusions en direct, ou encore YouTube Premium.</p>
            
            <h2>Les partenariats avec les marques</h2>
            <p>Les collaborations avec des marques peuvent être très lucratives. Créez un kit média pour présenter votre chaîne et votre audience à des partenaires potentiels.</p>
            
            <h2>Utiliser les liens d'affiliation</h2>
            <p>Recommander des produits avec des liens d'affiliation dans vos descriptions peut générer des commissions sur les ventes réalisées grâce à vos recommandations.</p>
            
            <h2>Créer des contenus exclusifs sur Patreon</h2>
            <p>Proposer du contenu premium à vos fans les plus fidèles via Patreon ou des plateformes similaires peut constituer une source de revenus stable et prévisible.</p>
          `,
          excerpt: "Tout ce que vous devez savoir pour transformer votre chaîne YouTube en source de revenus stable et croissante.",
          date: "8 Août 2023",
          image: "/placeholder.svg",
          category: "YouTube",
          author: "Julie Moreau"
        },
        {
          id: "4",
          title: "Pourquoi acheter des services sociaux est bénéfique pour votre marque",
          content: `
            <p>L'achat de services pour les réseaux sociaux est souvent mal compris. Analysons objectivement comment ces services peuvent aider à développer votre présence en ligne de manière éthique et efficace.</p>
            
            <h2>Donner un coup de pouce initial</h2>
            <p>Les nouveaux comptes font face à un défi de crédibilité. Acheter certains services peut fournir la base sociale nécessaire pour que votre contenu soit pris au sérieux par de nouveaux visiteurs.</p>
            
            <h2>Améliorer votre visibilité algorithmique</h2>
            <p>Les algorithmes des plateformes sociales favorisent le contenu qui génère déjà de l'engagement. Un boost initial peut aider votre contenu à être présenté à un public plus large de manière organique.</p>
            
            <h2>Économiser du temps et des ressources</h2>
            <p>Bâtir une présence sociale organique demande un temps considérable. Les services sociaux permettent d'accélérer ce processus pour que vous puissiez vous concentrer sur la création de contenu de qualité.</p>
            
            <h2>Choisir des services de qualité</h2>
            <p>Tous les services ne se valent pas. Optez pour des fournisseurs qui offrent des services authentiques et graduels, plutôt que des solutions artificielles qui pourraient nuire à votre compte à long terme.</p>
            
            <h2>Intégrer les services dans une stratégie globale</h2>
            <p>Les services sociaux fonctionnent mieux comme composante d'une stratégie marketing plus large, et non comme solution miracle isolée.</p>
          `,
          excerpt: "Une analyse des avantages de l'achat de services pour les réseaux sociaux et comment cela peut propulser votre marque.",
          date: "19 Septembre 2023",
          image: "/placeholder.svg",
          category: "Marketing",
          author: "Marc Lefebvre"
        },
        {
          id: "5",
          title: "Les meilleurs outils pour analyser vos performances sur les réseaux sociaux",
          content: `
            <p>Mesurer l'efficacité de votre stratégie sociale est essentiel pour l'optimiser. Découvrez les outils les plus performants pour analyser votre présence sur les réseaux sociaux.</p>
            
            <h2>Les outils natifs des plateformes</h2>
            <p>Instagram Insights, Facebook Analytics, Twitter Analytics... Chaque plateforme propose ses propres outils d'analyse, souvent gratuits et très complets pour un usage de base.</p>
            
            <h2>Google Analytics pour le trafic web</h2>
            <p>Pour mesurer l'impact de vos réseaux sociaux sur votre site web, Google Analytics reste incontournable. Configurez des UTM parameters pour suivre précisément les sources de trafic.</p>
            
            <h2>Outils tout-en-un</h2>
            <p>Des solutions comme Hootsuite, Buffer, ou Sprout Social permettent de gérer et d'analyser plusieurs plateformes depuis une interface unique, avec des rapports détaillés et personnalisables.</p>
            
            <h2>Outils spécialisés par plateforme</h2>
            <p>Certains outils se concentrent sur des plateformes spécifiques, comme TubeBuddy pour YouTube ou Planoly pour Instagram, offrant des analyses plus poussées et spécifiques.</p>
            
            <h2>Analyse de la concurrence</h2>
            <p>Des outils comme SEMrush ou BuzzSumo vous permettent d'analyser les performances de vos concurrents et d'identifier des opportunités de contenu.</p>
          `,
          excerpt: "Une sélection des outils les plus efficaces pour mesurer et améliorer vos performances sur toutes les plateformes sociales.",
          date: "3 Octobre 2023",
          image: "/placeholder.svg",
          category: "Outils",
          author: "Camille Durand"
        },
        {
          id: "6",
          title: "Comment créer une stratégie de contenu cohérente sur tous vos réseaux",
          content: `
            <p>Une présence fragmentée sur les réseaux sociaux peut diluer votre message. Voici comment développer une stratégie cohérente tout en adaptant votre contenu à chaque plateforme.</p>
            
            <h2>Définir votre identité de marque</h2>
            <p>Avant de créer du contenu, établissez clairement votre voix, vos valeurs et votre esthétique visuelle. Ces éléments doivent rester cohérents sur toutes les plateformes.</p>
            
            <h2>Comprendre les spécificités de chaque plateforme</h2>
            <p>Chaque réseau social a sa propre culture et ses propres formats. Adaptez votre contenu en conséquence tout en préservant votre message central.</p>
            
            <h2>Créer un calendrier éditorial unifié</h2>
            <p>Planifiez votre contenu sur toutes les plateformes simultanément pour assurer une messagerie cohérente et des publications régulières.</p>
            
            <h2>Recycler votre contenu intelligemment</h2>
            <p>Un même contenu peut être adapté à différentes plateformes. Par exemple, une vidéo YouTube peut être déclinée en extraits pour TikTok, en images pour Instagram et en points clés pour Twitter.</p>
            
            <h2>Maintenir une esthétique visuelle cohérente</h2>
            <p>Utilisez les mêmes palettes de couleurs, polices et éléments visuels sur toutes vos plateformes pour une reconnaissance instantanée de votre marque.</p>
          `,
          excerpt: "Des conseils pratiques pour développer une stratégie de contenu unifiée qui renforce votre identité de marque.",
          date: "15 Octobre 2023",
          image: "/placeholder.svg",
          category: "Stratégie",
          author: "Antoine Laurent"
        }
      ];
      
      const foundPost = blogPosts.find(p => p.id === id);
      setPost(foundPost);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
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

  if (!post) {
    return (
      <div>
        <TrustBadge />
        <Navbar />
        <div className="min-h-screen pt-32 pb-16 container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Article introuvable</h1>
          <p className="text-muted-foreground mb-6">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
          <Button asChild>
            <Link to="/blog">Retour au blog</Link>
          </Button>
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
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft size={16} className="mr-2" /> Retour au blog
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium px-2.5 py-0.5 bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-1" />
                  {post.date}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <span className="font-medium">{post.author}</span>
                </div>
                
                <Button variant="ghost" size="icon" title="Partager">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
            
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default BlogPost;
