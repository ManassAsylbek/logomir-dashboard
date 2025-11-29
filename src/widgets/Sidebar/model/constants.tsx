import {
  getRouteMain,
  getRouteStudents,
  getRouteScheduledLessons,
} from "@/shared/const/router";
import { LayoutDashboard, Users, CalendarDays } from "lucide-react";

export const links = [
  {
    id: 1,
    label: "Главная",
    icon: <LayoutDashboard strokeWidth={1} />,
    href: getRouteMain(),
  },
  // {
  //   id: 2,
  //   label: "Настройки",
  //   icon: <Settings strokeWidth={1} />,
  //   href: getRouteSettings(),
  // },
  {
    id: 3,
    label: "Ученики",
    icon: <Users strokeWidth={1} />,
    href: getRouteStudents(),
  },
  {
    id: 4,
    label: "Запланированные занятия",
    icon: <CalendarDays strokeWidth={1} />,
    href: getRouteScheduledLessons(),
  },
];
