import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useTranslation } from "@/i18n";
import type { Provider } from "@/types/provider";

type Props = {
  isFavorite: boolean;
  onToggleFavorite: (providerId: number) => void;
  onViewDetails?: (providerId: number) => void;
  provider: Provider;
};

export const ProviderCard = ({ isFavorite, onToggleFavorite, onViewDetails, provider }: Props) => {
  const { t } = useTranslation();
  const firstClinic = provider.clinics[0];
  const extraClinics = Math.max(0, provider.clinics.length - 1);
  const hasPhoto = Boolean(provider.profilePic);
  const titleId = `provider-${provider.id}-name`;

  return (
    <Card.Root
      aria-labelledby={titleId}
      className="group h-full gap-0 overflow-hidden p-0 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-border-default-secondary hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-background-default-secondary">
        {hasPhoto ? (
          <img
            alt={t("providers.card.portraitAlt", { name: provider.name })}
            className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
            loading="lazy"
            src={provider.profilePic ?? ""}
          />
        ) : (
          <div
            aria-label={t("providers.card.noPhotoAlt")}
            className="grid size-full place-items-center text-text-default-tertiary"
            role="img"
          >
            <Icons.Image className="size-12" />
          </div>
        )}
        <Button
          PrefixIcon={
            <Icons.Heart
              className={isFavorite ? "fill-current text-text-brand-default" : ""}
            />
          }
          aria-label={
            isFavorite
              ? t("providers.card.favoriteRemove", { name: provider.name })
              : t("providers.card.favoriteAdd", { name: provider.name })
          }
          aria-pressed={isFavorite}
          className="absolute top-3 right-3 rounded-full bg-background-default-default/90 shadow-sm hover:bg-background-default-default"
          onClick={() => {
            return onToggleFavorite(provider.id);
          }}
          size="sm"
          variant="outlined"
        />
      </div>

      <Card.Content className="flex flex-1 flex-col gap-5 p-5">
        <header className="flex flex-col gap-2">
          <h2 className="text-2xl/tight font-semibold text-text-default-default" id={titleId}>
            {provider.name}
          </h2>
          <p className="text-xl font-medium text-text-default-secondary">
            {provider.specialty?.name ?? t("providers.card.generalSpecialty")}
          </p>
        </header>

        <div className="flex flex-col gap-2 text-base font-medium text-text-default-secondary">
          {firstClinic ? (
            <>
              <p className="flex items-center gap-1">
                <Icons.MapPin className="size-5 shrink-0 text-text-default-secondary" />
                <span>{firstClinic.name}</span>
              </p>
              {extraClinics > 0 && (
                <p className="pl-6">
                  {t("providers.card.moreLocations", { count: extraClinics })}
                </p>
              )}
            </>
          ) : (
            <p className="flex items-center gap-1">
              <Icons.MapPin className="size-5 shrink-0 text-text-default-secondary" />
              <span>{t("providers.card.noLocation")}</span>
            </p>
          )}
        </div>

        <Button
          className="mt-auto w-full"
          onClick={() => {
            return onViewDetails?.(provider.id);
          }}
        >
          {t("providers.card.viewDetails")}
        </Button>
      </Card.Content>
    </Card.Root>
  );
};
