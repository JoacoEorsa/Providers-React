import { createQueryKeys } from '@lukemorales/query-key-factory';
import { skipToken } from '@tanstack/react-query';

import { createProduct, getProductsDetail, getProductsList } from './api';

export const queries = createQueryKeys('products', {
  detail: (productId: string) => {
    return {
      queryKey: [productId],
      queryFn: () => {
        return productId ? getProductsDetail(productId) : (skipToken as never);
      },
    };
  },
  list: { queryKey: null, queryFn: getProductsList },
});

export const mutations = { create: createProduct };
