import React, { createContext, useState } from "react";

export interface AuthContextType {
    auth: {
        user: string | null;
        roles?: string[];
        accessToken?: string
        refreshToken?: string
    };
    setAuth: React.Dispatch<React.SetStateAction<AuthContextType["auth"]>>;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState<AuthContextType["auth"]>({ user: null });

    const logout = () => {
        setAuth({ user: null, roles: [], accessToken: undefined });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};