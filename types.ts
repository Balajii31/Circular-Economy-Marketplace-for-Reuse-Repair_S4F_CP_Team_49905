
export enum ProductCondition {
  GOOD = 'good',
  FAIR = 'fair',
  DAMAGED = 'damaged'
}

export enum ProductType {
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  CLOTHING = 'Clothing',
  APPLIANCES = 'Appliances'
}

export enum ActionType {
  REPAIR = 'Repair',
  REUSE = 'Reuse',
  RESALE = 'Resale',
  DONATION = 'Donation'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'repair_provider' | 'admin';
  location?: string;
}

export interface Recommendation {
  action: ActionType;
  score: number;
  carbonSaved: number; // in kg CO2
  rewardPoints: number;
  reasoning: string;
}

export interface Product {
  id: string;
  userId: string;
  type: ProductType;
  name: string;
  description: string;
  condition: ProductCondition;
  age: string;
  marketValue: number;
  status: 'pending' | 'analyzed' | 'processed';
  createdAt: string;
  recommendations?: Recommendation[];
}

export interface UserStats {
  totalActions: number;
  carbonSaved: number;
  rewardsEarned: number;
  itemsProcessed: number;
  history: { date: string; value: number }[];
}

export interface Transaction {
  id: string;
  productName: string;
  action: ActionType;
  carbonSaved: number;
  rewardPoints: number;
  status: string;
  date: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  condition: ProductCondition;
  category: ProductType;
  carbonSaved: number;
  imageUrl: string;
  sellerRating: number;
  sellerName?: string;
}

export interface RepairProvider {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  location: string;
  isVerified: boolean;
  activeRepairs: number;
  imageUrl: string;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface NGO {
  id: string;
  name: string;
  focus: string;
  location: string;
  impactMetric: string;
  imageUrl: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  progress: number;
  target: number;
  icon: string;
}
