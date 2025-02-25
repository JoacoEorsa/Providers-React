import type { DefinedInitialDataOptions, UseMutationOptions } from '@tanstack/react-query';

type QueryKey = { queryKey: readonly unknown[] };

export type UseQueryProps<T extends ((...args: never) => QueryKey) | QueryKey> = Omit<
  DefinedInitialDataOptions<
    unknown,
    Error,
    unknown,
    T extends (...args: never) => QueryKey
      ? ReturnType<T>['queryKey']
      : T extends QueryKey
        ? T['queryKey']
        : never
  >,
  'queryFn' | 'queryKey'
>;

export type UseMutationProps<T extends (...args: never) => unknown> = Omit<
  UseMutationOptions<Awaited<ReturnType<T>>, Error, Parameters<T>[0]>,
  'mutationFn'
>;
