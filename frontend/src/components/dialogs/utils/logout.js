import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies();

    const logout = async () => {
        // Xóa tất cả các cookies
        await Object.keys(cookies).forEach(cookieName => {
            removeCookie(cookieName);
        });

        // Xóa toàn bộ caches
        if ('caches' in window) {
            await caches.keys().then(async function(cacheNames) {
                await Promise.all(
                    cacheNames.map(async function(cacheName) {
                        return await caches.delete(cacheName);
                    })
                );
            });
        }

        // Redirect về trang chính của bạn (localhost:3000)
        navigate('/');
    };

    return logout;
}
