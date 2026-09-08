export interface Dessert {
  id: string;
  bakerId: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isEggless: boolean;
  isVegan: boolean;
  image: string;
}

export interface Review {
  id: string;
  bakerId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  sentimentScore: number; // -1.0 to +1.0 for Data Science / Sentiment Analysis
  sentimentLabel: "Delighted" | "Positive" | "Neutral" | "Negative";
  aspects: string[]; // e.g. ["Flavour", "Packaging", "Freshness"]
}

export interface Baker {
  id: string;
  name: string;
  slug: string;
  bio: string;
  shortDescription: string;
  profileImage: string;
  coverImage?: string;
  location: string;
  area: string; // e.g., "Bandra West", "Juhu", "Andheri West", "Powai", "Colaba"
  rating: number;
  reviewCount: number;
  specialties: string;
  specialtyTags: string[];
  priceRange: string;
  priceMin: number;
  priceMax: number;
  instagram: string;
  website?: string;
  phone?: string;
  leadTime: string; // e.g., "24-48 hours notice"
  dietaryOptions: string[]; // e.g. ["Eggless available", "Vegan options", "Gluten-free on request"]
  signatureDesserts: Dessert[];
  reviews: Review[];
  verified: boolean;
  // Data Science integration placeholder
  embedding?: number[];
  features?: Record<string, number | string>;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  description?: string;
  itemCount?: number;
}

export interface Occasion {
  name: string;
  categorySlug?: string;
  image: string;
}

export interface NlpParsedQuery {
  rawQuery: string;
  location?: string;
  dessertType?: string;
  category?: string;
  maxBudget?: number;
  minBudget?: number;
  dietaryPreferences: string[];
  keywords: string[];
  confidence: number;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string; // 'all' or category name/slug
  selectedArea: string; // 'all' or area name
  priceRange: string; // 'all', 'under-1000', '1000-2500', '2500-5000', 'above-5000'
  minRating: number; // 0, 4.7, 4.8, 4.9
  dietary: string; // 'all', 'eggless', 'vegan', 'gluten-free'
  sortBy: "featured" | "rating" | "reviews" | "price-asc" | "price-desc";
  nlpParsed?: NlpParsedQuery | null;
}
