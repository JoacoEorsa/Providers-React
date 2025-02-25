import { useMutation } from '@tanstack/react-query';

import type { UseMutationProps } from '@/services/types';
import { useUserStore } from '@/stores';
import { mutations } from './factories';

export const useLoginMutation = (props?: UseMutationProps<typeof mutations.login>) => {
  const setToken = useUserStore((s) => {
    return s.setToken;
  });

  return useMutation({
    mutationFn: mutations.login,
    onSuccess: ({ data }) => {
      setToken(data.authToken);
    },
    onError: () => {
      // eslint-disable-next-line no-console
      console.log('Error :(');
    },
    ...props,
  });
};
