import { useLinks } from "@/widgets/Sidebar/model/constants";
import { Button } from "@heroui/button";
import { LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@heroui/user";
import { getRouteAuth, getRouteSettings } from "@/shared/const/router";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const links = useLinks();

  const isSettingActive = pathname === getRouteSettings();
  return (
    <div className="min-w-72 bg-[#272727] flex flex-col justify-start p-6">
      <div className="flex items-center justify-between mb-12 ml-4">
        <img src="logo.png" width={70} />
        <div className="flex gap-1">
          {["ru", "kg"].map((lang) => (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                i18n.language === lang
                  ? "bg-white text-gray-900"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Button
              key={link.id}
              as={Link}
              to={link.href}
              radius="full"
              variant={isActive ? "flat" : "light"}
              // color={isActive ? "success" : "default"}
              className={`justify-start text-white gap-3 px-3 ${
                isActive ? "font-medium" : ""
              }`}
              startContent={link.icon}
            >
              {link.label}
            </Button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col items-start gap-5">
        <Button
          as={Link}
          variant={isSettingActive ? "flat" : "light"}
          className={`justify-start text-white gap-3 px-3  w-full ${
            isSettingActive ? "font-medium" : ""
          }`}
          to={getRouteSettings()}
          startContent={<Settings strokeWidth={1} />}
          radius="full"
        >
          {t("nav.settings")}
        </Button>

        <Popover placement="right">
          <PopoverTrigger>
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              classNames={{}}
              name="Тилекбек Раимкулов"
              className=" text-white bg-default-400 w-full flex justify-start px-3 py-2 rounded-2xl"
            />
          </PopoverTrigger>
          <PopoverContent className="bg-default-400">
            <Button
              as={Link}
              to={getRouteAuth()}
              startContent={<LogOut strokeWidth={1} />}
              radius="full"
            >
              {t("nav.logout")}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
