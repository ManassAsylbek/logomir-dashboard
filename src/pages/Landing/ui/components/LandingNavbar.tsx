import { useState } from "react";
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
import { Link } from "@heroui/link";
import { LogIn } from "lucide-react";

interface LandingNavbarProps {
  onOpenModal: () => void;
}

const menuItems = [
  { label: "Почему мы", href: "#why" },
  { label: "Logomir Mobile", href: "#app" },
  { label: "Тарифы", href: "#formats" },
];

export function LandingNavbar({ onOpenModal }: LandingNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Brand */}
      <NavbarBrand>
        <a href="#">
          <img src="/logo.png" alt="Logomir" className="h-10 w-auto" />
        </a>
      </NavbarBrand>

      {/* Desktop nav links */}
      <NavbarContent className="hidden md:flex gap-7" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className="text-[13px] text-[#242424] font-medium hover:text-[#3cb96a] transition-colors"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* CTA button */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            onPress={onOpenModal}
            className="bg-[#7bcf58] text-white text-sm font-semibold hover:bg-[#6fc44c] rounded-xl h-9 px-5"
            endContent={<LogIn size={18} />}
          >
            Войти
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className="w-full text-base text-[#242424] font-medium py-2"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            onPress={() => {
              setIsMenuOpen(false);
              onOpenModal();
            }}
            className="bg-[#7bcf58] text-white text-sm font-semibold hover:bg-[#6fc44c] rounded-xl w-full mt-2"
            endContent={<LogIn size={18} />}
          >
            Войти
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
