import { useCookies } from "react-cookie";

export function useLogout() {
    const [, , removeAccessTokenCookie] = useCookies(['access_token']);
    const [, , removeRefreshTokenCookie] = useCookies(['refresh_token']);

    const logout = () => {
        removeAccessTokenCookie('access_token');
        removeRefreshTokenCookie('refresh_token');
        window.location.reload();
    };

    return logout;
}
