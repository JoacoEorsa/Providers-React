import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useTranslation } from "@/i18n";
import { type Clinic, type Gender, GENDERS, type Specialty } from "@/types/provider";

const ALL_VALUE = "__all__";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  specialty: number | null;
  onSpecialtyChange: (value: number | null) => void;
  specialties: Specialty[];
  gender: Gender | null;
  onGenderChange: (value: Gender | null) => void;
  clinic: number | null;
  onClinicChange: (value: number | null) => void;
  clinics: Clinic[];
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
};

export const FiltersBar = ({
  clinic,
  clinics,
  favoritesOnly,
  gender,
  onClinicChange,
  onFavoritesOnlyChange,
  onGenderChange,
  onSearchChange,
  onSpecialtyChange,
  search,
  specialties,
  specialty,
}: Props) => {
  const { t } = useTranslation();

  const sortedSpecialties = [...specialties].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const sortedClinics = [...clinics].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <form
      aria-label={t("providers.searchLabel")}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        return e.preventDefault();
      }}
      role="search"
    >
      <label className="block">
        <span className="sr-only">{t("providers.searchLabel")}</span>
        <Input
          autoComplete="off"
          left={<Icons.Search />}
          onChange={(e) => {
            return onSearchChange(e.target.value);
          }}
          placeholder={t("providers.searchPlaceholder")}
          type="search"
          value={search}
        />
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <Select.Root
          onValueChange={(value) => {
            return onSpecialtyChange(value === ALL_VALUE ? null : Number(value));
          }}
          value={specialty == null ? ALL_VALUE : String(specialty)}
        >
          <Select.Trigger className="w-full">
            <Select.Value placeholder={t("providers.filters.specialtyAll")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={ALL_VALUE}>{t("providers.filters.specialtyAll")}</Select.Item>
            {sortedSpecialties.map((s) => {
              return (
                <Select.Item key={s.id} value={String(s.id)}>
                  {s.name}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>

        <Select.Root
          onValueChange={(value) => {
            return onGenderChange(value === ALL_VALUE ? null : (value as Gender));
          }}
          value={gender ?? ALL_VALUE}
        >
          <Select.Trigger className="w-full">
            <Select.Value placeholder={t("providers.filters.genderAll")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={ALL_VALUE}>{t("providers.filters.genderAll")}</Select.Item>
            {GENDERS.map((g) => {
              return (
                <Select.Item key={g} value={g}>
                  {t(`providers.filters.gender.${g}`)}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>

        <Select.Root
          onValueChange={(value) => {
            return onClinicChange(value === ALL_VALUE ? null : Number(value));
          }}
          value={clinic == null ? ALL_VALUE : String(clinic)}
        >
          <Select.Trigger className="w-full">
            <Select.Value placeholder={t("providers.filters.clinicAll")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={ALL_VALUE}>{t("providers.filters.clinicAll")}</Select.Item>
            {sortedClinics.map((c) => {
              return (
                <Select.Item key={c.id} value={String(c.id)}>
                  {c.name}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>

        <Button
          PrefixIcon={<Icons.Heart />}
          aria-pressed={favoritesOnly}
          className={favoritesOnly ? "bg-background-default-hover" : ""}
          onClick={() => {
            return onFavoritesOnlyChange(!favoritesOnly);
          }}
          variant="outlined"
        >
          {t("providers.favorites")}
        </Button>
      </div>
    </form>
  );
};
