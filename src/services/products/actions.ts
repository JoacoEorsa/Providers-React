import { useMutation, useQuery } from '@tanstack/react-query';

import type { UseMutationProps, UseQueryProps } from '@/services/types';
import { mutations, queries } from './factories';

export const useProductsDetailQuery = (
  productId: string,
  props?: UseQueryProps<typeof queries.detail>,
) => {
  return useQuery({ ...queries.detail(productId), ...props });
};

export const useProductsListQuery = (props?: UseQueryProps<typeof queries.list>) => {
  return useQuery({ ...queries.list, ...props });
};

export const useProductsCreateMutation = (props?: UseMutationProps<typeof mutations.create>) => {
  return useMutation({ mutationFn: mutations.create, ...props });
};
