import React from "react";
import { Navigate } from "react-router-dom";
import { getRouteAuth } from "@/shared/const/router";
import useUser from "@/shared/services/user/useUser";
import { PageLoader } from "@/widgets/PageLoader";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  // useUser will only run if access token exists (see useUser.enabled)
  const { data, isLoading, isError } = useUser();

  // If the query is loading, show loader while we validate session
  if (isLoading) return <PageLoader />;

  // If user fetch failed (401 or no token), redirect to auth
  if (isError || !data) {
    return <Navigate to={getRouteAuth()} replace />;
  }

  return children;
};

export default RequireAuth;
