
import { Product, UserStats, Recommendation, ProductType, ProductCondition, NGO, Challenge, MarketplaceItem } from '../types';
import { mlService } from './geminiService';
import { authService } from '../lib/auth';
import { sql } from '../lib/db';

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const user = authService.getUser();
      if (!user) return [];
      const products = await sql`SELECT * FROM products WHERE user_id = ${user.id}`;
      return products.map(p => ({
        id: p.id.toString(),
        userId: p.user_id.toString(),
        name: p.name,
        type: p.type as ProductType,
        description: p.description,
        condition: p.condition as ProductCondition,
        age: p.age,
        marketValue: p.market_value,
        status: p.status,
        createdAt: p.created_at.toISOString(),
      }));
    },
    getById: async (id: string): Promise<Product | null> => {
      const products = await sql`SELECT * FROM products WHERE id = ${parseInt(id)}`;
      if (products.length === 0) return null;
      const p = products[0];
      return {
        id: p.id.toString(),
        userId: p.user_id.toString(),
        name: p.name,
        type: p.type as ProductType,
        description: p.description,
        condition: p.condition as ProductCondition,
        age: p.age,
        marketValue: p.market_value,
        status: p.status,
        createdAt: p.created_at.toISOString(),
      };
    },
    create: async (data: Partial<Product>): Promise<Product> => {
      const user = authService.getUser();
      if (!user) throw new Error("Unauthorized");
      const newProduct = await sql`
        INSERT INTO products (user_id, type, name, description, condition, age, market_value, status)
        VALUES (${parseInt(user.id)}, ${data.type || ProductType.ELECTRONICS}, ${data.name || 'Unknown Item'}, ${data.description || ''}, ${data.condition || ProductCondition.GOOD}, ${data.age || '1-2 years'}, ${data.marketValue || 0}, 'pending')
        RETURNING *
      `;
      const p = newProduct[0];
      return {
        id: p.id.toString(),
        userId: p.user_id.toString(),
        name: p.name,
        type: p.type as ProductType,
        description: p.description,
        condition: p.condition as ProductCondition,
        age: p.age,
        marketValue: p.market_value,
        status: p.status,
        createdAt: p.created_at.toISOString(),
      };
    },
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
      const user = authService.getUser();
      if (!user) throw new Error("Unauthorized");
      // For simplicity, update all fields
      const updated = await sql`
        UPDATE products SET
          type = COALESCE(${data.type}, type),
          name = COALESCE(${data.name}, name),
          description = COALESCE(${data.description}, description),
          condition = COALESCE(${data.condition}, condition),
          age = COALESCE(${data.age}, age),
          market_value = COALESCE(${data.marketValue}, market_value),
          status = COALESCE(${data.status}, status)
        WHERE id = ${parseInt(id)} AND user_id = ${parseInt(user.id)}
        RETURNING *
      `;
      if (updated.length === 0) throw new Error("Product not found");
      const p = updated[0];
      return {
        id: p.id.toString(),
        userId: p.user_id.toString(),
        name: p.name,
        type: p.type as ProductType,
        description: p.description,
        condition: p.condition as ProductCondition,
        age: p.age,
        marketValue: p.market_value,
        status: p.status,
        createdAt: p.created_at.toISOString(),
      };
    },
    delete: async (id: string): Promise<void> => {
      const user = authService.getUser();
      if (!user) throw new Error("Unauthorized");
      await sql`DELETE FROM products WHERE id = ${parseInt(id)} AND user_id = ${parseInt(user.id)}`;
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
