import axios from '@/api/axios';
import useAuth from './useAuth';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/pages/auth/login/hooks/useLogin';

const useRefreshToken = () => {
    const { setUserAuth } = useAuth();

    const refresh = async (refreshToken: string) => {
        const response = await axios.post('/auth/refresh-token', {
            refreshToken: refreshToken
        }, {
            withCredentials: true
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data.token;
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        const { given_name } = decodedToken;
        let { roles } = decodedToken;

        if (typeof roles === "string") {
            roles = [roles];
        }
        setUserAuth({ user: given_name, roles, accessToken, refreshToken: newRefreshToken });
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;