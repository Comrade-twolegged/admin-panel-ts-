import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "../../app/store/store";
import { useAppSelector } from "../../hook";


interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state: RootState) => state.user.currentUser.current);

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
