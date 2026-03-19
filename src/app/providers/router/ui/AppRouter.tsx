import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";
import { PageLoader } from "@/widgets/PageLoader";
import RequireAuth from "./RequireAuth";
import {
  getRouteAuth,
  getRouteRegistration,
  getRouteLanding,
} from "@/shared/const/router";

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => {
          const isPublic =
            path === getRouteAuth() ||
            path === getRouteRegistration() ||
            path === getRouteLanding();

          const wrapped = isPublic ? (
            element
          ) : (
            <RequireAuth>{element as React.ReactElement}</RequireAuth>
          );

          return <Route key={path} path={path} element={wrapped} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
