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
  Bookmark,
  Hash,
  UserCheck,
  Globe,
  Bot,
  MessageSquare,
  BarChart,
  Zap,
  Award
} from "lucide-react";

export type ServiceCategory = 'followers' | 'likes' | 'comments' | 'views' | 'shares' | 'reviews' | 'custom' | 'premium';
export type SocialPlatform = 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'tiktok' | 'snapchat' | 'linkedin';
export type ServiceType = 'real' | 'automated' | 'instant' | 'progressive' | 'targeted' | 'random';

export interface ServiceVariant {
  id: string;
  title: string;
  description: string;
  type: ServiceType;
  price: number;
  value: number; // Quantity (e.g., 500 followers)
  popular?: boolean;
}

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
  variants?: ServiceVariant[];
}

export interface CartItem {
  service: Service;
  quantity: number;
  total: number;
  variant?: ServiceVariant;
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
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: TrendingUp,
    color: '#000000',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    icon: MessageSquare,
    color: '#FFFC00',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Globe,
    color: '#0077B5',
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
    id: 'views',
    name: 'Vues',
    icon: Eye,
    description: 'Augmentez la visibilité de vos vidéos et stories avec des vues de qualité.',
  },
  {
    id: 'shares',
    name: 'Partages',
    icon: Share,
    description: 'Étendez votre portée avec des partages qui multiplient votre visibilité.',
  },
  {
    id: 'reviews',
    name: 'Avis',
    icon: Star,
    description: 'Améliorez votre réputation avec des avis positifs et détaillés.',
  },
  {
    id: 'custom',
    name: 'Packs personnalisés',
    icon: BarChart,
    description: 'Solutions complètes combinant plusieurs services pour un impact maximal.',
  },
  {
    id: 'premium',
    name: 'Services premium',
    icon: Award,
    description: 'Services haut de gamme avec ciblage avancé et résultats supérieurs.',
  },
];

export const serviceTypes = [
  {
    id: 'real',
    name: 'Réel',
    description: 'Interactions de vrais utilisateurs actifs',
    icon: UserCheck,
  },
  {
    id: 'automated',
    name: 'Automatisé',
    description: 'Interactions générées automatiquement',
    icon: Bot,
  },
  {
    id: 'instant',
    name: 'Instantané',
    description: 'Livraison immédiate pour des résultats rapides',
    icon: Zap,
  },
  {
    id: 'progressive',
    name: 'Progressif',
    description: 'Livraison graduelle pour un effet naturel',
    icon: TrendingUp,
  },
  {
    id: 'targeted',
    name: 'Ciblé',
    description: 'Interactions ciblées par région ou intérêt',
    icon: Hash,
  },
  {
    id: 'random',
    name: 'Aléatoire',
    description: 'Interactions génériques sans ciblage spécifique',
    icon: Globe,
  },
];

