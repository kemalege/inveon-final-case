import React, { createContext, useState } from "react";

export interface AuthContextType {
    auth: {
        user: string | null;
        roles?: string[];
        accessToken?: string
    };
    setAuth: React.Dispatch<React.SetStateAction<AuthContextType["auth"]>>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState<AuthContextType["auth"]>({ user: null });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};