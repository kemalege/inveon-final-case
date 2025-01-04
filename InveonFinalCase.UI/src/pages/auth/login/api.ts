import axios from "@/api/axios";

export interface DecodedToken {
    given_name: string;
    roles: string | string[];
    accessToken: string;
}

const LOGIN_URL = "/auth/login";

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
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

