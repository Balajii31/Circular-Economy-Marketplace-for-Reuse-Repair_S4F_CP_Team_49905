
import { GoogleGenAI, Type } from "@google/genai";
import { Product, Recommendation, ActionType, ProductType } from "../types";

// Domain logic baselines provided in the ML Backend specification
const BASELINE_EMISSIONS: Record<string, Record<string, number>> = {
  'Electronics': { 'new': 150, 'repair': 12, 'reuse': 8, 'resale': 6 },
  'Furniture': { 'new': 250, 'repair': 20, 'reuse': 15, 'resale': 10 },
  'Clothing': { 'new': 50, 'repair': 3, 'reuse': 2, 'resale': 1.5 },
  'Appliances': { 'new': 200, 'repair': 18, 'reuse': 12, 'resale': 8 }
};

export class GeminiMLService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeProduct(product: Partial<Product>): Promise<Recommendation[]> {
    const category = product.type || 'Electronics';
    const baselines = BASELINE_EMISSIONS[category] || BASELINE_EMISSIONS['Electronics'];
    
    const prompt = `
      Act as the "EcoLoop Decision Intelligence Model". 
      Your task is to analyze a product's lifecycle and provide 4 specific circular economy recommendations: Repair, Reuse, Resale, and Donation.

      Product Context:
      - Name: ${product.name}
      - Category: ${category}
      - Condition: ${product.condition}
      - Age: ${product.age}
      - Market Value: $${product.marketValue}
      - Description: ${product.description}

      Carbon Calculation Reference (kg CO2):
      - Production of a NEW ${category}: ${baselines.new}kg
      - Impact of Repairing: ${baselines.repair}kg
      - Impact of Reusing/Donating: ${baselines.reuse}kg
      - Impact of Reselling: ${baselines.resale}kg

      Requirements:
      1. Calculate "Carbon Saved" for each action by subtracting its impact from the "NEW" baseline.
      2. Assign a "Suitability Score" (0.0 to 1.0) based on condition, age, and market value.
      3. Assign "Reward Points" (roughly 15 points per kg of CO2 saved, adjusted by score).
      4. Provide a technical reasoning string explaining why the score was assigned.

      Return the data as a JSON array of recommendation objects.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING, description: "One of: Repair, Reuse, Resale, Donation" },
                score: { type: Type.NUMBER },
                carbonSaved: { type: Type.NUMBER },
                rewardPoints: { type: Type.INTEGER },
                reasoning: { type: Type.STRING }
              },
              required: ["action", "score", "carbonSaved", "rewardPoints", "reasoning"]
            }
          }
        }
      });

      const result = JSON.parse(response.text || '[]');
      // Sort by score descending to ensure the "Best Match" logic in UI works
      return result.sort((a: Recommendation, b: Recommendation) => b.score - a.score);
    } catch (error) {
      console.error("Gemini ML Analysis Error:", error);
      // Fallback logic using the baseline numbers directly
      return [
        { 
          action: ActionType.RESALE, 
          score: 0.82, 
          carbonSaved: baselines.new - baselines.resale, 
          rewardPoints: Math.round((baselines.new - baselines.resale) * 15), 
          reasoning: "High market value and good condition suggest a strong secondary market." 
        },
        { 
          action: ActionType.REPAIR, 
          score: 0.75, 
          carbonSaved: baselines.new - baselines.repair, 
          rewardPoints: Math.round((baselines.new - baselines.repair) * 15), 
          reasoning: "Repairing extends functional life significantly for this category." 
        },
        { 
          action: ActionType.REUSE, 
          score: 0.65, 
          carbonSaved: baselines.new - baselines.reuse, 
          rewardPoints: Math.round((baselines.new - baselines.reuse) * 15), 
          reasoning: "Functional item can be easily repurposed within the community." 
        },
        { 
          action: ActionType.DONATION, 
          score: 0.55, 
          carbonSaved: baselines.new - baselines.reuse, 
          rewardPoints: Math.round((baselines.new - baselines.reuse) * 10), 
          reasoning: "Great social impact candidate if resale interest is low." 
        }
      ].sort((a, b) => b.score - a.score);
    }
  }
}

export const mlService = new GeminiMLService();
