import AuthPage from "@/pages/Auth/ui/AuthPage";
import { MainPage } from "@/pages/Main";
import {
  AppRoutes,
  getRouteAuth,
  getRouteMain,
  getRouteSettings,
  getRouteStudents,
  getRouteStudentProfile,
  getRouteScheduledLessons,
} from "@/shared/const/router";
import { AppRoutesProps } from "@/shared/types/router";
import { StudentsPage } from "@/pages/Students";
import { StudentProfilePage } from "@/pages/StudentProfile";
import { ScheduledLessonsPage } from "@/pages/ScheduledLessons";
import { SettingsPage } from "@/pages/Settings";
import { DefaultLayout } from "@/shared/layouts";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
};
