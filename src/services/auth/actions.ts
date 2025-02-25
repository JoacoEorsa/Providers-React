import { useMutation } from '@tanstack/react-query';

import type { UseMutationProps } from '@/services/types';
import { mutations } from './factories';

export const useLoginMutation = (props?: UseMutationProps<typeof mutations.login>) => {
  return useMutation({
    mutationFn: mutations.login,
    onSuccess: () => {
      // persist login data
      // eslint-disable-next-line no-console
      console.log('Success :)');
    },
    onError: () => {
      // eslint-disable-next-line no-console
      console.log('Error :(');
    },
    ...props,
  });
};
