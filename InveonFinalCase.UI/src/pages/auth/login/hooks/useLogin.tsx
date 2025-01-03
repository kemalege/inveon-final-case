// hooks/useLogin.ts
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router";
import axios from "@/api/axios";

interface DecodedToken {
    given_name: string;
    roles: string | string[];
    accessToken: string;
}

export const useLogin = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            const accessToken = data.token.accessToken;
            const refreshToken = data.token.refreshToken;
            const decodedToken = jwtDecode<DecodedToken>(accessToken);
            const { given_name } = decodedToken;
            let { roles } = decodedToken;

            if (typeof roles === "string") {
                roles = [roles];
            }

            setAuth({ user: given_name, roles, accessToken, refreshToken });
            localStorage.setItem("accessToken", accessToken); 
            localStorage.setItem("refreshToken", refreshToken); 
            navigate(from, { replace: true });
        },
        onError: (error) => {
            console.error("Login Failed:", error);
        },
    });
};

const LOGIN_URL = "/auth/login";

const loginUser = async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, 
        }
    );
    return response.data;
};

