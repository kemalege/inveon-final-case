import React, { createContext, useState } from "react";

type AuthState = {
    user: string | null;
    roles?: string[];
    accessToken?: string;
    refreshToken?: string;
}

export interface AuthContextType {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthContextType["auth"]>>;
    setUserAuth: (auth: AuthState) => void;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState<AuthContextType["auth"]>({ user: null });

    const setUserAuth = (auth:AuthState) => {
        setAuth(auth);
        localStorage.setItem("accessToken", auth.accessToken as string);
        localStorage.setItem("refreshToken", auth.refreshToken as string);
    }

    const logout = () => {
        setAuth({ user: null, roles: [], accessToken: undefined });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, setUserAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};