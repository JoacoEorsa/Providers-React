import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/i18n";
import type { Provider } from "@/services/providers/types";
import { ProviderCard } from "./provider-card";

type Props = {
  providers: Provider[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  favoriteIds: Set<number>;
  onToggleFavorite: (providerId: number) => void;
  onViewDetails?: (providerId: number) => void;
};

const SkeletonCard = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border-default-default bg-background-default-default">
      <Skeleton className="aspect-16/10 rounded-none" />
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <Skeleton className="mt-auto h-10 w-full" />
      </div>
    </div>
  );
};

export const ProviderGrid = ({
  error,
  favoriteIds,
  loading,
  onRetry,
  onToggleFavorite,
  onViewDetails,
  providers,
}: Props) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <li key={i}>
              <SkeletonCard />
            </li>
          );
        })}
      </ul>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border-default-default bg-background-default-default px-6 py-12 text-center"
        role="alert"
      >
        <p className="text-base font-medium text-text-default-default">
          {t("providers.grid.errorTitle")}
        </p>
        <p className="text-sm text-text-default-secondary">{error}</p>
        <Button onClick={onRetry}>{t("providers.grid.errorRetry")}</Button>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-default-default px-6 py-12 text-center">
        <p className="text-base font-medium text-text-default-default">
          {t("providers.grid.emptyTitle")}
        </p>
        <p className="text-sm text-text-default-secondary">{t("providers.grid.emptyBody")}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
      {providers.map((provider) => {
        return (
          <li key={provider.id}>
            <ProviderCard
              isFavorite={favoriteIds.has(provider.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
              provider={provider}
            />
          </li>
        );
      })}
    </ul>
  );
};
