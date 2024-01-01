import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const [, , removeAccessTokenCookie] = useCookies(['access_token']);
    const [, , removeRefreshTokenCookie] = useCookies(['refresh_token']);

    const logout = async () => {
        // Xóa cookies
        await Promise.all([
            removeAccessTokenCookie('access_token'),
            removeRefreshTokenCookie('refresh_token')
        ]);

        // Xóa cache
        await caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('your-cache-prefix-');
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        });

        // Redirect về trang chính của bạn (localhost:3000)
        navigate('/');
    };

    return logout;
}
