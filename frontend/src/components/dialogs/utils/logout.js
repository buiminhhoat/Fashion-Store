import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies();

    return async () => {
        try {
            // Xóa tất cả các cookies
            const cookieNames = Object.keys(cookies);
            for (const cookieName of cookieNames) {
                await removeCookie(cookieName, {path: '/'});
            }

            // Xóa toàn bộ caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(async function (cacheName) {
                        return await caches.delete(cacheName);
                    })
                );
            }

            // Redirect về trang chính của bạn (localhost:3000)
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
}
