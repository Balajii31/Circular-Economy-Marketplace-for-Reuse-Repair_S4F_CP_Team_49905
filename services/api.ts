
import { Product, UserStats, Recommendation, ProductType, ProductCondition, NGO, Challenge, MarketplaceItem } from '../types';
import { mlService } from './geminiService';
import { authService } from '../lib/auth';

const PRODUCTS_KEY = 'ecoloop_products';

const getStoredProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveStoredProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const user = authService.getUser();
      if (!user) return [];
      return getStoredProducts().filter(p => p.userId === user.id);
    },
    getById: async (id: string): Promise<Product | null> => {
      const products = getStoredProducts();
      return products.find(p => p.id === id) || null;
    },
    create: async (data: Partial<Product>): Promise<Product> => {
      const user = authService.getUser();
      if (!user) throw new Error("Unauthorized");
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        name: data.name || 'Unknown Item',
        type: data.type || ProductType.ELECTRONICS,
        description: data.description || '',
        condition: data.condition || ProductCondition.GOOD,
        age: data.age || '1-2 years',
        marketValue: data.marketValue || 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...data
      };
      const products = getStoredProducts();
      products.unshift(newProduct);
      saveStoredProducts(products);
      return newProduct;
    },
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
      const products = getStoredProducts();
      const index = products.findIndex(p => p.id === id);
      if (index === -1) throw new Error("Product not found");
      products[index] = { ...products[index], ...data };
      saveStoredProducts(products);
      return products[index];
    },
    delete: async (id: string): Promise<void> => {
      const products = getStoredProducts();
      const filtered = products.filter(p => p.id !== id);
      saveStoredProducts(filtered);
    }
  },
  ml: {
    analyze: async (productId: string): Promise<Recommendation[]> => {
      const product = await api.products.getById(productId);
      if (!product) throw new Error("Product not found");
      const recommendations = await mlService.analyzeProduct(product);
      await api.products.update(productId, { status: 'analyzed', recommendations });
      return recommendations;
    }
  },
  stats: {
    getStats: async (): Promise<UserStats & { breakdown: Record<string, number> }> => {
      const products = await api.products.getAll();
      const processed = products.filter(p => p.status === 'processed' || p.status === 'analyzed');
      let totalCarbon = 0;
      let totalRewards = 0;
      const breakdown: Record<string, number> = { repair: 0, reuse: 0, resale: 0, donation: 0 };
      processed.forEach(p => {
        if (p.recommendations && p.recommendations.length > 0) {
          const best = p.recommendations[0];
          totalCarbon += best.carbonSaved;
          totalRewards += best.rewardPoints;
          breakdown[best.action.toLowerCase()]++;
        }
      });
      return {
        totalActions: processed.length,
        carbonSaved: parseFloat(totalCarbon.toFixed(1)),
        rewardsEarned: totalRewards,
        itemsProcessed: processed.length,
        breakdown,
        history: [
          { date: '2024-01', value: 45 },
          { date: '2024-02', value: 52 },
          { date: '2024-03', value: 68 }
        ]
      };
    }
  },
  ngos: {
    getAll: async (): Promise<NGO[]> => {
      return [
        { id: 'n1', name: 'Digital Inclusion Hub', focus: 'Education & Tech', location: 'Metropolis East', impactMetric: '500+ students enabled', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200' },
        { id: 'n2', name: 'Homeless Haven', focus: 'Social Welfare', location: 'City Center', impactMetric: '1.2k meals provided', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=200' },
        { id: 'n3', name: 'Green Threads', focus: 'Eco-Fashion', location: 'Riverdale', impactMetric: '2 tons diverted from landfills', imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=200' }
      ];
    }
  },
  challenges: {
    getActive: async (): Promise<Challenge[]> => {
      return [
        { id: 'c1', title: 'Repair Rookie', description: 'Complete your first professional repair booking.', reward: 500, deadline: '7 days left', progress: 0, target: 1, icon: 'wrench' },
        { id: 'c2', title: 'Carbon Guardian', description: 'Save 50kg of CO2 through any circular action.', reward: 1000, deadline: '12 days left', progress: 32, target: 50, icon: 'leaf' },
        { id: 'c3', title: 'Generous Heart', description: 'Donate 3 items to verified NGO partners.', reward: 750, deadline: '20 days left', progress: 1, target: 3, icon: 'heart' }
      ];
    }
  }
};
