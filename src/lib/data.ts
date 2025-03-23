
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Heart, 
  MessageCircle, 
  User, 
  ThumbsUp, 
  Star, 
  Eye, 
  TrendingUp,
  Share,
} from "lucide-react";

export type ServiceCategory = 'followers' | 'likes' | 'comments' | 'reviews';
export type SocialPlatform = 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'tiktok';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  platform: SocialPlatform;
  price: number;
  icon: React.ElementType;
  imageUrl: string;
  popular: boolean;
  features: string[];
  deliveryTime: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
  total: number;
}

export const socialPlatforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#E1306C',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: '#1DA1F2',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
  },
];

export const serviceCategories = [
  {
    id: 'followers',
    name: 'Followers',
    icon: User,
    description: 'Augmentez votre audience et votre crédibilité avec des followers de qualité.',
  },
  {
    id: 'likes',
    name: 'Likes',
    icon: Heart,
    description: 'Boostez l\'engagement sur vos publications avec des likes authentiques.',
  },
  {
    id: 'comments',
    name: 'Commentaires',
    icon: MessageCircle,
    description: 'Générez des conversations autour de votre contenu avec des commentaires pertinents.',
  },
  {
    id: 'reviews',
    name: 'Avis',
    icon: Star,
    description: 'Améliorez votre réputation avec des avis positifs et détaillés.',
  },
];

export const services: Service[] = [
  {
    id: 'instagram-followers-1000',
    title: '1000 Followers Instagram',
    description: 'Augmentez votre audience Instagram avec 1000 followers de haute qualité qui s\'ajoutent progressivement à votre compte pour un résultat naturel.',
    category: 'followers',
    platform: 'instagram',
    price: 19.99,
    icon: User,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Followers de haute qualité',
      'Livraison progressive',
      'Sans risque pour votre compte',
      'Support client 24/7',
    ],
    deliveryTime: '1-3 jours',
  },
  {
    id: 'facebook-likes-500',
    title: '500 Likes Facebook',
    description: 'Boostez l\'engagement sur vos publications Facebook avec 500 likes qui attireront plus d\'attention à votre contenu.',
    category: 'likes',
    platform: 'facebook',
    price: 14.99,
    icon: Heart,
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      'Likes de comptes réels',
      'Répartition naturelle',
      '100% satisfaction garantie',
      'Support client réactif',
    ],
    deliveryTime: '24 heures',
  },
  {
    id: 'instagram-comments-100',
    title: '100 Commentaires Instagram',
    description: 'Enrichissez vos publications avec 100 commentaires personnalisables qui stimuleront les conversations autour de votre contenu.',
    category: 'comments',
    platform: 'instagram',
    price: 29.99,
    icon: MessageCircle,
    imageUrl: 'https://images.unsplash.com/photo-1586169047642-f01056af8bc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Commentaires personnalisables',
      'Différentes longueurs disponibles',
      'Émojis inclus',
      'Service discret',
    ],
    deliveryTime: '2-4 jours',
  },
  {
    id: 'youtube-reviews-50',
    title: '50 Avis YouTube',
    description: 'Renforcez la crédibilité de votre chaîne YouTube avec 50 avis positifs qui mettront en valeur votre contenu.',
    category: 'reviews',
    platform: 'youtube',
    price: 39.99,
    icon: Star,
    imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      'Avis 5 étoiles',
      'Textes détaillés',
      'Comptes vérifiés',
      'Garantie de non-suppression',
    ],
    deliveryTime: '3-5 jours',
  },
  {
    id: 'twitter-followers-2000',
    title: '2000 Followers Twitter',
    description: 'Développez votre réseau Twitter avec 2000 followers qui augmenteront votre influence et votre portée.',
    category: 'followers',
    platform: 'twitter',
    price: 24.99,
    icon: User,
    imageUrl: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Followers internationaux',
      'Profils avec avatar',
      'Processus sécurisé',
      'Rapport de livraison',
    ],
    deliveryTime: '2-3 jours',
  },
  {
    id: 'youtube-views-5000',
    title: '5000 Vues YouTube',
    description: 'Augmentez la visibilité de vos vidéos avec 5000 vues qui amélioreront votre classement dans les résultats de recherche.',
    category: 'likes',
    platform: 'youtube',
    price: 49.99,
    icon: Eye,
    imageUrl: 'https://images.unsplash.com/photo-1602526429747-ac387a91d43b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Vues de haute rétention',
      'Sources diversifiées',
      'Compatible monétisation',
      'Suivi en temps réel',
    ],
    deliveryTime: '3-7 jours',
  },
  {
    id: 'facebook-shares-300',
    title: '300 Partages Facebook',
    description: 'Élargissez la portée de vos publications Facebook avec 300 partages qui augmenteront votre visibilité de manière exponentielle.',
    category: 'likes',
    platform: 'facebook',
    price: 34.99,
    icon: Share,
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      'Partages organiques',
      'Visibilité accrue',
      'Effet viral',
      'Analytics inclus',
    ],
    deliveryTime: '2-4 jours',
  },
  {
    id: 'instagram-story-views-1000',
    title: '1000 Vues Stories Instagram',
    description: 'Stimulez l\'engagement sur vos stories Instagram avec 1000 vues qui renforceront votre position dans l\'algorithme.',
    category: 'likes',
    platform: 'instagram',
    price: 9.99,
    icon: Eye,
    imageUrl: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      'Vues instantanées',
      'Comptes de qualité',
      'Augmentation du taux d\'engagement',
      'Service discret',
    ],
    deliveryTime: '12 heures',
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Sophie Martin',
    role: 'Influenceuse Mode',
    comment: 'Les services ont transformé ma présence sur Instagram. J\'ai vu mon engagement augmenter de 200% en un mois seulement. Je recommande vivement!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    role: 'YouTuber Tech',
    comment: 'Impressionné par la qualité et la rapidité du service. Mes vidéos sont maintenant recommandées à un public beaucoup plus large.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Leroy',
    role: 'Artiste',
    comment: 'J\'étais sceptique au début, mais les résultats sont indéniables. Mon audience a grandi de manière organique après avoir utilisé ces services.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4,
  },
];

// Helper functions
export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: ServiceCategory): Service[] => {
  return services.filter(service => service.category === category);
};

export const getServicesByPlatform = (platform: SocialPlatform): Service[] => {
  return services.filter(service => service.platform === platform);
};

export const getPopularServices = (): Service[] => {
  return services.filter(service => service.popular);
};
