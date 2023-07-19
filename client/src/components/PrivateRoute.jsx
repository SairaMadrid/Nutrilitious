import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.isLoggedIn ? children : <Navigate to="/login" />;
}
