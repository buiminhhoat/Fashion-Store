-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 10, 2023 lúc 03:51 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

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
-- Cấu trúc bảng cho bảng `Address`
--

CREATE TABLE `Address` (
  `AddressID` bigint(20) NOT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `RecipientName` varchar(255) NOT NULL,
  `RecipientPhone` varchar(20) DEFAULT NULL,
  `AddressDetails` varchar(255) DEFAULT NULL,
  `IsDefault` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `Address`
--

INSERT INTO `Address` (`AddressID`, `UserID`, `RecipientName`, `RecipientPhone`, `AddressDetails`, `IsDefault`) VALUES
(1, 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội', 1),
(2, 1, 'Bùi Minh Hoạt', '0896037569', '134 Hai Bà Trưng, Thọ Sơn, Việt Trì, Phú Thọ', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Cart`
--

CREATE TABLE `Cart` (
  `CartID` bigint(20) NOT NULL,
  `UserID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `CartItem`
--

CREATE TABLE `CartItem` (
  `CartItemID` bigint(20) NOT NULL,
  `CartID` bigint(20) DEFAULT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeID` bigint(20) DEFAULT NULL,
  `QuantityPurchase` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Category`
--

CREATE TABLE `Category` (
  `CategoryID` bigint(20) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `ParentCategoryID` bigint(20) DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT 'img-category-default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `Category`
--

INSERT INTO `Category` (`CategoryID`, `CategoryName`, `ParentCategoryID`, `ImagePath`) VALUES
(1, 'Áo Nam', NULL, 'img-category-default.png'),
(2, 'Áo Thun', 1, 'img-category-default.png'),
(3, 'Áo Khoác', 1, 'img-category-default.png'),
(4, 'Áo Polo', 1, 'img-category-default.png'),
(5, 'Quần Nam', NULL, 'img-category-default.png'),
(6, 'Quần Âu', 5, 'img-category-default.png'),
(7, 'Quần Short Thể Thao', 5, 'img-category-default.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `OrderDetails`
--

CREATE TABLE `OrderDetails` (
  `OrderDetailID` bigint(20) NOT NULL,
  `OrderID` bigint(20) DEFAULT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `ProductName` varchar(255) NOT NULL,
  `SizeName` varchar(20) NOT NULL,
  `ImagePath` varchar(255) DEFAULT NULL,
  `ProductPrice` bigint(20) NOT NULL,
  `Quantity` bigint(20) NOT NULL,
  `TotalPrice` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Orders`
--

CREATE TABLE `Orders` (
  `OrderID` bigint(20) NOT NULL,
  `OrderDate` date DEFAULT NULL,
  `TotalAmount` bigint(20) DEFAULT NULL,
  `OrderStatus` varchar(20) DEFAULT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `AddressID` bigint(20) DEFAULT NULL,
  `RecipientName` varchar(255) NOT NULL,
  `RecipientPhone` varchar(20) DEFAULT NULL,
  `AddressDetails` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Product`
--

CREATE TABLE `Product` (
  `ProductID` bigint(20) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `productPrice` double DEFAULT NULL,
  `ProductDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `Product`
--

INSERT INTO `Product` (`ProductID`, `ProductName`, `productPrice`, `ProductDescription`) VALUES
(1, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí ATO23008', 174000, 'ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.'),
(2, 'Áo Thun Dài Tay Nam, Thiết Kế Basic ATO23014', 195000, 'ÁO THUN TRƠN\r\n\r\nÁo thun dài tay nâng cao trải nghiệm với chất liệu mới Viscose - sợi tơ tổng hợp có đặc điểm siêu mảnh, mềm mại hơn, độ mịn và bóng nhẹ tạo thẩm mỹ cao hơn.\r\n\r\nSản phẩm áo thun trơn đáp logo tinh tế, màu sắc nam tính dễ mặc, dễ phối đồ ngay cả khi mặc bên trong áo khoác.'),
(3, 'Áo Khoác GIó Nam, Cản Gió, Trượt Nước AKG23015', 559000, 'ÁO KHOÁC GIÓ THỂ THAO PHỐI MÀU & CHẦN CHỈ NỔI. Thiết kế mới cho thu đông 2023 mang đến cho bạn chiếc áo khoác ứng dụng thời trang linh hoạt, form dáng thể thao khoẻ khoắn, màu sắc trẻ trung hiện đại.'),
(4, 'Áo Khoác Nam Kiểu Dáng Casual Heavy Phối Màu AKG22025', 859000, 'Áo Khoác Nam Kiểu Dáng Casual Heavy Phối Màu AKG22025 là lựa chọn hoàn hảo cho các chàng trai trong thời điểm giao mùa. Khác với chế độ chống nước của các loại vải Nilon, các loại áo gió được làm từ chất liệu 100% Polyester có màng chống nước siêu siêu mỏng giúp cho nước đọng thành từng hạt và chảy đi. Điều này giúp hạn chế nước mưa ngấm vào bên trong lớp vải mà vẫn đảm bảo sự thông thoáng, dễ chịu khi mặc.\r\n\r\nThiết kế áo basic, trẻ trung, nam tính với bảng màu đa dạng, mang tới nhiều sự lựa chọn theo sở thích của các anh chàng. Túi áo trước ngực và túi vát 2 bên tiện lợi, thời trang kết hợp cùng khóa HKK cao cấp, bền đẹp, không lo hỏng hóc. Áo khoác được làm từ chất liệu 100% Polyester vải gió sở hữu những ưu điểm như độ bền tốt, khả năng chống nước tối ưu, dễ dàng nhuộm màu sắc nét, đẹp mắt, dễ dàng giặt ủi cùng mức giá thành hợp lý, phù hợp với nhiều đối tượng người dùng. '),
(5, 'Áo Polo Nam, Cotton USA, Co Giãn 4 Chiều APC23023', 199000, 'Áo Polo Nam, Cotton USA, Co Giãn 4 Chiều APC23023 là thiết kế phối màu in tràn độc đáo ứng dụng công nghệ thoáng khí số 1 chuyên biệt rất được ưa chuộng hiện nay. Kiểu dáng Slim fit ôm vừa vặn, tôn dáng mà vẫn thoải mái trong mọi hoạt động. Thiết kế đường nét hiện đại, gam màu đa dạng, phù hợp với mọi sở thích, độ tuổi và phong cách. \r\n\r\nÁo Polo được làm từ chất liệu Cotton USA với những ưu điểm vượt trội như co giãn 4 chiều, thấm hút mồ hôi, thoáng mát tối đa. Bề mặt vải tối ưu khả năng thoáng khí, hút ẩm nhanh hơn và mau khô hơn. Bổ sung thành phần Spandex giúp tăng độ co giãn, đàn hồi để nam giới thoải mái trong mọi hoạt động. '),
(6, 'Quần Âu Nam, Thiết Kế Basic, Lịch Lãm QAU23062', 482000, 'Quần Âu Nam, Thiết Kế Basic, Lịch Lãm QAU23062 nổi bật với kiểu dáng Slim fit tôn dáng vừa vặn, dễ mặc, dễ phối đồ.\r\n\r\nVới khả năng co giãn cùng độ đàn hồi tức thì của vải Spandex tốt hơn gấp 5-7 lần, điều này giúp cho chiếc quần âu luôn giữ được phom dáng chỉn chu và hạn chế nhăn nhàu tối đa cho người mặc. '),
(7, 'Quần Short Thể Thao Nam, Cạp Cúc, Phối Màu Trẻ Trung QST23015', 199000, 'Quần Short Thể Thao Nam, Cạp Cúc, Phối Màu Trẻ Trung QST23015 có phom dáng Slim fit vừa vặn, tôn dáng nhưng vẫn vô cùng thoải mái khi mặc. Thiết kế đơn giản, đường may tinh tế, tỉ mỉ mang tới diện mạo chỉn chu, nam tính cho anh chàng. Quần có túi xẻ hai bên, túi phụ phía sau có khuy cài vô cùng tiện lợi. Đây là mẫu quần short thể thao thuộc top bán chạy tại 5S Fashion.\r\n\r\nQuần được làm từ Polyamide thường được dùng cho dòng quần short nhờ những ưu điểm mềm mướt, bề mặt sáng bóng và nhẵn mịn, sợi vải mát lạnh, nhuộm màu sắc nét và tính đàn hồi tự nhiên cao. Kết hợp với tỉ lệ Spandex cao giúp sản phẩm có độ đàn hồi cực tốt, giúp người mặc thoải mái vận động & tham gia các hoạt động thể thao.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ProductCategory`
--

CREATE TABLE `ProductCategory` (
  `ProductCategoryID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `CategoryID` bigint(20) DEFAULT NULL,
  `ParentCategoryID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `ProductCategory`
--

INSERT INTO `ProductCategory` (`ProductCategoryID`, `ProductID`, `CategoryID`, `ParentCategoryID`) VALUES
(1, 1, 2, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 4, 3, 1),
(5, 5, 4, 1),
(6, 6, 6, 5),
(7, 7, 7, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ProductImage`
--

CREATE TABLE `ProductImage` (
  `ImageID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `ProductImage`
--

INSERT INTO `ProductImage` (`ImageID`, `ProductID`, `ImagePath`) VALUES
(1, 1, '031eb83d-2ce8-49e0-94c7-ec338e20af53.jpg'),
(2, 1, 'dfd3e424-2ffe-4c31-8b20-7053c3ab3078.jpg'),
(3, 1, 'fcff2644-2f23-4614-a648-2d05a266c6a6.jpg'),
(4, 1, 'f110e855-187e-4dc6-b645-cc0f59bccc82.jpg'),
(5, 3, '040880f9-6c83-4fa9-b071-94ffdb3224c5.jpg'),
(6, 3, '80c17942-9f0c-4649-a4e2-510fcbea0fd7.jpg'),
(7, 3, '3d2e1bc3-b222-419e-951f-2732a91c00a7.jpg'),
(8, 4, '4eec4a59-c7e0-4521-8eb9-a95a25b2a135.jpg'),
(9, 4, '5b40fe76-4dc5-4eea-a293-521d9b5e7e55.jpg'),
(10, 4, 'f4c8a814-cea1-4aec-aed2-31df5ababa12.jpg'),
(11, 5, '3ab0377c-5c74-45ee-b7fd-f1035635e8a8.jpg'),
(12, 5, 'd9555978-0d0f-4d01-8a88-d69854313e6e.jpg'),
(13, 6, '82487fc9-e024-4a8c-824e-95b4bbee60a2.jpg'),
(14, 6, 'beebdcdd-f38e-48e5-b3de-a94dce77317a.jpg'),
(15, 6, '65bbdb47-4921-4ba1-affd-17ff91fc4657.jpg'),
(16, 6, '84682790-baa6-4f42-a72a-ae3f552f96eb.jpg'),
(17, 7, 'de0623d3-0122-472a-bba2-667b31e60f57.jpg'),
(18, 7, 'c087f139-8754-4024-a1f9-0f27586ba129.jpg'),
(19, 7, '5a8bb6c1-640d-4c31-94ad-7bb6785b248f.jpg'),
(20, 7, 'c4098e77-e685-4719-a93a-c558232a2ee3.jpg'),
(21, 2, 'de0623d3-0122-472a-bbc2-667b31e60856.jpg'),
(22, 2, 'de058963d3-0122-472a-bbc2-667b31e47856.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ProductQuantity`
--

CREATE TABLE `ProductQuantity` (
  `QuantityID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeID` bigint(20) DEFAULT NULL,
  `Quantity` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `ProductQuantity`
--

INSERT INTO `ProductQuantity` (`QuantityID`, `ProductID`, `SizeID`, `Quantity`) VALUES
(1, 1, 1, 50),
(2, 1, 2, 100),
(3, 1, 3, 200),
(4, 1, 4, 300),
(5, 1, 5, 0),
(6, 1, 6, 500),
(7, 2, 7, 20),
(8, 2, 8, 900),
(9, 3, 9, 200),
(10, 3, 10, 900),
(11, 4, 11, 5),
(12, 4, 12, 900),
(13, 4, 13, 1000),
(14, 5, 14, 50),
(15, 5, 15, 501),
(16, 6, 16, 25),
(17, 6, 17, 300),
(18, 6, 18, 500),
(19, 7, 19, 60);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ProductSize`
--

CREATE TABLE `ProductSize` (
  `SizeID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `ProductSize`
--

INSERT INTO `ProductSize` (`SizeID`, `ProductID`, `SizeName`) VALUES
(1, 1, 'S'),
(2, 1, 'M'),
(3, 1, 'L'),
(4, 1, 'XL'),
(5, 1, 'XXL'),
(6, 1, 'XXXL'),
(7, 2, 'S'),
(8, 2, 'L'),
(9, 3, 'S'),
(10, 3, 'XXXL'),
(11, 4, 'XL'),
(12, 4, 'XXL'),
(13, 4, 'XXXL'),
(14, 5, 'S'),
(15, 5, 'XXXL'),
(16, 6, 'S'),
(17, 6, 'M'),
(18, 6, 'L'),
(19, 7, 'XXXL');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Users`
--

CREATE TABLE `Users` (
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
-- Đang đổ dữ liệu cho bảng `Users`
--

INSERT INTO `Users` (`UserID`, `FullName`, `Email`, `PhoneNumber`, `Gender`, `DateBirthday`, `AvatarPath`, `IsAdmin`, `hashedPassword`) VALUES
(1, 'Bùi Minh Hoạt', 'official.buiminhhoat@gmail.com', '0945405238', 'Nam', '2003-09-06', NULL, 1, '$2a$10$T8MIwYiIinEg1/UTV8Y2UeRrMgCKG7g7O0SS2uiYZHoGCb6UrUWAO'),
(2, 'Nguyễn Châu Khanh', 'chaukhanh0605@gmail.com', '0944252960', NULL, NULL, NULL, 1, '$2a$10$WlWXmICMXAKm8SJfAHs/W.k4q9GbL/yk1.zkgZhaY6lCGpBU6EwkO'),
(3, 'Nguyễn Tiến Dũng', '21020057@vnu.edu.vn', '0903481758', NULL, NULL, NULL, 1, '$2a$10$LgAHCTgWj.gphTydaGKs3uXDdLMRWzxdQ5BLzFr4ljl2DvrPm7HPe');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `Address`
--
ALTER TABLE `Address`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `CartItem`
--
ALTER TABLE `CartItem`
  ADD PRIMARY KEY (`CartItemID`),
  ADD KEY `CartID` (`CartID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `SizeID` (`SizeID`);

--
-- Chỉ mục cho bảng `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD KEY `ParentCategoryID` (`ParentCategoryID`);

--
-- Chỉ mục cho bảng `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `AddressID` (`AddressID`);

--
-- Chỉ mục cho bảng `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductID`);

--
-- Chỉ mục cho bảng `ProductCategory`
--
ALTER TABLE `ProductCategory`
  ADD PRIMARY KEY (`ProductCategoryID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `CategoryID` (`CategoryID`),
  ADD KEY `ParentCategoryID` (`ParentCategoryID`);

--
-- Chỉ mục cho bảng `ProductImage`
--
ALTER TABLE `ProductImage`
  ADD PRIMARY KEY (`ImageID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `ProductQuantity`
--
ALTER TABLE `ProductQuantity`
  ADD PRIMARY KEY (`QuantityID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `SizeID` (`SizeID`);

--
-- Chỉ mục cho bảng `ProductSize`
--
ALTER TABLE `ProductSize`
  ADD PRIMARY KEY (`SizeID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `Address`
--
ALTER TABLE `Address`
  MODIFY `AddressID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `Cart`
--
ALTER TABLE `Cart`
  MODIFY `CartID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `CartItem`
--
ALTER TABLE `CartItem`
  MODIFY `CartItemID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Category`
--
ALTER TABLE `Category`
  MODIFY `CategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `OrderDetails`
--
ALTER TABLE `OrderDetails`
  MODIFY `OrderDetailID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Product`
--
ALTER TABLE `Product`
  MODIFY `ProductID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `ProductCategory`
--
ALTER TABLE `ProductCategory`
  MODIFY `ProductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `ProductImage`
--
ALTER TABLE `ProductImage`
  MODIFY `ImageID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `ProductQuantity`
--
ALTER TABLE `ProductQuantity`
  MODIFY `QuantityID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `ProductSize`
--
ALTER TABLE `ProductSize`
  MODIFY `SizeID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `Address`
--
ALTER TABLE `Address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `CartItem`
--
ALTER TABLE `CartItem`
  ADD CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `Cart` (`CartID`),
  ADD CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`),
  ADD CONSTRAINT `cartitem_ibfk_3` FOREIGN KEY (`SizeID`) REFERENCES `ProductSize` (`SizeID`);

--
-- Các ràng buộc cho bảng `Category`
--
ALTER TABLE `Category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`ParentCategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`AddressID`) REFERENCES `Address` (`AddressID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `ProductCategory`
--
ALTER TABLE `ProductCategory`
  ADD CONSTRAINT `productcategory_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productcategory_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productcategory_ibfk_3` FOREIGN KEY (`ParentCategoryID`) REFERENCES `Category` (`ParentCategoryID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `ProductImage`
--
ALTER TABLE `ProductImage`
  ADD CONSTRAINT `productimage_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`);

--
-- Các ràng buộc cho bảng `ProductQuantity`
--
ALTER TABLE `ProductQuantity`
  ADD CONSTRAINT `productquantity_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`),
  ADD CONSTRAINT `productquantity_ibfk_2` FOREIGN KEY (`SizeID`) REFERENCES `ProductSize` (`SizeID`);

--
-- Các ràng buộc cho bảng `ProductSize`
--
ALTER TABLE `ProductSize`
  ADD CONSTRAINT `productsize_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
