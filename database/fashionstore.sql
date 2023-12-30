-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 29, 2023 at 08:25 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fashionstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `AddressID` bigint(20) NOT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `RecipientName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `RecipientPhone` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `AddressDetails` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `IsDefault` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`AddressID`, `UserID`, `RecipientName`, `RecipientPhone`, `AddressDetails`, `IsDefault`) VALUES
(1, 1, 'Bùi Minh Hoạt', '0945405238', '144 Xuân Thủy, Cầu Giấy, Hà Nội', 1),
(2, 1, 'Bùi Minh Hoạt', '0896037569', '134 Hai Bà Trưng, Thọ Sơn, Việt Trì, Phú Thọ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `BannerID` bigint(20) NOT NULL,
  `DisplayOrder` int(11) NOT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `BannerLinkTo` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `CartID` bigint(20) NOT NULL,
  `UserID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`CartID`, `UserID`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `CartItemID` bigint(20) NOT NULL,
  `CartID` bigint(20) DEFAULT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeID` bigint(20) DEFAULT NULL,
  `QuantityPurchase` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` bigint(20) NOT NULL,
  `CategoryName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ParentCategoryID` bigint(20) DEFAULT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_bin DEFAULT 'https://iili.io/JR4gFGs.md.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `ParentCategoryID`, `ImagePath`) VALUES
