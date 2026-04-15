import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { LogIn, LogOut } from "lucide-react";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "@/shared/api/axios";
import { useTranslation } from "react-i18next";

interface LandingNavbarProps {
  onOpenModal: () => void;
}

export function LandingNavbar({ onOpenModal }: LandingNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getAccessToken());
  const { i18n, t } = useTranslation();

  const menuItems = [
    { label: t("landing.nav.lessons"), href: "/lessons" },
    { label: t("landing.nav.whyUs"), href: "#why" },
    { label: t("landing.nav.app"), href: "#app" },
    { label: t("landing.nav.tariffs"), href: "#formats" },
  ];

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user_role");
    navigate("/");
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const scroll = () => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(scroll, 300);
      } else {
        scroll();
      }
    } else if (href === "/lessons" && !isLoggedIn) {
      onOpenModal();
    } else {
      navigate(href);
    }
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
      className="absolute top-3 left-0 right-0 z-40 bg-transparent"
      classNames={{
        base: "shadow-none bg-transparent backdrop-blur-none backdrop-saturate-100",
        wrapper:
          "bg-white rounded-2xl shadow-[0_1px_0_rgba(255,255,255,0.4)] px-4 md:px-5 mx-4 md:mx-auto max-w-6xl h-14",
        menu: "bg-white/95 backdrop-blur-md pt-4 gap-4",
      }}
    >
      {/* Mobile toggle */}
      <NavbarContent className="md:!hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        />
      </NavbarContent>

      <NavbarBrand>
        <a href="/">
          <img src="/logo.png" alt="Logomir" className="h-14 w-auto" />
        </a>
      </NavbarBrand>

      {/* Desktop nav links */}
      <NavbarContent className="hidden md:flex gap-7" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-base text-[#242424] font-medium hover:text-[#3cb96a] transition-colors"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* CTA button */}
      <NavbarContent justify="end">
        {/* Language switcher */}
        <NavbarItem>
          <div className="flex gap-1">
            {["ru", "kg"].map((lang) => (
              <button
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                  i18n.language === lang
                    ? "bg-[#242424] text-white"
                    : "text-[#242424] hover:bg-gray-100"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </NavbarItem>

        <NavbarItem>
          {isLoggedIn ? (
            <Button
              onPress={handleLogout}
              className="bg-red-400 text-white text-sm font-semibold hover:bg-red-500 rounded-xl h-9 px-5"
              endContent={<LogOut size={18} />}
            >
              {t("landing.nav.logout")}
            </Button>
          ) : (
            <Button
              onPress={onOpenModal}
              className="bg-[#7bcf58] text-white text-sm font-semibold hover:bg-[#6fc44c] rounded-xl h-9 px-5"
              endContent={<LogIn size={18} />}
            >
              {t("landing.nav.login")}
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <a
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setIsMenuOpen(false);
              }}
              className="w-full text-base text-[#242424] font-medium py-2 block"
            >
              {item.label}
            </a>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          {isLoggedIn ? (
            <Button
              onPress={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-400 text-white text-base font-semibold hover:bg-red-500 rounded-xl w-full mt-2"
              endContent={<LogOut size={18} />}
            >
              {t("landing.nav.logout")}
            </Button>
          ) : (
            <Button
              onPress={() => {
                setIsMenuOpen(false);
                onOpenModal();
              }}
              className="bg-[#7bcf58] text-white text-base font-semibold hover:bg-[#6fc44c] rounded-xl w-full mt-2"
              endContent={<LogIn size={18} />}
            >
              {t("landing.nav.login")}
            </Button>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
