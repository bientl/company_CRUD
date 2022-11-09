-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2022 at 02:31 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` bigint(20) NOT NULL,
  `chuc_nang` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ma_phong_ban` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ten_phong_ban` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `chuc_nang`, `ma_phong_ban`, `ten_phong_ban`) VALUES
(1, 'Nghiệp vụ tài chính kế toán, cố vấn quản lý tài chính doanh nghiệp', 'KT', 'Kế toán'),
(2, 'Tuyển dụng, tính lương và các chế độ phúc lợi cho nhân viên', 'NS', 'Nhân sự'),
(3, 'Xử lý các công việc nội bộ, lưu trữ, phát hành văn bản', 'HC', 'Hành chính'),
(4, 'Tiếp nhận thông tin khiếu nại của khách hàng và đưa ra phương hướng xử lý', 'CSKH', 'Chăm sóc khách hàng'),
(5, 'Xây dựng chiến lượng và kế hoạch phát triển CNTT trong từng giai đoạn', 'CNTT', 'Công nghệ thông tin'),
(6, 'Xây dựng chiến lược marketing cho doanh nghiệp, mở rộng thị trường', 'MKT', 'Marketing'),
(7, 'Nghiên cứu và thực hiện các công việc tiếp cận thị trường', 'KD', 'Kinh doanh');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` bigint(20) NOT NULL,
  `chuc_vu` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gioi_tinh` bit(1) NOT NULL,
  `ma_nhan_vien` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ten_nhan_vien` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tien_luong` bigint(20) NOT NULL,
  `department_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `chuc_vu`, `gioi_tinh`, `ma_nhan_vien`, `ten_nhan_vien`, `tien_luong`, `department_id`) VALUES
(1, 'thực tập', b'1', 'NV008', 'Đặng Tuấn Anh', 3000000, 1),
(2, 'nhân viên', b'1', 'NV009', 'Mạc Trung Đức', 7000000, 1),
(3, 'trưởng nhóm', b'0', 'NV005', 'Nguyễn Thị Ngân Hà', 12000000, 1),
(4, 'trưởng/phó phòng', b'0', 'NV001', 'Nguyễn Lê Hiếu', 15000000, 1),
(5, 'nhân viên', b'1', 'NV010', 'Hoàng Đức Anh', 7000000, 1),
(6, 'nhân viên', b'1', 'NV011', 'Nguyễn Vũ Gia Hưng', 7000000, 2),
(7, 'nhân viên', b'0', 'NV012', 'Đàm Yến Nhi', 7000000, 2),
(8, 'trưởng/phó phòng', b'1', 'NV002', 'Trịnh văn Sâm', 15000000, 2),
(9, 'nhân viên', b'1', 'NV013', 'Đỗ Quang Ngọc', 7000000, 3),
(10, 'nhân viên', b'0', 'NV014', 'Bùi Phương Huyền', 7000000, 3),
(11, 'nhân viên', b'0', 'NV015', 'Lưu Trang Anh', 7000000, 4),
(12, 'nhân viên', b'0', 'NV016', 'Bùi Phương Thảo', 7000000, 4),
(13, 'nhân viên', b'0', 'NV017', 'Đặng Huyền Nhi', 7000000, 4),
(14, 'trưởng nhóm', b'0', 'NV006', 'Lê Khánh Vy', 13000000, 4),
(15, 'nhân viên', b'1', 'NV018', 'Đào Tuấn Phong', 12000000, 5),
(16, 'nhân viên', b'1', 'NV019', 'Dương Phúc Thịnh', 12000000, 5),
(17, 'nhân viên', b'1', 'NV020', 'Hoàng Quốc Trung', 13000000, 5),
(18, 'trưởng/phó phòng', b'1', 'NV003', 'Phạm Hoàng Anh', 20000000, 5),
(19, 'nhân viên', b'0', 'NV021', 'Nguyễn Minh Thư', 7000000, 6),
(20, 'nhân viên', b'0', 'NV022', 'Đặng Thanh Thảo', 7000000, 6),
(21, 'trưởng nhóm', b'0', 'NV007', 'Vũ Điệp Chi', 1200000, 6),
(22, 'trưởng/phó phòng', b'1', 'NV004', 'Phạm Ngọc Hiếu', 15000000, 7),
(23, 'nhân viên', b'1', 'NV023', 'Vũ Đức Huy', 7000000, 7),
(24, 'nhân viên', b'1', 'NV024', 'Lê Trần Tuấn Minh', 7000000, 7),
(25, 'nhân viên', b'1', 'NV025', 'Đào Duy Thái', 7000000, 7),
(26, 'nhân viên', b'1', 'NV026', 'Phạm Đức Đạt', 7000000, 7),
(27, 'nhân viên', b'0', 'NV027', 'Dương Khánh Linh', 7000000, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbejtwvg9bxus2mffsm3swj3u9` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FKbejtwvg9bxus2mffsm3swj3u9` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
