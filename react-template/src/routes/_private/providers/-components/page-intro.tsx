import { useTranslation } from "@/i18n";

export const PageIntro = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="providers-page-title" className="flex flex-col gap-2">
      <h1
        className="text-2xl/tight font-semibold text-text-default-default sm:text-3xl lg:text-[32px] lg:leading-[42px]"
        id="providers-page-title"
      >
        {t("providers.title")}
      </h1>
      <p className="text-base font-medium text-text-default-secondary sm:text-lg">
        {t("providers.subtitle")}
      </p>
    </section>
  );
};
