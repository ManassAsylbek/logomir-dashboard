export enum AppRoutes {
  MAIN = "main",
  AUTH = "auth",
  SETTINGS = "settings",
  STUDENTS = "students",
  STUDENT_PROFILE = "student-profile",
  SCHEDULED_LESSONS = "scheduled-lessons",
  // FORBIDDEN = "forbidden",
}

export const getRouteMain = () => "/";
export const getRouteAuth = () => "/auth";
export const getRouteSettings = () => "/settings";
export const getRouteStudents = () => "/students";
export const getRouteStudentProfile = (id: string = ":id") => `/students/${id}`;
export const getRouteScheduledLessons = () => "/scheduled-lessons";

// export const getRouteForbidden = () => "/forbidden";

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAuth()]: AppRoutes.AUTH,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteStudents()]: AppRoutes.STUDENTS,
  [getRouteStudentProfile()]: AppRoutes.STUDENT_PROFILE,
  [getRouteScheduledLessons()]: AppRoutes.SCHEDULED_LESSONS,
  // [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
