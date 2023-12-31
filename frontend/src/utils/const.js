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
  EMPTY_SIZE_NAME: "Tên kích cỡ không được để trống",
  EMPTY_QUANTITY: "Số lượng không được để trống",
  MISSING_PRODUCT_CATEGORY: "Vui lòng chọn danh mục sản phẩm",
  MISSING_PRODUCT_DESCRIPTION: "Vui lòng nhập mô tả sản phẩm",
  MISSING_CATEGORY_NAME: "Tên danh mục không được để trống",
  CATEGORY_NAME_INVALID: "Tên danh mục phải bắt đầu bằng một chữ cái",
  EDIT_PRODUCT_SUCCESS: "Chỉnh sửa thông tin sản phẩm thành công",
  INSUFFICIENT_QUANTITY: "Số lượng sẵn có không đủ!",
}

export const API = {
  GET_USER_DATA_ENDPOINT: "/api/public/get-user-data",
  LOGIN_ENDPOINT: "/api/public/login",
  GET_ALL_CATEGORIES_ENDPOINT: "/api/public/get-all-categories",
  UPLOAD_PROFILE_IMAGE_ENDPOINT: "/api/public/upload-profile-image",
  GET_STORE_INFORMATION_ENDPOINT: "/api/public/get-store-information",
}