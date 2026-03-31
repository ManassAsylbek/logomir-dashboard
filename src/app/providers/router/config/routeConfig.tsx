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
const MainPage = lazy(() => import("@/pages/Main/ui/MainPage"));
const LandingPage = lazy(() => import("@/pages/Landing/ui/LandingPage"));
const StudentsPage = lazy(() => import("@/pages/Students/ui/StudentsPage"));
const StudentProfilePage = lazy(() => import("@/pages/StudentProfile/ui/StudentProfilePage"));
const ScheduledLessonsPage = lazy(() => import("@/pages/ScheduledLessons/ui/ScheduledLessonsPage"));
const SettingsPage = lazy(() => import("@/pages/Settings/ui/SettingsPage"));
const PaymentRequestsPage = lazy(() => import("@/pages/PaymentRequests/ui/PaymentRequestsPage"));
const TherapistsPage = lazy(() => import("@/pages/Therapists/ui/TherapistsPage"));
const NewsPage = lazy(() => import("@/pages/News/ui/NewsPage"));
const PresentationsPage = lazy(() => import("@/pages/Presentations/ui/PresentationsPage"));
const GamesPage = lazy(() => import("@/pages/Games/ui/GamesPage"));
const LessonsPage = lazy(() => import("@/pages/Lessons/ui/LessonsPage"));
const RegistrationPage = lazy(() => import("@/pages/Registration/ui/RegistrationPage"));

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
