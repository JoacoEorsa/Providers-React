import { getApi } from '@/config/api';
import type { CreateProductResponse, Product } from './types';

export const getProductsDetail = async (productId: string) => {
  return getApi().get<Product[]>(`products/${productId}`);
};

export const getProductsList = async () => {
  return getApi().get<Product[]>('products');
};

export const createProduct = async (product: Product) => {
  return getApi().post<CreateProductResponse>('products', product);
};
