export enum Category {
  ALL = 'Semua',
  ACCOUNTING = 'Akuntansi',
  TRAVEL = 'Wisata',
  HR = 'SDM & HR',
  LEGAL = 'Legal',
  MARKETING = 'Pemasaran',
  PRODUCTIVITY = 'Produktivitas'
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