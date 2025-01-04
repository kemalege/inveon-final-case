import axios from '@/api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async (refreshToken: string) => {
        const response = await axios.post('/auth/refresh-token', {
            refreshToken: refreshToken
        }, {
            withCredentials: true
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data.token;
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(accessToken);
            return { ...prev, accessToken, refreshToken: newRefreshToken };
        });
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;