import AccountManagementPage from "../pages/admin/accountManagementPage";

export const ROUTERS = {
    USER: {
        HOME: "/",
        PROFILE: "/profile/*",
        LOGIN: "/login",
        SEARCH: "/search",
        PRODUCT: "/product/:productID"
    },
    ADMIN: {
        PRODUCT_MANAGEMENT: "/admin/product-management-page/*",
        ACCOUNT_MANAGEMENT: "/admin/account-management-page/*"
    }
}