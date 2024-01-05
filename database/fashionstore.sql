-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 02, 2024 lúc 03:56 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28
-- DROP DATABASE fashionstore;
-- CREATE DATABASE fashionstore;
-- use fashionstore;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `fashionstore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `address`
--

CREATE TABLE `address` (
  `AddressID` bigint(20) NOT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `RecipientName` varchar(255) NOT NULL,
  `RecipientPhone` varchar(20) DEFAULT NULL,
  `AddressDetails` varchar(255) DEFAULT NULL,
  `IsDefault` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `address`
--

INSERT INTO `address` (`AddressID`, `UserID`, `RecipientName`, `RecipientPhone`, `AddressDetails`, `IsDefault`) VALUES
(1, 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội', 1),
(2, 1, 'Bùi Minh Hoạt', '0896037569', '134 Hai Bà Trưng, Thọ Sơn, Việt Trì, Phú Thọ', 0),
(3, 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội', 1),
(4, 3, 'Tiến Dũng', '0909090909', 'Quận 5, Hồ Chí Minh', 0),
(5, 4, 'Nguyễn Văn Vinh', '090909090', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banner`
--

CREATE TABLE `banner` (
  `BannerID` bigint(20) NOT NULL,
  `DisplayOrder` int(11) NOT NULL,
  `ImagePath` varchar(255) NOT NULL,
  `BannerLinkTo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `banner`
--

INSERT INTO `banner` (`BannerID`, `DisplayOrder`, `ImagePath`, `BannerLinkTo`) VALUES
(5, 0, 'https://iili.io/JRDfz1R.webp', '/'),
(6, 1, 'https://iili.io/JRDfIgp.webp', '/'),
(7, 2, 'https://iili.io/JRDfudN.webp', '/'),
(8, 3, 'https://iili.io/JRDfA7I.webp', '/');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `CartID` bigint(20) NOT NULL,
  `UserID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`CartID`, `UserID`) VALUES