(1, 'Áo Nam', NULL, 'https://iili.io/JR4gFGs.md.png'),
(2, 'Áo Thun', 1, 'https://iili.io/JR4gFGs.md.png'),
(3, 'Áo Khoác', 1, 'https://iili.io/JR4gFGs.md.png'),
(4, 'Áo Polo', 1, 'https://iili.io/JR4gFGs.md.png'),
(5, 'Quần Nam', NULL, 'https://iili.io/JR4gFGs.md.png'),
(6, 'Quần Âu', 5, 'https://iili.io/JR4gFGs.md.png'),
(7, 'Quần Short Thể Thao', 5, 'https://iili.io/JR4gFGs.md.png'),
(8, 'Áo Sơ Mi', 1, 'https://iili.io/JR4gFGs.md.png');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetailID` bigint(20) NOT NULL,
  `OrderID` bigint(20) DEFAULT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `ProductName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `SizeName` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `ProductPrice` bigint(20) NOT NULL,
  `Quantity` bigint(20) NOT NULL,
  `TotalPrice` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` bigint(20) NOT NULL,
  `OrderDate` datetime(6) DEFAULT NULL,
  `TotalAmount` bigint(20) DEFAULT NULL,
  `OrderStatus` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `AddressID` bigint(20) DEFAULT NULL,
  `RecipientName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `RecipientPhone` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `AddressDetails` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductID` bigint(20) NOT NULL,
  `ProductName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `productPrice` bigint(20) DEFAULT NULL,
  `ProductDescription` text COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `product`
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
(69, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thấm Hút', 249000, 'ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.'),
(70, 'Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí', 249000, 'ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.'),
(71, 'Áo Polo Nam, Vải Viscose Mềm Mượt, Thoáng Khí', 389000, 'Áo Polo Nam, Vải Viscose Mềm Mượt, Thoáng Khí APC23104 là lựa chọn hoàn hảo cho mùa này nhờ thiết kế trẻ trung, cuốn hút với kiểu dáng Slim fit ôm dáng vừa vặn. Đường may áo chắc chắn, tinh tế đến từng chi tiết. Điểm nhấn của mẫu áo Polo này nằm ở thiết kế phối cúc lạ mắt, mang đến diện mạo trẻ trung mà vẫn thanh lịch, nam tính cho nam giới. \r\n\r\nChất liệu Viscose thoáng mát, mềm mại, mang đến trải nghiệm hoàn hảo khi mặc, ngay cả trong tiết trời mùa hè oi bức. Bổ sung thành phần Freezing Nylon hay còn được biết đến với tên gọi quen thuộc là thun lạnh, với ưu điểm mềm mướt, bề mặt sáng bóng và nhẵn mịn, sợi vải mát lạnh, nhuộm màu sắc nét và tính đàn hồi tự nhiên cao. Kết hợp cùng Spandex tạo ra chất liệu vải có khả năng thấm hút mồ hôi tốt, thoáng khí, kháng khuẩn tốt và có màu sắc cực kỳ bắt mắt cùng với độ đàn hồi tốt giúp thoải mái vận động.'),
(72, 'Áo Polo Nam, Vải Viscose, Thấm Hút Mồ Hôi Tốt', 419000, 'Áo Polo Nam, Vải Viscose, Thấm Hút Mồ Hôi Tốt là một trong những mẫu áo Polo hot hit nhờ thiết kế đơn giản, chẳng lo \"lỗi mốt\". Mẫu áo này ghi điểm bởi thiết kế trẻ trung, nam tính, cuốn hút cùng kiểu dáng Slim fit tôn dáng, dễ mặc và dễ phối đồ. Cổ - tay áo được dệt bo bền đẹp, sang trọng, mang đến diện mạo cuốn hút cho nam giới. \r\n\r\nÁo được làm từ chất liệu Viscose thoáng mát, mềm mại, mang đên trải nghiệm hoàn hảo khi mặc. Kết hợp với thành phần chất liệu Polyamide và Spandex giúp tăng độ mềm mại, co giãn cực tốt khi mặc, giúp chiếc áo mềm mượt - mát mẻ - mau khô và đặc biệt không lo nhăn nhàu suốt cả ngày. '),
(73, 'Áo Polo Nam, Vải Silk Cao Cấp, Mềm Mại, Nhẹ Mát', 479000, 'Áo Polo Nam, Vải Silk Cao Cấp, Mềm Mại, Nhẹ Mát sở hữu kiểu dáng Slim fit ôm dáng vừa vặn mà vẫn thoải mái trong mọi hoạt động. Thiết kế khỏe khoắn, màu sắc đa dạng được dệt kẻ Jaccquard phối màu tạo hiệu ứng tinh tế, mang đến phong cách thời thượng, lịch lãm cho nam giới. Đặc biệt, cổ và tay áo được dệt bo đứng dáng kết hợp cùng được phối line 3 màu tạo hiệu ứng nổi bật, thu hút cho tổng thể chiếc áo.\r\n\r\nÁo được làm từ chất liệu Silk cao cấp - Lụa tơ tằm ví như \"Nữ hoàng\" của các loại lụa, Silk được xếp vào top những loại vải đắt đỏ nhất hành tinh và chỉ xuất hiện trong các sản phẩm cao cấp. Với các ưu điểm mềm, mịn, vải rất thoáng mùa hè thì mát mẻ mùa đông thì ấm áp, thấm hút mồ hôi tốt và là gốc sợi tự nhiên nên rất an toàn với da. Chất liệu vải được cấu thành từ Polyester, Cotton là những chất liệu phổ thông tuy nhiên khi thêm 3% Silk giá thành lại tăng tới 50% đủ thấy giá trị của Silk, kết hợp thêm thành phần Lyocel (tencel) một chất liệu vải sinh học cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả. '),
(74, 'Áo Polo Nam, Kiểu Dáng Regular Fit Thoải Mái', 489000, 'Áo Polo Nam, Kiểu Dáng Regular Fit Thoải Mái suông nhẹ nhưng vẫn ôm vừa đủ, mang tới vẻ ngoài trẻ trung, lịch lãm mà vẫn thoải mái cho người mặc. Áo Polo nổi bật với hiết kế basic, cổ và tay áo cùng màu với vải chính, màu sắc trung tính, hoạt tiết dệt Jaccquard thời trrang tạo điểm nhấn sang trọng, lịch lãm cho nam giới. Đây được xem là item bán chạy nhất hiện nay.\r\n\r\nChất liệu Freezing Nylon hay còn được biết đến với tên gọi khác là thun lạnh siêu mềm, co giãn cực tốt giúp hạn chế tối đa nhăn nhàu khi mặc. Công nghệ Freezing Nylon tối ưu nhiệt, giảm ngay từ 5-7 độ khi mặc trong thời tiết oi bức của mùa hè. Ngoài ra, khi kết hợp thêm thành phần Polyester và Spandex giúp vải có những hiệu ứng melange đẹp mắt cùng với đó là những tính năng mà Polyester có thể bổ trợ cho Freezing Nylon như: Tăng độ bền vải, tăng khả năng thấm hút mồ hôi và giúp sản phẩm nhanh khô.\r\n\r\nVới bàng màu lạ mắt, vừa nhã nhặn, vừa tinh tế, chiếc áo Polo nam này xứng đáng là item \"cần có\" trong tủ đồ của các quý ông để diện trong bất kỳ hoàn cảnh nào, mang tới cho nam giới vẻ ngoài chỉn chu và thu hút. '),
(75, 'Áo Polo Nam, Chất Liệu Silk Cao Cấp', 479000, 'Áo Polo Nam, Chất Liệu Silk Cao Cấp APC23065 nổi bật với kiểu Slim fit tôn dáng vừa vặn mà vẫn đảm bảo cảm giác thoải mái khi hoạt động. Đây là thiết kế trẻ trung, thời thượng, dễ mặc và dễ phối với mọi trang phục, giúp bạn nam tự tin để diện đi học, đi làm hay đi du lịch đều phù hợp.\r\n\r\nĐiểm nhấn của thiết kế này nằm ở phần dệt bo cổ và tay áo đứng form kết hợp với đường line mang tới phong cách trẻ trung cho người mặc. Tay áo được thêu logo nổi 5S Premium sang trọng, đẳng cấp, đảm bảo hàng chính hãng 100% đến từ thương hiệu. \r\n\r\nÁo Polo được làm từ chất liệu Silk - Lụa tơ tằm được ví như \"Nữ hoàng\" của các loại lụa, Silk được xếp vào top những loại vải đắt đỏ nhất hành tinh và chỉ xuất hiện trong các sản phẩm cao cấp. Với các ưu điểm vượt trội như mềm, mịn, vải rất thoáng mùa hè thì mát mẻ mùa đông thì ấm áp, thấm hút mồ hôi tốt và là gốc sợi tự nhiên nên rất an toàn với da.\r\n\r\nThêm vào đó, việc bổ sung các thành phần chất liệu như Polyester, Cotton giúp gia tăng độ thoáng mát, bền đẹp của áo Polo. Chất vải Lyocel (tencel) - một chất liệu vải cao cấp hơn cả Modal, an toàn và thân thiện với môi trường, sử dụng công nghệ Nano nên sợi vải siêu mảnh cỡ các hạt Nano giúp bề mặt vải mềm, siêu mịn, chống nhăn hiệu quả và có nhiều đặc điểm tương tự Modal. '),
(76, 'Áo Polo Nam, Phong Cách Thể Thao, Trẻ Trung', 479000, 'Áo Polo Nam, Phong Cách Thể Thao, Trẻ Trung nổi bật với kiểu dáng Slim fit ôm vừa vặn, tôn dáng nhưng vẫn đảm bảo thoải mái khi mặc. Thiết kế phối vải khỏe khoắn kết hợp cùng đường line chạy dọc cổ áo và vai áo, mang đến phong cách thể thao, nam tính cho người mặc. Logo Perfect Life ở ngực trái của áo bền đẹp, tỉ mỉ, đảm bảo không bong tróc trong quá trình sử dụng hay giặt là. Cổ áo và tay áo được dệt bo đứng phom, thanh lịch để nam giới tự tin mặc đi học, đi làm hay đi chơi đều phù hợp. \r\n\r\nSự kết hợp của các thành phần chất liệu là Viscose, Freezing Nylon và Spandex mang tới trải nghiệm mềm mại, thoáng mát tối đa cho chiếc áo Polo. Chất vải này cũng tăng tốc độ hút ẩm, bay hơi nhanh chóng, thấm hút mồ hôi tốt, phù hợp với cả những ngày thời tiết oi nóng, cơ thể đổ nhiều mồ hôi mà không lo bí bách hay có mùi khó chịu khi mặc. '),
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
(88, 'Áo Polo Nam, Thiết Kế Phối Kẻ Màu Trẻ Trung', 499000, 'Áo Polo Nam, Thiết Kế Phối Kẻ Màu Trẻ Trung nổi bật với kiểu dáng Slim fit ôm nhẹ vừa vặn, đảm bảo cảm giác thoải mái, dễ chịu khi vận động. Điểm nhấn của thiết kế áo Polo này nằm ở phần dệt kẻ tạo họa tiết độc đáo và hút mắt, mang đến diện mạo thời thượng mà không kém phần trẻ trung cho nam giới. \r\n\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `ProductCategoryID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `CategoryID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `productcategory`
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
(69, 69, 2),
(70, 70, 2),
(71, 71, 4),
(72, 72, 4),
(73, 73, 4),
(74, 74, 4),
(75, 75, 4),
(76, 76, 4),
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
(88, 88, 4);

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `ImageID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `productimage`
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
(321, 69, 'https://iili.io/JR4tUmb.jpg'),
(322, 69, 'https://iili.io/JR6KGPn.jpg'),
(323, 69, 'https://iili.io/JR6KWcG.jpg'),
(324, 69, 'https://iili.io/JR6KXSf.jpg'),
(325, 69, 'https://iili.io/JR6Kj94.jpg'),
(326, 69, 'https://iili.io/JR6KNN2.jpg'),
(327, 69, 'https://iili.io/JR6KOtS.jpg'),
(328, 69, 'https://iili.io/JR6Kko7.jpg'),
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
(347, 74, 'https://iili.io/JR6qFmQ.jpg'),
(348, 74, 'https://iili.io/JR6qfIV.jpg'),
(349, 74, 'https://iili.io/JR6qnB1.jpg'),
(350, 74, 'https://iili.io/JR6qoEF.jpg'),
(351, 74, 'https://iili.io/JR6qI2a.jpg'),
(352, 74, 'https://iili.io/JR6qTYJ.jpg'),
(353, 75, 'https://iili.io/JR6qiCP.jpg'),
(354, 75, 'https://iili.io/JR6qsG1.jpg'),
(355, 75, 'https://iili.io/JR6qL6F.jpg'),
(356, 75, 'https://iili.io/JR6qZ3g.jpg'),
(357, 75, 'https://iili.io/JR6qtaa.jpg'),
(358, 76, 'https://iili.io/JR6BOtp.jpg'),
(359, 76, 'https://iili.io/JR6BkoN.jpg'),
(360, 76, 'https://iili.io/JR6BvVI.jpg'),
(361, 76, 'https://iili.io/JR6B8Pt.jpg'),
(362, 76, 'https://iili.io/JR6Bgln.jpg'),
(363, 76, 'https://iili.io/JR6BiN4.jpg'),
(364, 76, 'https://iili.io/JR6BQx2.jpg'),
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
(426, 88, 'https://iili.io/JR6AnNn.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `productquantity`
--

CREATE TABLE `productquantity` (
  `QuantityID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeID` bigint(20) DEFAULT NULL,
  `Quantity` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `productquantity`
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
(218, 63, 218, 34),
(219, 63, 219, 94),
(220, 63, 220, 12),
(221, 63, 221, 65),
(222, 64, 222, 32),
(223, 64, 223, 59),
(224, 64, 224, 49),
(225, 64, 225, 21),
(226, 65, 226, 39),
(227, 65, 227, 59),
(228, 65, 228, 10),
(229, 65, 229, 40),
(230, 66, 230, 49),
(231, 66, 231, 85),
(232, 66, 232, 28),
(233, 66, 233, 10),
(234, 67, 234, 3),
(235, 67, 235, 5),
(236, 67, 236, 32),
(237, 67, 237, 35),
(238, 68, 238, 34),
(239, 68, 239, 39),
(240, 68, 240, 100),
(241, 68, 241, 300),
(242, 69, 242, 39),
(243, 69, 243, 84),
(244, 69, 244, 85),
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
(262, 74, 262, 83),
(263, 74, 263, 49),
(264, 74, 264, 12),
(265, 75, 265, 43),
(266, 75, 266, 21),
(267, 75, 267, 31),
(268, 75, 268, 12),
(269, 76, 269, 43),
(270, 76, 270, 21),
(271, 76, 271, 31),
(272, 76, 272, 12),
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
(320, 88, 320, 92);

-- --------------------------------------------------------

--
-- Table structure for table `productsize`
--

CREATE TABLE `productsize` (
  `SizeID` bigint(20) NOT NULL,
  `ProductID` bigint(20) DEFAULT NULL,
  `SizeName` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `productsize`
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
(242, 69, 'S'),
(243, 69, 'M'),
(244, 69, 'L'),
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
(262, 74, 'S'),
(263, 74, 'M'),
(264, 74, 'L'),
(265, 75, 'S'),
(266, 75, 'M'),
(267, 75, 'L'),
(268, 75, 'XL'),
(269, 76, 'S'),
(270, 76, 'M'),
(271, 76, 'L'),
(272, 76, 'XL'),
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
(320, 88, 'XL');

-- --------------------------------------------------------

--
-- Table structure for table `storeinformation`
--

CREATE TABLE `storeinformation` (
  `StoreInformationID` bigint(20) NOT NULL,
  `Address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `Hotline` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `OpeningHours` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `ClosingHours` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `Facebook` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` bigint(20) NOT NULL,
  `FullName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `PhoneNumber` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `Gender` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
  `DateBirthday` date DEFAULT NULL,
  `AvatarPath` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `IsAdmin` tinyint(1) DEFAULT NULL,
  `hashedPassword` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FullName`, `Email`, `PhoneNumber`, `Gender`, `DateBirthday`, `AvatarPath`, `IsAdmin`, `hashedPassword`) VALUES
(1, 'Bùi Minh Hoạt', 'official.buiminhhoat@gmail.com', '0945405238', 'Nam', '2003-09-06', NULL, 1, '$2a$10$T8MIwYiIinEg1/UTV8Y2UeRrMgCKG7g7O0SS2uiYZHoGCb6UrUWAO'),
(2, 'Nguyễn Châu Khanh', 'chaukhanh0605@gmail.com', '0944252960', NULL, NULL, NULL, 1, '$2a$10$WlWXmICMXAKm8SJfAHs/W.k4q9GbL/yk1.zkgZhaY6lCGpBU6EwkO'),
(3, 'Nguyễn Tiến Dũng', '21020057@vnu.edu.vn', '0903481758', NULL, NULL, NULL, 1, '$2a$10$LgAHCTgWj.gphTydaGKs3uXDdLMRWzxdQ5BLzFr4ljl2DvrPm7HPe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`BannerID`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`CartItemID`),
  ADD KEY `CartID` (`CartID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `SizeID` (`SizeID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD KEY `ParentCategoryID` (`ParentCategoryID`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `AddressID` (`AddressID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`ProductCategoryID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`ImageID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `productquantity`
--
ALTER TABLE `productquantity`
  ADD PRIMARY KEY (`QuantityID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `SizeID` (`SizeID`);

--
-- Indexes for table `productsize`
--
ALTER TABLE `productsize`
  ADD PRIMARY KEY (`SizeID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `storeinformation`
--
ALTER TABLE `storeinformation`
  ADD PRIMARY KEY (`StoreInformationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `AddressID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `BannerID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `CartID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `CartItemID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `OrderDetailID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `ProductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `productimage`
--
ALTER TABLE `productimage`
  MODIFY `ImageID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=427;

--
-- AUTO_INCREMENT for table `productquantity`
--
ALTER TABLE `productquantity`
  MODIFY `QuantityID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=321;

--
-- AUTO_INCREMENT for table `productsize`
--
ALTER TABLE `productsize`
  MODIFY `SizeID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=321;

--
-- AUTO_INCREMENT for table `storeinformation`
--
ALTER TABLE `storeinformation`
  MODIFY `StoreInformationID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `cart` (`CartID`),
  ADD CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `cartitem_ibfk_3` FOREIGN KEY (`SizeID`) REFERENCES `productsize` (`SizeID`);

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`ParentCategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`) ON DELETE CASCADE;

--
-- Constraints for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD CONSTRAINT `productcategory_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productcategory_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE;

--
-- Constraints for table `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `productimage_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE;

--
-- Constraints for table `productquantity`
--
ALTER TABLE `productquantity`
  ADD CONSTRAINT `productquantity_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productquantity_ibfk_2` FOREIGN KEY (`SizeID`) REFERENCES `productsize` (`SizeID`) ON DELETE CASCADE;

--
-- Constraints for table `productsize`
--
ALTER TABLE `productsize`
  ADD CONSTRAINT `productsize_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
