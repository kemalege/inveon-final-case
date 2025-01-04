import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

interface RequireAuthProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { isAuthenticated, getDecodedToken } = useAuth();
  const location = useLocation();
  
  const decodedToken = getDecodedToken();
  const roles = decodedToken ? decodedToken.roles : [];

  const userHasRequiredRole = allowedRoles ? (roles as string[]).some((role) => allowedRoles.includes(role)) : true;

  if (allowedRoles?.length === 0 && isAuthenticated()) {
      return <>{children}</>;;
  }

  if (userHasRequiredRole) {
    return <>{children}</>;
  }

  if (isAuthenticated()) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
