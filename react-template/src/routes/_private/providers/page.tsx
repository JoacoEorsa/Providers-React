import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useDebounce } from "@/hooks/use-debounce";
import { paginationValidationWithDefaults, usePagination } from "@/hooks/use-pagination";
import { searchTextValidation, useSearchText } from "@/hooks/use-search";
import { useTranslation } from "@/i18n";
import { useProviders } from "@/services/providers/actions";
import type { Specialty } from "@/types/provider";
import { FiltersBar } from "./-components/filters-bar";
import { PageIntro } from "./-components/page-intro";
import { ProviderGrid } from "./-components/provider-grid";

const GENDERS = ["male", "female", "other"] as const;

const providersSearchSchema = z.object({
  ...searchTextValidation.shape,
  ...paginationValidationWithDefaults.shape,
  specialtyId: z.coerce.number().int().positive().optional(),
  clinicId: z.coerce.number().int().positive().optional(),
  gender: z.enum(GENDERS).optional(),
  favoritesOnly: z.boolean().optional(),
});

type ProvidersSearch = z.infer<typeof providersSearchSchema>;

const uniqueById = <T extends { id: number }>(items: T[]): T[] => {
  const seen = new Map<number, T>();
  items.forEach((item) => {
    if (!seen.has(item.id)) {
      seen.set(item.id, item);
    }
  });

  return Array.from(seen.values());
};

const ProvidersPage = () => {
  const { t } = useTranslation();
  const navigate = Route.useNavigate();
  const { clinicId, favoritesOnly, gender, specialtyId } = Route.useSearch();

  const {
    actions: { changePage },
    page,
  } = usePagination(Route.id);

  const {
    actions: { setPaginatedSearchText },
    searchText,
  } = useSearchText(Route.id);

  const debouncedSearchText = useDebounce(searchText, 400);

  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const toggleFavorite = (providerId: number) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(providerId)) {
        next.delete(providerId);
      } else {
        next.add(providerId);
      }

      return next;
    });
  };

  const setFilter = (patch: Partial<ProvidersSearch>) => {
    navigate({
      search: (prev) => {
        return { ...prev, ...patch, page: 1 };
      },
    });
  };

  const { data, error, isLoading, refetch } = useProviders({
    filter: {
      clinicId,
      gender,
      name: debouncedSearchText,
      specialtyId,
    },
    page,
  });

  const providers = data?.data ?? [];
  const totalFound = data?.meta.total ?? 0;
  const lastPage = data?.meta.lastPage ?? 1;
  const perPage = data?.meta.perPage ?? 0;
  const from = totalFound === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, totalFound);

  const derivedSpecialties = uniqueById(
    providers.map((p) => {
      return p.specialty;
    }).filter((s): s is Specialty => {
      return s !== null;
    }),
  );

  const derivedClinics = uniqueById(
    providers.flatMap((p) => {
      return p.clinics;
    }),
  );

  return (
    <div className="flex flex-col gap-6">
      <PageIntro />

      <FiltersBar
        clinic={clinicId ?? null}
        clinics={derivedClinics}
        favoritesOnly={favoritesOnly ?? false}
        gender={gender ?? null}
        onClinicChange={(value) => {
          return setFilter({ clinicId: value ?? undefined });
        }}
        onFavoritesOnlyChange={(value) => {
          return setFilter({ favoritesOnly: value || undefined });
        }}
        onGenderChange={(value) => {
          return setFilter({ gender: value ?? undefined });
        }}
        onSearchChange={setPaginatedSearchText}
        onSpecialtyChange={(value) => {
          return setFilter({ specialtyId: value ?? undefined });
        }}
        search={searchText ?? ""}
        specialties={derivedSpecialties}
        specialty={specialtyId ?? null}
      />

      <p className="text-sm font-medium text-text-default-secondary">
        {t("providers.providersFound", { count: totalFound })}
      </p>

      <ProviderGrid
        error={error ? t("common.requestError") : null}
        favoriteIds={favoriteIds}
        loading={isLoading}
        onRetry={() => {
          return refetch();
        }}
        onToggleFavorite={toggleFavorite}
        providers={providers}
      />

      {lastPage > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            PrefixIcon={<Icons.ChevronLeft />}
            aria-label={t("table.pagination.prev")}
            disabled={page <= 1}
            onClick={() => {
              return changePage({ pageIndex: page - 2 });
            }}
            variant="outlined"
          />
          <span className="text-sm text-text-default-secondary">
            {t("table.pagination.range", { from, to, total: totalFound })}
          </span>
          <Button
            PrefixIcon={<Icons.ChevronRight />}
            aria-label={t("table.pagination.next")}
            disabled={page >= lastPage}
            onClick={() => {
              return changePage({ pageIndex: page });
            }}
            variant="outlined"
          />
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/_private/providers/")({
  component: ProvidersPage,
  validateSearch: providersSearchSchema,
});
