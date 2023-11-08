import { useCookies } from "react-cookie";

export function useLogout() {
    const [, , removeAccessTokenCookie] = useCookies(['access_token']);
    const [, , removeRefreshTokenCookie] = useCookies(['refresh_token']);

    const logout = () => {
        removeAccessTokenCookie('access_token');
        removeAccessTokenCookie('access_token');
        removeAccessTokenCookie('access_token');
        removeAccessTokenCookie('access_token');
        removeAccessTokenCookie('access_token');
        removeAccessTokenCookie('access_token');

        removeRefreshTokenCookie('refresh_token');

        // Redirect về trang chính của bạn (localhost:3000)
        window.location.href = '/';
    };

    return logout;
}
