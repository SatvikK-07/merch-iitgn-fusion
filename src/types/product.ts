export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  club: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  badge?: string;
  isNew: boolean;
  inStock: boolean;
  stock: number;
  features?: string[];
  material?: string;
  care?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface FilterOptions {
  clubs: string[];
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
}

export const clubs = [
  "All",
  "Blithchron",
  "Amalthea", 
  "Hallabol",
  "TEDxIITGN",
  "IITGN Official"
];

export const categories = [
  "All",
  "T-Shirts",
  "Hoodies",
  "Oversized",
  "Accessories",
  "Mugs",
  "Varsity Jackets"
];

export const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
export const allColors = [
  "Black", "White", "Navy", "Blue", "Cream", "Beige", 
  "Sand", "Brown", "Charcoal", "Gray", "Red", "Green"
];