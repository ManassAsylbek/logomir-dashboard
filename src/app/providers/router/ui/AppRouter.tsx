import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";
import { PageLoader } from "@/widgets/PageLoader";
import RequireAuth from "./RequireAuth";
import {
  getRouteAuth,
  getRouteRegistration,
  getRouteLanding,
  getRouteLessons,
} from "@/shared/const/router";

const THERAPIST_ONLY_ROUTES = [
  "/dashboard",
  "/settings",
  "/students",
  "/scheduled-lessons",
  "/payment-requests",
  "/therapists",
  "/news",
  "/presentations",
  "/games",
];

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => {
          const isPublic =
            path === getRouteAuth() ||
            path === getRouteRegistration() ||
            path === getRouteLanding();

          const isStudentRoute = path === getRouteLessons();

          const isTherapistOnly = path
            ? THERAPIST_ONLY_ROUTES.includes(path)
            : false;

          let wrapped: React.ReactElement;

          if (isPublic) {
            wrapped = element as React.ReactElement;
          } else if (isStudentRoute) {
            // Lessons доступны и студентам и учителям
            wrapped = (
              <RequireAuth allowedRoles={["student", "therapist"]}>
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
            wrapped = (
              <RequireAuth>{element as React.ReactElement}</RequireAuth>
            );
          }

          return <Route key={path} path={path} element={wrapped} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
