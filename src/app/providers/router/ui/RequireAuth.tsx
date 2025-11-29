import { Navigate } from "react-router-dom";
// import { getUserAuthData, getUserRoles, UserRole } from "@/entities/User";
import { getRouteAuth } from "@/shared/const/router";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: string[];
}

export function RequireAuth({ children }: RequireAuthProps) {
  // const auth = useSelector(getUserAuthData);
  // const location = useLocation();
  // const userRoles = useSelector(getUserRoles);

  // const hasRequiredRoles = useMemo(() => {
  //     if (!roles) {
  //         return true;
  //     }

  //     return roles.some((requiredRole) => {
  //         const hasRole = userRoles?.includes(requiredRole);
  //         return hasRole;
  //     });
  // }, [roles, userRoles]);

  // if (!auth) {
  //     return (
  //         <Navigate to={getRouteMain()} state={{ from: location }} replace />
  //     );
  // }

  const hasRequiredRoles = false;

  if (!hasRequiredRoles) {
    return <Navigate to={getRouteAuth()} state={{ from: location }} replace />;
  }

  return children;
}
