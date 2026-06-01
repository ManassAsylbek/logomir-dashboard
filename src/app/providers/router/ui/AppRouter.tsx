import React from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";
import RequireAuth from "./RequireAuth";
import {
  getRouteAuth,
  getRouteLanding,
  getRouteLessons,
} from "@/shared/const/router";

const THERAPIST_ONLY_ROUTES = [
  "/dashboard",
  "/settings",
  "/students",
  "/scheduled-lessons",
  "/client-booking",
  "/achievements",
  "/consultation-requests",
  "/payment-requests",
  "/therapists",
  "/news",
  "/presentations",
  "/games",
];

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => {
        const isPublic =
          path === getRouteAuth() || path === getRouteLanding();

        const isStudentRoute = path === getRouteLessons();

        const isTherapistOnly = path
          ? THERAPIST_ONLY_ROUTES.includes(path)
          : false;

        let wrapped: React.ReactElement;

        if (isPublic) {
          wrapped = element as React.ReactElement;
        } else if (isStudentRoute) {
          // Lessons доступны только студентам
          wrapped = (
            <RequireAuth allowedRoles={["student"]}>
              {element as React.ReactElement}
            </RequireAuth>
          );
        } else if (isTherapistOnly) {
          // Остальные страницы только для учителей
          wrapped = (
            <RequireAuth allowedRoles={["therapist"]}>
              {element as React.ReactElement}
            </RequireAuth>
          );
        } else {
          wrapped = <RequireAuth>{element as React.ReactElement}</RequireAuth>;
        }

        return <Route key={path} path={path} element={wrapped} />;
      })}
    </Routes>
  );
};

export default AppRouter;
