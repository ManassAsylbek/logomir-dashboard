export enum AppRoutes {
  LANDING = "landing",
  MAIN = "main",
  AUTH = "auth",
  REGISTRATION = "registration",
  SETTINGS = "settings",
  STUDENTS = "students",
  STUDENT_PROFILE = "student-profile",
  SCHEDULED_LESSONS = "scheduled-lessons",
  PAYMENT_REQUESTS = "payment-requests",
  THERAPISTS = "therapists",
  NEWS = "news",
  PRESENTATIONS = "presentations",
  GAMES = "games",
  LESSONS = "lessons",
  // FORBIDDEN = "forbidden",
}

export const getRouteLanding = () => "/";
export const getRouteMain = () => "/dashboard";
export const getRouteAuth = () => "/auth";
export const getRouteRegistration = () => "/registration";
export const getRouteSettings = () => "/settings";
export const getRouteStudents = () => "/students";
export const getRouteStudentProfile = (id: string = ":id") => `/students/${id}`;
export const getRouteScheduledLessons = () => "/scheduled-lessons";
export const getRoutePaymentRequests = () => "/payment-requests";
export const getRouteTherapists = () => "/therapists";
export const getRouteNews = () => "/news";
export const getRoutePresentations = () => "/presentations";
export const getRouteGames = () => "/games";
export const getRouteLessons = () => "/lessons";

// export const getRouteForbidden = () => "/forbidden";

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteLanding()]: AppRoutes.LANDING,
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAuth()]: AppRoutes.AUTH,
  [getRouteRegistration()]: AppRoutes.REGISTRATION,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteStudents()]: AppRoutes.STUDENTS,
  [getRouteStudentProfile()]: AppRoutes.STUDENT_PROFILE,
  [getRouteScheduledLessons()]: AppRoutes.SCHEDULED_LESSONS,
  [getRoutePaymentRequests()]: AppRoutes.PAYMENT_REQUESTS,
  [getRouteTherapists()]: AppRoutes.THERAPISTS,
  [getRouteNews()]: AppRoutes.NEWS,
  [getRoutePresentations()]: AppRoutes.PRESENTATIONS,
  [getRouteGames()]: AppRoutes.GAMES,
  [getRouteLessons()]: AppRoutes.LESSONS,
  // [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
