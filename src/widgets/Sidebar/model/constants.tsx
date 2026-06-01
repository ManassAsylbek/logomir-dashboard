import {
  getRouteMain,
  getRouteStudents,
  getRouteScheduledLessons,
  getRouteClientBooking,
  getRouteAchievements,
  getRoutePaymentRequests,
  getRouteTherapists,
  getRouteNews,
  getRoutePresentations,
  getRouteGames,
} from "@/shared/const/router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  DollarSign,
  Stethoscope,
  Newspaper,
  Presentation,
  Gamepad2,
  UserPlus,
  Trophy,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useLinks = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      label: t("nav.main"),
      icon: <LayoutDashboard strokeWidth={1} />,
      href: getRouteMain(),
    },
    {
      id: 3,
      label: t("nav.students"),
      icon: <Users strokeWidth={1} />,
      href: getRouteStudents(),
    },
    {
      id: 4,
      label: t("nav.scheduledLessons"),
      icon: <CalendarDays strokeWidth={1} />,
      href: getRouteScheduledLessons(),
    },
    {
      id: 10,
      label: t("nav.clientBooking"),
      icon: <UserPlus strokeWidth={1} />,
      href: getRouteClientBooking(),
    },
    {
      id: 11,
      label: t("nav.achievements"),
      icon: <Trophy strokeWidth={1} />,
      href: getRouteAchievements(),
    },
    {
      id: 5,
      label: t("nav.paymentRequests"),
      icon: <DollarSign strokeWidth={1} />,
      href: getRoutePaymentRequests(),
    },
    {
      id: 6,
      label: t("nav.therapists"),
      icon: <Stethoscope strokeWidth={1} />,
      href: getRouteTherapists(),
    },
    {
      id: 7,
      label: t("nav.news"),
      icon: <Newspaper strokeWidth={1} />,
      href: getRouteNews(),
    },
    {
      id: 8,
      label: t("nav.presentations"),
      icon: <Presentation strokeWidth={1} />,
      href: getRoutePresentations(),
    },
    {
      id: 9,
      label: t("nav.games"),
      icon: <Gamepad2 strokeWidth={1} />,
      href: getRouteGames(),
    },
  ];
};
