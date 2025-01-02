import { AuthContext, AuthContextType } from "@/context/auth-provider";
import { useContext, useDebugValue } from "react";

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { auth } = context;
    useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

    return context;
};

export default useAuth;
