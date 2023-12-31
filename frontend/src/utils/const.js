export const SCROLLING = {
  NORMAL: "normal",
  SMOOTH : "smooth",
  NO_SCROLLING: "no-scrolling",
}

export const MESSAGE = {
  DB_CONNECTION_ERROR: "Không thể kết nối với cơ sở dữ liệu",
  GENERIC_ERROR: "Có lỗi xảy ra! Vui lòng thử lại",
  ADD_PRODUCT_SUCCESS: "Thêm sản phẩm thành công",
  REGISTRATION_FAILED: "Đăng ký không thành công",
  USER_ADDED: "Đã thêm người dùng",
  USER_DELETED: "Đã xóa người dùng",
  ORDER_PLACED_SUCCESS: "Đặt hàng thành công!",
  ORDER_PLACEMENT_ERROR: "Lỗi khi đặt hàng",
  MISSING_DELIVERY_ADDRESS: "Vui lòng chọn địa chỉ nhận hàng",
  CONFIRMATION_PASSWORD_MISMATCH: "Nhập lại mật khẩu không khớp",
  MISSING_PRODUCT_IMAGE: "Vui lòng thêm hình ảnh sản phẩm",
  MISSING_PRODUCT_NAME: "Vui lòng nhập tên sản phẩm",
  MISSING_PRODUCT_PRICE: "Vui lòng nhập giá sản phẩm",
  MISSING_PRODUCT_SIZE: "Vui lòng thêm kích cỡ sản phẩm",
  MISSING_INFORMATION: "Vui lòng nhập đầy đủ thông tin",
  EMPTY_SIZE_NAME: "Tên kích cỡ không được để trống",
  EMPTY_QUANTITY: "Số lượng không được để trống",
  MISSING_PRODUCT_CATEGORY: "Vui lòng chọn danh mục sản phẩm",
  MISSING_PRODUCT_DESCRIPTION: "Vui lòng nhập mô tả sản phẩm",
  MISSING_CATEGORY_NAME: "Tên danh mục không được để trống",
  CATEGORY_NAME_INVALID: "Tên danh mục phải bắt đầu bằng một chữ cái",
  EDIT_PRODUCT_SUCCESS: "Chỉnh sửa thông tin sản phẩm thành công",
  INSUFFICIENT_QUANTITY: "Số lượng sẵn có không đủ!",
  REVIEW_CART: "Bạn hãy xem lại số lượng sản phẩm trong giỏ hàng, vì có một số sản phẩm đã có người mua!"
}

export const API = {
  PUBLIC: {
    GET_USER_DATA_ENDPOINT: "/api/public/get-user-data",
    LOGIN_ENDPOINT: "/api/public/login",
    REGISTER_ENDPOINT: "/api/public/register",
    GET_ALL_CATEGORIES_ENDPOINT: "/api/public/get-all-categories",
    UPLOAD_PROFILE_IMAGE_ENDPOINT: "/api/public/upload-profile-image",
    GET_STORE_INFORMATION_ENDPOINT: "/api/public/get-store-information",
    GET_ALL_BANNERS_ENDPOINT: "/api/public/get-all-banners",
    DELETE_PRODUCT_IN_CART_ENDPOINT: "/api/public/delete-product-in-cart",
    EDIT_PRODUCT_IN_CART_ENDPOINT: "/api/public/edit-product-in-cart",
    GET_ALL_ADDRESSES_ENDPOINT: "/api/public/get-all-addresses",
    IS_ADMIN_ENDPOINT: "/api/public/isAdmin",
    ADD_ORDERS_BY_CART_ENDPOINT: "/api/public/add-orders-by-cart",
    ADD_ORDERS_BY_CHECKOUT_ENDPOINT: "/api/public/add-orders-by-checkout",
    NEW_ADDRESS_ENDPOINT: "/api/public/new-address",
    EDIT_ADDRESS_ENDPOINT: "/api/public/edit-address",
    GET_CART_ENDPOINT: "/api/public/get-cart",
    GET_USER_ID_ENDPOINT: "/api/public/get-user-id",
    GET_ADDRESS_ENDPOINT: "/api/public/get-address",
    ADD_PRODUCT_TO_CART_ENDPOINT: "/api/public/add-product-to-cart",
    SET_DEFAULT_ADDRESS_ENDPOINT: "/api/public/set-default-address",
    CHANGE_PASSWORD_ENDPOINT: "/api/public/change-password",
    CANCEL_ORDER_ENDPOINT: "/api/public/orders/cancel-order",
    EDIT_PROFILE_ENDPOINT: "/api/public/edit-profile",
    DELETE_ADDRESS_ENDPOINT: "/api/public/delete-address",
    GET_ALL_ORDERS_BY_ORDER_STATUS_ENDPOINT: "/api/public/orders/get-all-orders-by-order-status",
    GET_RANDOM_12_PRODUCTS_ENDPOINT: "/api/public/all-categories/get-random-12-products",
    CATEGORY_ENDPOINT: "/api/public/category/",
    PRODUCT_ENDPOINT: "/api/public/product/",
    SEARCH_ENDPOINT: "/api/public/search/"
  },
  ADMIN: {
    EDIT_BANNER_ENDPOINT: "/api/admin/edit-banner",
    UPDATE_STORE_INFORMATION_ENDPOINT: "/api/admin/update-store-information",
    GET_ALL_USERS_ENDPOINT: "/api/admin/get-all-users",
    ADD_CATEGORY_ENDPOINT: "/api/admin/add-category",
  }

}