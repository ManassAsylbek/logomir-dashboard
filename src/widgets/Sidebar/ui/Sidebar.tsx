import { links } from "@/widgets/Sidebar/model/constants";
import { Button } from "@heroui/button";
import { LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@heroui/user";
import { getRouteAuth, getRouteSettings } from "@/shared/const/router";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";

const Sidebar = () => {
  const { pathname } = useLocation();

  const isSettingActive = pathname === getRouteSettings();
  return (
    <div className="min-w-72 bg-[#272727] flex flex-col justify-start p-6">
      <img src="logo2.png" width={70} className="ml-4 mb-12" />

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
          Настройки
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
              выйти
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
