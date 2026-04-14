import React from "react";
import { Navigate } from "react-router-dom";
import {
  getRouteAuth,
  getRouteLessons,
  getRouteMain,
} from "@/shared/const/router";
import useUser from "@/shared/services/user/useUser";
import { PageLoader } from "@/widgets/PageLoader";

const RequireAuth: React.FC<{
  children: React.ReactElement;
  allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
  const { data, isLoading, isError } = useUser();

  if (isLoading) return <PageLoader />;

  if (isError || !data) {
    return <Navigate to={getRouteAuth()} replace />;
  }

  if (allowedRoles) {
    const role = localStorage.getItem("user_role") ?? "";
    if (!allowedRoles.includes(role)) {
      return (
        <Navigate
          to={role === "student" ? getRouteLessons() : getRouteMain()}
          replace
        />
      );
    }
  }

  return children;
};

export default RequireAuth;
