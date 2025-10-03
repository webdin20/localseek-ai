export type City = {
  slug: string;
  name: string;
  areas?: string[];
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  description?: string;
};

export type ParsedQuery = {
  raw: string;
  city?: string;
  category?: string;
  urgency?: 'azi' | 'maine' | 'curand' | 'flexibil';
  dateText?: string;
  budgetLevel?: 'mic' | 'mediu' | 'mare';
  rooms?: number;
  areas?: string[];
};

export type Service = {
  name: string;
  fromPrice?: number;
};

export type Company = {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  verified?: boolean;
  rating: number;
  reviewsCount: number;
  city: string;
  areas?: string[];
  categories: string[];
  shortDesc: string;
  services: Service[];
  coverage: string[];
  phone?: string;
  whatsapp?: string;
  lastActiveDays?: number;
  description?: string;
  gallery?: string[];
};

export type Filters = {
  areas: string[];
  verified?: boolean;
  ratingMin?: number;
  priceMin?: number;
  priceMax?: number;
  availability?: 'azi' | 'maine' | 'saptamana';
};

export type SortOption = 'relevance' | 'rating' | 'priceAsc' | 'priceDesc' | 'recent';

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type PlanType = 'basic' | 'premium' | 'gold';

export type Plan = {
  id: PlanType;
  name: string;
  price: number;
  features: string[];
  highlighted?: boolean;
};
