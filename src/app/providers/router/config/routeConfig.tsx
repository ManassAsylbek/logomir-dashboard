import { lazy } from "react";
import {
  AppRoutes,
  getRouteAuth,
  getRouteRegistration,
  getRouteLanding,
  getRouteMain,
  getRouteSettings,
  getRouteStudents,
  getRouteStudentProfile,
  getRouteScheduledLessons,
  getRoutePaymentRequests,
  getRouteTherapists,
  getRouteNews,
  getRoutePresentations,
  getRouteGames,
  getRouteLessons,
} from "@/shared/const/router";
import { AppRoutesProps } from "@/shared/types/router";
import { DefaultLayout } from "@/shared/layouts";

const AuthPage = lazy(() => import("@/pages/Auth/ui/AuthPage"));
const MainPage = lazy(() => import("@/pages/Main").then(m => ({ default: m.MainPage })));
const LandingPage = lazy(() => import("@/pages/Landing").then(m => ({ default: m.LandingPage })));
const StudentsPage = lazy(() => import("@/pages/Students").then(m => ({ default: m.StudentsPage })));
const StudentProfilePage = lazy(() => import("@/pages/StudentProfile").then(m => ({ default: m.StudentProfilePage })));
const ScheduledLessonsPage = lazy(() => import("@/pages/ScheduledLessons").then(m => ({ default: m.ScheduledLessonsPage })));
const SettingsPage = lazy(() => import("@/pages/Settings").then(m => ({ default: m.SettingsPage })));
const PaymentRequestsPage = lazy(() => import("@/pages/PaymentRequests").then(m => ({ default: m.PaymentRequestsPage })));
const TherapistsPage = lazy(() => import("@/pages/Therapists").then(m => ({ default: m.TherapistsPage })));
const NewsPage = lazy(() => import("@/pages/News").then(m => ({ default: m.NewsPage })));
const PresentationsPage = lazy(() => import("@/pages/Presentations").then(m => ({ default: m.PresentationsPage })));
const GamesPage = lazy(() => import("@/pages/Games").then(m => ({ default: m.GamesPage })));
const LessonsPage = lazy(() => import("@/pages/Lessons").then(m => ({ default: m.LessonsPage })));
const RegistrationPage = lazy(() => import("@/pages/Registration").then(m => ({ default: m.RegistrationPage })));

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.LANDING]: {
    path: getRouteLanding(),
    element: <LandingPage />,
  },
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: (
      <DefaultLayout>
        <MainPage />
      </DefaultLayout>
    ),
  },
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: <AuthPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.SETTINGS]: {
    path: getRouteSettings(),
    element: <SettingsPage />,
  },
  [AppRoutes.STUDENTS]: {
    path: getRouteStudents(),
    element: <StudentsPage />,
  },
  [AppRoutes.STUDENT_PROFILE]: {
    path: getRouteStudentProfile(),
    element: <StudentProfilePage />,
  },
  [AppRoutes.SCHEDULED_LESSONS]: {
    path: getRouteScheduledLessons(),
    element: <ScheduledLessonsPage />,
  },
  [AppRoutes.PAYMENT_REQUESTS]: {
    path: getRoutePaymentRequests(),
    element: <PaymentRequestsPage />,
  },
  [AppRoutes.THERAPISTS]: {
    path: getRouteTherapists(),
    element: <TherapistsPage />,
  },
  [AppRoutes.NEWS]: {
    path: getRouteNews(),
    element: <NewsPage />,
  },
  [AppRoutes.PRESENTATIONS]: {
    path: getRoutePresentations(),
    element: (
      <DefaultLayout>
        <PresentationsPage />
      </DefaultLayout>
    ),
  },
  [AppRoutes.GAMES]: {
    path: getRouteGames(),
    element: (
      <DefaultLayout>
        <GamesPage />
      </DefaultLayout>
    ),
  },
  [AppRoutes.LESSONS]: {
    path: getRouteLessons(),
    element: <LessonsPage />,
  },
};
