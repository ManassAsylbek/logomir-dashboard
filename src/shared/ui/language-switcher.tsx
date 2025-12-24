import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "kg" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleLanguage}
      className="text-gray-600"
    >
      <Globe className="w-5 h-5" />
      <span className="ml-1 text-xs">{i18n.language.toUpperCase()}</span>
    </Button>
  );
};
