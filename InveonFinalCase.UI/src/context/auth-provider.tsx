import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";

type AuthState = {
    user: string | null;
    roles?: string[];
    accessToken?: string;
    refreshToken?: string;
}

type DecodedToken ={
    given_name: string;
    sub: string;
    roles?: string[];
    exp: number;
}

export interface AuthContextType {
    auth: AuthState;
    isAuthenticated: () => boolean;
    getDecodedToken: () => DecodedToken | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthContextType["auth"]>>;
    setUserAuth: (auth: AuthState) => void;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState<AuthContextType["auth"]>({ user: null });

    const getDecodedToken = () => {
        try {
            const accessToken = auth.accessToken || localStorage.getItem("accessToken");
            if (!accessToken) return null;
            return jwtDecode<DecodedToken>(accessToken);
        } catch (error) {
            console.error("Invalid token format:", error);
            return null;
        }
    };

    const isAuthenticated = (): boolean => {
        const token = localStorage.getItem("accessToken");
        if (!token) return false;
        return true;
    };

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
        <AuthContext.Provider value={{ auth, isAuthenticated, getDecodedToken, setAuth, setUserAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};