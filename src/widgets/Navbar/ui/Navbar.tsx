import { Button } from "@heroui/button";
import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";
import { Bell, Home, MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@heroui/switch";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

export const languages = [
  { label: "Русский", key: "ru" },
  { label: "Кыргызский", key: "kg" },
];

export const Navbar = () => {
  return (
    <>
      <HeroUINavbar
        maxWidth="full"
        className="bg-white border-b border-default-200"
      >
        <NavbarContent justify="start">
          <h1 className="font-semibold text-xl text-default-700">Компания</h1>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-3">
          <Switch
            defaultSelected
            color="success"
            endContent={<MoonIcon size={16} />}
            size="sm"
            startContent={<SunIcon size={16} />}
          />

          <Autocomplete
            className="w-36"
            size="sm"
            variant="bordered"
            defaultSelectedKey="ru"
          >
            {languages.map((language) => (
              <AutocompleteItem key={language.key}>
                {language.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Button variant="light" isIconOnly size="sm">
            <Bell size={20} />
          </Button>
        </NavbarContent>
      </HeroUINavbar>

      <Breadcrumbs
        className="flex items-center bg-white pl-6 h-10 border-b border-default-100"
        separator="/"
        size="sm"
      >
        <BreadcrumbItem>
          <Home size={14} className="text-default-600" />
        </BreadcrumbItem>
        <BreadcrumbItem className="text-default-600">Компания</BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
};
