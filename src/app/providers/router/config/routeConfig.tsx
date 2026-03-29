import AuthPage from "@/pages/Auth/ui/AuthPage";
import { MainPage } from "@/pages/Main";
import { LandingPage } from "@/pages/Landing";
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
import { StudentsPage } from "@/pages/Students";
import { StudentProfilePage } from "@/pages/StudentProfile";
import { ScheduledLessonsPage } from "@/pages/ScheduledLessons";
import { SettingsPage } from "@/pages/Settings";
import { PaymentRequestsPage } from "@/pages/PaymentRequests";
import { TherapistsPage } from "@/pages/Therapists";
import { NewsPage } from "@/pages/News";
import { PresentationsPage } from "@/pages/Presentations";
import { GamesPage } from "@/pages/Games";
import { LessonsPage } from "@/pages/Lessons";
import { RegistrationPage } from "@/pages/Registration";
import { DefaultLayout } from "@/shared/layouts";

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
