import {useCookies} from "react-cookie";

export function useLogout() {
    const [, , removeAccessTokenCookie] = useCookies(['access_token']);
    const [, , removeRefreshTokenCookie] = useCookies(['refresh_token']);

    return async () => {
        // console.log('Access Token:', document.cookie);
        removeAccessTokenCookie('access_token');
        removeRefreshTokenCookie('refresh_token');
        window.location.reload();
        window.location.href = '/';
    };
}
