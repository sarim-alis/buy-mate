export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  dateAdded: Date;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface RawProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface FavoritesState {
  favorites: number[];
}

export interface DateRangeFilter {
  from: Date | null;
  to: Date | null;
}

export interface CategoryResponse {
  slug: string;
  name: string;
  url: string;
}

export interface ChartDataPoint {
  date: string;
  products: number;
  added: number;
}
