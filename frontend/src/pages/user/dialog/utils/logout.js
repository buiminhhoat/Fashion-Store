import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const [, , removeAccessTokenCookie] = useCookies(['access_token']);
    const [, , removeRefreshTokenCookie] = useCookies(['refresh_token']);

    const logout = async () => {
        navigate('/');
        console.log('Access Token:', document.cookie);
        removeAccessTokenCookie('access_token');
        removeRefreshTokenCookie('refresh_token');

        // Redirect về trang chính của bạn (localhost:3000)
        // window.location.href = '/';
    };

    return logout;
}
