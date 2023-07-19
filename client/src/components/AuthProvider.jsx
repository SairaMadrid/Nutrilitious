import AuthContext from "../contexts/auth";
import useProvideAuth from "../hooks/useProvideAuth";

export default function AuthProvider({children}) {
  const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    );
}
