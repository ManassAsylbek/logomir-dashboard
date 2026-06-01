import { lazy, Suspense } from "react";
import {
  AppRoutes,
  getRouteAuth,
  getRouteLanding,
  getRouteMain,
  getRouteSettings,
  getRouteStudents,
  getRouteStudentProfile,
  getRouteScheduledLessons,
  getRouteClientBooking,
  getRouteAchievements,
  getRouteConsultations,
  getRoutePaymentRequests,
  getRouteTherapists,
  getRouteNews,
  getRoutePresentations,
  getRouteGames,
  getRouteLessons,
} from "@/shared/const/router";
import { AppRoutesProps } from "@/shared/types/router";
import { DefaultLayout } from "@/shared/layouts";
import { PageLoader } from "@/widgets/PageLoader";

/** Оборачивает lazy-страницу в Suspense без DefaultLayout */
const withSuspense = (element: React.ReactElement) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

/** Оборачивает lazy-страницу в Suspense + DefaultLayout.
 *  Sidebar и layout рендерятся сразу, мигает только контент внутри. */
const withLayout = (element: React.ReactElement) => (
  <DefaultLayout>
    <Suspense fallback={<PageLoader />}>{element}</Suspense>
  </DefaultLayout>
);

const AuthPage = lazy(() => import("@/pages/Auth/ui/AuthPage"));
const MainPage = lazy(() => import("@/pages/Main/ui/MainPage"));
const LandingPage = lazy(() => import("@/pages/Landing/ui/LandingPage"));
const StudentsPage = lazy(() => import("@/pages/Students/ui/StudentsPage"));
const StudentProfilePage = lazy(
  () => import("@/pages/StudentProfile/ui/StudentProfilePage"),
);
const ScheduledLessonsPage = lazy(
  () => import("@/pages/ScheduledLessons/ui/ScheduledLessonsPage"),
);
const ClientBookingPage = lazy(
  () => import("@/pages/ClientBooking/ui/ClientBookingPage"),
);
const AchievementsPage = lazy(
  () => import("@/pages/Achievements/ui/AchievementsPage"),
);
const ConsultationsPage = lazy(
  () => import("@/pages/Consultations/ui/ConsultationsPage"),
);
const SettingsPage = lazy(() => import("@/pages/Settings/ui/SettingsPage"));
const PaymentRequestsPage = lazy(
  () => import("@/pages/PaymentRequests/ui/PaymentRequestsPage"),
);
const TherapistsPage = lazy(
  () => import("@/pages/Therapists/ui/TherapistsPage"),
);
const NewsPage = lazy(() => import("@/pages/News/ui/NewsPage"));
const PresentationsPage = lazy(
  () => import("@/pages/Presentations/ui/PresentationsPage"),
);
const GamesPage = lazy(() => import("@/pages/Games/ui/GamesPage"));
const LessonsPage = lazy(() => import("@/pages/Lessons/ui/LessonsPage"));

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.LANDING]: {
    path: getRouteLanding(),
    element: withSuspense(<LandingPage />),
  },
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: withLayout(<MainPage />),
  },
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: withSuspense(<AuthPage />),
  },
  [AppRoutes.SETTINGS]: {
    path: getRouteSettings(),
    element: withLayout(<SettingsPage />),
  },
  [AppRoutes.STUDENTS]: {
    path: getRouteStudents(),
    element: withLayout(<StudentsPage />),
  },
  [AppRoutes.STUDENT_PROFILE]: {
    path: getRouteStudentProfile(),
    element: withLayout(<StudentProfilePage />),
  },
  [AppRoutes.SCHEDULED_LESSONS]: {
    path: getRouteScheduledLessons(),
    element: withLayout(<ScheduledLessonsPage />),
  },
  [AppRoutes.CLIENT_BOOKING]: {
    path: getRouteClientBooking(),
    element: withLayout(<ClientBookingPage />),
  },
  [AppRoutes.ACHIEVEMENTS]: {
    path: getRouteAchievements(),
    element: withLayout(<AchievementsPage />),
  },
  [AppRoutes.CONSULTATIONS]: {
    path: getRouteConsultations(),
    element: withLayout(<ConsultationsPage />),
  },
  [AppRoutes.PAYMENT_REQUESTS]: {
    path: getRoutePaymentRequests(),
    element: withLayout(<PaymentRequestsPage />),
  },
  [AppRoutes.THERAPISTS]: {
    path: getRouteTherapists(),
    element: withLayout(<TherapistsPage />),
  },
  [AppRoutes.NEWS]: {
    path: getRouteNews(),
    element: withLayout(<NewsPage />),
  },
  [AppRoutes.PRESENTATIONS]: {
    path: getRoutePresentations(),
    element: withLayout(<PresentationsPage />),
  },
  [AppRoutes.GAMES]: {
    path: getRouteGames(),
    element: withLayout(<GamesPage />),
  },
  [AppRoutes.LESSONS]: {
    path: getRouteLessons(),
    element: withSuspense(<LessonsPage />),
  },
};