export const services: Service[] = [
  {
    id: 'instagram-followers',
    title: 'Followers Instagram',
    description: 'Augmentez votre audience Instagram avec des followers de haute qualité qui s\'ajoutent progressivement à votre compte pour un résultat naturel.',
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
    variants: [
      {
        id: 'instagram-followers-500-real',
        title: '500 Followers Réels',
        description: 'Followers réels avec profils actifs et avatars',
        type: 'real',
        price: 24.99,
        value: 500,
        popular: true,
      },
      {
        id: 'instagram-followers-1000-real',
        title: '1000 Followers Réels',
        description: 'Followers réels avec profils actifs et avatars',
        type: 'real',
        price: 39.99,
        value: 1000,
      },
      {
        id: 'instagram-followers-500-auto',
        title: '500 Followers Automatisés',
        description: 'Followers automatisés livrés rapidement',
        type: 'automated',
        price: 14.99,
        value: 500,
      },
      {
        id: 'instagram-followers-1000-auto',
        title: '1000 Followers Automatisés',
        description: 'Followers automatisés livrés rapidement',
        type: 'automated',
        price: 24.99,
        value: 1000,
      },
      {
        id: 'instagram-followers-2000-auto',
        title: '2000 Followers Automatisés',
        description: 'Followers automatisés livrés rapidement',
        type: 'automated',
        price: 39.99,
        value: 2000,
      },
    ],
  },
  {
    id: 'tiktok-followers',
    title: 'Abonnés TikTok',
    description: 'Développez votre communauté TikTok avec des abonnés engagés qui augmenteront votre visibilité sur la plateforme.',
    category: 'followers',
    platform: 'tiktok',
    price: 22.99,
    icon: User,
    imageUrl: 'https://images.unsplash.com/photo-1596338201829-1614b0585fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Abonnés de qualité',
      'Augmentation de l\'algorithme',
      'Processus sécurisé',
      'Garantie de satisfaction',
    ],
    deliveryTime: '2-4 jours',
    variants: [
      {
        id: 'tiktok-followers-500-auto',
        title: '500 Abonnés Automatisés',
        description: 'Abonnés automatisés pour augmenter rapidement vos chiffres',
        type: 'automated',
        price: 16.99,
        value: 500,
      },
      {
        id: 'tiktok-followers-1000-auto',
        title: '1000 Abonnés Automatisés',
        description: 'Abonnés automatisés pour augmenter rapidement vos chiffres',
        type: 'automated',
        price: 29.99,
        value: 1000,
        popular: true,
      },
      {
        id: 'tiktok-followers-500-real',
        title: '500 Abonnés Réels',
        description: 'Abonnés réels avec comptes actifs pour plus d\'engagement',
        type: 'real',
        price: 29.99,
        value: 500,
      },
      {
        id: 'tiktok-followers-1000-real',
        title: '1000 Abonnés Réels',
        description: 'Abonnés réels avec comptes actifs pour plus d\'engagement',
        type: 'real',
        price: 49.99,
        value: 1000,
      },
    ],
  },
  {
    id: 'twitter-followers',
    title: 'Followers Twitter/X',
    description: 'Développez votre réseau Twitter avec des followers qui augmenteront votre influence et votre portée.',
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
    variants: [
      {
        id: 'twitter-followers-200-real',
        title: '200 Followers Réels',
        description: 'Followers réels avec profils complets et activité',
        type: 'real',
        price: 19.99,
        value: 200,
        popular: true,
      },
      {
        id: 'twitter-followers-500-real',
        title: '500 Followers Réels',
        description: 'Followers réels avec profils complets et activité',
        type: 'real',
        price: 39.99,
        value: 500,
      },
      {
        id: 'twitter-followers-200-auto',
        title: '200 Followers Automatisés',
        description: 'Followers automatisés pour augmentation rapide',
        type: 'automated',
        price: 12.99,
        value: 200,
      },
      {
        id: 'twitter-followers-500-auto',
        title: '500 Followers Automatisés',
        description: 'Followers automatisés pour augmentation rapide',
        type: 'automated',
        price: 24.99,
        value: 500,
      },
    ],
  },
  {
    id: 'instagram-likes',
    title: 'Likes Instagram',
    description: 'Boostez l\'engagement sur vos publications Instagram avec des likes qui attireront plus d\'attention à votre contenu.',
    category: 'likes',
    platform: 'instagram',
    price: 14.99,
    icon: Heart,
    imageUrl: 'https://images.unsplash.com/photo-1585247226801-bc613c441316?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Likes de comptes réels',
      'Répartition naturelle',
      '100% satisfaction garantie',
      'Support client réactif',
    ],
    deliveryTime: '24 heures',
    variants: [
      {
        id: 'instagram-likes-100-instant',
        title: '100 Likes Instantanés',
        description: 'Likes livrés immédiatement après commande',
        type: 'instant',
        price: 5.99,
        value: 100,
        popular: true,
      },
      {
        id: 'instagram-likes-250-instant',
        title: '250 Likes Instantanés',
        description: 'Likes livrés immédiatement après commande',
        type: 'instant',
        price: 9.99,
        value: 250,
      },
      {
        id: 'instagram-likes-500-instant',
        title: '500 Likes Instantanés',
        description: 'Likes livrés immédiatement après commande',
        type: 'instant',
        price: 14.99,
        value: 500,
      },
      {
        id: 'instagram-likes-100-progressive',
        title: '100 Likes Progressifs',
        description: 'Likes ajoutés progressivement pour un effet naturel',
        type: 'progressive',
        price: 7.99,
        value: 100,
      },
      {
        id: 'instagram-likes-250-progressive',
        title: '250 Likes Progressifs',
        description: 'Likes ajoutés progressivement pour un effet naturel',
        type: 'progressive',
        price: 12.99,
        value: 250,
      },
    ],
  },
  {
    id: 'facebook-likes',
    title: 'J\'aime Facebook',
    description: 'Boostez l\'engagement sur vos publications Facebook avec des j\'aime qui attireront plus d\'attention à votre contenu.',
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
    variants: [
      {
        id: 'facebook-likes-50-real',
        title: '50 J\'aime Réels',
        description: 'J\'aime provenant de comptes Facebook réels',
        type: 'real',
        price: 9.99,
        value: 50,
        popular: true,
      },
      {
        id: 'facebook-likes-100-real',
        title: '100 J\'aime Réels',
        description: 'J\'aime provenant de comptes Facebook réels',
        type: 'real',
        price: 14.99,
        value: 100,
      },
      {
        id: 'facebook-likes-50-auto',
        title: '50 J\'aime Automatisés',
        description: 'J\'aime générés automatiquement',
        type: 'automated',
        price: 4.99,
        value: 50,
      },
      {
        id: 'facebook-likes-100-auto',
        title: '100 J\'aime Automatisés',
        description: 'J\'aime générés automatiquement',
        type: 'automated',
        price: 7.99,
        value: 100,
      },
    ],
  },
  {
    id: 'instagram-comments',
    title: 'Commentaires Instagram',
    description: 'Enrichissez vos publications avec des commentaires personnalisables qui stimuleront les conversations autour de votre contenu.',
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
    variants: [
      {
        id: 'instagram-comments-10-custom',
        title: '10 Commentaires Personnalisés',
        description: 'Commentaires fournis par vous pour un contenu sur mesure',
        type: 'targeted',
        price: 19.99,
        value: 10,
        popular: true,
      },
      {
        id: 'instagram-comments-20-custom',
        title: '20 Commentaires Personnalisés',
        description: 'Commentaires fournis par vous pour un contenu sur mesure',
        type: 'targeted',
        price: 34.99,
        value: 20,
      },
      {
        id: 'instagram-comments-10-random',
        title: '10 Commentaires Génériques',
        description: 'Commentaires positifs génériques avec émojis',
        type: 'random',
        price: 9.99,
        value: 10,
      },
      {
        id: 'instagram-comments-20-random',
        title: '20 Commentaires Génériques',
        description: 'Commentaires positifs génériques avec émojis',
        type: 'random',
        price: 16.99,
        value: 20,
      },
    ],
  },
  {
    id: 'youtube-views',
    title: 'Vues YouTube',
    description: 'Augmentez la visibilité de vos vidéos avec des vues qui amélioreront votre classement dans les résultats de recherche.',
    category: 'views',
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
    variants: [
      {
        id: 'youtube-views-1000-retention',
        title: '1000 Vues Haute Rétention',
        description: 'Vues avec un taux de rétention élevé (70%+)',
        type: 'real',
        price: 29.99,
        value: 1000,
        popular: true,
      },
      {
        id: 'youtube-views-2000-retention',
        title: '2000 Vues Haute Rétention',
        description: 'Vues avec un taux de rétention élevé (70%+)',
        type: 'real',
        price: 49.99,
        value: 2000,
      },
      {
        id: 'youtube-views-5000-retention',
        title: '5000 Vues Haute Rétention',
        description: 'Vues avec un taux de rétention élevé (70%+)',
        type: 'real',
        price: 99.99,
        value: 5000,
      },
      {
        id: 'youtube-views-2000-standard',
        title: '2000 Vues Standard',
        description: 'Vues standard pour augmenter votre compteur',
        type: 'automated',
        price: 19.99,
        value: 2000,
      },
      {
        id: 'youtube-views-5000-standard',
        title: '5000 Vues Standard',
        description: 'Vues standard pour augmenter votre compteur',
        type: 'automated',
        price: 39.99,
        value: 5000,
      },
    ],
  },
  {
    id: 'tiktok-views',
    title: 'Vues TikTok',
    description: 'Augmentez la visibilité de vos vidéos TikTok avec des vues qui amélioreront votre position dans l\'algorithme.',
    category: 'views',
    platform: 'tiktok',
    price: 24.99,
    icon: Eye,
    imageUrl: 'https://images.unsplash.com/photo-1596638787647-904d822d751e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Vues réelles',
      'Amélioration de l\'algorithme',
      'Compatible avec toutes les vidéos',
      'Livraison rapide',
    ],
    deliveryTime: '1-2 jours',
    variants: [
      {
        id: 'tiktok-views-1000-fast',
        title: '1000 Vues Rapides',
        description: 'Vues livrées rapidement pour un boost immédiat',
        type: 'instant',
        price: 9.99,
        value: 1000,
        popular: true,
      },
      {
        id: 'tiktok-views-5000-fast',
        title: '5000 Vues Rapides',
        description: 'Vues livrées rapidement pour un boost immédiat',
        type: 'instant',
        price: 24.99,
        value: 5000,
      },
      {
        id: 'tiktok-views-10000-fast',
        title: '10000 Vues Rapides',
        description: 'Vues livrées rapidement pour un boost immédiat',
        type: 'instant',
        price: 39.99,
        value: 10000,
      },
    ],
  },
  {
    id: 'facebook-shares',
    title: 'Partages Facebook',
    description: 'Élargissez la portée de vos publications Facebook avec des partages qui augmenteront votre visibilité de manière exponentielle.',
    category: 'shares',
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
    variants: [
      {
        id: 'facebook-shares-50-real',
        title: '50 Partages Réels',
        description: 'Partages par des comptes réels pour une meilleure visibilité',
        type: 'real',
        price: 19.99,
        value: 50,
        popular: true,
      },
      {
        id: 'facebook-shares-100-real',
        title: '100 Partages Réels',
        description: 'Partages par des comptes réels pour une meilleure visibilité',
        type: 'real',
        price: 34.99,
        value: 100,
      },
      {
        id: 'facebook-shares-50-auto',
        title: '50 Partages Automatisés',
        description: 'Partages automatisés pour augmenter votre compteur',
        type: 'automated',
        price: 14.99,
        value: 50,
      },
      {
        id: 'facebook-shares-100-auto',
        title: '100 Partages Automatisés',
        description: 'Partages automatisés pour augmenter votre compteur',
        type: 'automated',
        price: 24.99,
        value: 100,
      },
    ],
  },
  {
    id: 'twitter-retweets',
    title: 'Retweets Twitter/X',
    description: 'Amplifiez la portée de vos tweets avec des retweets qui augmenteront votre visibilité et votre influence.',
    category: 'shares',
    platform: 'twitter',
    price: 29.99,
    icon: Share,
    imageUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      'Retweets de qualité',
      'Comptes avec suiveurs',
      'Effet boule de neige',
      'Rapport détaillé',
    ],
    deliveryTime: '1-3 jours',
    variants: [
      {
        id: 'twitter-retweets-100-standard',
        title: '100 Retweets Standard',
        description: 'Retweets basiques pour augmenter votre visibilité',
        type: 'automated',
        price: 19.99,
        value: 100,
        popular: true,
      },
      {
        id: 'twitter-retweets-200-standard',
        title: '200 Retweets Standard',
        description: 'Retweets basiques pour augmenter votre visibilité',
        type: 'automated',
        price: 29.99,
        value: 200,
      },
      {
        id: 'twitter-retweets-100-premium',
        title: '100 Retweets Premium',
        description: 'Retweets par des comptes de qualité avec followers',
        type: 'real',
        price: 39.99,
        value: 100,
      },
    ],
  },
  {
    id: 'youtube-reviews',
    title: 'Avis YouTube',
    description: 'Renforcez la crédibilité de votre chaîne YouTube avec des avis positifs qui mettront en valeur votre contenu.',
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
    variants: [
      {
        id: 'youtube-reviews-5-custom',
        title: '5 Avis Personnalisés',
        description: 'Avis avec texte fourni par vous pour un contenu sur mesure',
        type: 'targeted',
        price: 29.99,
        value: 5,
        popular: true,
      },
      {
        id: 'youtube-reviews-10-custom',
        title: '10 Avis Personnalisés',
        description: 'Avis avec texte fourni par vous pour un contenu sur mesure',
        type: 'targeted',
        price: 49.99,
        value: 10,
      },
      {
        id: 'youtube-reviews-5-generic',
        title: '5 Avis Génériques',
        description: 'Avis positifs génériques adaptés à votre contenu',
        type: 'random',
        price: 19.99,
        value: 5,
      },
      {
        id: 'youtube-reviews-10-generic',
        title: '10 Avis Génériques',
        description: 'Avis positifs génériques adaptés à votre contenu',
        type: 'random',
        price: 34.99,
        value: 10,
      },
    ],
  },
  {
    id: 'facebook-reviews',
    title: 'Avis Facebook',
    description: 'Améliorez la réputation de votre page Facebook avec des avis positifs qui renforceront la confiance des visiteurs.',
    category: 'reviews',
    platform: 'facebook',
    price: 49.99,
    icon: Star,
    imageUrl: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      '5 étoiles garanties',
      'Textes variés et naturels',
      'Comptes avec photos',
      'Support prioritaire',
    ],
    deliveryTime: '4-7 jours',
    variants: [
      {
        id: 'facebook-reviews-5-star',
        title: '5 Avis 5 Étoiles',
        description: 'Avis positifs avec notes maximales',
        type: 'real',
        price: 29.99,
        value: 5,
        popular: true,
      },
      {
        id: 'facebook-reviews-10-star',
        title: '10 Avis 5 Étoiles',
        description: 'Avis positifs avec notes maximales',
        type: 'real',
        price: 49.99,
        value: 10,
      },
      {
        id: 'facebook-reviews-5-custom',
        title: '5 Avis Personnalisés',
        description: 'Avis avec texte fourni par vous pour un impact maximal',
        type: 'targeted',
        price: 39.99,
        value: 5,
      },
      {
        id: 'facebook-reviews-10-custom',
        title: '10 Avis Personnalisés',
        description: 'Avis avec texte fourni par vous pour un impact maximal',
        type: 'targeted',
        price: 69.99,
        value: 10,
      },
    ],
  },
  {
    id: 'instagram-package',
    title: 'Pack Instagram Complet',
    description: 'Solution complète pour booster votre présence Instagram avec un ensemble de services complémentaires.',
    category: 'custom',
    platform: 'instagram',
    price: 79.99,
    icon: BarChart,
    imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Croissance rapide et visible',
      'Amélioration de l\'algorithme',
      'Engagement authentique',
      'Rapport d\'analyse complet',
    ],
    deliveryTime: '5-7 jours',
    variants: [
      {
        id: 'instagram-package-starter',
        title: 'Pack Starter',
        description: '500 Followers + 200 Likes + 10 Commentaires',
        type: 'automated',
        price: 49.99,
        value: 1,
        popular: true,
      },
      {
        id: 'instagram-package-pro',
        title: 'Pack Pro',
        description: '1000 Followers + 500 Likes + 20 Commentaires',
        type: 'automated',
        price: 79.99,
        value: 1,
      },
      {
        id: 'instagram-package-premium',
        title: 'Pack Premium Réel',
        description: '500 Followers réels + 300 Likes réels + 15 Commentaires personnalisés',
        type: 'real',
        price: 99.99,
        value: 1,
      },
      {
        id: 'instagram-package-viral',
        title: 'Pack Viral',
        description: '2000 Followers + 1000 Likes + 1000 Vues Stories + 30 Commentaires',
        type: 'automated',
        price: 149.99,
        value: 1,
      },
    ],
  },
  {
    id: 'tiktok-package',
    title: 'Pack TikTok Complet',
    description: 'Solution tout-en-un pour maximiser votre présence sur TikTok et améliorer vos statistiques.',
    category: 'custom',
    platform: 'tiktok',
    price: 69.99,
    icon: BarChart,
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    features: [
      'Boost complet du profil',
      'Augmentation de l\'engagement',
      'Amélioration du classement',
      'Rapport détaillé',
    ],
    deliveryTime: '4-6 jours',
    variants: [
      {
        id: 'tiktok-package-starter',
        title: 'Pack Starter',
        description: '500 Abonnés + 1000 Vues + 100 Likes',
        type: 'automated',
        price: 39.99,
        value: 1,
        popular: true,
      },
      {
        id: 'tiktok-package-pro',
        title: 'Pack Pro',
        description: '1000 Abonnés + 5000 Vues + 300 Likes',
        type: 'automated',
        price: 69.99,
        value: 1,
      },
      {
        id: 'tiktok-package-viral',
        title: 'Pack Viral',
        description: '2000 Abonnés + 10000 Vues + 500 Likes + 50 Commentaires',
        type: 'automated',
        price: 119.99,
        value: 1,
      },
    ],
  },
  {
    id: 'instagram-premium',
    title: 'Service Premium Instagram',
    description: 'Service haut de gamme avec ciblage géographique et démographique pour des résultats optimaux et durables.',
    category: 'premium',
    platform: 'instagram',
    price: 149.99,
    icon: Award,
    imageUrl: 'https://images.unsplash.com/photo-1552248524-10d9a7e4841c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: false,
    features: [
      'Ciblage géographique précis',
      'Segmentation démographique',
      'Interaction organique',
      'Suivi personnalisé',
    ],
    deliveryTime: '7-10 jours',
    variants: [
      {
        id: 'instagram-geo-followers-500',
        title: '500 Followers Ciblés',
        description: 'Followers ciblés par pays ou région spécifique',
        type: 'targeted',
        price: 99.99,
        value: 500,
        popular: true,
      },
      {
        id: 'instagram-geo-followers-1000',
        title: '1000 Followers Ciblés',
        description: 'Followers ciblés par pays ou région spécifique',
        type: 'targeted',
        price: 149.99,
        value: 1000,
      },
      {
        id: 'instagram-organic-growth',
        title: 'Croissance Organique 30j',
        description: 'Service d\'automatisation pour attirer des followers réels pendant 30 jours',
        type: 'real',
        price: 199.99,
        value: 30,
      },
    ],
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

export const getServiceVariantById = (serviceId: string, variantId: string): ServiceVariant | undefined => {
  const service = getServiceById(serviceId);
  if (!service || !service.variants) return undefined;
  return service.variants.find(variant => variant.id === variantId);
};

export const getServiceTypeInfo = (type: ServiceType) => {
  return serviceTypes.find(t => t.id === type);
};
