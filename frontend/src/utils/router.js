export const ROUTERS = {
    USER: {
        HOME: "/",
        PROFILE: "/profile/*",
        LOGIN: "/login",
        SEARCH: "/search/:keyword",
        CHECKOUT: "/checkout",
        PRODUCT: "/product",
        CATEGORY: "/category/:keyword",
        CART: "/cart",
    },
    ADMIN: {
        PRODUCT_MANAGEMENT: "/admin/product-management-page/*",
        ACCOUNT_MANAGEMENT: "/admin/account-management-page/*"
    }
}