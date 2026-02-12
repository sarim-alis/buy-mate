import { generateDateForProduct } from './dateUtils';
import { Product, ProductsResponse, RawProduct } from '@/types/product';

export type { Product, ProductsResponse };

const BASE_URL = 'https://dummyjson.com';
const USE_PROXY = typeof window !== 'undefined'; // Use proxy for client-side requests

function addDateToProduct(product: RawProduct): Product {
  return {
    ...product,
    dateAdded: generateDateForProduct(product.id)
  };
}

export async function fetchProducts(limit: number = 10, skip: number = 0): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return {
    ...data,
    products: data.products.map(addDateToProduct)
  };
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const url = USE_PROXY ? '/api/products' : `${BASE_URL}/products?limit=0`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.products.map(addDateToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  const data = await response.json();
  return data.products.map(addDateToProduct);
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const url = USE_PROXY ? `/api/products/${id}` : `${BASE_URL}/products/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return addDateToProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const url = USE_PROXY ? '/api/categories' : `${BASE_URL}/products/categories`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  const data = await response.json();
  return data.products.map(addDateToProduct);
}
