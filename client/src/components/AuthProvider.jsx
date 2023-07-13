import AuthContext from "../contexts/auth";
import useProvideAuth from "../hooks/useProvideAuth";

export default function AuthProvider({ children }) {
  const authObject = useProvideAuth();
  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
