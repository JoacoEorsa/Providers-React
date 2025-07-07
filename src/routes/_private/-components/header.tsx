import { useTranslation } from "@/i18n";
import { HamburgerMenu } from "./hamburger-menu";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
      <img className="h-10" src="./logo.svg" />

      <span>{t("greetings.rootLayout")}</span>

      <HamburgerMenu />
    </header>
  );
};
