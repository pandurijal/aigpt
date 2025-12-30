export enum Category {
  TRAVEL = 'Wisata',
  PRODUCTIVITY = 'Produktivitas',
  CREATIVE = 'Kreativitas',
  LEARNING = 'Pembelajaran',
  HEALTH = 'Kesehatan',
  FINANCE = 'Keuangan',
  ENTERTAINMENT = 'Hiburan',
  LIFESTYLE = 'Gaya Hidup'
}

export interface Tool {
  id: string;
  name: string;
  category: Category;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
  demoUrl?: string;
  priceModel: 'Gratis' | 'Berbayar' | 'Freemium';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface TravelPreferences {
  budget: number;
  duration: number; // in days
  travelStyle: 'santai' | 'petualangan' | 'kuliner' | 'budaya' | 'belanja';
  travelers: number;
  accommodation: 'budget' | 'mid-range' | 'luxury';
  interests?: string[];
}

export interface DestinationRecommendation {
  destination: string;
  country: string;
  description: string;
  estimatedCost: {
    flights: number;
    accommodation: number;
    food: number;
    activities: number;
    total: number;
  };
  highlights: string[];
  itinerary: {
    day: number;
    activities: string[];
  }[];
  bestTimeToVisit: string;
  tips: string[];
}