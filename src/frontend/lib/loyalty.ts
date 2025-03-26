
// Types for loyalty system
export interface LoyaltyUser {
  id: string;
  email: string;
  name: string;
  points: number;
  tier: LoyaltyTier;
  referralCode: string;
  referrals: number;
  joinDate: Date;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface PointsTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent' | 'referral' | 'signup';
  description: string;
  date: Date;
}

export interface LoyaltyTierInfo {
  name: LoyaltyTier;
  minPoints: number;
  color: string;
  benefits: string[];
  icon: string;
}

// Mock data for loyalty tiers
export const loyaltyTiers: LoyaltyTierInfo[] = [
  {
    name: 'bronze',
    minPoints: 0,
    color: 'text-amber-600',
    icon: 'award',
    benefits: [
      '1 point per € spent',
      'Access to exclusive offers',
      'Birthday reward'
    ]
  },
  {
    name: 'silver',
    minPoints: 500,
    color: 'text-slate-400',
    icon: 'badge',
    benefits: [
      '1.5 points per € spent',
      'Priority support',
      'Early access to new services',
      'Free delivery'
    ]
  },
  {
    name: 'gold',
    minPoints: 1000,
    color: 'text-yellow-500',
    icon: 'medal',
    benefits: [
      '2 points per € spent',
      'Dedicated account manager',
      'Exclusive events access',
      'Special discounts',
      'Double referral bonuses'
    ]
  },
  {
    name: 'platinum',
    minPoints: 5000,
    color: 'text-purple-600',
    icon: 'crown',
    benefits: [
      '3 points per € spent',
      'VIP support 24/7',
      'Custom services',
      'Free premium upgrades',
      'Triple referral bonuses',
      'Anniversary gifts'
    ]
  }
];

// Functions to handle loyalty operations
export const calculateTier = (points: number): LoyaltyTier => {
  if (points >= 5000) return 'platinum';
  if (points >= 1000) return 'gold';
  if (points >= 500) return 'silver';
  return 'bronze';
};

export const generateReferralCode = (userId: string): string => {
  // In a real app, this would create a unique code for each user
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'REF-';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Mock API calls - in a real application, these would connect to your backend
export const fetchUserLoyalty = async (email: string): Promise<LoyaltyUser | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if the user exists in localStorage
  const storedUser = localStorage.getItem(`loyalty_user_${email}`);
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    return {
      ...userData,
      joinDate: new Date(userData.joinDate)
    };
  }
  
  return null;
};

export const createUserLoyalty = async (email: string, name: string): Promise<LoyaltyUser> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const userId = `user_${Date.now()}`;
  const newUser: LoyaltyUser = {
    id: userId,
    email,
    name,
    points: 100, // Welcome bonus
    tier: 'bronze',
    referralCode: generateReferralCode(userId),
    referrals: 0,
    joinDate: new Date()
  };
  
  // Save to localStorage
  localStorage.setItem(`loyalty_user_${email}`, JSON.stringify(newUser));
  
  // Add welcome transaction
  const transaction: PointsTransaction = {
    id: `tx_${Date.now()}`,
    userId,
    amount: 100,
    type: 'signup',
    description: 'Bienvenue au programme de fidélité',
    date: new Date()
  };
  
  saveTransaction(transaction);
  
  return newUser;
};

export const getUserTransactions = async (userId: string): Promise<PointsTransaction[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const transactions = localStorage.getItem(`loyalty_transactions_${userId}`);
  if (transactions) {
    const parsedTransactions = JSON.parse(transactions);
    return parsedTransactions.map((tx: any) => ({
      ...tx,
      date: new Date(tx.date)
    }));
  }
  
  return [];
};

export const saveTransaction = (transaction: PointsTransaction): void => {
  const userId = transaction.userId;
  const currentTransactions = localStorage.getItem(`loyalty_transactions_${userId}`);
  const transactions = currentTransactions ? JSON.parse(currentTransactions) : [];
  
  transactions.push(transaction);
  localStorage.setItem(`loyalty_transactions_${userId}`, JSON.stringify(transactions));
};

export const addPoints = async (userId: string, amount: number, type: PointsTransaction['type'], description: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Find the user
  const userKey = Object.keys(localStorage).find(key => 
    key.startsWith('loyalty_user_') && JSON.parse(localStorage.getItem(key) || '{}').id === userId
  );
  
  if (!userKey) return;
  
  const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
  userData.points += amount;
  userData.tier = calculateTier(userData.points);
  
  localStorage.setItem(userKey, JSON.stringify(userData));
  
  // Create transaction
  const transaction: PointsTransaction = {
    id: `tx_${Date.now()}`,
    userId,
    amount,
    type,
    description,
    date: new Date()
  };
  
  saveTransaction(transaction);
};

export const processReferral = async (referralCode: string, newUserEmail: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find the referring user by referral code
  const referrerKey = Object.keys(localStorage).find(key => {
    if (!key.startsWith('loyalty_user_')) return false;
    const userData = JSON.parse(localStorage.getItem(key) || '{}');
    return userData.referralCode === referralCode;
  });
  
  if (!referrerKey) return false;
  
  const referrer = JSON.parse(localStorage.getItem(referrerKey) || '{}');
  
  // Update referrer stats
  referrer.referrals += 1;
  
  // Points awarded depend on tier
  let referralPoints = 200;
  if (referrer.tier === 'gold') referralPoints = 400;
  if (referrer.tier === 'platinum') referralPoints = 600;
  
  referrer.points += referralPoints;
  referrer.tier = calculateTier(referrer.points);
  
  localStorage.setItem(referrerKey, JSON.stringify(referrer));
  
  // Create transaction for the referrer
  const transaction: PointsTransaction = {
    id: `tx_${Date.now()}`,
    userId: referrer.id,
    amount: referralPoints,
    type: 'referral',
    description: `Parrainage de ${newUserEmail}`,
    date: new Date()
  };
  
  saveTransaction(transaction);
  
  return true;
};

// Analytics tracking function
export const trackLoyaltyEvent = (eventName: string, eventData: Record<string, any>) => {
  console.log(`[ANALYTICS] ${eventName}:`, eventData);
  
  // In a real app, this would send data to your analytics provider
  // window.analytics?.track(eventName, eventData);
};
