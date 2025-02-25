import { api } from '@/config/api';
import type { CreateProductResponse, Product } from './types';

export const getProductsDetail = async (productId: string) => {
  return api.get<Product[]>(`products/${productId}`);
};

export const getProductsList = async () => {
  return api.get<Product[]>('products');
};

export const createProduct = async (product: Product) => {
  return api.post<CreateProductResponse>('products', product);
};