(1, 1),
(3, 2),
(2, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cartitem`
--

CREATE TABLE `cartitem` (
  `CartItemID` bigint(20) NOT NULL,
  `CartID` bigint(20) DEFAULT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeID` bigint(20) DEFAULT NULL,
  `QuantityPurchase` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `cartitem`
--

INSERT INTO `cartitem` (`CartItemID`, `CartID`, `ProductID`, `SizeID`, `QuantityPurchase`) VALUES
(12, 1, 95, 348, 11),
(13, 1, 108, 401, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `CategoryID` bigint(20) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `ParentCategoryID` bigint(20) DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT 'https://iili.io/JR4gFGs.md.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `ParentCategoryID`, `ImagePath`) VALUES
(1, 'Áo Nam', NULL, 'https://iili.io/JR4gFGs.md.png'),
(2, 'Áo Thun', 1, 'https://iili.io/J5HXHIj.webp'),
(3, 'Áo Khoác', 1, 'https://iili.io/J5HXFEB.webp'),
(4, 'Áo Polo', 1, 'https://iili.io/J5HXq21.webp'),
(5, 'Quần Nam', NULL, 'https://iili.io/JR4gFGs.md.png'),
(7, 'Quần Short Thể Thao', 5, 'https://iili.io/J5HXUGV.webp'),
(8, 'Áo Sơ Mi', 1, 'https://iili.io/J5HXCkg.webp'),
(9, 'Quần Dài Kaki', 5, 'https://iili.io/J5HXNyu.webp'),
(10, 'Quần Short Kaki', 5, 'https://iili.io/J5HXUGV.webp'),
(11, 'Quần Short Tây', 5, 'https://iili.io/J5HXLua.webp'),
(12, 'Quần Lót', NULL, 'https://iili.io/JR4gFGs.md.png'),
(13, 'Quần Lót Boxer', 12, 'https://iili.io/J5HjR5X.webp'),
(14, 'Quần Lót Brief', 12, 'https://iili.io/J5HjR5X.webp'),
(15, 'Phụ Kiện', NULL, 'https://iili.io/JR4gFGs.md.png'),
(16, 'Tất Nam', 15, 'https://iili.io/J5HwxTu.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetailID` bigint(20) NOT NULL,
  `OrderID` bigint(20) DEFAULT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `ProductName` varchar(255) NOT NULL,
  `SizeName` bigint(20) NOT NULL,
  `ImagePath` varchar(255) DEFAULT NULL,
  `ProductPrice` bigint(20) NOT NULL,
  `Quantity` bigint(20) NOT NULL,
  `TotalPrice` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `orderdetails`
--

-- INSERT INTO `orderdetails` (`OrderDetailID`, `OrderID`, `ProductID`, `ProductName`, `SizeID`, `ImagePath`, `ProductPrice`, `Quantity`, `TotalPrice`) VALUES
-- (1, 1, 63, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 218, 'https://iili.io/JR4LT5G.jpg', 249000, 4, 996000),
-- (2, 2, 68, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút', 238, 'https://iili.io/JR4tYsp.jpg', 239000, 4, 956000),
-- (3, 3, 94, 'Quần Short Thể Thao Nam, Thoáng Khí, Kháng Khuẩn ', 344, 'https://iili.io/JRLtjlR.jpg', 429000, 4, 1716000),
-- (4, 4, 95, 'Quần Short Thể Thao Nam, Thiết Kế Cạp Cúc Xẻ Gấu Thời Trang', 348, 'https://iili.io/JRLtQO7.jpg', 499000, 4, 1996000),
-- (5, 5, 63, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 219, 'https://iili.io/JR4LT5G.jpg', 249000, 6, 1494000),
-- (6, 6, 70, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 248, 'https://iili.io/JR4Dqps.jpg', 249000, 8, 1992000),
-- (7, 6, 63, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 219, 'https://iili.io/JR4LT5G.jpg', 249000, 6, 1494000),
-- (8, 6, 64, 'Áo Thun Dài Tay Nam, Thiết Kế Basic', 223, 'https://iili.io/JR4Qfkb.jpg', 279000, 5, 1395000),
-- (9, 7, 91, 'Quần Short Thể Thao Nam, Cạp Cúc, In Sườn', 329, 'https://iili.io/JRLZkCb.jpg', 469000, 4, 1876000),
-- (10, 7, 142, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả ', 533, 'https://iili.io/JRDGkb9.jpg', 96000, 5, 480000),
-- (11, 8, 65, 'Áo Thun Dài Tay Nam, Mềm Mịn, Bền Bỉ', 229, 'https://iili.io/JR4Q1CN.jpg', 219000, 5, 1095000),
-- (12, 9, 66, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút Hiệu Quả', 233, 'https://iili.io/JR4ZHAJ.jpg', 349000, 6, 2094000),
-- (13, 10, 150, 'Áo Thun Nam, Chất Vải Freezing Nylon Thoáng Mát', 565, 'https://iili.io/J5nodtp.jpg', 259000, 6, 1554000),
-- (14, 11, 109, 'Tất Nam, Kháng Khuẩn, Khử Mùi ', 402, 'https://iili.io/JRQ9dtS.jpg', 19000, 21, 399000),
-- (15, 11, 68, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút', 241, 'https://iili.io/JR4tYsp.jpg', 239000, 5, 1195000),
-- (16, 12, 64, 'Áo Thun Dài Tay Nam, Thiết Kế Basic', 223, 'https://iili.io/JR4Qfkb.jpg', 279000, 6, 1674000),
-- (17, 12, 96, 'Quần Short Thể Thao Nam, Thoáng Khí, Thấm Hút Mồ Hôi', 350, 'https://iili.io/JRLD90x.jpg', 389000, 5, 1945000),
-- (18, 12, 96, 'Quần Short Thể Thao Nam, Thoáng Khí, Thấm Hút Mồ Hôi', 352, 'https://iili.io/JRLD90x.jpg', 389000, 3, 1167000),
-- (19, 12, 67, 'Áo Thun Dài Tay Nam, In Chữ Combination', 237, 'https://iili.io/JR4ZRPS.jpg', 319000, 6, 1914000),
-- (20, 13, 91, 'Quần Short Thể Thao Nam, Cạp Cúc, In Sườn', 332, 'https://iili.io/JRLZkCb.jpg', 469000, 5, 2345000),
-- (21, 13, 108, 'Quần Kaki Dài Nam, Đứng Phom, Tôn Dáng', 400, 'https://iili.io/JRLylZ7.jpg', 649000, 3, 1947000),
-- (22, 13, 67, 'Áo Thun Dài Tay Nam, In Chữ Combination', 237, 'https://iili.io/JR4ZRPS.jpg', 319000, 5, 1595000),
-- (23, 14, 92, 'Quần Short Thể Thao Nam, Cạp Chun, In Chữ Trẻ Trung', 336, 'https://iili.io/JRLZkCb.jpg', 429000, 4, 1716000),
-- (24, 14, 66, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút Hiệu Quả', 233, 'https://iili.io/JR4ZHAJ.jpg', 349000, 1, 349000),
-- (25, 15, 65, 'Áo Thun Dài Tay Nam, Mềm Mịn, Bền Bỉ', 229, 'https://iili.io/JR4Q1CN.jpg', 219000, 3, 657000),
-- (26, 15, 108, 'Quần Kaki Dài Nam, Đứng Phom, Tôn Dáng', 401, 'https://iili.io/JRLylZ7.jpg', 649000, 2, 1298000),
-- (27, 16, 67, 'Áo Thun Dài Tay Nam, In Chữ Combination', 237, 'https://iili.io/JR4ZRPS.jpg', 319000, 1, 319000),
-- (28, 17, 66, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút Hiệu Quả', 233, 'https://iili.io/JR4ZHAJ.jpg', 349000, 1, 349000),
-- (29, 17, 49, 'Áo Khoác Bomber Nam, Cản Gió, Thiết Kế Trẻ Trung', 162, 'https://iili.io/JR4yBl2.jpg', 939000, 3, 2817000),
-- (30, 18, 71, 'Áo Polo Nam, Vải Viscose Mềm Mượt, Thoáng Khí', 252, 'https://iili.io/JR6foJf.jpg', 389000, 4, 1556000),
-- (31, 18, 80, 'Áo Polo Nam, Cotton USA, Cao Cấp, Thấm Hút Mồ Hôi', 288, 'https://iili.io/JR6osDv.jpg', 419000, 4, 1676000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `OrderID` bigint(20) NOT NULL,
  `OrderDate` datetime(6) DEFAULT NULL,
  `TotalAmount` bigint(20) DEFAULT NULL,
  `OrderStatus` varchar(20) DEFAULT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `RecipientName` varchar(255) NOT NULL,
  `RecipientPhone` varchar(20) DEFAULT NULL,
  `AddressDetails` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

-- INSERT INTO `orders` (`OrderID`, `OrderDate`, `TotalAmount`, `OrderStatus`, `UserID`, `RecipientName`, `RecipientPhone`, `AddressDetails`) VALUES
-- (1, '2024-01-01 21:52:55.000000', 996000, 'Đã xác nhận', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (2, '2024-01-01 21:54:17.000000', 956000, 'Đang giao hàng', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (3, '2024-01-01 22:01:07.000000', 1716000, 'Hoàn thành', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (4, '2024-01-01 22:01:45.000000', 1996000, 'Chờ xác nhận', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (5, '2024-01-01 22:01:55.000000', 1494000, 'Đã hủy', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (6, '2024-01-01 22:03:02.000000', 4881000, 'Hoàn thành', 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội'),
-- (7, '2024-01-01 22:03:16.000000', 2356000, 'Đã xác nhận', 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội'),
-- (8, '2024-01-01 22:03:21.000000', 1095000, 'Đã hủy', 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội'),
-- (9, '2024-01-01 22:03:26.000000', 2094000, 'Chờ xác nhận', 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội'),
-- (10, '2024-01-01 22:03:51.000000', 1554000, 'Chờ xác nhận', 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội'),
-- (11, '2024-01-01 22:04:22.000000', 1594000, 'Đang giao hàng', 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội'),
-- (12, '2024-01-01 22:06:28.000000', 6700000, 'Đã xác nhận', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (13, '2024-01-01 22:06:59.000000', 5887000, 'Chờ xác nhận', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (14, '2024-01-01 22:07:22.000000', 2065000, 'Đã hủy', 3, 'Nguyễn Tiến Dũng', '0909090909', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (15, '2024-01-01 22:13:31.000000', 1955000, 'Hoàn thành', 4, 'Nguyễn Văn Vinh', '090909090', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (16, '2024-01-01 22:13:39.000000', 319000, 'Chờ xác nhận', 4, 'Nguyễn Văn Vinh', '090909090', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (17, '2024-01-01 22:13:54.000000', 3166000, 'Đang giao hàng', 4, 'Nguyễn Văn Vinh', '090909090', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'),
-- (18, '2024-01-01 22:14:20.000000', 3232000, 'Đã xác nhận', 4, 'Nguyễn Văn Vinh', '090909090', '144 Xuân Thuỷ, Cầu Giấy, Hà Nội');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `ProductID` bigint(20) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `productPrice` bigint(20) DEFAULT NULL,
  `ProductDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`ProductID`, `ProductName`, `productPrice`, `ProductDescription`) VALUES
(43, 'Áo Khoác Phao Nam, Dày Dặn, Trượt Nước', 1189000, 'Chiếc áo khoác phao chần bông sử dụng chất liệu Poly ứng dụng công nghệ GORE-TEX trượt nước nhẹ, cản gió hiệu quả, giữ nhiệt, ấm áp tức thì. Thiết kế đường chỉ chần cách điệu nổi bật, mũ trùm có chốt cố định, tay áo bo chun dày dặn, có nhám hạn chế gió lùa tối đa; hình in silicon cao cấp khỏe khoắn. Bảng màu đa dạng, thiết kế thông minh, basic dễ mặc phù hợp trong nhiều hoàn cảnh.'),
(44, 'Áo Khoác Phao Nam, Dày Dặn, Cản Gió, Cản Bụi', 999000, 'Nằm trong BST Thu đông 2023 nhà, áo khoác ATHLETIC ngoài các tính năng đầy đủ của một chiếc áo khoác cap cấp: dày dặn, trượt nước, giữ nhiệt, giữ ấm cực tốt; còn mang một thiết kế biệt với phần mặt ngoài trơn mịn, mặt trong chần bông dày dặn, chắc chắn, đem đến một phong cách hoàn toàn mới so với áo chần bông thông thường, khỏe khoắn hơn, thời trang, năng động hơn. Phần túi ngực ngoài may khóa ẩn phối logo hãng in sắc nét, mũ trùm đầu có chốt cố định hạn chế gió lùa, cổ trụ cao ấm áp. Một item không thể thiếu cho mùa đông này!'),
(45, 'Áo Khoác Phao Nam, Dày Dặn, Giữ Nhiệt Tốt', 989000, 'ÁO KHOÁC PHAO NAM CHẦN BÔNG TRƠN BASIC\r\n\r\nMột chiếc áo khoác với thiết kế tối giản, nhưng vẫn lịch sự và sang trọng là một item không thể thiếu trong mùa đông. Nằm trong BST Thu đông 2023 thuộc top bán chạy, sản phẩm áo khoác nam Extra-warm mang đến các tính năng vượt trội cản gió, trượt nước, giữ ấm hiệu quả, dày dặn nhưng vẫn nhẹ nhàng, thoải mái; phù hợp mặc trong nhiều hoàn cảnh với nhiều màu sắc khác nhau giúp bạn phối đồ một cách dễ dàng!\r\n\r\nChất liệu áo khoác 3 lớp:\r\n- Mặt ngoài: 100% Poly giúp cản gió một cách hiệu quả, trượt nước nhẹ, hạn chế bám bụi, độ bền cao\r\n\r\n- Lớp giữa: Chần bông xay kháng khuẩn cao cấp\r\n\r\n- Lớp trong: Lớp gió (lụa) mềm mịn giúp tỏa nhiệt tức thì, giữ nhiệt cực tốt\r\n\r\nThiết kế tinh tế:\r\n- Trơn basic với các đường chỉ chần cực kì chắc chắn giúp cố định bông, hạn chế xô dịch\r\n\r\n- Mũ trùm đầu rộng rãi, có chốt cố định dễ dàng điều chỉnh, hạn chế gió lùa\r\n\r\n- Khóa kéo cao cấp trơn tru, chốt khóa tại cổ áo có phần che khóa tinh tế \r\n\r\n- Túi hai bên, túi ngực sâu rộng, tiện lợi'),
(46, 'Áo Khoác GIó Nam, Cản Gió, Trượt Nước', 799000, 'ÁO KHOÁC GIÓ THỂ THAO PHỐI MÀU & CHẦN CHỈ NỔI. Thiết kế mới cho thu đông 2023 mang đến cho bạn chiếc áo khoác ứng dụng thời trang linh hoạt, form dáng thể thao khoẻ khoắn, màu sắc trẻ trung hiện đại.'),
(47, 'Áo Bomber Nam, Thiết Kế Jaglan', 849000, 'ÁO KHOÁC BOMBER NAM TAY RAGLAN TRẺ TRUNG\r\n\r\nÁo khoác nam hai lớp cản gió, hạn chế bám bụi, thuộc top áo khoác bomber bán chạy nhất với thiết kế trẻ trung dễ mặc, tay áo raglan phối màu, phần bo co giãn, dày dặn dệt kẻ nổi bật. Túi kéo khóa sâu rộng, phom Slimfit vừa vặn. Một item năng động, phong cách và thời trang!'),
(48, 'Áo Khoác Bomber Nam, Thiết Kế Phối Màu', 849000, 'ÁO KHOÁC BOMBER NAM CAN PHỐI IN CHỮ TRẺ TRUNG\r\n\r\nChúng tôi mang đến cho bạn một outfit mới phong cách với sự kết hợp của áo khoác bomber hai lớp can phối in chữ cách điệu. Vẫn ấm áp với lớp Poly cản gió hiệu quả, trượt nước, trượt bụi, dày dặn. Trẻ trung với thiết kế nổi bật in chữ ngực, đường line tay áo khỏe khoắn, bo cổ dệt phối màu. Với 2 màu sắc cơ bản, nam tính, dễ mặc dễ phối đồ thì đây là item không thể thiếu trong mùa đông này!'),
(49, 'Áo Khoác Bomber Nam, Cản Gió, Thiết Kế Trẻ Trung', 939000, 'ÁO BOMBER NAM LÓT NỈ THIẾT KẾ TÚI CÚC BẤM\r\n\r\nVới chất liệu Polyester cản gió hiệu quả, áo khoác bomber đến từ BST Thu Đông 2023  mang đến cho bạn một item vừa đủ ấm áp, vừa thời trang và dễ phối đồ. Tăng độ ấm với lớp lót nỉ mặt trong mềm mịn, tỏa nhiệt tức thì. Thiết kế đơn giản nhưng lịch lãm, sang trọng, túi chéo phối cúc bấm nổi bật, bo cổ bo tay dày dặn, co giãn. Áo khoác bomber là một loại áo khoác gọn gàng hơn giúp người mặc trông thời trang, phong cách, trẻ trung và năng động hơn.'),
(50, ' Áo Khoác Bomber Nam, Lót Lông, Thiết Kế Trẻ Trung', 899000, 'ÁO KHOÁC BOMBER LÓT LÔNG TECH TRAINING\r\n\r\nÁo khoác Bomber dáng phồng (áo khoác lính) mang hơi hướng thời trang trẻ trung, nam tính. Thiết kế lót lông toàn bộ bên trong thân áo, đem lại ứng dụng thời trang phù hợp hơn với thời tiết mùa đông lạnh. Đảm bảo mặc đẹp, mặc ấm mà không cần quá nhiều lớp áo.\r\n\r\nChất liệu mà sử dụng lớp lót lông giữ nhiệt, bề mặt vải trượt nước, cản gió tối ưu - một trong những sản phẩm áo khoác trong bộ sưu tập thu đông mà bạn nhất định bạn phải sở hữu!'),
(51, 'Áo Khoác Bomber Nam, Cản Gió, Trượt Nước', 889000, 'ÁO KHOÁC BOMBER TÚI HỘP\r\n\r\nÁo khoác bomber thiết kế túi hộp trẻ trung, tạo điểm nhấn cùng ứng dụng tiện lợi với diện tích túi lớn để đồ cá nhân nhỏ như ví da, chìa khoá, điện thoại..\r\n\r\nChất liệu sử dụng công nghệ trượt nước, hạn chế thấm ngược ở bề mặt vải ngoài và lớp lót nỉ mềm mỏng, giữ ấm tối ưu. Một chiếc áo khoác vừa thời trang, vừa thích hợp cho những ngày mưa lạnh.'),
(52, 'Áo Khoác Bomber Nam, Trẻ Trung, Thanh Lịch', 899000, 'ÁO KHOÁC NAM THIẾT KẾ TRƠN BASIC KIỂU TÚI HỘP\r\n\r\nNằm trong BST Thu đông 2023 của, áo khoác bomber nam với chất liệu Polyester dai bền, mềm mịn, cản gió, trượt nước nhẹ cùng thiết kế tinh giản, thanh lịch với phần túi hộp phong cách là một item không thể thiếu trong tủ đồ của bạn. Vừa ấm, nhẹ nhàng, gọn gàng, vừa trẻ trung, năng động và lịch sự.'),
(53, 'Áo Khoác Gió Nam 5S Fashion, Cản Gió, Trượt Nước', 1089000, ' ÁO KHOÁC GIÓ NAM THỂ THAO MẶC ĐƯỢC HAI MẶT\r\n\r\nBiến hóa phong cách linh hoạt với chiếc áo khoác đa năng 2IN1 đến từ, một mặt trơn basic lịch lãm, một mặt với thiết kế can phối cùng họa tiết thêu chữ nổi bật, trẻ trung, thể thao và khỏe khoắn. Chất liệu hoàn toàn từ sợi Poly dai bền, mềm mịn, cản gió hiệu quả, trượt nước nhẹ. Áo khoác có mũ rời tháo được, thiết kế thông minh, mặc phù hợp trong nhiều hoàn cảnh.'),
(54, 'Áo Khoác Gió Nam 5S Fashion, Thiết Kế Cổ Bẻ AKG23011', 769000, 'ÁO KHOÁC GIÓ CỔ BẺ LỊCH LÃM - Thiết kế mới cho outfit thanh lịch mùa thu đông. Sử dụng chất liệu vải Polyester cao cấp có khả năng cản nước, cản gió vượt trội cùng công nghệ hiện đại chống thấm ngược tối ưu. Chiếc áo khoác cực kì thích hợp với thời tiết giao mùa, mưa nhẹ.'),
(55, 'Áo Khoác Gió Nam, Chống Bụi, Trượt Nước', 859000, 'Áo Khoác Gió Nam, Chống Bụi, Trượt Nước là mẫu áo khoác nam đa năng cản gió, cản bụi, cản nước và chống UV là chiếc áo khoác gió sẽ phù hợp cho bạn mặc khi tham gia các hoạt động ngoài trời. 5S Fashion gửi đến các bạn thêm sự lựa chọn với một sản phẩm có thể sử dụng trong mọi hoàn cảnh'),
(56, 'Áo Khoác Nam, Kiểu Dáng Casual Heavy Phối Màu', 899000, 'Áo Khoác Nam, Kiểu Dáng Casual Heavy Phối Màu là lựa chọn hoàn hảo cho các chàng trai trong thời điểm giao mùa. Khác với chế độ chống nước của các loại vải Nilon, các loại áo gió đến từ 5S Fashion được làm từ chất liệu 100% Polyester có màng chống nước siêu siêu mỏng giúp cho nước đọng thành từng hạt và chảy đi. Điều này giúp hạn chế nước mưa ngấm vào bên trong lớp vải mà vẫn đảm bảo sự thông thoáng, dễ chịu khi mặc.\r\n\r\nThiết kế áo basic, trẻ trung, nam tính với bảng màu đa dạng, mang tới nhiều sự lựa chọn theo sở thích của các anh chàng. Túi áo trước ngực và túi vát 2 bên tiện lợi, thời trang kết hợp cùng khóa HKK cao cấp, bền đẹp, không lo hỏng hóc. Áo khoác được làm từ chất liệu 100% Polyester vải gió sở hữu những ưu điểm như độ bền tốt, khả năng chống nước tối ưu, dễ dàng nhuộm màu sắc nét, đẹp mắt, dễ dàng giặt ủi cùng mức giá thành hợp lý, phù hợp với nhiều đối tượng người dùng. '),
(57, 'Áo Khoác Bomber Nam, Lót Lông, Dày Dặn', 869000, 'ÁO KHOÁC BOMBER NAM LÓT LÔNG & CHẦN CHỈ NỔI. Chúng tôi mang đến cho bạn một chiếc áo khoác dày dặn, ấm áp với chất liệu Polyester cao cấp cản gió, trượt nước, lớp lót lông mềm mịn Extra-warm ấm áp tức thì, tỏa nhiệt, giữ nhiệt tốt. Thiết kế khỏe khoắn trẻ trung với đường line chần chỉ nổi tinh tế mang đến cho bạn một phong cách hoàn toàn mới, gọn gàng, thanh lịch, thời trang!'),
(58, 'Áo Khoác Gió Nam, Cản Gió, Trượt Nước', 799000, 'ÁO KHOÁC GIÓ THỂ THAO NAM CÓ MŨ THIẾT KẾ TÚI DẠNG HỘP. Nằm trong BST Thu đông 2023 mới nhất đến từ, sản xuất hoàn toàn tại Việt Nam. Một chiếc áo khoác hoàn hảo với kiểu dáng thể thao, khỏe khoắn, cản gió, trượt nước nhẹ, giữ ấm hiệu quả, rất thích hợp cho vận động và các hoạt động ngoài trời.\r\n\r\nChất liệu Áo Khoác Nam Có Mũ:\r\n• 100% Polyester: Nhẹ, cản gió vượt trội, trượt nước, hạn chế nhăn và bám bụi, độ bền cao\r\n\r\n• Mặt trong: Lót nỉ dày dặn, mềm mịn, ấm tức thì, giữ nhiệt, giữ ấm tối đa\r\n\r\nThiết kế:\r\n• Trơn basic, với hiệu ứng dệt kẻ ô tinh tế, màu sắc trung tính dễ dàng phối đồ\r\n\r\n• Phom dáng: Regular fit thoải mái\r\n\r\n• Mũ áo khoác có thể tháo rời hoàn toàn, có chốt cố định dễ dàng điều chỉnh\r\n\r\n• Khóa kéo trơn tru, có vạt che ẩn tinh tế, thời trang\r\n\r\n• Túi kéo khóa thiết kế dạng hộp nam tính, khỏe khoắn, phong cách\r\n\r\nCách mix&match Áo Khoác Nam Có Mũ \r\nThiết kế basic với 3 màu trung tính: Đen, Ghi tối, Ghi sáng, áo khoác nam có mũ dễ dàng phối được với nhiều loại quần áo khác nhau để tạo nên những outfit khỏe khoắn, hiện đại, năng động, phù hợp mặc hàng ngày: \r\n\r\n• Outfit công sở: Phối cùng quần tây/quần dài kaki với 1 chiếc áo sơ mi dài tay \r\n\r\n• Outfit thể thao: Một chiếc quần nỉ/quần jogger với chiếc áo thun dài tay đơn sắc bên trong và đừng quên một đôi giày thể thao để tổng thể trở nên khỏe khoắn hơn\r\n\r\n• Outfit daily: Quần jean phối áo nỉ sweater cùng một đôi sneaker là một outfit cực kì trẻ trung, năng động, mặc đi chơi, đi dạo, đi cafe,...\r\n\r\n'),
(59, 'Áo Khoác Gió Nam Cõ Mũ, Giữ Ấm, In Hình Trẻ Trung', 799000, 'ÁO KHOÁC NAM VẢI GIÓ IN CHỮ BEYOND PHONG CÁCH.\r\n\r\nChúng tôi ra mắt mẫu áo khoác nam mới nhất nằm trong BST Thu đông 2023, với thiết kế phá cách hơn, trẻ trung hơn. Áo khoác có 2 lớp dày dặn giữ ấm tốt, phần tay phối line nổi, điểm nổi bật nhất là hình in chữ sau lưng áo phong cách. Mũ trùm đầu rộng có chốt điều chỉnh, áo có vạt che khóa phối cúc tạo điểm nhấn. Phù hợp mặc khoác ngoài và các hoạt động vận động, thể thao.'),
(60, 'Áo Khoác Phao Gile Có Mũ, Thiết Kế Trẻ Trung, Khỏe Khoắn', 829000, 'ÁO KHOÁC NAM GILE KHOÁC NGOÀI CÓ MŨ TRẺ TRUNG\r\n\r\nNằm trong BST Thu đông mới nhất đến từ nhà, chiếc áo khoác kiểu gile với thiết kế tối giản hơn nhưng vẫn đầy đủ hiệu năng của một chiếc áo khoác nam giữ ấm cực tốt. Chất liệu Poly dai bền giúp cản gió hiệu quả, bông xay chần dày dặn, lớp lót gió Extra-warm giữ nhiệt, tỏa hơi ấm tức thì. Thiết kế không tay mang lại sự gọn gàng, phần mũ trùm rộng trẻ trung, khóa kéo ngược cao cấp in logo hãng phần túi ngực thể thao khỏe khoắn.'),
(61, ' Áo Gió Nam, Cản Gió, Trượt Nước', 749000, 'ÁO KHOÁC NAM CỔ TRỤ THIẾT KẾ HỌA TIẾT HÌNH THOI\r\n\r\nÁo khoác nam vải gió 2 lớp dày dặn, một thiết kế mang phong cách hoàn toàn mới lạ, độc đáo và trẻ trung của. Cổ trụ cao giữ ấm, tay và gấu áo bo chun hạn chế gió lùa, nổi bật là phần thiết kế dệt line nổi từ tay và thân áo ghép thành hình thoi đầy cá tính. Một item hoàn hảo vừa giữ ấm vừa thời trang và năng động!'),
(62, 'Áo Phao Nam, Phom Regular Cổ Bẻ Phong Cách', 969000, 'ÁO PHAO CHẦN BÔNG CỔ BẺ CÚC CÀI PHONG CÁCH\r\n\r\nBST Thu đông 2023 mang đến một item hoàn toàn mới lạ, độc đáo với chiếc áo khoác phao chần bông mặt trong, cổ bẻ phối cúc cài. Chất liệu hoàn toàn từ Poly dai bền, cản gió hiệu quả, trượt nước nhẹ, chần bông mặt trong áo chắc chắn, ấm áp, dày dặn. Tay bo phối nhám hạn chế gió lùa, in silicon cao cấp phần ngực tạo điểm nhấn trẻ trung. Vừa ấm, vừa phong cách, lịch lãm, là item không thể thiếu trong mua đông này!'),
(63, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 249000, 'ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.'),
(64, 'Áo Thun Dài Tay Nam, Thiết Kế Basic', 279000, 'ÁO THUN TRƠN ĐÁP LOGO 5S FASHION\r\n\r\nÁo thun dài tay nâng cao trải nghiệm với chất liệu mới Viscose - sợi tơ tổng hợp có đặc điểm siêu mảnh, mềm mại hơn, độ mịn và bóng nhẹ tạo thẩm mỹ cao hơn.\r\n\r\nSản phẩm áo thun trơn đáp logo tinh tế, màu sắc nam tính dễ mặc, dễ phối đồ ngay cả khi mặc bên trong áo khoác.'),
(65, 'Áo Thun Dài Tay Nam, Mềm Mịn, Bền Bỉ', 219000, 'ÁO THUN DÀI TAY form trơn basic với 3 sự lựa chọn màu sắc nam tính: xanh cổ vịt, xanh đá và ghi sáng. Cùng chất liệu Cotton pha sợi Spandex tạo độ co giãn tối đa, thoải mái nhất có thể khi mặc.'),
(66, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút Hiệu Quả', 349000, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút Hiệu Quả nổi bật với chất liệu Viscose từ sợi lụa nhân tạo có cấu trúc tương tự Cotton nhưng được kết hợp với Feezing Nylonj, Spandex giúp tăng độ mềm mại, bền đẹp và đàn hồi của áo.'),
(67, 'Áo Thun Dài Tay Nam, In Chữ Combination', 319000, 'Áo Thun Dài Tay Nam, in Chữ Combination sở hữu kiểu dáng Slim fit vừa vặn, tôn dáng với khả năng giữ ấm cơ thể cực tốt. Áo thun dài tay có đa dạng màu sắc, chủ yếu là các màu basic, dễ mặc và dễ phối. Thiết kế trẻ trung với điểm nhấn là hình in thêu chữ Combination hiện đại.\r\n\r\nChất liệu Viscose hay còn được gọi là sợi lụa nhân tạo, là một trong những dòng chất liệu cao cấp của. Viscose được tổng hợp từ chất xơ của sợi Cellulose làm từ bột ỗ như cây sồi, cây thông, bạch đàn tre... giúp cấu trúc của loại vải này gần như tương tự với Cotton. Tuy nhiên, đặc tính nổi trợi hơn nằm ở độ mềm mịn, thân thiện với làn da cũng như môi trường sống xung quanh. '),
(68, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút', 239000, 'ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.'),
(70, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 249000, 'ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.'),
(71, 'Áo Polo Nam, Vải Viscose Mềm Mượt, Thoáng Khí', 389000, 'Áo Polo Nam, Vải Viscose Mềm Mượt, Thoáng Khí APC23104 là lựa chọn hoàn hảo cho mùa này nhờ thiết kế trẻ trung, cuốn hút với kiểu dáng Slim fit ôm dáng vừa vặn. Đường may áo chắc chắn, tinh tế đến từng chi tiết. Điểm nhấn của mẫu áo Polo này nằm ở thiết kế phối cúc lạ mắt, mang đến diện mạo trẻ trung mà vẫn thanh lịch, nam tính cho nam giới. \r\n\r\nChất liệu Viscose thoáng mát, mềm mại, mang đến trải nghiệm hoàn hảo khi mặc, ngay cả trong tiết trời mùa hè oi bức. Bổ sung thành phần Freezing Nylon hay còn được biết đến với tên gọi quen thuộc là thun lạnh, với ưu điểm mềm mướt, bề mặt sáng bóng và nhẵn mịn, sợi vải mát lạnh, nhuộm màu sắc nét và tính đàn hồi tự nhiên cao. Kết hợp cùng Spandex tạo ra chất liệu vải có khả năng thấm hút mồ hôi tốt, thoáng khí, kháng khuẩn tốt và có màu sắc cực kỳ bắt mắt cùng với độ đàn hồi tốt giúp thoải mái vận động.'),
(72, 'Áo Polo Nam, Vải Viscose, Thấm Hút Mồ Hôi Tốt', 419000, 'Áo Polo Nam, Vải Viscose, Thấm Hút Mồ Hôi Tốt là một trong những mẫu áo Polo hot hit nhờ thiết kế đơn giản, chẳng lo \"lỗi mốt\". Mẫu áo này ghi điểm bởi thiết kế trẻ trung, nam tính, cuốn hút cùng kiểu dáng Slim fit tôn dáng, dễ mặc và dễ phối đồ. Cổ - tay áo được dệt bo bền đẹp, sang trọng, mang đến diện mạo cuốn hút cho nam giới. \r\n\r\nÁo được làm từ chất liệu Viscose thoáng mát, mềm mại, mang đên trải nghiệm hoàn hảo khi mặc. Kết hợp với thành phần chất liệu Polyamide và Spandex giúp tăng độ mềm mại, co giãn cực tốt khi mặc, giúp chiếc áo mềm mượt - mát mẻ - mau khô và đặc biệt không lo nhăn nhàu suốt cả ngày. '),
(73, 'Áo Polo Nam, Vải Silk Cao Cấp, Mềm Mại, Nhẹ Mát', 479000, 'Áo Polo Nam, Vải Silk Cao Cấp, Mềm Mại, Nhẹ Mát sở hữu kiểu dáng Slim fit ôm dáng vừa vặn mà vẫn thoải mái trong mọi hoạt động. Thiết kế khỏe khoắn, màu sắc đa dạng được dệt kẻ Jaccquard phối màu tạo hiệu ứng tinh tế, mang đến phong cách thời thượng, lịch lãm cho nam giới. Đặc biệt, cổ và tay áo được dệt bo đứng dáng kết hợp cùng được phối line 3 màu tạo hiệu ứng nổi bật, thu hút cho tổng thể chiếc áo.\r\n\r\nÁo được làm từ chất liệu Silk cao cấp - Lụa tơ tằm ví như \"Nữ hoàng\" của các loại lụa, Silk được xếp vào top những loại vải đắt đỏ nhất hành tinh và chỉ xuất hiện trong các sản phẩm cao cấp. Với các ưu điểm mềm, mịn, vải rất thoáng mùa hè thì mát mẻ mùa đông thì ấm áp, thấm hút mồ hôi tốt và là gốc sợi tự nhiên nên rất an toàn với da. Chất liệu vải được cấu thành từ Polyester, Cotton là những chất liệu phổ thông tuy nhiên khi thêm 3% Silk giá thành lại tăng tới 50% đủ thấy giá trị của Silk, kết hợp thêm thành phần Lyocel (tencel) một chất liệu vải sinh học cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả. '),
(75, 'Áo Polo Nam, Chất Liệu Silk Cao Cấp', 479000, 'Áo Polo Nam, Chất Liệu Silk Cao Cấp APC23065 nổi bật với kiểu Slim fit tôn dáng vừa vặn mà vẫn đảm bảo cảm giác thoải mái khi hoạt động. Đây là thiết kế trẻ trung, thời thượng, dễ mặc và dễ phối với mọi trang phục, giúp bạn nam tự tin để diện đi học, đi làm hay đi du lịch đều phù hợp.\r\n\r\nĐiểm nhấn của thiết kế này nằm ở phần dệt bo cổ và tay áo đứng form kết hợp với đường line mang tới phong cách trẻ trung cho người mặc. Tay áo được thêu logo nổi 5S Premium sang trọng, đẳng cấp, đảm bảo hàng chính hãng 100% đến từ thương hiệu. \r\n\r\nÁo Polo được làm từ chất liệu Silk - Lụa tơ tằm được ví như \"Nữ hoàng\" của các loại lụa, Silk được xếp vào top những loại vải đắt đỏ nhất hành tinh và chỉ xuất hiện trong các sản phẩm cao cấp. Với các ưu điểm vượt trội như mềm, mịn, vải rất thoáng mùa hè thì mát mẻ mùa đông thì ấm áp, thấm hút mồ hôi tốt và là gốc sợi tự nhiên nên rất an toàn với da.\r\n\r\nThêm vào đó, việc bổ sung các thành phần chất liệu như Polyester, Cotton giúp gia tăng độ thoáng mát, bền đẹp của áo Polo. Chất vải Lyocel (tencel) - một chất liệu vải cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả và có nhiều đặc điểm tương tự Modal. '),
(77, 'Áo Polo Nam, Vải Viscose, Thoáng Mát', 379000, 'Áo Polo Nam, Vải Viscose, Thoáng Mát là thiết kế hiện đại, trẻ trung với kiểu dáng Slim fit ôm vừa vặn, tôn dáng được nam giới lựa chọn. Thiết kế basic, cổ và tay áo được dệt bo sang trọng, lịch sự giúp giữ phom tốt khi mặc. Bảng màu đa dạng, nhã nhặn với các màu sắc trung tính, dễ mặc, dễ phối với hầu hết các trang phục trong tủ đồ nam giới. Đây là một trong những item bán chạy nhất trong bộ sưu tập Xuân Hè.\r\n\r\nÁo được làm từ sự kết hợp của nhiều thành phần chất liệu như Micro Visocse, Freezing Nylon và Spandex đem tới trải nghiệm thoáng mát hoàn hảo cho chiếc áo Polo. Chất liệu này giúp tăng độ mềm mại, mỏng nhẹ và thoáng khí, tăng tốc độ bay hơi, từ đó thấm hút mồ hôi nhanh hơn, phù hợp để mặc đi làm, đi học hay đi chơi... '),
(78, 'Áo Polo Nam, Cotton USA, Co Giãn 4 Chiều', 519000, 'Áo Polo Nam, Cotton USA, Co Giãn 4 Chiều là thiết kế phối màu in tràn độc đáo ứng dụng công nghệ thoáng khí số 1 chuyên biệt của 5S Fashion rất được ưa chuộng hiện nay. Kiểu dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn thoải mái trong mọi hoạt động. Thiết kế đường nét hiện đại, gam màu đa dạng, phù hợp với mọi sở thích, độ tuổi và phong cách. \r\n\r\nÁo Polo được làm từ chất liệu Cotton USA với những ưu điểm vượt trội như co giãn 4 chiều, thấm hút mồ hôi, thoáng mát tối đa. Bề mặt vải tối ưu khả năng thoáng khí, hút ẩm nhanh hơn và mau khô hơn. Bổ sung thành phần Spandex giúp tăng độ co giãn, đàn hồi để nam giới thoải mái trong mọi hoạt động. '),
(79, 'Áo Polo Nam, Thấm Hút Mồ Hôi Tốt', 419000, 'Áo Polo Nam, Cotton USA, Thấm Hút Mồ Hôi Tốt nổi bật với kiểu dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn đảm bảo cảm giác thoải mái khi vận động. Với chất liệu Cotton USA mỏng mịn, đạt tiêu chuẩn cao cấp với khả năng co giãn 4 chiều bền đẹp, đem tới cảm nhận về sự mềm mại, dễ chiu và dễ mặc.\r\n\r\nĐiểm nhấn của chiếc áo Polo này nằm ở phần cổ và tay dệt bo phối với các đường line nổi bật, trẻ trung và khỏe khoắn. Đây được đánh giá là dòng áo Polo vừa thời trang, vừa đáp ứng nhu cầu trang phục hè thoải mái và thoáng mát tối đa cho mọi chàng trai. '),
(80, 'Áo Polo Nam, Cotton USA, Cao Cấp, Thấm Hút Mồ Hôi', 419000, 'Áo Polo Nam, Chất Vải Cotton USA Thoáng Mát, Thấm Hút Mồ Hôi APC23406 nổi bật với phom dáng Slim fit ôm nhẹ vừa vặn mà vẫn thoải mái, linh hoạt trong mọi hoạt động. Thiết kế basic với cổ áo dệt phối kẻ lịch sự. Phần tay áo có thêu logo tinh tế, đẳng cấp. Áo sở hữu bảng màu đa dạng với thiết kế trơn màu khỏe khoắn, dễ dàng phối kết hợp với nhiều kiểu trang phục khác nhau. \r\n\r\nÁo Polo được làm từ chất liệu cao cấp với 63,7% thành phần là Cotton USA . Khi kết hợp với sợi Polyester giúp cho vải có thêm những tính năng như: Tăng độ bền, độ bóng sắc nét, tăng độ bền màu của sản phẩm nhưng vẫn giữ được những ưu điểm của Cotton USA. Đồng thời, bổ sung thành phần Spandex giúp sản phẩm có độ đàn hồi tốt, giảm độ co rút và người mặc sẽ thoải mái vận động. \r\n\r\nVới bề mặt vải tối ưu khả năng thoáng khí, thấm hút nhanh hơn, mau khô hơn, đây được xem là chiếc áo Polo thoải mái nhất cho mùa hè này mà các bạn không nên bỏ qua. '),
(81, 'Áo Polo Nam, Thiết Kế Dệt Kẻ Phối Trẻ Trung', 419000, 'Áo Polo Nam, Thiết Kế Dệt Kẻ Phối Trẻ Trung được thiết kế theo phom dáng Slim fit ôm vừa vặn, tôn dáng nhưng vẫn đảm bảo cảm giác thoải mái khi vận động. Thiết kế basic với cổ đứng, tay áo được dệt bo chỉn chu, giữ phom tốt, mang tới dáng vẻ chỉn chu, nam tính cho phái mạnh. Điểm nhấn của mẫu áo này nằm ở họa tiết dệt kẻ ngang phối màu thanh lịch, dễ dàng phối kết hợp với nhiều kiểu trang phục khác nhau, dễ dàng mặc đi làm hay đi chơi. \r\n\r\nÁo Polo được làm từ chất vải Cotton USA được biết đến là loại vải có cấu trúc sợi dai và dài vượt trội. Chất liệu này đã hoàn thiện được những ưu điểm có sẵn của cotton truyền thống. Độ thấm hút cao, chịu nhiệt tốt, giữ màu sắc bền đẹp; đồng thời khắc phục hầu hết nhược điểm cũ như: co rút, dễ nhăn, xù, bạc màu.\r\n\r\nKết hợp với Spandex giúp sản phẩm có độ đàn hồi tốt, người mặc sẽ thoải mái vận động. Vải thành phẩm được xử lý qua công nghệ Wash giúp bề mặt mềm hơn, độ cầm màu tốt hơn & giảm độ co rút.'),
(82, 'Áo Polo Nam, Cotton USA, Thoáng Mát, Thấm Hút Mồ Hôi', 419000, 'Áo Polo Nam, Cotton USA, Thoáng Mát, Thấm Hút Mồ Hôi sở hữu kiểu dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn thoải mái khi mặc. Thiết kế basic với cổ và tay áo được bo rib giúp giữ phom tốt, họa tiết dệt, phối đường kẻ line giúp tổng thể chiếc áo Polo trở nên đặc biệt, nổi bật hơn mà vẫn dễ dàng phối với các trang phục để mặc đi làm hay đi chơi. '),
(83, 'Áo Polo Nam, Chất Vải Cotton USA Cao Cấp', 419000, 'Áo Polo Nam, Chất Vải Cotton USA Cao Cấp nổi bật với phom dáng Slim fit ôm vừa vặn mà vẫn đảm bảo cảm giác thoải mái khi mặc. Thiết kế basic với cổ - tay áo dệt bo rib giúp giữ phom tốt, mang đến dáng vẻ nam tính, lịch lãm cho nam giới. Điểm nhấn của thiết ké này nằm ở họa tiết dệt kẻ nổi bật, phù hợp với nhiều loại trang phục khác nhau. Áo sở hữu bảng màu đa dạng với màu sắc tươi sáng, sắc nét cùng thiết kế trẻ trung, tỉ mỉ đến từng chi tiết. '),
(84, 'Áo Polo Nam, Chất Vải PE Cool Mát Lạnh', 339000, 'Áo Polo Nam, Chất Vải PE Cool Mát Lạnh nổi bật với form dáng Slim fit ôm nhẹ vừa vặn, đảm bảo tôn dáng mà vẫn thoải mái khi vận động. Thiết kế basic khỏe khoắn, màu sắc cơ bản dễ dàng phối kết hợp với nhiều trang phục khác nhau mang đến diện mạo trẻ trung, lịch lãm cho nam giới.Họa tiết vệt màu tên vải đước sắp xếp tinh tế, tạo điểm nhấn nổi bật cho tổng thể chiếc áo Polo. Đây là item được ưa chuộng top đầu trong bộ sưu tập Xuân Hè.'),
(85, 'Áo Polo Nam, Thiết Kế Phối Màu Trẻ Trung', 339000, 'Áo Polo Nam, Thiết Kế Phối Màu Trẻ Trung sở hữu phom dáng Slim fit ôm vừa vặn, tôn dáng tối đa mà không gây cảm giác bó sát khó chịu khi mặc. Thiết kế basic với cổ và tay áo dệt bo phối cùng họa tiết kẻ line phối 2 màu độc đáo mang đến diện mạo nam tính, khỏe khoắn cho phái mạnh. Đặc biệt, đây cũng là thiết kế dễ dàng phối với nhiều loại trang phục khác nhau để nam giới có thể mặc đi làm hay đi chơi đều phù hợp. '),
(86, 'Áo Polo Nam, Chất Cotton USA Thoáng Mát', 389000, 'Áo Polo Nam, Chất Cotton USA Thoáng Mát sở hữu phom dáng Slim fit ôm nhẹ vừa vặn mà vẫn linh hoạt, thoải mái trong mọi hoạt động hằng ngày. Áo Polo được thiết kế basic với điểm nhấn là phần cổ - tay áo dệt có phối đường line bắt mắt. Họa tiết dệt kẻ này góp phần mang đế diện mạo thu hút, nam tính và khỏe khoắn hơn cho người mặc. Với bảng màu đa dạng, bạn nam có thể dễ dàng chọn cho mình các màu sắc ưa thích, hợp với phong cách thời trang hằng ngày của mình.'),
(87, 'Áo Polo Nam, Họa Tiết Dệt Kẻ Phối Trẻ Trung', 519000, 'Áo Polo Nam, Họa Tiết Dệt Kẻ Phối Trẻ Trung có kiểu dáng Slim fit ôm vừa vặn với cơ thể, tôn dáng tối đa nhưng vẫn đảm bảo sự thoải mái trong các hoạt động hằng ngày. Áo được thiết kế khá đơn giản với cổ - tay áo bo rib, phối họa tiết kẻ dệt sang trọng, nam tính, dễ dàng kết hợp với nhiều loại trang phục khác nhau, để quý ông có thể tự tin diện đi làm hay đi chơi đều phù hợp. '),
(88, 'Áo Polo Nam, Thiết Kế Phối Kẻ Màu Trẻ Trung', 499000, 'Áo Polo Nam, Thiết Kế Phối Kẻ Màu Trẻ Trung nổi bật với kiểu dáng Slim fit ôm nhẹ vừa vặn, đảm bảo cảm giác thoải mái, dễ chịu khi vận động. Điểm nhấn của thiết kế áo Polo này nằm ở phần dệt kẻ tạo họa tiết độc đáo và hút mắt, mang đến diện mạo thời thượng mà không kém phần trẻ trung cho nam giới. \r\n\r\n'),
(90, 'Quần Short Thể Thao Nam, Cạp Cúc, Phối Màu Trẻ Trung', 469000, 'Quần Short Thể Thao Nam, Cạp Cúc, Phối Màu Trẻ Trung có phom dáng Slim fit vừa vặn, tôn dáng nhưng vẫn vô cùng thoải mái khi mặc. Thiết kế đơn giản, đường may tinh tế, tỉ mỉ mang tới diện mạo chỉn chu, nam tính cho anh chàng. Quần có túi xẻ hai bên, túi phụ phía sau có khuy cài vô cùng tiện lợi. Đây là mẫu quần short thể thao thuộc top bán chạy tại 5S Fashion.\r\n\r\nQuần được làm từ Polyamide thường được dùng cho dòng quần short nhờ những ưu điểm mềm mướt, bề mặt sáng bóng và nhẵn mịn, sợi vải mát lạnh, nhuộm màu sắc nét và tính đàn hồi tự nhiên cao. Kết hợp với tỉ lệ Spandex cao giúp sản phẩm có độ đàn hồi cực tốt, giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.'),
(91, 'Quần Short Thể Thao Nam, Cạp Cúc, In Sườn', 469000, ' \r\nQuần Short Thể Thao Nam, Cạp Cúc, In Sườn là item vừa thoải mái, vừa lịch sự được nam giới yêu thích. Bạn có thể thỏa sức kết hợp quần thể thao với mọi outfit từ Polo, t-shirt, Tanktop với mẫu short thể thao cạp cúc in sườn đến từ nhà 5S Fashion. Set đồ này sẽ mang tới diện mạo trẻ trung, thích hợp với mọi hoạt động di chuyển, tập luyện nhưng vẫn vô cùng lịch sự, tạo cảm giác thoải mái nhất cho người mặc. Thiết kế basic, túi vát 2 bên mix cùng túi sau có cúc cài tiện lợi. \r\n\r\nChất vải Polyamide co giãn thoải mái, tăng độ mềm mại và đàn hồi khi mặc. Đặc biệt, đây cũng là chất liệu nhẹ dịu, an toàn mang tới trải nghiệm thoải mái nhất khi hoạt động suốt cả ngày dài, không gây nóng bí hay đổ mồ hôi khi mặc. Bề mặt vải mềm - mượt - mát - mau khô cùng khả năng giữ phom quần khỏe khoắn, bền đẹp. Việc bổ sung thêm thành phần Spandex nhằm tăng tính thoải mái cho người mặc nhờ sự co giãn, mềm nhẹ và trơn tru. '),
(92, 'Quần Short Thể Thao Nam, Cạp Chun, In Chữ Trẻ Trung', 429000, 'Quần Short Thể Thao, Cạp Chun, In Chữ Trẻ Trung là mẫu quần short thể thao mang phong cách thể thao với kiểu dáng Slim fit vừa vặn, tôn dáng mà vẫn đảm bảo trải nghiệm thoải mái trong mọi hoạt động. Quần được thiết kế basic với túi vát 2 bên tiện lợi, họa tiết hình in nổi cao cấp, bền đẹp và không lo bong tróc. Bảng màu đa dạng, dễ mặc, dễ phối, phù hợp với nhiều hoạt động như mặc thường ngày, đi chơi, đi tập gym, chạy bộ... Đây là item luôn được yêu thích tại 5S Fashion.\r\n\r\nThành phần chất vải chỉ có 14.5% Cotton nhưng loại vải này có bề mặt ngoài mang đậm chất cotton, mềm mại, thấm hút, thoáng mát. Tencel - một chất liệu vải sinh học cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả và có nhiều đặc điểm tương tự Modal. Kết hợp cùng 66% Polyester ở mặt trong tạo độ mướt giảm sự cọ sát lên da, giúp tăng độ bền, độ bóng sắc nét, tăng độ bền màu của vải và giúp giá giảm giá thành. 5% Spandex giúp vải có độ co giãn nhẹ giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.'),
(93, 'Quần Short Thể Thao Nam, Cạp Chun, In Chữ Trẻ Trung', 429000, 'Quần Short Thể Thao, Cạp Chun, In Chữ Trẻ Trung là mẫu quần short thể thao mang phong cách thể thao với kiểu dáng Slim fit vừa vặn, tôn dáng mà vẫn đảm bảo trải nghiệm thoải mái trong mọi hoạt động. Quần được thiết kế basic với túi vát 2 bên tiện lợi, họa tiết hình in nổi cao cấp, bền đẹp và không lo bong tróc. Bảng màu đa dạng, dễ mặc, dễ phối, phù hợp với nhiều hoạt động như mặc thường ngày, đi chơi, đi tập gym, chạy bộ... Đây là item luôn được yêu thích tại 5S Fashion.\r\n\r\nThành phần chất vải chỉ có 14.5% Cotton nhưng loại vải này có bề mặt ngoài mang đậm chất cotton, mềm mại, thấm hút, thoáng mát. Tencel - một chất liệu vải sinh học cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả và có nhiều đặc điểm tương tự Modal. Kết hợp cùng 66% Polyester ở mặt trong tạo độ mướt giảm sự cọ sát lên da, giúp tăng độ bền, độ bóng sắc nét, tăng độ bền màu của vải và giúp giá giảm giá thành. 5% Spandex giúp vải có độ co giãn nhẹ giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.'),
(94, 'Quần Short Thể Thao Nam, Thoáng Khí, Kháng Khuẩn ', 429000, 'Quần Short Thể Thao 5S Fashion, Thoáng Khí, Kháng Khuẩn QSB23203 sở hữu bề mặt mềm mượt, mát, mau khô cùng khả năng giữ phom quần khỏe khoắn, bền đẹp và không lo nhăn nhàu. Điểm nhấn của thiết kế này nằm ở đường kẻ line phối màu dọc 2 bên sườn quần mang tới diện mạo trẻ trung, khỏe khoắn cho người mặc. \r\n\r\nChất liệu Polyamide hay còn có tên gọi khác của Freezing Nylon, thường được dùng cho dòng quần short thể thao. Với ưu điểm mềm mướt, bề mặt sáng bóng và nhẵn mịn, sợi vải mát lạnh, nhuộm màu sắc nét và tính đàn hồi tự nhiên cao. Kết hợp với tỉ lệ Spandex cao giúp sản phẩm có độ đàn hồi cực tốt, giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.\r\n\r\nNgoài ra, khi kết hợp với thành phần Viscose là loại sợi tổng hợp từ chất xơ của sợi cellulose làm từ bột gỗ như cây sồi, thông, bạch đàn, cây tre… Đặc tính của Viscose khá mềm mịn, bóng mượt, thoáng khí, khả năng thấm hút mồ hôi và kháng khuẩn tốt. Dễ dàng nhuộm màu để tạo ra những cuộn vải có màu sắc đẹp mắt, thu hút hơn. '),
(95, 'Quần Short Thể Thao Nam, Thiết Kế Cạp Cúc Xẻ Gấu Thời Trang', 499000, 'Quần Short Thể Thao Nam, Thiết Kế Cạp Cúc Xẻ Gấu Thời Trang sở hữu phom dáng Slim fit ôm vừa vặn, tôn dáng, mang đến diện mạo trẻ trung cho nam giới. Điểm nhấn của mẫu quần này nằm ở thiết kế cạp cúc xẻ gấu thời trang, năng động, thích hợp với hoạt động di chuyển, tập luyện... nhưng vẫn luôn lịch sự, tạo cảm giác thoải mái trong mọi hoạt động. Đặc biệt, lỗ thoáng khi ở 2 bên đùi giúp mang tới trải nghiệm thoáng mát tối đa khi mặc, không bị bí bách hay bết dính mồ hôi. Thiết kế túi vát 2 bên kết hợp với khóa kéo tiện dụng, thích hợp để đựng điện thoại, ví, chìa khóa mà không lo bị rơi... \r\n\r\nQuần short thể thao được làm từ chất liệu Polyamide với bề mặt vải mềm mượt, mát, mau khô, đặc biệt thoáng khí, không bết dính mồ hôi. Việc bổ sung thêm thành phần Spandex giúp tăng độ co giãn, đàn hồi, để bạn nam thoải mái trong mọi hoạt động mà không lo nhăn nhàu, giữ form quần khỏe khoắn, bền đẹp. '),
(96, 'Quần Short Thể Thao Nam, Thoáng Khí, Thấm Hút Mồ Hôi', 389000, 'Quần Short Thể Thao Nam, Thoáng Khí, Thấm Hút Mồ Hôi là thiết kế quần short cạp chun mới nhất trong bộ sưu tập quần short thể thao từ 5S Fashion giúp bạn thể hiện phong cách trẻ trung, năng động và khỏe khoắn. Điểm cộng của thiết kế này nằm ở phần cạp chun kết hợp với dây buộc co giãn linh hoạt, dễ dàng điều chỉnh vòng bụng sao cho vừa vặn nhất, mang tới trải nghiệm thoáng mát tối đa trong mọi hoạt động.\r\n\r\nChi tiết chữ \"Breaks\" ứng dụng công nghệ in ép nhiệt cao cấp, bền đẹp, không lo bong tróc trong quá trình mặc. Thiết kế túi vát 2 bên và túi sau tiện dụng, dễ dàng mang theo ví, điện thoại khi đi chơi, đi tập... Đây là item trendy, khỏe khoắn, phù hợp để mặc hằng ngày, đi dạo phố hay tham gia các hoạt động ngoài trời đều giúp nam giới trở nên tự tin hơn bao giờ hết.\r\n\r\nQuần short thể thao được làm từ chất liệu Polyamide kết hợp với Rayon sở hữu những ưu điểm vượt trội như bề mặt vải siêu mềm mịn, dễ chịu, khả năng thấm hút cao, bay hơi nhanh chóng, độ co giãn đàn hồi tốt cùng độ bền cao. Đây cũng là dòng chất liệu mới, vừa mềm mại, vừa thoáng mát tối đa mà nam giới không nên bỏ lỡ. '),
(97, 'Quần Short Thể Thao Nam Kháng Khuẩn', 429000, 'Quần Short Thể Thao Nam Kháng Khuẩn là mẫu quần với kiểu dáng Slim fit ôm vừa vặn mà vẫn đảm bảo thoải mái, thoáng mát cho người mặc trong mọi hoạt động. Đây cũng là mẫu quần giúp bạn nam có thể tự tin phối với áo polo, T-shirt, tnaktop để mặc hằng ngày, tập luyện hay đi chơi. Thiết kế cạp chun linh hoạt, dễ mặc với đường line phối màu chạy dọc 2 bên quần mang tới phong cách Sporty khỏe khoắn, nam tính cho người mặc. Đây là một trong những item luôn nằm trong top sản phẩm bán chạy của 5S Fashion.\r\n\r\nQuần short thể thao được làm từ chất liệu Polyamide với bề mặt vải mềm - mượt - mát - mau khô, đặc biệt thoáng khí và không lo bết dính mồ hôi trong mọi hoạt động. Kết hợp với thành phần chất liệu Viscose và Spandex giúp vải có những hiệu ứng melange rõ nét với tính thẩm mỹ cao. Cùng với đó là những tính năng mà Polyester có thể bổ trợ cho Polyamide như: Tăng độ bền vải, tăng khả năng thấm hút mồ hôi và giúp sản phẩm nhanh khô.'),
(98, 'Quần Short Thể Thao Nam, Thoáng Mát, Co Giãn', 449000, 'Quần Short Thể Thao Nam, Thoáng Mát, Co Giãn được thiết kế theo phong cách trẻ trung, tôn dáng, thích hợp cho mọi hoạt động, dù là mặc thường ngày hay đi tập, đi chạy bộ... Chất liệu cao cấp, vừa mỏng nhẹ, vừa thoáng mát cùng khả năng chống nhăn nhàu vượt trội, giúp giữ cho chiếc quần luôn đứng phom, khỏe khoắn khi mặc. Bảng màu đa dạng, chủ yếu là các gam màu trầm dễ mặc, dễ phối. \r\n\r\nThiết kế basic với 2 túi vát và 1 túi sau tiện dụng. Cạp chun với dây điều chỉnh giúp chiếc quần trở nên thoải mái hơn khi mặc, phù hợp với mọi dáng người. Điểm nhấn của mẫu quần này nằm ở logo thêu tay bên đùi vô cùng tinh tế, tỉ mỉ mang tới diện mạo thanh lịch, nam tính mà không kém phần thoải mái.'),
(99, 'Quần Short Thể Thao Nam, Cạp Chun, Thoáng Mát', 398000, 'Quần Short Thể Thao Nam, Thoáng Mát, Co Giãn được thiết kế theo phong cách trẻ trung, tôn dáng, thích hợp cho mọi hoạt động, dù là mặc thường ngày hay đi tập, đi chạy bộ... Chất liệu cao cấp, vừa mỏng nhẹ, vừa thoáng mát cùng khả năng chống nhăn nhàu vượt trội, giúp giữ cho chiếc quần luôn đứng phom, khỏe khoắn khi mặc. Bảng màu đa dạng, chủ yếu là các gam màu trầm dễ mặc, dễ phối. \r\n\r\nThiết kế basic với 2 túi vát và 1 túi sau tiện dụng. Cạp chun với dây điều chỉnh giúp chiếc quần trở nên thoải mái hơn khi mặc, phù hợp với mọi dáng người. Điểm nhấn của mẫu quần này nằm ở logo thêu tay bên đùi vô cùng tinh tế, tỉ mỉ mang tới diện mạo thanh lịch, nam tính mà không kém phần thoải mái.'),
(100, 'Quần Short Thể Thao Nam, Thoáng Mát, Thấm Hút Mồ Hôi', 479000, 'Quần Short Thể Thao, Thoáng Mát, Thấm Hút Mồ Hôi nổi bật với kiểu dáng dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn đảm bảo cảm giác thoải mái khi vận động. Đây là item quần short thể thao \"hot\" của nhà 5S Fashion giúp dễ dàng phối kết hợp với mọi loại áo hè mà ai cũng cần có trong tủ đồ. Thiết kế cạp cúc lịch sự, tôn dáng giúp mẫu quần này phù hợp mặc cả khi đi chơi, đi dạo phố, hẹn hò hay mặc hằng ngày ở nhà.\r\n\r\nThiết kế túi vát 2 bên kết hợp cùng túi sau tiện lợi. Bảng màu đa dạng với các tone màu từ trung tính, dễ mặc và dễ phối. Quần với sự kết hợp của 2 thành phần chất liệu là 90% Polyamide 10% Spandex. Polyamide là tên gọi khác của Freezing Nylon, thường được dùng cho dòng quần short, sịp. Với ưu điểm mềm mướt, bề mặt sáng bóng và nhẵn mịn, sợi vải mát lạnh, nhuộm màu sắc nét và tính đàn hồi tự nhiên cao. Kết hợp với tỉ lệ Spandex cao giúp sản phẩm có độ đàn hồi cực tốt, giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.'),
(101, 'Quần Short Thể Thao Nam, Cạp Cúc In Chữ Keep Fit', 399000, 'Quần Short Thể Thao Nam, Cạp Cúc In Chữ Keep Fit là item manh phong cách thể thao, khỏe khoắn không thể thiếu trong mùa hè này. Với chất liệu cao cấp, vừa mỏng nhẹ, thoáng mát, vừa chống nhăn nhàu hiệu quả, giúp cho quần short thể thao luôn đứng form, khỏe khoắn khi mặc. Với kiểu dáng Slim fit ôm dáng vừa vặn, quần giúp các chàng trai tự tin khoe ra vóc dáng cơ thể săn chắc và chuẩn đẹp. Bảng màu đa dạng với các tone màu trung tính, dễ mặc, dễ phối và đặc biệt mát mẻ cho ngày hè oi bức.'),
(102, 'Quần Short Thể Thao Nam, Vải Thun Lạnh Thoáng Mát', 349000, 'Quần Short Nam, Vải Thun Lạnh Thoáng Mát là thiết kế vừa đáp ứng tiêu chí thời trang, cuốn hút, vừa tiện dụng, thoải mái trong mọi hoạt động. Thiết kế đơn giản, phối màu chạy dọc 2 bên quần tạo ứng năng động, khỏe khoắn cho tổng thể. Chất liệu Freezing Nylon mềm mát, co giãn tốt, thấm hút mồ hôi, đem lại trải nghiệm thoáng mát tối đa khi mặc. Bảng màu đa dạng, chủ yếu là các tone màu trung tính, dễ mặc, thích hợp để mặc hằng ngày hay tham gia các hoạt động thể thao như chạy bộ, tập gym...  '),
(103, 'Quần Short Thể Thao Nam, Cạp Chun, Thoáng Mát', 409000, 'Quần Short Thể Thao Nam, Cạp Chun, Thoáng Mát là must have item không thể thiếu trong tủ đồ của nam giới với khả năng chống nhăn lên tới 99%. Với chất liệu cao cấp, mỏng nhẹ, thoáng mát, giữ cho chiếc quần luôn đứng form, khỏe khoắn khi mặc. Bảng màu quần đa dạng, thiết kế đơn giản, trẻ trung mang phong cách thể thao, khỏe khoắn, phù hợp với mọi lứa tuổi. Đây là mẫu quần short thể thao được yêu thích nhất tại.\r\n\r\nQuần có kiểu dáng Slim fit vừa vặn, tôn dáng mà vẫn đảm bảo mang tới trải nghiệm thoải mái trong từng cử động. Thiết kế khỏe khoắn với túi quần tiện dụng. Quần có cạp chun co giãn kết hợp với dây rút linh hoạt giúp người mặc dễ dàng điều chỉnh và thoải mái trong từng vận động. '),
(104, 'Quần Short Thể Thao Nam, Cạp Chun Thoáng Khí ', 389000, 'Quần Short Thể Thao Nam, Cạp Chun Thoáng Khí sở hữu phom dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn đảm bảo trải nghiệm thoải mái khi vận động. Quần short thể thao được thiết kế khỏe khoắn với túi 2 bên và túi sau mông tiện lợi. Thiết kế cạp chun co giãn kết hợp với dây rút linh hoạt, dễ dàng phù hợp với mọi dáng người khác nhau. Bảng màu quần đa dạng, chủ yếu là các gam màu trung tính, dễ mặc, dễ phối, đem tới nhiều lựa kết hợp trang phục cho mùa hè này.'),
(105, 'Quần Short Thể Thao Nam, RUNNING, Thoáng Mát', 409000, 'Quần Short Thể Thao Nam RUNNING, Thoáng Mát, Nhanh Khô là mẫu quần được thiết kế với form dáng Slim fit ôm nhẹ vừa vặn mà vẫn đảm bảo cảm giác thoải mái khi vận động. Sở hữu thiết kế basic khỏe khoắn, túi quần trước sau tiện lợi cùng phần cạp cục nam tính, chỉn chu, mẫu quần short thể thao này có thể dễ dàng phối kết hợp với hầu hết các trang phục khác nhau.\r\n\r\nĐây là mẫu quần short thể thao cạp cúc phối can cạp chun lót bên trong vừa mang đến diện mạo chỉn chu, thanh lịch, vừa không lo gò bó khi mặc. Logo Just Keep Running trước gấu quần được in silicon nổi bằng công nghệ High-tech cao cấp, đảm bảo không bong tróc trong quá trình sử dụng, giặt là. '),
(106, 'Quần Short Thể Thao Nam, Cạp Chun Thoải Mái', 399000, 'Quần Short Thể Thao Nam, Cạp Chun Thoải Mái là mẫu quần short thể thao làm từ chất liệu Polyamide thoáng khí, không lo bết dính mồ hôi khi mặc. Đặc biệt, mẫu quần này sở hữu bề mặt vải mềm mượt, mát, thoáng khí và mau khô mà vẫn giữ form tốt, bền đẹp mang đến vẻ ngoài năng động, khỏe khoắn cho nam giới. Đây là mẫu quần short độc quyền của 5S Fashion với thiết kế basic, phù hợp với mọi độ tuổi cùng chất liệu bền đẹp, thoáng mát và mau khô, không lo nhăn nhàu trong suốt quá trình sử dụng.\r\n\r\nQuần short thể thao có kiểu dáng Slim fit ôm vừa vặn, tôn dáng kết hợp cùng thiết kế lỗ thông hơi siêu thoáng khí, hút ẩm nhanh và đánh bay mồ hôi bết dính trên da. Đây là thiết kế quần short thể thao basic với màu sắc cơ bản, dễ mặc, dễ phối với hầu hết các loại trang phục khác nhau. '),
(107, 'Quần Short Thể Thao Nam, Thoáng Khí', 389000, 'Quần Short Thể Thao Nam, Thoáng Khí là mẫu quần không thể bỏ qua trong mùa hè này nhờ thiết kế lỗ thông hơi siêu thoáng khí, hút ẩm nhanh, đánh bay mồ hôi bết dính trên da. Với chất liệu 86% Polyamide 14% Spandex, quần short thể thao nổi bật với những ưu điểm như: mềm mượt, nhẵn mịn, sợi vải mát lạnh với tính đàn hồi tự nhiên cao. Đây được xem là mẫu quần short thể thao hoàn hảo cho các hoạt động thể dục thể thao, tập gym, chạy bộ mang đến trải nghiệm thoải mái và thoáng mát tối đa. '),
(108, 'Quần Kaki Dài Nam, Đứng Phom, Tôn Dáng', 649000, 'Quần Kaki Dài Nam, Đứng Phom, Tôn Dáng nổi bật với kiểu dáng Slim fit vừa vặn, tôn dáng mà vẫn đảm bảo cảm giác thoải mái khi mặc. Độ dài quần vừa phải, bảng màu đâ dạng, phù hợp với mọi lứa tuổi. Với chất liệu 97% Cotton, quần dài kaki giúp giải quyết nỗi lo nóng bí, khó khăn khi vận động, nhất là trong những ngày tiết trời mùa hè oi bức. Đặc biệt, việc bổ sung thêm 3% thành phần Spandex giúp nâng cao trải nghiệm về độ co giãn, đem tới cảm giác thoải mái khi mặc. Đây là một trong những mẫu quần công sở bán chạy nhất tại 5S Fashion mà các chàng trai không nên bỏ lỡ.'),
(109, 'Tất Nam, Kháng Khuẩn, Khử Mùi ', 19000, 'Tất Nam sử dụng chất liệu Cotton mềm mại, thấm hút mồ tốt, sản phẩm giữ cho đôi chân luôn thoáng mát nên rất phù hợp với những ai thường mang giày cả ngày. Sản phẩm được dệt bo tròn cổ đảm bảo không bị tụt trong suốt quá trình vận động, đi lại.'),
(110, 'Quần Short Âu Nam, Cạp Cúc, Thêu Logo Sang Trọng', 569000, 'Quần Short Âu Nam, Cạp Cúc, Thêu Logo Sang Trọng là mẫu quần được ưa chuộng nhờ thiết kế basic với đường cắt may tinh tế, tỉ mỉ, mang đến diện mạo chỉn chu, lịch lãm cho quý ông trong mọi hoàn cảnh. Quần có form dáng Regular fit suông vừa, không ôm quá sát nhưng vẫn tôn dáng, tạo cảm giác thoải mái cho người mặc. Quần sở hữu bảng màu đa dạng với các tone màu trung tính, dễ mặc và dễ phối cho bạn nam thỏa sức lựa chọn. '),
(111, 'Quần Short Kaki Nam, Thiết Kế Cạp Cúc, Trẻ Trung', 499000, 'Quần Short Kaki Nam, Thiết Kế Cạp Cúc, Trẻ Trung là sản phẩm năm trong bộ sưu tập quần short kaki đang được ưa chuộng. Với kiểu dáng Slim fit vừa vặn, tôn dáng, quần short kaki vừa mang tới diện mạo thanh lịch cho nam giới, vừa đảm bảo sự thoải mái trong mọi hoạt động. \r\n\r\nQuần được làm từ sự kết hợp của các thành phần chất liệu chỉ 14.5% Cotton nhưng loại vải này có bề mặt ngoài mang đậm chất cotton, mềm mại, thấm hút, thoáng mát. Tencel - một chất liệu vải sinh học cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả và có nhiều đặc điểm tương tự Modal. Kết hợp cùng 66% Polyester ở mặt trong tạo độ mướt giảm sự cọ sát lên da, giúp tăng độ bền, độ bóng sắc nét, tăng độ bền màu của vải và giúp giá giảm giá thành. 5% Spandex giúp vải có độ co giãn nhẹ giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.'),
(112, 'Quần Short Kaki Nam, Cạp Cúc, Vải Tencel Thoáng Mát', 429000, 'Quần Short Kaki Nam, Cạp Cúc, Vải Tencel Thoáng Mát với kiểu dáng Slim fit vừa vặn, tôn dáng, dễ dàng kết hợp với hầu hết mọi kiểu áo trong tủ đồ. Thiết kế túi vát 2 bên và 2 túi sau có cúc cài vừa tăng tính thẩm mỹ, thanh lịch cho chiếc, vừa bảo quản ví, điện thoại tốt hơn. Bảng màu đa dạng chủ yếu là các gam màu trung tính, dễ mặc, dễ phối. \r\n\r\nQuần được làm từ vải Tencel (hay còn có tên gọi khác là Lyocell) là loại vải sinh học an toàn và thân thiện với môi trường nhất hiện nay. Loại vải này có nguồn gốc từ gỗ cây sồi với những ưu điểm vượt trội như thấm hút tốt, độ đàn hồi cao, dễ dàng nhuộm màu và thân thiện với làn da của người mặc. Việc bổ sung thêm thành phần Polyester và Spandex giúp vải quần bền đẹp, tăng độ co giãn, đàn hồi thoải mái khi mặc và ít bám bụi, dễ vệ sinh hơn. '),
(113, 'Quần Short Kaki Nam, Vải Cotton Co Giãn Thoải Mái', 429000, 'Quần Short Kaki Nam, Vải Cotton Co Giãn Thoải Mái với kiểu dáng Slim fit vừa vặn, tôn dáng mà vẫn thoải mái trong mọi hoạt động, giúp nam giới tự tin mỗi ngày. Quần short kaki nổi bật với thiết kế cạp cúc sang trọng kết hợp cùng 2 túi vát và túi sau có cúc cài vừa tinh tế, vừa tiện lợi. Đây được xem là item không thể thiếu trong tủ đồ của nam giới vào mùa hè, dễ dàng phối kết hợp với hầu hết các kiểu áo đa dạng như polo, t-shirt... của nhà 5S Fashion.\r\n\r\nChất vải Cotton & Polyester khi kết hợp cùng Tencel - 1 loại sợi Nano cao cấp giúp cấu trúc vải chặt chẽ hơn, hạn chế bai rão, bề mặt vải cũng mềm, mịn hơn nhờ các sợi Tencel Nano đan xen giữa các khoảng trống của vải Cotton/Polyester. Tencel có tính kháng khuẩn tương tự Modal và có khả năng chống nhăn giúp anh chàng giữ được dáng vẻ thanh lịch, nam tính suốt cả ngày dài. '),
(114, 'Quần Short Kaki Nam, Mềm Mại, Thoáng Mát', 469000, 'Quần Short Kaki Nam, Mềm Mại, Thoáng Mát với kiểu dáng Slim fit vừa vặn, tôn dáng mà không ôm quá sát, đảm bảo sự thoải mái cho người mặc. Thiết kế basic với đường cắt may tỉ mỉ, mang đến diện mạo chỉn chu, thanh lịch và nam tính cho nam giới. Quần có túi xẻ hai bên kết hợp với túi sau có cúc cài tiện lợi, thích hợp để đựng ví, điện thoại, thẻ... \r\n\r\nThành phần chính của mẫu quần short kaki vẫn là Cotton, vẫn có những tính năng mềm mại, thoáng mát, thấm hút mồ hôi tốt. Khi kết hợp với Linen tạo ra hiệu ứng xược trắng trên bề mặt vải giúp mặt vải trở nên đẹp và lạ mắt. Ngoài ra Linen cũng là một chất tự nhiên nguồn gốc từ cây lanh có độ bền, độ bóng cao, an toàn cho da và thân thiện với môi trường.\r\n\r\nVới 5% Spandex giúp cho chất liệu vải thành phẩm có độ co giãn tương đối tốt, giúp người mặc thoải mái trong ngày Hè. Việc bổ sung thêm sợi Polyester giúp khắc phục nhược điểm bạc màu của dòng vải Cotton, tăng độ bền vải, chống nhăn, chống mài mòn tốt và giúp màu sắc vải bắt mắt hơn lại giúp giảm giá thành đáng kể. '),
(115, 'Quần Short Kaki Nam, Thiết Kết Cạp Cúc Smart', 449000, 'Quần Short Kaki Nam, Thiết Kết Cạp Cúc Smart - Waist là lựa chọn dẫn đầu xu hướng thời trang hè hiện nay nhờ những ưu điểm vượt trội như thiết kế gọn gàng, tiện dụng. Điểm nhấn của mẫu quần này nằm ở phần cạp cúc Smart Waist thông minh với thiết kế giấu cúc sang trọng, thanh lịch, mang đến diện mạo nam tính đầy thu hút cho phái mạnh. Với màu sắc đa dạng cùng kiểu dáng Slim fit, tôn dáng, chuẩn phom, giúp người mặc thoải mái trong từng hoạt động.  \r\nQuần được làm từ Cotton truyền thống làm nên tên tuổi của dòng Khaki. Với sợi bông tự nhiên mang đặc tính vô cùng thoáng mát, thấm hút mồ hôi tốt. Thêm vào đó, kiểu dệt thoi giúp cho cấu trúc vải chắc chắn hơn, ít bị chảy hoặc giãn và tăng tuổi thọ của chiếc quần Kaki. Khi kết hợp với 3% Spandex giúp vải có độ co giãn nhẹ, giúp người mặc thoải mái hơn.'),
(116, 'Quần Short Kaki Nam, Thiết Kết Cạp Chun Pha Cúc', 479000, 'Quần Short Kaki Nam, Thiết Kết Cạp Chun Pha Cúc là mẫu quần short thiết kế bán chun linh hoạt cho vòng bụng, vừa thoải mái nhưng vẫn đảm bảo diện mạo chỉn chu, lịch sự cho nam giới. Phần chun eo giúp tăng độ co giãn, dễ mặc hơn. Quần Short Kaki được may tỉ mi kèm chi tiết thêu tay 5S Matter cực kì tinh tế. Quần sở hữu khóa YKK cao cấp, bền bỉ, đảm bảo không hỏng hóc hay hoen gỉ trong quá trình sử dụng. \r\n\r\nVới kiểu dáng Slim fit ôm vừa vặn kết hợp cùng điểm nhấn ốp dây dệt bản họa tiết ở cạp sau của quần short kaki góp phần mang đến một thiết kế trẻ trung, mới mẻ, dễ dàng mix cùng hầu hết các trang phục trong tủ đồ. '),
(117, 'Quần Short Kaki Nam, Chất Cotton, Thoải Mái Vận Động', 499000, 'Quần Short Kaki Nam, Chất Cotton, Thoải Mái Vận Động, là mẫu quần short mới với chất liệu Cotton Kaki thoáng mát, thấm hút mồ hôi và nhanh khô. Quần được thiết kế với kiểu dáng basic cùng cạp cúc sang trọng, thanh lịch, thích hợp để mặc hằng ngày, đi chơi, đi picnic đều phù hợp. Kiểu dáng Slim fit vừa vặn, tôn dáng, là item thiết thực nhất cho mùa hè nắng nóng giúp bạn nam luôn cảm thấy thoải mái trong từng chuyển động. '),
(118, 'Quần Short Kaki Nam, Chất Liệu Cotton, Co Giãn Thoải Mái', 469000, ' \r\nQuần Short Kaki, Chất Liệu Cotton, Co Giãn Thoải Mái là item must have cho mùa hè và những chuyến đi nhờ thiết kế trẻ trung, nam tính cùng form dáng Slim fit ôm vừa vặn, tôn dáng. Với thiết kế basic cùng bảng màu đa dạng, đây chính là mẫu quần short kaki nam linh hoạt cho mọi lứa tuổi và mọi dáng người.'),
(119, 'Quần Short Kaki Nam, Họa Tiết Hươu Bắt Mắt', 439000, 'Quần Short Kaki, Họa Tiết Con Hươu Bắt Mắt luôn là lựa chọn ưu tiên của nam giới nhờ tính ứng dụng cao, có thể diện đi chơi, đi dạo phố, hẹn hò, tham gia các hoạt động thể thao hoặc đi biển. Quần có kiểu dáng Slim fit ôm vừa vặn, giúp người mặc tự tin, thoải mái khi hoạt động mà không lo bị khó chịu hay gò bó. Điểm nhấn nổi bật của thiết kế này nằm ở họa tiết con hượu trên phần thân quần mang phong cách trẻ trung, tươi mới. \r\n\r\nVới form dáng thông minh, độ dài vừa vặn, phù hợp với mọi lứa tuổi cùng bảng màu đa dạng, quần Short Kaki là lựa chọn dễ dàng kết hợp với mọi loại áo hè mà ai cũng nên có trong tủ đồ. \r\n\r\n');
INSERT INTO `product` (`ProductID`, `ProductName`, `productPrice`, `ProductDescription`) VALUES
(120, 'Quần Short Kaki Nam, Chất Vải Bamboo Tự Nhiên', 429000, 'Quần Short Kaki Nam, Chất Vải Bamboo Tự Nhiên có kiểu dáng Slim fit ôm sát vừa vặn, phù hợp với mọi dáng người giúp che đi tối đa khuyết điểm trên cơ thể nam giới. Quần short kaki được thiết kế basic, dễ dàng kết hợp với nhiều kiểu áo khác nhau: áo T-shirt, áo Polo, tanktop hay  sơ mi cộc... Với mỗi cách phối kết hợp sẽ mang đến một diện mạo khác nhau như thanh lịch, tinh tế hay khỏe khoắn, cá tính. '),
(122, 'Áo Polo Nam, Phong Cách Thể Thao, Trẻ Trung', 479000, 'Áo Polo Nam, Phong Cách Thể Thao, Trẻ Trung nổi bật với kiểu dáng Slim fit ôm vừa vặn, tôn dáng nhưng vẫn đảm bảo thoải mái khi mặc. Thiết kế phối vải khỏe khoắn kết hợp cùng đường line chạy dọc cổ áo và vai áo, mang đến phong cách thể thao, nam tính cho người mặc. Logo Perfect Life ở ngực trái của áo bền đẹp, tỉ mỉ, đảm bảo không bong tróc trong quá trình sử dụng hay giặt là. Cổ áo và tay áo được dệt bo đứng phom, thanh lịch để nam giới tự tin mặc đi học, đi làm hay đi chơi đều phù hợp. \r\n\r\nSự kết hợp của các thành phần chất liệu là Viscose, Freezing Nylon và Spandex mang tới trải nghiệm mềm mại, thoáng mát tối đa cho chiếc áo Polo. Chất vải này cũng tăng tốc độ hút ẩm, bay hơi nhanh chóng, thấm hút mồ hôi tốt, phù hợp với cả những ngày thời tiết oi nóng, cơ thể đổ nhiều mồ hôi mà không lo bí bách hay có mùi khó chịu khi mặc. '),
(123, 'Áo Polo Nam, Kiểu Dáng Regular Fit Thoải Mái', 489000, 'Áo Polo Nam, Kiểu Dáng Regular Fit Thoải Mái suông nhẹ nhưng vẫn ôm vừa đủ, mang tới vẻ ngoài trẻ trung, lịch lãm mà vẫn thoải mái cho người mặc. Áo Polo nổi bật với hiết kế basic, cổ và tay áo cùng màu với vải chính, màu sắc trung tính, hoạt tiết dệt Jaccquard thời trrang tạo điểm nhấn sang trọng, lịch lãm cho nam giới. Đây được xem là item bán chạy nhất hiện nay.\r\n\r\nChất liệu Freezing Nylon hay còn được biết đến với tên gọi khác là thun lạnh siêu mềm, co giãn cực tốt giúp hạn chế tối đa nhăn nhàu khi mặc. Công nghệ Freezing Nylon tối ưu nhiệt, giảm ngay từ 5-7 độ khi mặc trong thời tiết oi bức của mùa hè. Ngoài ra, khi kết hợp thêm thành phần Polyester và Spandex giúp vải có những hiệu ứng melange đẹp mắt cùng với đó là những tính năng mà Polyester có thể bổ trợ cho Freezing Nylon như: Tăng độ bền vải, tăng khả năng thấm hút mồ hôi và giúp sản phẩm nhanh khô.\r\n\r\nVới bàng màu lạ mắt, vừa nhã nhặn, vừa tinh tế, chiếc áo Polo nam này xứng đáng là item \"cần có\" trong tủ đồ của các quý ông để diện trong bất kỳ hoàn cảnh nào, mang tới cho nam giới vẻ ngoài chỉn chu và thu hút. '),
(124, 'Áo Sơ Mi Nam Dài Tay, Vải Bamboom Kháng Khuẩn Tự Nhiên', 629000, 'Áo Sơ Mi Nam Dài Tay, Vải Bamboom Kháng Khuẩn Tự Nhiên sở hữu thiết kế phom Slim fit ôm nhẹ vừa vặn, tôn dáng mà vẫn thoải mái trong từng hoạt động. Thiết kế vạt lượn chỉn chu kết hợp cùng công nghệ vải không nhăn giúp nam giới tiết kiệm thời gian là ủi mà vẫn giữ được dáng vẻ thanh lịch suốt cả ngày dài.\r\n\r\nÁo sơ mi dài tay được nâng cấp từ phiên bản Bamboo sợi tre được nghiên cứu và ứng dụng với tính nắng chống nhăn tự nhiên. Việc bổ sung thêm sợi Microfiber có cấu trúc siêu mảnh, độ mịn gấp đôi so với sợi tơ. Đây là một trong những chất liệu đặc biệt an toàn, thân thiên với môi trường và làn da người dùng. \r\n\r\nKhi kết hợp Bamboo và Microfiber sẽ đem lại cảm giác mềm mại tuyệt vời, thoải mái hơn cho người mặc, khả năng kháng khuẩn cao đến 90% và chống ẩm mốc vượt trội hơn so với các chất liệu thông thường. '),
(125, 'Áo Sơ Mi Ngắn Tay Nam, Phom Dáng Casual Fit Thoải Mái', 609000, 'Áo Sơ Mi Ngắn Tay Nam, Phom Dáng Casual Fit Thoải Mái suông nhẹ, vừa vặn, đảm bảo cảm giác thoải mái trong mọi hoạt động. Thiết kế đơn giản, tà lượn, không túi cùng màu xanh phối với các đường kẻ line thời thượng. Logo Premium vừa mang tới diện mạo thanh lịch, tinh tế, cho các quý ông, vừa đảm bảo đây là mẫu thiết kế độc quyền chính hãng. Điểm nhấn của mẫu áo này nằm ở phần cổ áo với 2 cúc cài lạ mắt được thiết kế song song, vừa trẻ trung, vừa thanh lịch.\r\n\r\nÁo sơ mi Bamboo vải sợi tre đã không còn quá xa lạ, nay được cải tiến hơn với phiên bản nâng cấp thành phần chất liệu: 50% Bamboo & 50% Microfiber. Sợi Microfiber có cấu trúc siêu mảnh, độ mịn gấp đôi so với sợi tơ. Đây là một trong những chất liệu đặc biệt an toàn và thân thiện với người dùng. Sự kết hợp hoàn hảo giữa sợi tre Bamboo và sợi Microfiber sẽ đem lại cảm giác mềm mại tuyệt vời, thoải mái hơn cho người mặc, khả năng kháng khuẩn cao đến 90% và chống ẩm mốc vượt trội hơn chất liệu thông thường.'),
(126, 'Áo Sơ Mi Ngắn Tay Nam, Vải Bamboo, Thoáng Khí', 619000, 'Áo Sơ Mi Nam Ngắn Tay, Vải Bamboo, Thoáng Khí có kiểu dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn đảm bảo cảm giác thoải mái khi mặc. Áo sơ mi được thiết kế basic, dễ mặc, dễ phối, phù hợp với nhiều hoàn cảnh, sự kiện khác nhau. Họa tiết kẻ caro xanh phối trắng trẻ trung, nam tính mà vẫn đảm bảo dáng vẻ thanh lịch, sang trọng cho các quý ông.\r\n\r\nChất vải Bamboo là loại sợi tổng hợp được tạo nên bởi cellulose tách từ cây tre. Vải bamboo có đặc tính thoáng khí mát mẻ, chống tia cực tím, kháng khuẩn, khử mùi tốt và vô cùng thân thiện với môi trường bởi được tạo bởi chất liệu tre không sử dụng hóa chất, an toàn cho người sử dụng. Bổ sung tỉ lệ Microfiber và Spandex mang lại ưu điểm: Giảm độ nhăn, tăng độ bền của vải, màu sắc bắt mắt hơn cho chiếc áo sơ mi.'),
(127, 'Áo Sơ Mi Ngắn Tay Nam, Vải Bamboo, Kháng Khuẩn', 619000, 'Sơ Mi Cộc Tay Nam, Vải Bamboo, Kháng Khuẩn, Thoáng Mát nổi bật với kiểu dáng Slim fit ôm sát vừa vặn mà không gây cảm giác gò bó khi mặc. Thiết kế basic, cổ áo đứng phom với họa tiết kẻ caro xanh biển tươi mát, trẻ trung, là item không thể thiếu trong tủ đồ của nam giới trong mùa hè này. \r\n\r\nÁo sơ mi được làm từ chất liệu Bamboo được dệt từ 100% sợi tre nhự nhiên, vô cùng mềm mại, chống nhăn nhau, lành tính với làn da, đem tới cảm giác thoải mái, mềm mát khi mặc. Đặc biệt, việc bổ sung thêm thành phần Mirofiber - một loại sợi gốc Polyester/Polyamide với tỉ lệ 80/20 có kích thước nhỏ cỡ micro mét tạo cảm giác mềm mịn thoải mái. Do các sợi nhỏ cỡ micro nên mật độ sợi dày hơn giúp vải thành phẩm bền và ổn định hơn, giảm độ co rút và giảm nhăn đáng kể.'),
(128, 'Họa Tiết Trắng Kẻ Xanh Biển', 509000, 'Áo Sơ Mi Nam Cộc Tay, Họa Tiết Trắng Kẻ Xanh Biển là thiết kế mới nhất trong bộ sưu tập Công sở Xuân Hè của 5S Fashion với kiểu dáng Slim fit vừa vặn, tôn dáng. Thiết kế đơn giản, vạt lượn, không túi cùng cổ áo đứng lịch sự. Màu sắc trắng kẻ xanh biển lịch lãm, thời thượng tạo nên dấu ấn thanh lịch, nam tính cho quý ông.\r\n\r\nÁo sơ mi được làm từ chất liệu Bamboo được dệt từ các sợi Cenlulose đến từ cây Tre tự nhiên sở hữu những ưu điểm vượt trội như kháng khuẩn, thấm hút mồ hôi tốt, chống tia UV và ngăn ngừa sự xuất hiện của vi khuẩn, nấm mốc trên quần áo, mềm mại nên rất an toàn với làn da người mặc. Vệc kết hợp thêm với Mirofiber - một loại sợi gốc Polyester/Polyamide với tỉ lệ 80/20 có kích thước nhỏ cỡ micro mét tạo cảm giác mềm mịn thoải mái. Do các sợi nhỏ cỡ micro nên mật độ sợi dày hơn giúp vải thành phẩm bền và ổn định hơn, giảm độ co rút và giảm nhăn đáng kể.'),
(129, 'Áo Sơ Mi Nam Ngắn Tay, Vải Bamboo, Chống Tia Cực Tím', 519000, 'Áo Sơ Mi Nam Ngắn Tay, Vải Bamboo, Chống Tia Cực Tím có kiểu dáng Slim fit vừa vặn, tôn dáng mà vẫn đảm bảo cảm giác thoải mái trong mọi hoạt động. Áo được thiết kế basic với tà lượn, không túi cùng cổ áo đứng phom lịch sự. Điểm nhấn nằm ở họa tiết trắng kẻ xanh lịch lãm, thời thượng, mang đến diện mạo sang trọng và nam tính cho các quý ông. \r\n\r\nÁo được làm từ chất vải Bamboo sở hữu hàng loạt các ưu điểm như thấm hút tốt hơn sợi Cotton tới 60%, mềm mượt nhưng vẫn giữ được phom dáng, chống nhăn hiệu quả, kháng khuẩn tự nhiên, khử mùi, chống tia UV và tăng cường khả năng bảo vệ da. Có thể nói đây là chiếc áo sơ mi giúp giải quyết nỗi lo về sự gò bò, tạo cảm giác thoải mái mà vẫn đảm bảo vẻ ngoài chỉn chu, lịch sự cho các quý ông. '),
(130, 'Áo Sơ Mi Nam Ngắn Tay, Vải Bamboo, Kháng Khuẩn', 579000, 'Áo Sơ Mi Ngắn Tay Nam, Vải Bamboo, Kháng khuẩn, Khử Mùi sở hữu kiểu dáng Slim fit ôm vừa vặn, tôn dáng, đảm bảo cảm giác thoải mái, dễ dàng trong mọi hoạt động. Với thiết kế chỉn chu đến từng chi tiết như cổ áo đứng phom, tà lượn, không túi tạo cảm giác thoải mái, phù hợp với nhiều sự kiện và hoàn cảnh. Điểm nhấn của áo sơ mi nằm ở họa tiết chấm in trên nền vải trắng tạo hiệu ứng nổi bật, mang đến phong cách thời trang lịch lãm, thời thượng cho các quý ông. Đây là item áo sơ mi họa tiết luôn nằm trong top bán chạy của 5S Fashion.\r\n\r\nChất liệu Bamboo được dệt từ các sợi Tre tự nhiên sở hữu hàng loạt những ưu điểm như thoáng khí mát mẻ, chống tia cực tím, kháng khuẩn, khử mùi tốt và vô cùng thân thiện với môi trường... Việc kết hợp với Mirofiber - một loại sợi gốc Polyester/Polyamide với tỉ lệ 80/20 có kích thước nhỏ cỡ micro mét tạo cảm giác mềm mịn thoải mái. Do các sợi nhỏ cỡ micro nên mật độ sợi dày hơn giúp vải thành phẩm bền và ổn định hơn, giảm độ co rút và giảm nhăn đáng kể.'),
(134, 'Áo Sơ Mi Cộc Tay, Vải Bamboo Kháng Khuẩn, Không Nhăn', 559000, 'Áo Sơ Mi Cộc Tay, Vải Bamboo Kháng Khuẩn, Không Nhăn được thiết kế theo form dáng Slim fit với kiểu dáng ôm vừa vặn, tôn dáng mà vẫn đảm bảo trải nghiệm thoải mái khi vận động. Điểm nhấn của mẫu áo này nằm ở họa tiết kẻ sọc trắng xanh trẻ trung, thanh lịch, phù hợp với các quý ông công sở. Bên cạnh đó, item áo sơ mi cộc tay này cũng không quá kén dáng khi có thể phối được với hầu hết các trang phuc có trong tủ đồ của bạn nam.\r\n\r\nÁo được làm từ chất liệu Tre tự nhiên với các ưu điểm như thoáng khí mát mẻ, chống tia cực tím, kháng khuẩn, khử mùi tốt và đặc biệt thân thiên với môi trường khi được tạo nên từ các sợi Cellulose tách từ cây tre tự, không dùng hóa chất nên an toàn với cả làn da người mặc. Khi kết hợp với Mirofiber - một loại sợi gốc Polyester/Polyamide với tỉ lệ 80/20 có kích thước nhỏ cỡ micro mét tạo cảm giác mềm mịn thoải mái. Do các sợi nhỏ cỡ micro nên mật độ sợi dày hơn giúp vải thành phẩm bền và ổn định hơn, giảm độ co rút và giảm nhăn đáng kể.'),
(135, 'Áo Sơ Mi Nam Ngắn Tay, Vải Modal, Thoáng Khí, Chống Nhăn', 569000, 'Áo Sơ Mi Nam Ngắn Tay, Vải Modal, Thoáng Khí, Chống Nhăn là mẫu áo sở hữu kiểu áo Casual fit thoải mái, dễ mặc, phù hợp với mọi dáng người và mọi độ tuổi. Áo được thiết kế basic với tà bằng trẻ trung mà không kém phần chỉn chu, thanh lịch. \r\n\r\nÁo được làm từ chất liệu Microfiber với cấu trúc sợi siêu mảnh, độ mịn gấp đôi so với sợi tơi, là một trong những chất vải an toàn, thân thiện với môi trường và làn da người mặc. Trong khi đó, Modal là loại vải có nguồn gốc từ gỗ của cây sồi, an toàn với người sử dụng và thân thiện với môi trường. Chất liệu vải Modal có đặc tính mềm mịn, chống nhăn, đàn hồi tốt và hút ẩm cao hơn cotton đến 48%. Kết hợp Modal với Mirofiber giúp vải thành phẩm bền và ổn định hơn, giảm độ co rút và giảm nhăn đáng kể.\r\n\r\nThêm vào đó, sự góp mặt của Cotton giúp vải thành phẩm có giá tối ưu hơn mà vẫn giữ được các tính năng thấm hút, thoáng mát của vải & tạo hiệu ứng bề mặt khô hơn giống như những chiếc sơ mi Cotton phong cách casual nhưng vẫn giữ được độ sang trọng cao cấp của vải Modal. '),
(136, 'Áo Sơ Mi Cộc Tay Nam, Vải Bamboo Kháng Khuẩn', 609000, 'Áo Sơ Mi Cộc Tay Nam, Vải Bamboo Kháng Khuẩn nổi bật với kiểu dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn thoải mái trong mọi hoạt động. Sự kết hợp giữa các đường kẻ tạo nên thiết kế áo sơ mi vừa lịch lãm, vừa trẻ trung, nam tính. Áo sơ mi có tone màu xanh blue tươi mát trên nền chất liệu Bamboo mềm mại, thoáng khí mang tới trải nghiệm thoải mái tối đa cho quý ông công sở.\r\n\r\nÁo được làm từ chất liệu Bamboo tự nhiên - một loại sợi tổng hợp được tạo nên bởi cellulose tách từ cây tre. Vải bamboo có đặc tính thoáng khí mát mẻ, chống tia cực tím, kháng khuẩn, khử mùi tốt và vô cùng thân thiện với môi trường bởi được tạo bởi chất liệu tre không sử dụng hóa chất, an toàn cho người sử dụng. Loại vải này rất mềm và mướt nên có thể giảm thiểu độ ma sát với làn da, không gây kích ứng và phù hợp với làn da nhạy cảm.\r\n\r\nKết hợp với Mirofiber - một loại sợi gốc Polyester/Polyamide với tỉ lệ 80/20 có kích thước nhỏ cỡ micro mét tạo cảm giác mềm mịn thoải mái. Do các sợi nhỏ cỡ micro nên mật độ sợi dày hơn giúp vải thành phẩm bền và ổn định hơn, giảm độ co rút và giảm nhăn đáng kể. Bổ sung thêm thành phần Spandex giúp cho áo có độ co giãn nhẹ để người mặc thoải mái hơn trong mọi hoạt động. '),
(138, 'Áo Sơ Mi Cộc Tay Nam, Vải Bamboo Kháng Khuẩn', 539000, 'Áo Sơ Mi Cộc Tay Nam, Vải Modal, Mềm Mịn, Co Giãn, Thoáng Mát là mẫu áo sở hữu kiểu dáng Slim fit tôn dáng, dễ mặc cùng màu trắng basic chưa bao giờ lỗi mốt. Với form áo hơi ôm, vạt bằng thoải mái, áo mang tới diện mạo thanh lịch, khỏe khoắn mà không kém phần trẻ trung cho nam giới, phù hợp với mọi dáng người và mọi độ tuổi. Đây là item mà các chàng trai công sở nhất định phải sở hữu ít nhất một chiếc trong tủ đồ của mình. \r\n\r\nVới thành phần 100% Cotton được dệt từ các sợi bông tự nhiên, sờ vào mịn tay, thoáng mát, thấm hút mồ hôi tốt nên đặc biệt phù hợp với thời tiết mùa hè oi bức, giúp nam giới tự tin suốt cả ngày dài. Chất liệu thiên nhiên nên mẫu áo này rất an toàn với người sử dụng và thân thiện với môi trường. '),
(139, 'Áo Sơ Mi Ngắn Tay Nam, Chống Nhăn, Kháng Khuẩn', 479000, 'Áo Sơ Mi Ngắn Tay Nam, Chống Nhăn, Kháng Khuẩn với kiểu dáng Slimfit ôm nhẹ, vừa vặn mà vẫn đảm bảo cảm giác thoải mái khi vận động. Áo được thiết kế basic với tà bằng không túi, tone màu trắng đơn giản nhưng tinh tế, ấn tượng mang đến phong thái chuyên nghiệp, nam tính và lịch lãm cho các quý ông. \r\n\r\nChất vải 50% Bamboo + 50% Polyester có đặc tính thoáng khí mát mẻ, kháng khuẩn, khử mùi cực tốt nên rất thích hợp mặc trong những ngày hè oi nóng. Sợi Polyester có kích thước siêu nhỏ tạo cảm giác mềm mịn, đồng thời, giúp áo sơ mi bền đẹp, giảm co rút và chống nhăn hiệu quả'),
(140, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả', 96000, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả là thiết kế quần sịp nam brief thông hơi với hàng ngàn lỗ thoáng khí cực kỳ thoải mái. Quần sở hữu lớp kháng khuẩn giúp bảo vệ da một cách tối ưu, chống ẩm và hạn chế nấm mốc cực tốt, an toàn với làn da vùng nhạy cảm. Chất liệu Coolmax sở hữu độ dẻo dai, mềm mại và co giãn bền bỉ cho mọi kích cỡ, từ đó giúp nam giới tự tin trong các hoạt động hằng ngày. \r\n\r\n'),
(141, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả', 96000, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả là thiết kế quần sịp nam brief thông hơi với hàng ngàn lỗ thoáng khí cực kỳ thoải mái. Quần sở hữu lớp kháng khuẩn giúp bảo vệ da một cách tối ưu, chống ẩm và hạn chế nấm mốc cực tốt, an toàn với làn da vùng nhạy cảm. Chất liệu Coolmax sở hữu độ dẻo dai, mềm mại và co giãn bền bỉ cho mọi kích cỡ, từ đó giúp nam giới tự tin trong các hoạt động hằng ngày. \r\n\r\n'),
(142, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả ', 96000, 'Quần Lót Nam, Kháng Khuẩn Hiệu Quả là mẫu quần sịp nam dáng boxer ôm sát vừa vặn với cơ thể, nâng đỡ tốt cho vùng nhạy cảm, tạo cảm giác thoáng mát và thoải mái tối đa khi mặc. Quần được thiết kế cạp chun dệt logo với độ co giãn tốt, không gây lằn bụng. \r\n\r\nQuần sịp đùi nam nổi bật với chất liệu thun lạnh Coolmax sở hữu độ dẻo dai, mềm mại và co giãn bền bỉ cho mọi kích cỡ được kết hợp cùng thiết kế với hàng ngàn lỗ thoáng khí giúp phái mạnh tự tin trong mọi hoạt động hằng ngày. \r\n'),
(146, 'Quần lót nam Modal Air  dáng Trunk', 96000, 'Quần lót nam Modal Air được ra mắt trong BST đồ lót Micro Modal Air lần đầu tiên và duy nhất có tại Việt Nam.\r\n\r\nVới sự kết hợp giữa 92% Micro modal air + 8% spandex tạo nên dòng sản phẩm ưu việt.\r\n\r\nChất liệu Modal vốn là chất liệu có nguồn gốc từ gỗ sồi, nhưng qua nghiên cứu và dệt sợi trên quy trình hiện đại đã tạo nên những thước vải mang tính ưu việt: thân thiện với làn da, không gây kích ứng, có đặc tính kháng khuẩn tự nhiên, thông hơi, thoáng khí, thoải mái suốt ngày dài'),
(147, 'Quấn lót nam MICROFIBER STRUCTURE EASY FIT dáng Trunk', 96000, 'Quấn lót nam MICROFIBER STRUCTURE EASY FIT dáng Trunk được ra mắt trong BST đồ lót Micro Modal Air lần đầu tiên và duy nhất có tại Việt Nam.\r\n\r\nVới sự kết hợp giữa 92% Micro modal air + 8% spandex tạo nên dòng sản phẩm ưu việt.\r\n\r\nChất liệu Modal vốn là chất liệu có nguồn gốc từ gỗ sồi, nhưng qua nghiên cứu và dệt sợi trên quy trình hiện đại đã tạo nên những thước vải mang tính ưu việt: thân thiện với làn da, không gây kích ứng, có đặc tính kháng khuẩn tự nhiên, thông hơi, thoáng khí, thoải mái suốt ngày dài'),
(148, 'Quần lót nam VISCOSE EXTRA SOFT dáng Trunk', 96000, 'Quần lót nam VISCOSE EXTRA SOFT dáng Trunkđược ra mắt trong BST đồ lót Micro Modal Air lần đầu tiên và duy nhất có tại Việt Nam.\r\n\r\nVới sự kết hợp giữa 92% Micro modal air + 8% spandex tạo nên dòng sản phẩm ưu việt.\r\n\r\nChất liệu Modal vốn là chất liệu có nguồn gốc từ gỗ sồi, nhưng qua nghiên cứu và dệt sợi trên quy trình hiện đại đã tạo nên những thước vải mang tính ưu việt: thân thiện với làn da, không gây kích ứng, có đặc tính kháng khuẩn tự nhiên, thông hơi, thoáng khí, thoải mái suốt ngày dài'),
(149, 'Áo Thun Nam Ngắn Tay, Thiết Kế In Chuyển Màu Trẻ Trung', 329000, 'Áo Thun Nam Ngắn Tay, Thiết Kế In Chuyển Màu Trẻ Trung là item trẻ trung, mới mẻ mà các anh chắc chắn cần có trong tủ đồ của mùa hè. Kiểu dáng Slim fit vừa vặn, tôn dáng mà không quá ôm sát tạo cảm giác gò bó với người mặc. Cổ áo được dệt bo bền đẹp, giữ phom tốt. Điểm nhấn của thiết kế này nằm ở màu in loang chuyển màu độc đáo, hút mắt với bảng màu đa dạng. \r\n\r\nChất vải Cotton USA được biết đến là loại vải có cấu trúc sợi dai và dài vượt trội. Chất liệu này đã hoàn thiện được những ưu điểm có sẵn của cotton truyền thống. Độ thấm hút cao, chịu nhiệt tốt, giữ màu sắc bền đẹp; đồng thời khắc phục hầu hết nhược điểm cũ như: co rút, dễ nhăn, xù, bạc màu. Kết hợp với Spandex giúp sản phẩm có độ đàn hồi tốt, người mặc sẽ thoải mái vận động. Vải thành phẩm được xử lý qua công nghệ Wash giúp bề mặt mềm hơn, độ cầm màu tốt hơn & giảm độ co rút.'),
(150, 'Áo Thun Nam, Chất Vải Freezing Nylon Thoáng Mát', 259000, 'Áo Thun Nam, Chất Vải Freezing Nylon Thoáng Mát là sản phẩm được ứng dụng công nghệ mới đột phá với chất liệu Thun Lạnh siêu nhẹ, mang đến trải nghiệm thoáng mát tối đa cho người mặc. Bền mặt vải mượt hơn, co giãn tốt hơn với hàng ngàn lỗ thoáng khí, thông hơi và thấm hút mồ hôi cực tốt khi mặc. Áo giúp chống bám bụi, chống nhăn hiêu quả giúp chàng trai tiết kiệm được tối đa thời gian là ủi.\r\n\r\nBảng màu áo thun chủ yếu hướng tối các tone màu trung tính, cơ bản, dễ mặc và dễ phối. Công nghệ làm mát đột phá giúp áo thun tăng độ thoáng khí, thoát nhiệt nhanh và giảm ngay từ 5 - 7 độ C khi mặc. Đây là một trong những item mang phong cách thể thao, khỏe khoắn của 5S Fashion không thể thiếu trong tủ đồ hằng ngày, đi chơi, đi tập hay picnic của các chàng trai. '),
(151, 'Áo Thun Nam Ngắn Tay Cổ Tròn, In Chữ Ardent', 259000, 'Áo Thun Nam Cổ Tròn, In Chữ Ardent là thiết kế đơn giản, thoải mái với tính ứng dụng cao. Áo thun có form dáng Slim fit vừa vặn, tôn dáng nhưng không hề gây cảm giác khó chịu hay bó sát khi mặc. Điểm nhấn của mẫu áo thun này nằm ở logo chữ Ardent được in ép nhiệt silicon mỏng với công nghệ High tech sắc nét, đảm bảo không bong tróc, phai mờ trong quá trình sử dụng hay giặt là. \r\n\r\nChất liệu Viscose (hay sợi lụa nhân tạo) là loại sợi tổng hợp từ chất xơ của sợi cellulose làm từ bột gỗ như cây sồi, thông, bạch đàn, cây tre… sở hữu hầu hết những đặc tính vượt trội của các chất liệu khác như lụa, cotton hay vải linen,… Vải Viscose khá mềm mịn, bóng mượt, thoáng khí, khả năng thấm hút mồ hôi và kháng khuẩn tốt. Với đặc tính dễ dàng nhuộm màu nên mẫu áo Polo này có màu sắc đa dạng, bắt mắt để bạn nam có thể thỏa sức lựa chọn.\r\n\r\nĐặc biệt, việc bổ sung thêm thành phần chất liệu Cotton còn giúp tăng  khả năng thoáng khí và thâm hút mồ hôi tăng lên vượt trội, đồng thời cũng khắc phục được những hạn chế của sợi cotton truyền thống. Thành phầm Spandex giúp sản phẩm có độ đàn hồi tốt, giảm độ co rút và người mặc sẽ thoải mái vận động. \r\n\r\nÁo được thiết kế tỉ mỉ đến từng chi tiết: cổ tròn bọc dây dệt giữ phom, mác ép nhiệt cao cấp không gây vướng ngứa khi mặc... Đây là item dễ phối đồ mà mọi chàng trai đều nên sở hữu ít nhất một chiếc trong tủ đồ mùa hè của mình. '),
(152, 'Áo Thun Nam Ngắn Tay, Thoáng Mát, Chống Nhăn', 259000, 'Áo Thun Nam Ngắn Tay, Thoáng Mát, Chống Nhăn là mẫu áo thun in hình thể thao mới nhất. Áo được thiết kế với form dáng Slim fit, ôm vừa vặn nhưng cũng không quá bó sát, tạo sự thoải mái cho người mặc. Đặc biệt, điểm nhấn của thiết kế này nằm ở họa tiết in chữ nằm vuông góc bên ngực trái của áo bằng công nghệ chuyển nhiệt Plastisol không bóng, bền đẹp, sắc nét, không lo bong tróc trong quá trình sử dụng hay giặt là.  \r\n\r\nVới bảng màu đa dạng, thiết kế trẻ trung, đây được xem là item hiện đại, mang sự năng động, dễ mặc và dễ dàng phối kết hợp cùng nhiều trang phục để phù hợp với nhiều hoàn cảnh khác nhau như mặc ở nhà, đi học, đi chơi, picnic, hẹn hò... '),
(153, 'Áo Thun Nam Ngắn Tay, Hạ Nhiệt, Thoáng Khí', 279000, ' Áo Thun Nam, Hạ Nhiệt, Thoáng Khí là một trong những item cơ bản, dễ mặc không thể thiếu trong tủ đồ thời trang hằng ngày. Với thiết kế ngắn tay, cổ tròn kết hợp với form dáng Slim fit ôm vừa vặn, áo thun giúp tôn dáng mà vẫn tạo cảm giác thoải mái, không bó sát vào cơ thể khi mặc. Điểm đặc biệt của sản phẩm là phần họa tiết in chữ RUNNING bằng silicon ứng dụng công nghệ High-tech cao cấp, giúp tăng độ bền đẹp, không lo bong tróc trong quá trình sử dụng. ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productcategory`
--

CREATE TABLE `productcategory` (
  `ProductCategoryID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `CategoryID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `productcategory`
--

INSERT INTO `productcategory` (`ProductCategoryID`, `ProductID`, `CategoryID`) VALUES
(43, 43, 3),
(44, 44, 3),
(45, 45, 3),
(46, 46, 3),
(47, 47, 3),
(48, 48, 3),
(49, 49, 3),
(50, 50, 3),
(51, 51, 3),
(52, 52, 3),
(53, 53, 3),
(54, 54, 3),
(55, 55, 3),
(56, 56, 3),
(57, 57, 3),
(58, 58, 3),
(59, 59, 3),
(60, 60, 3),
(61, 61, 3),
(62, 62, 3),
(63, 63, 2),
(64, 64, 2),
(65, 65, 2),
(66, 66, 2),
(67, 67, 2),
(68, 68, 2),
(70, 70, 2),
(71, 71, 4),
(72, 72, 4),
(73, 73, 4),
(75, 75, 4),
(77, 77, 4),
(78, 78, 4),
(79, 79, 4),
(80, 80, 4),
(81, 81, 4),
(82, 82, 4),
(83, 83, 4),
(84, 84, 4),
(85, 85, 4),
(86, 86, 4),
(87, 87, 4),
(88, 88, 4),
(90, 90, 7),
(91, 91, 7),
(92, 92, 7),
(93, 93, 7),
(94, 94, 7),
(95, 95, 7),
(96, 96, 7),
(97, 97, 7),
(98, 98, 7),
(99, 99, 7),
(100, 100, 7),
(101, 101, 7),
(102, 102, 7),
(103, 103, 7),
(104, 104, 7),
(105, 105, 7),
(106, 106, 7),
(107, 107, 7),
(108, 108, 9),
(109, 109, 16),
(110, 110, 11),
(111, 111, 10),
(112, 112, 10),
(113, 113, 10),
(114, 114, 10),
(115, 115, 10),
(116, 116, 10),
(117, 117, 10),
(118, 118, 10),
(119, 119, 10),
(120, 120, 10),
(122, 122, 4),
(123, 123, 4),
(124, 124, 8),
(125, 125, 8),
(126, 126, 8),
(127, 127, 8),
(128, 128, 8),
(129, 129, 8),
(130, 130, 8),
(134, 134, 8),
(135, 135, 8),
(136, 136, 8),
(138, 138, 8),
(139, 139, 8),
(140, 140, 14),
(141, 141, 14),
(142, 142, 13),
(146, 146, 13),
(147, 147, 13),
(148, 148, 13),
(149, 149, 2),
(150, 150, 2),
(151, 151, 2),
(152, 152, 2),
(153, 153, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productimage`
--

CREATE TABLE `productimage` (
  `ImageID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `productimage`
--

INSERT INTO `productimage` (`ImageID`, `ProductID`, `ImagePath`) VALUES
(175, 43, 'https://iili.io/JR4DWa1.jpg'),
(176, 43, 'https://iili.io/JR4mAmu.jpg'),
(177, 43, 'https://iili.io/JR4m5zb.jpg'),
(178, 43, 'https://iili.io/JR4m7Xj.jpg'),
(179, 43, 'https://iili.io/JR4mYLx.jpg'),
(180, 43, 'https://iili.io/JR4mcqQ.jpg'),
(181, 44, 'https://iili.io/JR4DiwG.jpg'),
(182, 44, 'https://iili.io/JR4DQn4.jpg'),
(183, 44, 'https://iili.io/JR4mXIa.jpg'),
(184, 44, 'https://iili.io/JR4mhhJ.jpg'),
(185, 44, 'https://iili.io/JR4mNBR.jpg'),
(186, 44, 'https://iili.io/JR4mO1p.jpg'),
(187, 44, 'https://iili.io/JR4merN.jpg'),
(188, 45, 'https://iili.io/JR4mtY7.jpg'),
(189, 45, 'https://iili.io/JR4mDv9.jpg'),
(190, 45, 'https://iili.io/JR4mbpe.jpg'),
(191, 45, 'https://iili.io/JR4mpTu.jpg'),
(192, 45, 'https://iili.io/JR4myhb.jpg'),
(193, 46, 'https://iili.io/JR4pqyF.jpg'),
(194, 46, 'https://iili.io/JR4pCTg.jpg'),
(195, 46, 'https://iili.io/JR4pnja.jpg'),
(196, 46, 'https://iili.io/JR4poZJ.jpg'),
(197, 46, 'https://iili.io/JR4pzCv.jpg'),
(198, 47, 'https://iili.io/JR4p7yX.jpg'),
(199, 47, 'https://iili.io/JR4paun.jpg'),
(200, 47, 'https://iili.io/JR4pcjs.jpg'),
(201, 47, 'https://iili.io/JR4pcjs.jpg'),
(202, 47, 'https://iili.io/JR4pEG4.jpg'),
(203, 47, 'https://iili.io/JR4pG6l.jpg'),
(204, 47, 'https://iili.io/JR4pWaS.jpg'),
(205, 48, 'https://iili.io/JR4pknj.jpg'),
(206, 48, 'https://iili.io/JR4pvMx.jpg'),
(207, 48, 'https://iili.io/JR4p86Q.jpg'),
(208, 48, 'https://iili.io/JR4pUFV.jpg'),
(209, 48, 'https://iili.io/JR4pgcB.jpg'),
(210, 48, 'https://iili.io/JR4pr8P.jpg'),
(211, 49, 'https://iili.io/JR4yBl2.jpg'),
(212, 49, 'https://iili.io/JR4yoH7.jpg'),
(213, 49, 'https://iili.io/JR4yxR9.jpg'),
(214, 49, 'https://iili.io/JR4yzNe.jpg'),
(215, 50, 'https://iili.io/JR4yMxa.jpg'),
(216, 50, 'https://iili.io/JR4yVWJ.jpg'),
(217, 50, 'https://iili.io/JR4yWiv.jpg'),
(218, 50, 'https://iili.io/JR4yhfR.jpg'),
(219, 50, 'https://iili.io/JR4yjlp.jpg'),
(220, 51, 'https://iili.io/JR4yvbn.jpg'),
(221, 51, 'https://iili.io/JR4ySxs.jpg'),
(222, 51, 'https://iili.io/JR4yUWG.jpg'),
(223, 51, 'https://iili.io/JR4ygsf.jpg'),
(224, 51, 'https://iili.io/JR4y4f4.jpg'),
(225, 52, 'https://iili.io/JR69nqv.jpg'),
(226, 52, 'https://iili.io/JR69IdN.jpg'),
(227, 52, 'https://iili.io/JR69uet.jpg'),
(228, 52, 'https://iili.io/JR69AmX.jpg'),
(229, 52, 'https://iili.io/JR695In.jpg'),
(230, 52, 'https://iili.io/JR697Xs.jpg'),
(231, 53, 'https://iili.io/JR69Mk7.jpg'),
(232, 53, 'https://iili.io/JR69Vp9.jpg'),
(233, 53, 'https://iili.io/JR69XIe.jpg'),
(234, 53, 'https://iili.io/JR69jLb.jpg'),
(235, 53, 'https://iili.io/JR69NBj.jpg'),
(236, 53, 'https://iili.io/JR69erQ.jpg'),
(237, 53, 'https://iili.io/JR698YB.jpg'),
(238, 53, 'https://iili.io/JR69SkP.jpg'),
(239, 54, 'https://iili.io/JR69tYN.jpg'),
(240, 54, 'https://iili.io/JR69DvI.jpg'),
(241, 54, 'https://iili.io/JR69bpt.jpg'),
(242, 54, 'https://iili.io/JR69pTX.jpg'),
(243, 54, 'https://iili.io/JR69yjn.jpg'),
(244, 54, 'https://iili.io/JR6H9Qs.jpg'),
(245, 55, 'https://iili.io/JR6HoZu.jpg'),
(246, 55, 'https://iili.io/JR6HzCb.jpg'),
(247, 55, 'https://iili.io/JR6HIGj.jpg'),
(248, 56, 'https://iili.io/JR6HcwF.jpg'),
(249, 56, 'https://iili.io/JR6HlZg.jpg'),
(250, 56, 'https://iili.io/JR6H1na.jpg'),
(251, 56, 'https://iili.io/JR6HEMJ.jpg'),
(252, 56, 'https://iili.io/JR6HG6v.jpg'),
(253, 56, 'https://iili.io/JR6HVFR.jpg'),
(254, 56, 'https://iili.io/JR6HWap.jpg'),
(255, 57, 'https://iili.io/JR6HtPj.jpg'),
(256, 57, 'https://iili.io/JR6HbKx.jpg'),
(257, 57, 'https://iili.io/JR6HmcQ.jpg'),
(258, 57, 'https://iili.io/JR6HpSV.jpg'),
(259, 57, 'https://iili.io/JR6J9HB.jpg'),
(260, 57, 'https://iili.io/JR6JHAP.jpg'),
(261, 57, 'https://iili.io/JR6JJN1.jpg'),
(262, 58, 'https://iili.io/JR6Jvb1.jpg'),
(263, 58, 'https://iili.io/JR6JUWg.jpg'),
(264, 58, 'https://iili.io/JR6Jgsa.jpg'),
(265, 58, 'https://iili.io/JR6J4qJ.jpg'),
(266, 58, 'https://iili.io/JR6J60v.jpg'),
(267, 58, 'https://iili.io/JR6JPgR.jpg'),
(268, 59, 'https://iili.io/JR6d91f.jpg'),
(269, 59, 'https://iili.io/JR6dddl.jpg'),
(270, 59, 'https://iili.io/JR6d272.jpg'),
(271, 60, 'https://iili.io/JR6dYLg.jpg'),
(272, 60, 'https://iili.io/JR6dcBa.jpg'),
(273, 60, 'https://iili.io/JR6dlEJ.jpg'),
(274, 60, 'https://iili.io/JR6d0rv.jpg'),
(275, 60, 'https://iili.io/JR6dE2R.jpg'),
(276, 60, 'https://iili.io/JR6dG7p.jpg'),
(277, 60, 'https://iili.io/JR6dMkN.jpg'),
(278, 61, 'https://iili.io/JR6dDvV.jpg'),
(279, 61, 'https://iili.io/JR6dbyB.jpg'),
(280, 61, 'https://iili.io/JR6dyj1.jpg'),
(281, 61, 'https://iili.io/JR629ZF.jpg'),
(282, 61, 'https://iili.io/JR62JCg.jpg'),
(283, 61, 'https://iili.io/JR62dGa.jpg'),
(284, 61, 'https://iili.io/JR6226J.jpg'),
(285, 61, 'https://iili.io/JR62F3v.jpg'),
(286, 62, 'https://iili.io/JR62IGs.jpg'),
(287, 62, 'https://iili.io/JR62AFf.jpg'),
(288, 62, 'https://iili.io/JR62Ra4.jpg'),
(289, 62, 'https://iili.io/JR62Y92.jpg'),
(290, 62, 'https://iili.io/JR62cw7.jpg'),
(291, 62, 'https://iili.io/JR62lt9.jpg'),
(292, 62, 'https://iili.io/JR62EMu.jpg'),
(293, 63, 'https://iili.io/JR4LT5G.jpg'),
(294, 63, 'https://iili.io/JR6F7h7.jpg'),
(295, 63, 'https://iili.io/JR6FYQ9.jpg'),
(296, 63, 'https://iili.io/JR6FcBe.jpg'),
(297, 64, 'https://iili.io/JR4Qfkb.jpg'),
(298, 64, 'https://iili.io/JR6FGYx.jpg'),
(299, 64, 'https://iili.io/JR6FMkQ.jpg'),
(300, 64, 'https://iili.io/JR6FVpV.jpg'),
(301, 64, 'https://iili.io/JR6FXTB.jpg'),
(302, 65, 'https://iili.io/JR4Q1CN.jpg'),
(303, 65, 'https://iili.io/JR6Fv3J.jpg'),
(304, 65, 'https://iili.io/JR6F8Yv.jpg'),
(305, 65, 'https://iili.io/JR6FSvR.jpg'),
(306, 66, 'https://iili.io/JR4ZHAJ.jpg'),
(307, 66, 'https://iili.io/JR6FrTN.jpg'),
(308, 66, 'https://iili.io/JR6F4jI.jpg'),
(309, 67, 'https://iili.io/JR4ZRPS.jpg'),
(310, 67, 'https://iili.io/JR6KKaj.jpg'),
(311, 67, 'https://iili.io/JR6Kf8x.jpg'),
(312, 67, 'https://iili.io/JR6KCuV.jpg'),
(313, 67, 'https://iili.io/JR6KnwB.jpg'),
(314, 67, 'https://iili.io/JR6Kzn1.jpg'),
(315, 68, 'https://iili.io/JR4tYsp.jpg'),
(316, 68, 'https://iili.io/JR6KY9R.jpg'),
(317, 68, 'https://iili.io/JR6Kaup.jpg'),
(318, 68, 'https://iili.io/JR6KcwN.jpg'),
(319, 68, 'https://iili.io/JR6KltI.jpg'),
(320, 68, 'https://iili.io/JR6K1nt.jpg'),
(329, 70, 'https://iili.io/JR4Dqps.jpg'),
(330, 70, 'https://iili.io/JR6Kgcb.jpg'),
(331, 70, 'https://iili.io/JR6KrSj.jpg'),
(332, 70, 'https://iili.io/JR6K6Hx.jpg'),
(333, 71, 'https://iili.io/JR6foJf.jpg'),
(334, 71, 'https://iili.io/JR6fzOl.jpg'),
(335, 71, 'https://iili.io/JR6fuxS.jpg'),
(336, 71, 'https://iili.io/JR6fAW7.jpg'),
(337, 71, 'https://iili.io/JR6fRs9.jpg'),
(338, 72, 'https://iili.io/JR6fEbV.jpg'),
(339, 72, 'https://iili.io/JR6fMzB.jpg'),
(340, 72, 'https://iili.io/JR6fVWP.jpg'),
(341, 72, 'https://iili.io/JR6fWs1.jpg'),
(342, 73, 'https://iili.io/JR6fsdG.jpg'),
(343, 73, 'https://iili.io/JR6fL7f.jpg'),
(344, 73, 'https://iili.io/JR6fQe4.jpg'),
(345, 73, 'https://iili.io/JR6fZml.jpg'),
(346, 73, 'https://iili.io/JR6fDI2.jpg'),
(353, 75, 'https://iili.io/JR6qiCP.jpg'),
(354, 75, 'https://iili.io/JR6qsG1.jpg'),
(355, 75, 'https://iili.io/JR6qL6F.jpg'),
(356, 75, 'https://iili.io/JR6qZ3g.jpg'),
(357, 75, 'https://iili.io/JR6qtaa.jpg'),
(365, 77, 'https://iili.io/JR6Cwge.jpg'),
(366, 77, 'https://iili.io/JR6COdu.jpg'),
(367, 77, 'https://iili.io/JR6Ckej.jpg'),
(368, 77, 'https://iili.io/JR6CSzQ.jpg'),
(369, 77, 'https://iili.io/JR6CUXV.jpg'),
(370, 78, 'https://iili.io/JR6nx49.jpg'),
(371, 78, 'https://iili.io/JR6nApj.jpg'),
(372, 78, 'https://iili.io/JR6n7hQ.jpg'),
(373, 78, 'https://iili.io/JR6nlEP.jpg'),
(374, 78, 'https://iili.io/JR6n041.jpg'),
(375, 79, 'https://iili.io/JR6n4j4.jpg'),
(376, 79, 'https://iili.io/JR6n6Zl.jpg'),
(377, 79, 'https://iili.io/JR6nsGS.jpg'),
(378, 79, 'https://iili.io/JR6nL67.jpg'),
(379, 79, 'https://iili.io/JR6ntae.jpg'),
(380, 80, 'https://iili.io/JR6osDv.jpg'),
(381, 80, 'https://iili.io/JR6oQxR.jpg'),
(382, 80, 'https://iili.io/JR6oZVp.jpg'),
(383, 80, 'https://iili.io/JR6otiN.jpg'),
(384, 80, 'https://iili.io/JR6obfI.jpg'),
(385, 81, 'https://iili.io/JR6xSIf.jpg'),
(386, 81, 'https://iili.io/JR6xgLl.jpg'),
(387, 81, 'https://iili.io/JR6x4B2.jpg'),
(388, 81, 'https://iili.io/JR6xQku.jpg'),
(389, 81, 'https://iili.io/JR6xZmb.jpg'),
(390, 82, 'https://iili.io/JR6IdMl.jpg'),
(391, 82, 'https://iili.io/JR6I2P2.jpg'),
(392, 82, 'https://iili.io/JR6IKc7.jpg'),
(393, 82, 'https://iili.io/JR6IB9e.jpg'),
(394, 82, 'https://iili.io/JR6Inwb.jpg'),
(395, 82, 'https://iili.io/JR6Iotj.jpg'),
(396, 82, 'https://iili.io/JR6Izox.jpg'),
(397, 83, 'https://iili.io/JR6IVKN.jpg'),
(398, 83, 'https://iili.io/JR6IjHX.jpg'),
(399, 83, 'https://iili.io/JR6IwRn.jpg'),
(400, 83, 'https://iili.io/JR6INNs.jpg'),
(401, 83, 'https://iili.io/JR6IODG.jpg'),
(402, 84, 'https://iili.io/JR6TJOg.jpg'),
(403, 84, 'https://iili.io/JR6T3zJ.jpg'),
(404, 84, 'https://iili.io/JR6TFWv.jpg'),
(405, 84, 'https://iili.io/JR6TKsR.jpg'),
(406, 84, 'https://iili.io/JR6Tqfp.jpg'),
(407, 85, 'https://iili.io/JR6T1ee.jpg'),
(408, 85, 'https://iili.io/JR6TMzb.jpg'),
(409, 85, 'https://iili.io/JR6TVXj.jpg'),
(410, 85, 'https://iili.io/JR6ThqQ.jpg'),
(411, 85, 'https://iili.io/JR6Tj1V.jpg'),
(412, 86, 'https://iili.io/JR6u2Y7.jpg'),
(413, 86, 'https://iili.io/JR6uFpe.jpg'),
(414, 86, 'https://iili.io/JR6uqhb.jpg'),
(415, 86, 'https://iili.io/JR6unCx.jpg'),
(416, 86, 'https://iili.io/JR6uoEQ.jpg'),
(417, 87, 'https://iili.io/JR6uXun.jpg'),
(418, 87, 'https://iili.io/JR6uOG4.jpg'),
(419, 87, 'https://iili.io/JR6ue6l.jpg'),
(420, 87, 'https://iili.io/JR6uvF2.jpg'),
(421, 87, 'https://iili.io/JR6u8aS.jpg'),
(422, 88, 'https://iili.io/JR6AFFp.png'),
(423, 88, 'https://iili.io/JR6AKcN.jpg'),
(424, 88, 'https://iili.io/JR6AB9t.jpg'),
(425, 88, 'https://iili.io/JR6ACAX.jpg'),
(426, 88, 'https://iili.io/JR6AnNn.jpg'),
(433, 90, 'https://iili.io/JRLZCTF.jpg'),
(434, 90, 'https://iili.io/JRLZnhg.jpg'),
(435, 90, 'https://iili.io/JRLZoQa.jpg'),
(436, 90, 'https://iili.io/JRLZzCJ.jpg'),
(437, 90, 'https://iili.io/JRLZIEv.jpg'),
(438, 90, 'https://iili.io/JRLZT4R.jpg'),
(439, 90, 'https://iili.io/JRLZRYN.jpg'),
(440, 91, 'https://iili.io/JRLZkCb.jpg'),
(441, 91, 'https://iili.io/JRLZvGj.jpg'),
(442, 91, 'https://iili.io/JRLZ86x.jpg'),
(443, 91, 'https://iili.io/JRLZgaV.jpg'),
(444, 91, 'https://iili.io/JRLZr8B.jpg'),
(445, 92, 'https://iili.io/JRLZkCb.jpg'),
(446, 92, 'https://iili.io/JRLZvGj.jpg'),
(447, 92, 'https://iili.io/JRLZ86x.jpg'),
(448, 92, 'https://iili.io/JRLZgaV.jpg'),
(449, 92, 'https://iili.io/JRLZr8B.jpg'),
(450, 93, 'https://iili.io/JRLto9S.jpg'),
(451, 93, 'https://iili.io/JRLtxA7.jpg'),
(452, 93, 'https://iili.io/JRLtzN9.jpg'),
(453, 93, 'https://iili.io/JRLtIte.jpg'),
(454, 93, 'https://iili.io/JRLtuou.jpg'),
(455, 94, 'https://iili.io/JRLtjlR.jpg'),
(456, 94, 'https://iili.io/JRLtwSp.jpg'),
(457, 94, 'https://iili.io/JRLtOHN.jpg'),
(458, 94, 'https://iili.io/JRLteRI.jpg'),
(459, 94, 'https://iili.io/JRLtkNt.jpg'),
(460, 94, 'https://iili.io/JRLtSxn.jpg'),
(461, 95, 'https://iili.io/JRLtQO7.jpg'),
(462, 95, 'https://iili.io/JRLtZb9.jpg'),
(463, 95, 'https://iili.io/JRLtDxe.jpg'),
(464, 95, 'https://iili.io/JRLtmib.jpg'),
(465, 95, 'https://iili.io/JRLtyfj.jpg'),
(466, 96, 'https://iili.io/JRLD90x.jpg'),
(467, 96, 'https://iili.io/JRLDHUQ.jpg'),
(468, 96, 'https://iili.io/JRLDdJV.jpg'),
(469, 96, 'https://iili.io/JRLD3OP.jpg'),
(470, 96, 'https://iili.io/JRLDfzF.jpg'),
(471, 96, 'https://iili.io/JRLDqWg.jpg'),
(472, 97, 'https://iili.io/JRLD90x.jpg'),
(473, 97, 'https://iili.io/JRLDHUQ.jpg'),
(474, 97, 'https://iili.io/JRLDdJV.jpg'),
(475, 97, 'https://iili.io/JRLD3OP.jpg'),
(476, 97, 'https://iili.io/JRLDfzF.jpg'),
(477, 97, 'https://iili.io/JRLDqWg.jpg'),
(478, 98, 'https://iili.io/JRLDl1f.jpg'),
(479, 98, 'https://iili.io/JRLD0g4.jpg'),
(480, 98, 'https://iili.io/JRLDEdl.jpg'),
(481, 98, 'https://iili.io/JRLDG72.jpg'),
(482, 98, 'https://iili.io/JRLDMeS.jpg'),
(483, 98, 'https://iili.io/JRLDVm7.jpg'),
(484, 98, 'https://iili.io/JRLDXI9.jpg'),
(485, 99, 'https://iili.io/JRLDerx.jpg'),
(486, 99, 'https://iili.io/JRLDvdQ.jpg'),
(487, 99, 'https://iili.io/JRLD87V.jpg'),
(488, 99, 'https://iili.io/JRLDSkB.jpg'),
(489, 99, 'https://iili.io/JRLDUmP.jpg'),
(490, 99, 'https://iili.io/JRLDrI1.jpg'),
(491, 100, 'https://iili.io/JRLb24f.jpg'),
(492, 100, 'https://iili.io/JRLbF24.jpg'),
(493, 100, 'https://iili.io/JRLbKYl.jpg'),
(494, 100, 'https://iili.io/JRLbfv2.jpg'),
(495, 100, 'https://iili.io/JRLbIEb.jpg'),
(496, 100, 'https://iili.io/JRLbA3x.jpg'),
(497, 101, 'https://iili.io/JRLbWaR.jpg'),
(498, 101, 'https://iili.io/JRLbXvp.jpg'),
(499, 101, 'https://iili.io/JRLbhyN.jpg'),
(500, 101, 'https://iili.io/JRLbwuI.jpg'),
(501, 101, 'https://iili.io/JRLbNjt.jpg'),
(502, 101, 'https://iili.io/JRLbOZX.jpg'),
(503, 101, 'https://iili.io/JRLbknn.jpg'),
(504, 102, 'https://iili.io/JRLbiw7.jpg'),
(505, 102, 'https://iili.io/JRLbst9.jpg'),
(506, 102, 'https://iili.io/JRLbQne.jpg'),
(507, 102, 'https://iili.io/JRLbZMu.jpg'),
(508, 102, 'https://iili.io/JRLbt6b.jpg'),
(509, 103, 'https://iili.io/JRLmzNI.jpg'),
(510, 103, 'https://iili.io/JRLmItt.jpg'),
(511, 103, 'https://iili.io/JRLmuoX.jpg'),
(512, 103, 'https://iili.io/JRLmAVn.jpg'),
(513, 103, 'https://iili.io/JRLm7KG.jpg'),
(514, 103, 'https://iili.io/JRLmYlf.jpg'),
(515, 103, 'https://iili.io/JRLmaS4.jpg'),
(516, 103, 'https://iili.io/JRLmlHl.jpg'),
(517, 104, 'https://iili.io/JRLm4fa.jpg'),
(518, 104, 'https://iili.io/JRLm60J.jpg'),
(519, 104, 'https://iili.io/JRLmPUv.jpg'),
(520, 104, 'https://iili.io/JRLmsJR.jpg'),
(521, 104, 'https://iili.io/JRLmLRp.jpg'),
(522, 104, 'https://iili.io/JRLmQON.jpg'),
(523, 105, 'https://iili.io/JRLpHgf.jpg'),
(524, 105, 'https://iili.io/JRLpdJ4.jpg'),
(525, 105, 'https://iili.io/JRLp25l.jpg'),
(526, 105, 'https://iili.io/JRLp3e2.jpg'),
(527, 105, 'https://iili.io/JRLpFbS.jpg'),
(528, 105, 'https://iili.io/JRLpfz7.jpg'),
(529, 105, 'https://iili.io/JRLpqX9.jpg'),
(530, 106, 'https://iili.io/JRLpl1a.jpg'),
(531, 106, 'https://iili.io/JRLp0rJ.jpg'),
(532, 106, 'https://iili.io/JRLpEdv.jpg'),
(533, 106, 'https://iili.io/JRLpG7R.jpg'),
(534, 106, 'https://iili.io/JRLpMep.jpg'),
(535, 106, 'https://iili.io/JRLpXII.jpg'),
(536, 107, 'https://iili.io/JRLperG.jpg'),
(537, 107, 'https://iili.io/JRLpv2f.jpg'),
(538, 107, 'https://iili.io/JRLp874.jpg'),
(539, 107, 'https://iili.io/JRLpSkl.jpg'),
(540, 108, 'https://iili.io/JRLylZ7.jpg'),
(541, 108, 'https://iili.io/JRLy1n9.jpg'),
(542, 108, 'https://iili.io/JRLyEGe.jpg'),
(543, 108, 'https://iili.io/JRLyV3b.jpg'),
(544, 108, 'https://iili.io/JRLyWaj.jpg'),
(545, 109, 'https://iili.io/JRQ9dtS.jpg'),
(546, 109, 'https://iili.io/JRQ93o7.jpg'),
(547, 109, 'https://iili.io/JRQ9KPe.jpg'),
(548, 109, 'https://iili.io/JRQ9qKu.jpg'),
(549, 109, 'https://iili.io/JRQ9Bcb.jpg'),
(550, 110, 'https://iili.io/JRLLyfR.jpg'),
(551, 110, 'https://iili.io/JRLQ9lp.jpg'),
(552, 110, 'https://iili.io/JRLQHUN.jpg'),
(553, 110, 'https://iili.io/JRLQdJI.jpg'),
(554, 110, 'https://iili.io/JRLQ2Rt.jpg'),
(555, 110, 'https://iili.io/JRLQ3OX.jpg'),
(556, 111, 'https://iili.io/JRQ9SxS.jpg'),
(557, 111, 'https://iili.io/JRQ9UW7.jpg'),
(558, 111, 'https://iili.io/JRQ9gs9.jpg'),
(559, 111, 'https://iili.io/JRQ94fe.jpg'),
(560, 112, 'https://iili.io/JRQ9ms1.jpg'),
(561, 112, 'https://iili.io/JRQ9yqF.jpg'),
(562, 112, 'https://iili.io/JRQHHga.jpg'),
(563, 112, 'https://iili.io/JRQHddJ.jpg'),
(564, 112, 'https://iili.io/JRQH25v.jpg'),
(565, 112, 'https://iili.io/JRQHFbp.jpg'),
(566, 113, 'https://iili.io/JRQHG7j.jpg'),
(567, 113, 'https://iili.io/JRQHSkv.jpg'),
(568, 113, 'https://iili.io/JRQHbp4.jpg'),
(569, 113, 'https://iili.io/JRQJfvj.jpg'),
(570, 113, 'https://iili.io/JRQJRaa.jpg'),
(571, 114, 'https://iili.io/JRQHG7j.jpg'),
(572, 114, 'https://iili.io/JRQHSkv.jpg'),
(573, 114, 'https://iili.io/JRQHbp4.jpg'),
(574, 114, 'https://iili.io/JRQJfvj.jpg'),
(575, 114, 'https://iili.io/JRQJRaa.jpg'),
(576, 115, 'https://iili.io/JRQ2Vpf.jpg'),
(577, 115, 'https://iili.io/JRQ2XI4.jpg'),
(578, 115, 'https://iili.io/JRQ2hhl.jpg'),
(579, 115, 'https://iili.io/JRQ2jQ2.jpg'),
(580, 115, 'https://iili.io/JRQ2OE7.jpg'),
(581, 116, 'https://iili.io/JRQ28Yu.jpg'),
(582, 116, 'https://iili.io/JRQ2Skb.jpg'),
(583, 116, 'https://iili.io/JRQ2Upj.jpg'),
(584, 116, 'https://iili.io/JRQ2rTx.jpg'),
(585, 116, 'https://iili.io/JRQ24hQ.jpg'),
(586, 116, 'https://iili.io/JRQ26QV.jpg'),
(587, 117, 'https://iili.io/JRQfJCQ.jpg'),
(588, 117, 'https://iili.io/JRQff8F.jpg'),
(589, 117, 'https://iili.io/JRQfoZv.jpg'),
(590, 117, 'https://iili.io/JRQf58X.jpg'),
(591, 117, 'https://iili.io/JRQfVFS.jpg'),
(592, 117, 'https://iili.io/JRQfUKB.jpg'),
(593, 118, 'https://iili.io/JRQfJCQ.jpg'),
(594, 118, 'https://iili.io/JRQff8F.jpg'),
(595, 118, 'https://iili.io/JRQfoZv.jpg'),
(596, 118, 'https://iili.io/JRQfVFS.jpg'),
(597, 118, 'https://iili.io/JRQfUKB.jpg'),
(598, 119, 'https://iili.io/JRQzL7V.jpg'),
(599, 119, 'https://iili.io/JRQzQkB.jpg'),
(600, 119, 'https://iili.io/JRQzZmP.jpg'),
(601, 119, 'https://iili.io/JRQzDI1.jpg'),
(602, 119, 'https://iili.io/JRQzbhF.jpg'),
(603, 120, 'https://iili.io/JRQ5mQI.jpg'),
(604, 120, 'https://iili.io/JRQ7d2s.jpg'),
(605, 120, 'https://iili.io/JRQ72YG.jpg'),
(606, 120, 'https://iili.io/JRQ73vf.jpg'),
(607, 120, 'https://iili.io/JRQ7Fp4.jpg'),
(608, 120, 'https://iili.io/JRQ7qj2.jpg'),
(616, 122, 'https://iili.io/JR6BkoN.jpg'),
(617, 122, 'https://iili.io/JR6BvVI.jpg'),
(618, 122, 'https://iili.io/JR6B8Pt.jpg'),
(619, 122, 'https://iili.io/JR6Bgln.jpg'),
(620, 122, 'https://iili.io/JR6BiN4.jpg'),
(621, 122, 'https://iili.io/JR6BQx2.jpg'),
(622, 123, 'https://iili.io/JR6qfIV.jpg'),
(623, 123, 'https://iili.io/JR6qnB1.jpg'),
(624, 123, 'https://iili.io/JR6qoEF.jpg'),
(625, 123, 'https://iili.io/JR6qI2a.jpg'),
(626, 123, 'https://iili.io/JR6qTYJ.jpg'),
(627, 124, 'https://iili.io/JRs15yG.jpg'),
(628, 124, 'https://iili.io/JRs1Yuf.jpg'),
(629, 124, 'https://iili.io/JRs1aj4.jpg'),
(630, 125, 'https://iili.io/JRs133F.jpg'),
(631, 125, 'https://iili.io/JRs1Kva.jpg'),
(632, 125, 'https://iili.io/JRs1fyJ.jpg'),
(633, 126, 'https://iili.io/JRQOa4a.jpg'),
(634, 126, 'https://iili.io/JRQOl3J.jpg'),
(635, 126, 'https://iili.io/JRQO0Yv.jpg'),
(636, 126, 'https://iili.io/JRQO1vR.jpg'),
(637, 127, 'https://iili.io/JRQOVjI.jpg'),
(638, 127, 'https://iili.io/JRQOWQt.jpg'),
(639, 127, 'https://iili.io/JRQOhCX.jpg'),
(640, 127, 'https://iili.io/JRQOjGn.jpg'),
(641, 128, 'https://iili.io/JRQO4n9.jpg'),
(642, 128, 'https://iili.io/JRL3nbR.jpg'),
(643, 128, 'https://iili.io/JRL3xxp.jpg'),
(644, 128, 'https://iili.io/JRL3zWN.jpg'),
(645, 129, 'https://iili.io/JRQObwB.jpg'),
(646, 129, 'https://iili.io/JRLqj6B.jpg'),
(647, 129, 'https://iili.io/JRLqN3P.jpg'),
(648, 130, 'https://iili.io/JRQedFa.jpg'),
(649, 130, 'https://iili.io/JRQe2cJ.jpg'),
(650, 130, 'https://iili.io/JRQe38v.jpg'),
(651, 130, 'https://iili.io/JRQefup.jpg'),
(652, 130, 'https://iili.io/JRQeBtI.jpg'),
(662, 134, 'https://iili.io/JRQeIFs.jpg'),
(663, 134, 'https://iili.io/JRQeTcG.jpg'),
(664, 134, 'https://iili.io/JRQeuSf.jpg'),
(665, 135, 'https://iili.io/JRQegHv.jpg'),
(666, 135, 'https://iili.io/JRQerRR.jpg'),
(667, 135, 'https://iili.io/JRQe4Np.jpg'),
(668, 135, 'https://iili.io/JRQe6DN.jpg'),
(669, 135, 'https://iili.io/JRQeixI.jpg'),
(670, 136, 'https://iili.io/JRQemJf.jpg'),
(671, 136, 'https://iili.io/JRQepR4.jpg'),
(672, 136, 'https://iili.io/JRQeyOl.jpg'),
(673, 136, 'https://iili.io/JRQk9b2.jpg'),
(678, 138, 'https://iili.io/JRQkC5x.jpg'),
(679, 138, 'https://iili.io/JRQknOQ.jpg'),
(680, 138, 'https://iili.io/JRQkobV.jpg'),
(681, 138, 'https://iili.io/JRQkIWP.jpg'),
(682, 139, 'https://iili.io/JRQkXgs.jpg'),
(683, 139, 'https://iili.io/JRQkjdG.jpg'),
(684, 139, 'https://iili.io/JRQkw7f.jpg'),
(685, 139, 'https://iili.io/JRQkNe4.jpg'),
(686, 140, 'https://iili.io/JRD0hlV.jpg'),
(687, 141, 'https://iili.io/JRD0DWG.jpg'),
(688, 141, 'https://iili.io/JRD0bsf.jpg'),
(689, 142, 'https://iili.io/JRDGkb9.jpg'),
(693, 146, 'https://iili.io/JRDME7V.jpg'),
(694, 147, 'https://iili.io/JRDVFYQ.jpg'),
(695, 148, 'https://iili.io/JRDVUcx.jpg'),
(696, 149, 'https://iili.io/J5HWZ1S.jpg'),
(697, 149, 'https://iili.io/J5HWtr7.jpg'),
(698, 149, 'https://iili.io/J5HWb29.jpg'),
(699, 149, 'https://iili.io/J5HWm7e.jpg'),
(700, 150, 'https://iili.io/J5nodtp.jpg'),
(701, 150, 'https://iili.io/J5noKPt.jpg'),
(702, 150, 'https://iili.io/J5noCSs.jpg'),
(703, 150, 'https://iili.io/J5nozN4.jpg'),
(704, 151, 'https://iili.io/J5nxUpj.jpg'),
(705, 151, 'https://iili.io/J5nxrTx.jpg'),
(706, 151, 'https://iili.io/J5nx4hQ.jpg'),
(707, 151, 'https://iili.io/J5nx6QV.jpg'),
(708, 151, 'https://iili.io/J5nxiCB.jpg'),
(709, 152, 'https://iili.io/J5nzoZl.jpg'),
(710, 152, 'https://iili.io/J5nzzn2.jpg'),
(711, 152, 'https://iili.io/J5nzIGS.jpg'),
(712, 152, 'https://iili.io/J5nzT67.jpg'),
(713, 152, 'https://iili.io/J5nzAF9.jpg'),
(714, 153, 'https://iili.io/J5nT27n.jpg'),
(715, 153, 'https://iili.io/J5nTBLl.jpg'),
(716, 153, 'https://iili.io/J5nTo1S.jpg'),
(717, 153, 'https://iili.io/J5nTT7e.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productquantity`
--

CREATE TABLE `productquantity` (
  `QuantityID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeID` bigint(20) DEFAULT NULL,
  `Quantity` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `productquantity`
--

INSERT INTO `productquantity` (`QuantityID`, `ProductID`, `SizeID`, `Quantity`) VALUES
(135, 43, 135, 39),
(136, 43, 136, 49),
(137, 43, 137, 43),
(138, 43, 138, 83),
(139, 44, 139, 39),
(140, 44, 140, 83),
(141, 44, 141, 38),
(142, 44, 142, 73),
(143, 45, 143, 34),
(144, 45, 144, 94),
(145, 45, 145, 32),
(146, 45, 146, 12),
(147, 46, 147, 39),
(148, 46, 148, 38),
(149, 46, 149, 49),
(150, 46, 150, 32),
(151, 47, 151, 32),
(152, 47, 152, 83),
(153, 47, 153, 32),
(154, 47, 154, 32),
(155, 48, 155, 38),
(156, 48, 156, 39),
(157, 48, 157, 85),
(158, 48, 158, 18),
(159, 49, 159, 39),
(160, 49, 160, 38),
(161, 49, 161, 17),
(162, 49, 162, 37),
(163, 49, 163, 18),
(164, 50, 164, 39),
(165, 50, 165, 83),
(166, 50, 166, 84),
(167, 50, 167, 72),
(168, 50, 168, 12),
(169, 51, 169, 38),
(170, 51, 170, 38),
(171, 51, 171, 43),
(172, 51, 172, 48),
(173, 52, 173, 39),
(174, 52, 174, 38),
(175, 52, 175, 34),
(176, 52, 176, 34),
(177, 53, 177, 38),
(178, 53, 178, 49),
(179, 53, 179, 84),
(180, 53, 180, 52),
(181, 53, 181, 85),
(182, 54, 182, 39),
(183, 54, 183, 48),
(184, 54, 184, 58),
(185, 55, 185, 84),
(186, 55, 186, 48),
(187, 55, 187, 38),
(188, 55, 188, 41),
(189, 55, 189, 12),
(190, 56, 190, 38),
(191, 56, 191, 48),
(192, 56, 192, 95),
(193, 56, 193, 58),
(194, 57, 194, 48),
(195, 57, 195, 94),
(196, 57, 196, 58),
(197, 57, 197, 85),
(198, 58, 198, 84),
(199, 58, 199, 84),
(200, 58, 200, 29),
(201, 58, 201, 85),
(202, 59, 202, 49),
(203, 59, 203, 95),
(204, 59, 204, 38),
(205, 59, 205, 48),
(206, 60, 206, 84),
(207, 60, 207, 93),
(208, 60, 208, 23),
(209, 60, 209, 48),
(210, 61, 210, 49),
(211, 61, 211, 83),
(212, 61, 212, 81),
(213, 61, 213, 28),
(214, 62, 214, 48),
(215, 62, 215, 28),
(216, 62, 216, 72),
(217, 62, 217, 17),
(218, 63, 218, 30),
(219, 63, 219, 88),
(220, 63, 220, 12),
(221, 63, 221, 65),
(222, 64, 222, 32),
(223, 64, 223, 59),
(224, 64, 224, 49),
(225, 64, 225, 21),
(226, 65, 226, 39),
(227, 65, 227, 59),
(228, 65, 228, 10),
(229, 65, 229, 35),
(230, 66, 230, 49),
(231, 66, 231, 85),
(232, 66, 232, 28),
(233, 66, 233, 4),
(234, 67, 234, 3),
(235, 67, 235, 5),
(236, 67, 236, 32),
(237, 67, 237, 34),
(238, 68, 238, 30),
(239, 68, 239, 39),
(240, 68, 240, 100),
(241, 68, 241, 300),
(245, 70, 245, 38),
(246, 70, 246, 84),
(247, 70, 247, 48),
(248, 70, 248, 73),
(249, 71, 249, 93),
(250, 71, 250, 38),
(251, 71, 251, 28),
(252, 71, 252, 48),
(253, 72, 253, 38),
(254, 72, 254, 48),
(255, 72, 255, 39),
(256, 72, 256, 41),
(257, 73, 257, 48),
(258, 73, 258, 38),
(259, 73, 259, 12),
(260, 73, 260, 39),
(261, 73, 261, 41),
(265, 75, 265, 43),
(266, 75, 266, 21),
(267, 75, 267, 31),
(268, 75, 268, 12),
(273, 77, 273, 41),
(274, 77, 274, 24),
(275, 77, 275, 31),
(276, 77, 276, 32),
(277, 78, 277, 32),
(278, 78, 278, 25),
(279, 78, 279, 31),
(280, 78, 280, 12),
(281, 79, 281, 123),
(282, 79, 282, 32),
(283, 79, 283, 31),
(284, 79, 284, 12),
(285, 80, 285, 123),
(286, 80, 286, 32),
(287, 80, 287, 31),
(288, 80, 288, 12),
(289, 81, 289, 23),
(290, 81, 290, 32),
(291, 81, 291, 131),
(292, 81, 292, 15),
(293, 82, 293, 53),
(294, 82, 294, 69),
(295, 82, 295, 11),
(296, 82, 296, 25),
(297, 83, 297, 53),
(298, 83, 298, 69),
(299, 83, 299, 11),
(300, 83, 300, 25),
(301, 84, 301, 32),
(302, 84, 302, 43),
(303, 84, 303, 123),
(304, 84, 304, 53),
(305, 85, 305, 53),
(306, 85, 306, 12),
(307, 85, 307, 23),
(308, 85, 308, 123),
(309, 86, 309, 23),
(310, 86, 310, 32),
(311, 86, 311, 43),
(312, 86, 312, 43),
(313, 87, 313, 58),
(314, 87, 314, 51),
(315, 87, 315, 94),
(316, 87, 316, 65),
(317, 88, 317, 43),
(318, 88, 318, 51),
(319, 88, 319, 61),
(320, 88, 320, 92),
(325, 90, 325, 43),
(326, 90, 326, 23),
(327, 90, 327, 42),
(328, 90, 328, 41),
(329, 91, 329, 43),
(330, 91, 330, 40),
(331, 91, 331, 42),
(332, 91, 332, 41),
(333, 92, 333, 53),
(334, 92, 334, 35),
(335, 92, 335, 91),
(336, 92, 336, 43),
(337, 93, 337, 53),
(338, 93, 338, 35),
(339, 93, 339, 91),
(340, 93, 340, 43),
(341, 94, 341, 51),
(342, 94, 342, 95),
(343, 94, 343, 34),
(344, 94, 344, 77),
(345, 95, 345, 43),
(346, 95, 346, 55),
(347, 95, 347, 36),
(348, 95, 348, 77),
(349, 96, 349, 43),
(350, 96, 350, 55),
(351, 96, 351, 36),
(352, 96, 352, 81),
(353, 97, 353, 43),
(354, 97, 354, 55),
(355, 97, 355, 36),
(356, 97, 356, 81),
(357, 98, 357, 84),
(358, 98, 358, 94),
(359, 98, 359, 43),
(360, 98, 360, 62),
(361, 99, 361, 84),
(362, 99, 362, 94),
(363, 99, 363, 43),
(364, 99, 364, 62),
(365, 100, 365, 53),
(366, 100, 366, 81),
(367, 100, 367, 51),
(368, 100, 368, 82),
(369, 101, 369, 53),
(370, 101, 370, 81),
(371, 101, 371, 51),
(372, 101, 372, 82),
(373, 102, 373, 82),
(374, 102, 374, 34),
(375, 102, 375, 82),
(376, 102, 376, 45),
(377, 103, 377, 82),
(378, 103, 378, 34),
(379, 103, 379, 82),
(380, 103, 380, 45),
(381, 104, 381, 44),
(382, 104, 382, 52),
(383, 104, 383, 68),
(384, 104, 384, 45),
(385, 105, 385, 64),
(386, 105, 386, 86),
(387, 105, 387, 68),
(388, 105, 388, 59),
(389, 106, 389, 64),
(390, 106, 390, 86),
(391, 106, 391, 68),
(392, 106, 392, 59),
(393, 107, 393, 32),
(394, 107, 394, 34),
(395, 107, 395, 61),
(396, 107, 396, 59),
(397, 108, 397, 45),
(398, 108, 398, 43),
(399, 108, 399, 94),
(400, 108, 400, 29),
(401, 108, 401, 51),
(402, 109, 402, 100),
(403, 110, 403, 34),
(404, 110, 404, 23),
(405, 110, 405, 34),
(406, 110, 406, 43),
(407, 111, 407, 34),
(408, 111, 408, 23),
(409, 111, 409, 42),
(410, 111, 410, 49),
(411, 112, 411, 43),
(412, 112, 412, 51),
(413, 112, 413, 42),
(414, 112, 414, 49),
(415, 113, 415, 51),
(416, 113, 416, 41),
(417, 113, 417, 42),
(418, 113, 418, 43),
(419, 114, 419, 41),
(420, 114, 420, 41),
(421, 114, 421, 42),
(422, 114, 422, 51),
(423, 115, 423, 51),
(424, 115, 424, 21),
(425, 115, 425, 51),
(426, 115, 426, 51),
(427, 116, 427, 61),
(428, 116, 428, 51),
(429, 116, 429, 21),
(430, 116, 430, 59),
(431, 117, 431, 81),
(432, 117, 432, 47),
(433, 117, 433, 39),
(434, 117, 434, 37),
(435, 118, 435, 51),
(436, 118, 436, 57),
(437, 118, 437, 85),
(438, 118, 438, 37),
(439, 119, 439, 81),
(440, 119, 440, 57),
(441, 119, 441, 71),
(442, 119, 442, 62),
(443, 120, 443, 39),
(444, 120, 444, 84),
(445, 120, 445, 18),
(446, 120, 446, 48),
(447, 120, 447, 42),
(451, 122, 451, 43),
(452, 122, 452, 21),
(453, 122, 453, 31),
(454, 122, 454, 12),
(455, 123, 455, 83),
(456, 123, 456, 49),
(457, 123, 457, 12),
(458, 124, 458, 93),
(459, 124, 459, 48),
(460, 124, 460, 49),
(461, 124, 461, 51),
(462, 125, 462, 59),
(463, 125, 463, 84),
(464, 125, 464, 42),
(465, 125, 465, 85),
(466, 126, 466, 58),
(467, 126, 467, 34),
(468, 126, 468, 83),
(469, 126, 469, 49),
(470, 127, 470, 58),
(471, 127, 471, 34),
(472, 127, 472, 83),
(473, 127, 473, 49),
(474, 128, 474, 51),
(475, 128, 475, 47),
(476, 128, 476, 84),
(477, 128, 477, 49),
(478, 129, 478, 48),
(479, 129, 479, 43),
(480, 129, 480, 81),
(481, 129, 481, 83),
(482, 130, 482, 41),
(483, 130, 483, 43),
(484, 130, 484, 85),
(485, 130, 485, 83),
(498, 134, 498, 14),
(499, 134, 499, 43),
(500, 134, 500, 21),
(501, 134, 501, 30),
(502, 135, 502, 43),
(503, 135, 503, 31),
(504, 135, 504, 51),
(505, 135, 505, 49),
(506, 136, 506, 43),
(507, 136, 507, 31),
(508, 136, 508, 51),
(509, 136, 509, 49),
(514, 138, 514, 43),
(515, 138, 515, 31),
(516, 138, 516, 51),
(517, 138, 517, 49),
(518, 139, 518, 81),
(519, 139, 519, 31),
(520, 139, 520, 28),
(521, 139, 521, 48),
(522, 140, 522, 40),
(523, 140, 523, 40),
(524, 140, 524, 40),
(525, 140, 525, 20),
(526, 141, 526, 50),
(527, 141, 527, 50),
(528, 141, 528, 50),
(529, 141, 529, 50),
(530, 142, 530, 50),
(531, 142, 531, 50),
(532, 142, 532, 50),
(533, 142, 533, 50),
(546, 146, 546, 50),
(547, 146, 547, 50),
(548, 146, 548, 50),
(549, 146, 549, 50),
(550, 147, 550, 50),
(551, 147, 551, 50),
(552, 147, 552, 50),
(553, 147, 553, 50),
(554, 148, 554, 50),
(555, 148, 555, 50),
(556, 148, 556, 50),
(557, 148, 557, 50),
(558, 149, 558, 29),
(559, 149, 559, 94),
(560, 149, 560, 45),
(561, 149, 561, 43),
(562, 150, 562, 94),
(563, 150, 563, 49),
(564, 150, 564, 43),
(565, 150, 565, 33),
(566, 151, 566, 94),
(567, 151, 567, 49),
(568, 151, 568, 43),
(569, 151, 569, 39),
(570, 152, 570, 43),
(571, 152, 571, 50),
(572, 152, 572, 30),
(573, 152, 573, 59),
(574, 153, 574, 54),
(575, 153, 575, 94),
(576, 153, 576, 51),
(577, 153, 577, 43);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productsize`
--

CREATE TABLE `productsize` (
  `SizeID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `productsize`
--

INSERT INTO `productsize` (`SizeID`, `ProductID`, `SizeName`) VALUES
(135, 43, 'S'),
(136, 43, 'M'),
(137, 43, 'L'),
(138, 43, 'XL'),
(139, 44, 'S'),
(140, 44, 'M'),
(141, 44, 'L'),
(142, 44, 'XL'),
(143, 45, 'S'),
(144, 45, 'M'),
(145, 45, 'L'),
(146, 45, 'XL'),
(147, 46, 'S'),
(148, 46, 'M'),
(149, 46, 'L'),
(150, 46, 'XL'),
(151, 47, 'S'),
(152, 47, 'M'),
(153, 47, 'L'),
(154, 47, 'XL'),
(155, 48, 'S'),
(156, 48, 'M'),
(157, 48, 'L'),
(158, 48, 'XL'),
(159, 49, 'S'),
(160, 49, 'M'),
(161, 49, 'L'),
(162, 49, 'XL'),
(163, 49, '2XL'),
(164, 50, 'S'),
(165, 50, 'M'),
(166, 50, 'L'),
(167, 50, 'XL'),
(168, 50, 'XXL'),
(169, 51, 'S'),
(170, 51, 'M'),
(171, 51, 'L'),
(172, 51, 'XL'),
(173, 52, 'S'),
(174, 52, 'M'),
(175, 52, 'L'),
(176, 52, 'XL'),
(177, 53, 'S'),
(178, 53, 'M'),
(179, 53, 'L'),
(180, 53, 'XL'),
(181, 53, 'XXL'),
(182, 54, 'S'),
(183, 54, 'M'),
(184, 54, 'L'),
(185, 55, 'S'),
(186, 55, 'M'),
(187, 55, 'L'),
(188, 55, 'XL'),
(189, 55, 'XXL'),
(190, 56, 'S'),
(191, 56, 'M'),
(192, 56, 'L'),
(193, 56, 'XL'),
(194, 57, 'S'),
(195, 57, 'M'),
(196, 57, 'L'),
(197, 57, 'XL'),
(198, 58, 'S'),
(199, 58, 'M'),
(200, 58, 'L'),
(201, 58, 'XL'),
(202, 59, 'S'),
(203, 59, 'M'),
(204, 59, 'L'),
(205, 59, 'XL'),
(206, 60, 'S'),
(207, 60, 'M'),
(208, 60, 'L'),
(209, 60, 'XL'),
(210, 61, 'S'),
(211, 61, 'M'),
(212, 61, 'L'),
(213, 61, 'XL'),
(214, 62, 'S'),
(215, 62, 'M'),
(216, 62, 'L'),
(217, 62, 'XL'),
(218, 63, 'S'),
(219, 63, 'M'),
(220, 63, 'L'),
(221, 63, 'XL'),
(222, 64, 'S'),
(223, 64, 'M'),
(224, 64, 'L'),
(225, 64, 'XL'),
(226, 65, 'S'),
(227, 65, 'M'),
(228, 65, 'XL'),
(229, 65, '2XL'),
(230, 66, 'M'),
(231, 66, 'L'),
(232, 66, 'XL'),
(233, 66, '2XL'),
(234, 67, 'S'),
(235, 67, 'L'),
(236, 67, 'L'),
(237, 67, '3XL'),
(238, 68, 'S'),
(239, 68, 'M'),
(240, 68, 'L'),
(241, 68, 'XL'),
(245, 70, 'S'),
(246, 70, 'M'),
(247, 70, 'L'),
(248, 70, 'XL'),
(249, 71, 'S'),
(250, 71, 'M'),
(251, 71, 'L'),
(252, 71, 'XL'),
(253, 72, 'S'),
(254, 72, 'M'),
(255, 72, 'L'),
(256, 72, 'XL'),
(257, 73, 'S'),
(258, 73, 'M'),
(259, 73, 'L'),
(260, 73, 'XL'),
(261, 73, 'XXL'),
(265, 75, 'S'),
(266, 75, 'M'),
(267, 75, 'L'),
(268, 75, 'XL'),
(273, 77, 'S'),
(274, 77, 'M'),
(275, 77, 'L'),
(276, 77, 'XL'),
(277, 78, 'S'),
(278, 78, 'M'),
(279, 78, 'L'),
(280, 78, 'XL'),
(281, 79, 'S'),
(282, 79, 'M'),
(283, 79, 'L'),
(284, 79, 'XL'),
(285, 80, 'S'),
(286, 80, 'M'),
(287, 80, 'L'),
(288, 80, 'XL'),
(289, 81, 'S'),
(290, 81, 'M'),
(291, 81, 'L'),
(292, 81, 'XL'),
(293, 82, 'S'),
(294, 82, 'M'),
(295, 82, 'L'),
(296, 82, 'XL'),
(297, 83, 'S'),
(298, 83, 'M'),
(299, 83, 'L'),
(300, 83, 'XL'),
(301, 84, 'S'),
(302, 84, 'M'),
(303, 84, 'L'),
(304, 84, 'XL'),
(305, 85, 'S'),
(306, 85, 'M'),
(307, 85, 'L'),
(308, 85, 'XL'),
(309, 86, 'S'),
(310, 86, 'M'),
(311, 86, 'L'),
(312, 86, 'XL'),
(313, 87, 'S'),
(314, 87, 'M'),
(315, 87, 'L'),
(316, 87, 'XL'),
(317, 88, 'S'),
(318, 88, 'M'),
(319, 88, 'L'),
(320, 88, 'XL'),
(325, 90, 'S'),
(326, 90, 'M'),
(327, 90, 'L'),
(328, 90, 'XL'),
(329, 91, 'S'),
(330, 91, 'M'),
(331, 91, 'L'),
(332, 91, 'XL'),
(333, 92, 'S'),
(334, 92, 'M'),
(335, 92, 'L'),
(336, 92, 'XL'),
(337, 93, 'S'),
(338, 93, 'M'),
(339, 93, 'L'),
(340, 93, 'XL'),
(341, 94, 'S'),
(342, 94, 'M'),
(343, 94, 'L'),
(344, 94, 'XL'),
(345, 95, 'S'),
(346, 95, 'M'),
(347, 95, 'L'),
(348, 95, 'XL'),
(349, 96, 'S'),
(350, 96, 'M'),
(351, 96, 'L'),
(352, 96, 'XL'),
(353, 97, 'S'),
(354, 97, 'M'),
(355, 97, 'L'),
(356, 97, 'XL'),
(357, 98, 'S'),
(358, 98, 'M'),
(359, 98, 'L'),
(360, 98, 'XL'),
(361, 99, 'S'),
(362, 99, 'M'),
(363, 99, 'L'),
(364, 99, 'XL'),
(365, 100, 'S'),
(366, 100, 'M'),
(367, 100, 'L'),
(368, 100, 'XL'),
(369, 101, 'S'),
(370, 101, 'M'),
(371, 101, 'L'),
(372, 101, 'XL'),
(373, 102, 'S'),
(374, 102, 'M'),
(375, 102, 'L'),
(376, 102, 'XL'),
(377, 103, 'S'),
(378, 103, 'M'),
(379, 103, 'L'),
(380, 103, 'XL'),
(381, 104, 'S'),
(382, 104, 'M'),
(383, 104, 'L'),
(384, 104, 'XL'),
(385, 105, 'S'),
(386, 105, 'M'),
(387, 105, 'L'),
(388, 105, 'XL'),
(389, 106, 'S'),
(390, 106, 'M'),
(391, 106, 'L'),
(392, 106, 'XL'),
(393, 107, 'S'),
(394, 107, 'M'),
(395, 107, 'L'),
(396, 107, 'XL'),
(397, 108, 'S'),
(398, 108, 'M'),
(399, 108, 'L'),
(400, 108, 'XL'),
(401, 108, '2XL'),
(402, 109, 'M'),
(403, 110, 'S'),
(404, 110, 'M'),
(405, 110, 'L'),
(406, 110, 'XL'),
(407, 111, 'S'),
(408, 111, 'M'),
(409, 111, 'L'),
(410, 111, 'XL'),
(411, 112, 'S'),
(412, 112, 'M'),
(413, 112, 'L'),
(414, 112, 'XL'),
(415, 113, 'S'),
(416, 113, 'M'),
(417, 113, 'L'),
(418, 113, 'XL'),
(419, 114, 'S'),
(420, 114, 'M'),
(421, 114, 'L'),
(422, 114, 'XL'),
(423, 115, 'S'),
(424, 115, 'M'),
(425, 115, 'L'),
(426, 115, 'XL'),
(427, 116, 'S'),
(428, 116, 'M'),
(429, 116, 'L'),
(430, 116, 'XL'),
(431, 117, 'S'),
(432, 117, 'M'),
(433, 117, 'L'),
(434, 117, 'XL'),
(435, 118, 'S'),
(436, 118, 'M'),
(437, 118, 'L'),
(438, 118, 'XL'),
(439, 119, 'S'),
(440, 119, 'M'),
(441, 119, 'L'),
(442, 119, 'XL'),
(443, 120, 'S'),
(444, 120, 'M'),
(445, 120, 'L'),
(446, 120, 'XL'),
(447, 120, '2XL'),
(451, 122, 'S'),
(452, 122, 'M'),
(453, 122, 'L'),
(454, 122, 'XL'),
(455, 123, 'S'),
(456, 123, 'M'),
(457, 123, 'L'),
(458, 124, 'S'),
(459, 124, 'M'),
(460, 124, 'L'),
(461, 124, 'XL'),
(462, 125, 'S'),
(463, 125, 'M'),
(464, 125, 'L'),
(465, 125, 'XL'),
(466, 126, 'S'),
(467, 126, 'M'),
(468, 126, 'L'),
(469, 126, 'XL'),
(470, 127, 'S'),
(471, 127, 'M'),
(472, 127, 'L'),
(473, 127, 'XL'),
(474, 128, 'S'),
(475, 128, 'M'),
(476, 128, 'L'),
(477, 128, 'XL'),
(478, 129, 'S'),
(479, 129, 'M'),
(480, 129, 'L'),
(481, 129, 'XL'),
(482, 130, 'S'),
(483, 130, 'M'),
(484, 130, 'L'),
(485, 130, 'XL'),
(498, 134, 'S'),
(499, 134, 'M'),
(500, 134, 'L'),
(501, 134, 'XL'),
(502, 135, 'S'),
(503, 135, 'M'),
(504, 135, 'L'),
(505, 135, 'XL'),
(506, 136, 'S'),
(507, 136, 'M'),
(508, 136, 'L'),
(509, 136, 'XL'),
(514, 138, 'S'),
(515, 138, 'M'),
(516, 138, 'L'),
(517, 138, 'XL'),
(518, 139, 'S'),
(519, 139, 'M'),
(520, 139, 'L'),
(521, 139, 'XL'),
(522, 140, 'S'),
(523, 140, 'M'),
(524, 140, 'L'),
(525, 140, 'XL'),
(526, 141, 'S'),
(527, 141, 'M'),
(528, 141, 'L'),
(529, 141, 'XL'),
(530, 142, 'S'),
(531, 142, 'M'),
(532, 142, 'L'),
(533, 142, 'XL'),
(546, 146, 'S'),
(547, 146, 'M'),
(548, 146, 'L'),
(549, 146, 'XL'),
(550, 147, 'S'),
(551, 147, 'M'),
(552, 147, 'L'),
(553, 147, 'XL'),
(554, 148, 'S'),
(555, 148, 'M'),
(556, 148, 'L'),
(557, 148, 'XL'),
(558, 149, 'S'),
(559, 149, 'M'),
(560, 149, 'L'),
(561, 149, 'XL'),
(562, 150, 'S'),
(563, 150, 'M'),
(564, 150, 'L'),
(565, 150, 'XL'),
(566, 151, 'S'),
(567, 151, 'M'),
(568, 151, 'L'),
(569, 151, 'XL'),
(570, 152, 'S'),
(571, 152, 'M'),
(572, 152, 'L'),
(573, 152, 'XL'),
(574, 153, 'S'),
(575, 153, 'M'),
(576, 153, 'L'),
(577, 153, 'XL');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `storeinformation`
--

CREATE TABLE `storeinformation` (
  `StoreInformationID` bigint(20) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Hotline` varchar(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `OpeningHours` varchar(255) DEFAULT NULL,
  `ClosingHours` varchar(255) DEFAULT NULL,
  `Facebook` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `storeinformation`
--

INSERT INTO `storeinformation` (`StoreInformationID`, `Address`, `Hotline`, `Email`, `OpeningHours`, `ClosingHours`, `Facebook`) VALUES
(1, '144 Xuân Thuỷ, Cầu Giấy, Hà Nội', '0987654321', 'fashionstore@gmail.com', '08:00:00', '23:00:00', 'https://www.facebook.com/');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UserID` bigint(20) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `DateBirthday` date DEFAULT NULL,
  `AvatarPath` varchar(255) DEFAULT NULL,
  `IsAdmin` tinyint(1) DEFAULT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UserID`, `FullName`, `Email`, `PhoneNumber`, `Gender`, `DateBirthday`, `AvatarPath`, `IsAdmin`, `hashedPassword`) VALUES
(1, 'Bùi Minh Hoạt', 'official.buiminhhoat@gmail.com', '0945405238', 'Nam', '2003-09-06', 'https://iili.io/J5HNvHP.jpg', 1, '$2a$10$T8MIwYiIinEg1/UTV8Y2UeRrMgCKG7g7O0SS2uiYZHoGCb6UrUWAO'),
(2, 'Nguyễn Châu Khanh', 'chaukhanh0605@gmail.com', '0944252960', NULL, NULL, 'https://iili.io/J5HMHIR.jpg', 1, '$2a$10$WlWXmICMXAKm8SJfAHs/W.k4q9GbL/yk1.zkgZhaY6lCGpBU6EwkO'),
(3, 'Nguyễn Tiến Dũng', '21020057@vnu.edu.vn', '0903481758', NULL, NULL, 'https://iili.io/J5HNZJI.jpg', 1, '$2a$10$LgAHCTgWj.gphTydaGKs3uXDdLMRWzxdQ5BLzFr4ljl2DvrPm7HPe'),
(4, 'Nguyễn Văn Vinh', 'khachhang@gmail.com', '09090909', 'Nam', '1933-02-03', 'https://iili.io/J5nNDS1.jpg', 0, '$2a$10$DrBhcWa6Qi5GxaUikvKvJuWIaelA0RXBhwbxOdgf2LLgbI4ybLNIu');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`BannerID`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`CartItemID`),
  ADD KEY `CartID` (`CartID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `SizeID` (`SizeID`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD KEY `ParentCategoryID` (`ParentCategoryID`);

--
-- Chỉ mục cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`);
  ##ADD KEY `ProductID` (`ProductID`);
  ##ADD KEY `orderdetail_ibfk_3` (`SizeID`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`);

--
-- Chỉ mục cho bảng `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`ProductCategoryID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Chỉ mục cho bảng `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`ImageID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `productquantity`
--
ALTER TABLE `productquantity`
  ADD PRIMARY KEY (`QuantityID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `SizeID` (`SizeID`);

--
-- Chỉ mục cho bảng `productsize`
--
ALTER TABLE `productsize`
  ADD PRIMARY KEY (`SizeID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `storeinformation`
--
ALTER TABLE `storeinformation`
  ADD PRIMARY KEY (`StoreInformationID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `address`
--
ALTER TABLE `address`
  MODIFY `AddressID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `banner`
--
ALTER TABLE `banner`
  MODIFY `BannerID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `CartID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `CartItemID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `OrderDetailID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT cho bảng `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `ProductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT cho bảng `productimage`
--
ALTER TABLE `productimage`
  MODIFY `ImageID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=718;

--
-- AUTO_INCREMENT cho bảng `productquantity`
--
ALTER TABLE `productquantity`
  MODIFY `QuantityID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=578;

--
-- AUTO_INCREMENT cho bảng `productsize`
--
ALTER TABLE `productsize`
  MODIFY `SizeID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=578;

--
-- AUTO_INCREMENT cho bảng `storeinformation`
--
ALTER TABLE `storeinformation`
  MODIFY `StoreInformationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UserID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `cart` (`CartID`),
  ADD CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `cartitem_ibfk_3` FOREIGN KEY (`SizeID`) REFERENCES `productsize` (`SizeID`);

--
-- Các ràng buộc cho bảng `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`ParentCategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`);
  -- ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE SET NULL;
  -- ADD CONSTRAINT `orderdetail_ibfk_3` FOREIGN KEY (`SizeID`) REFERENCES `productsize` (`SizeID`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `productcategory`
--
ALTER TABLE `productcategory`
  ADD CONSTRAINT `productcategory_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productcategory_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `productimage_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `productquantity`
--
ALTER TABLE `productquantity`
  ADD CONSTRAINT `productquantity_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productquantity_ibfk_2` FOREIGN KEY (`SizeID`) REFERENCES `productsize` (`SizeID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `productsize`
--
ALTER TABLE `productsize`
  ADD CONSTRAINT `productsize_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
