import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

interface RequireAuthProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  const userHasRequiredRole = allowedRoles ? auth?.roles?.some((role) => allowedRoles.includes(role)) : true;

  if (allowedRoles?.length === 0) {
      return <>{children}</>;;
  }

  console.log(auth?.roles);

  if (userHasRequiredRole) {
    return <>{children}</>;
  }

  if (auth?.user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
