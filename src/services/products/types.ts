export interface Product {
  name: string;
}

export interface CreateProductResponse {
  product: {
    id: number;
    name: string;
  };
}
