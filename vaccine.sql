-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: sql6.freemysqlhosting.net
-- Thời gian đã tạo: Th6 08, 2022 lúc 02:55 PM
-- Phiên bản máy phục vụ: 5.5.62-0ubuntu0.14.04.1
-- Phiên bản PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sql6497958`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `accountID` int(11) NOT NULL,
  `socialSecurityNumber` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `userType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`accountID`, `socialSecurityNumber`, `password`, `userType`) VALUES
(6, '18010236-109E', '$2a$10$HVfKLoH/hIrS5GgtzSK7h.7Ud38OYs35woi4paKw44ycIcN6s76cC', 'admin'),
(10, '000128-4813', '$2a$10$cGTwa6IxYxyyufc91aLXXOrL4hSrJFbbBIrh0.MfbDKTenXz9xRKi', 'user'),
(12, '010101-97E', '$2a$10$JuA/TiK.ycRZCjr3pNkaPuyYljybc4JqIIhM/m7tYrDgXSu/MXoS.', 'user'),
(13, 'lmao123-lmao', '$2a$10$JmYhMnspEDnC9PxXjUv6OO.BS42g8vXGMcvZcb0DODeHJDumm0ma6', 'user'),
(14, 'duyleson123', '$2a$10$gJf0KaQC6jeKYmE/5grl3OLtwYfVu0/Q0Sk/fi7Ph.V12mZlsue3q', 'user'),
(15, '9tang-dungken', '$2a$10$arj7K5RGhDePisi0qlAnn.MO1rUYNDGX3R7cE21YKemgF8qSmcE36', 'user'),
(16, '0001387-87N5', '$2a$10$0KGCMkuY.wFcuSY8v3/z5uHwQ4Bd9m3EY2ph3XHFbXSSiJByL5vLa', 'user'),
(17, '123123', '$2a$10$AgcQxk7rl0zqmPvmr6bqHO.uw8Zrbhe94Cw77gc3.z4Mg.cdIYkVK', 'user'),
(18, 'alphamale123', '$2a$10$dAuxvcP8YcEpIOM7WQQ5GOuQ.fmNnubvgcx9tmjOlQDpyl7JcoRA.', 'user'),
(19, '339944992', '$2a$10$55ybejQnlZs7gVZQj7IB5OE6otGtn/yevLUHUBXb8i6BHN5oG46Jq', 'user');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diagnoses`
--

CREATE TABLE `diagnoses` (
  `patientSocialSecurityNumber` varchar(20) NOT NULL,
  `symptomID` int(11) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `diagnoses`
--

INSERT INTO `diagnoses` (`patientSocialSecurityNumber`, `symptomID`, `date`) VALUES
('000127-4899', 2, '2021-02-01'),
('000127-4899', 14, '2021-02-01'),
('000128-4813', 3, '2022-05-23'),
('000128-4813', 5, '2022-04-20'),
('000128-4813', 8, '2022-05-16'),
('000325-6271', 10, '2021-05-13'),
('010101-97E', 2, '2022-05-23'),
('010101-97E', 9, '2022-05-16'),
('010101-97E', 10, '2022-04-20'),
('010201-5814', 17, '2021-05-16'),
('010327-525G', 3, '2021-03-17'),
('010327-525G', 8, '2021-05-11'),
('010327-525G', 18, '2021-05-11'),
('011119-9865', 19, '2021-05-05'),
('041113-8113', 9, '2021-05-13'),
('041122-6308', 5, '2021-05-15'),
('041122-6308', 11, '2021-06-16'),
('060325-323X', 5, '2021-02-01'),
('060325-323X', 12, '2021-02-01'),
('060325-323X', 18, '2021-02-02'),
('060325-323X', 21, '2021-02-01'),
('060421-302M', 1, '2021-05-11'),
('060421-302M', 7, '2021-05-11'),
('060421-302M', 16, '2021-03-18'),
('060925-8919', 4, '2021-02-10'),
('070218-9109', 2, '2021-04-14'),
('080305-985A', 17, '2021-01-31'),
('090202-1778', 3, '2021-02-02'),
('090202-1778', 15, '2021-02-01'),
('090202-1778', 19, '2021-02-02'),
('090226-5673', 6, '2021-03-18'),
('090226-5673', 17, '2021-05-12'),
('090226-5673', 19, '2021-05-12'),
('090518-869W', 12, '2021-05-11'),
('090707-295R', 8, '2021-02-15'),
('090707-295R', 21, '2021-02-15'),
('100825-914H', 21, '2021-03-03'),
('110420-6983', 14, '2021-05-12'),
('110420-6983', 17, '2021-05-13'),
('110420-6983', 19, '2021-05-13'),
('110614-978B', 10, '2021-02-17'),
('120407-897G', 8, '2021-05-11'),
('130205-474D', 3, '2021-05-11'),
('130205-474D', 10, '2021-05-11'),
('130205-474D', 18, '2021-05-11'),
('130704-908X', 7, '2021-01-01'),
('140307-203V', 13, '2021-03-17'),
('150601-1657', 15, '2021-02-01'),
('150601-1657', 16, '2021-02-01'),
('151129-922D', 15, '2021-05-23'),
('161215-9509', 21, '2021-04-11'),
('210318-737O', 14, '2021-03-20'),
('701127-5340', 9, '2021-05-12'),
('701127-5340', 17, '2021-04-10'),
('701127-5340', 19, '2021-05-12'),
('730126-956K', 1, '0000-00-00'),
('730218-253D', 10, '2021-03-16'),
('730218-253D', 15, '2021-03-16'),
('730218-253D', 18, '2021-03-16'),
('731122-126T', 20, '2021-02-02'),
('741222-8947', 14, '2021-03-14'),
('751211-287B', 1, '2021-02-15'),
('751211-287B', 4, '2021-02-15'),
('760823-949J', 8, '2021-03-07'),
('780214-1893', 6, '2021-01-31'),
('790503-394M', 20, '2021-01-30'),
('790608-9686', 8, '2021-02-01'),
('810616-9029', 21, '2021-04-30'),
('821213-6162', 3, '2021-05-12'),
('830908-9826', 3, '2021-02-18'),
('840805-1135', 1, '2021-02-15'),
('840805-1135', 3, '2021-02-01'),
('841026-9331', 15, '2021-04-17'),
('841229-112N', 3, '2021-02-16'),
('841229-112N', 5, '2021-02-10'),
('850310-787I', 3, '2021-05-12'),
('850310-787I', 5, '2021-05-12'),
('850310-787I', 12, '2021-05-11'),
('850315-155F', 3, '2021-02-02'),
('850315-155F', 16, '2021-02-02'),
('851228-732X', 2, '2021-05-11'),
('851228-732X', 4, '2021-05-11'),
('851228-732X', 20, '2021-05-12'),
('871128-519R', 18, '2021-03-17'),
('871128-519R', 21, '2021-03-17'),
('880706-240U', 8, '2021-02-16'),
('881006-6543', 12, '2021-05-12'),
('881210-971J', 3, '2021-03-13'),
('890104-753F', 7, '2021-02-15'),
('891214-962C', 10, '2021-04-20'),
('930106-189U', 6, '2021-02-01'),
('930106-189U', 18, '2021-02-01'),
('930804-509I', 11, '2021-05-11'),
('930804-7021', 13, '2021-05-12'),
('950303-191X', 7, '2021-02-15'),
('950303-191X', 12, '2021-02-16'),
('971214-2818', 2, '2021-02-16'),
('980626-9033', 12, '2021-05-01'),
('990903-6514', 7, '2021-05-14'),
('990903-6514', 11, '2021-05-12'),
('990903-6514', 14, '2021-05-12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `patients`
--

CREATE TABLE `patients` (
  `patientSocialSecurityNumber` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `patients`
--

INSERT INTO `patients` (`patientSocialSecurityNumber`, `name`, `gender`, `dateOfBirth`) VALUES
('000127-4899', 'Ms. Opal Lang', 'F', '2000-01-27'),
('000127-4901', 'hhihi', 'M', '2011-03-01'),
('000127-4911', 'hhihi', 'M', '2011-03-01'),
('000128-4811', 'hhihi', 'M', '2011-03-01'),
('000128-4813', 'hhihi', 'M', '2011-03-01'),
('0001387-87N5', 'Jaykie Love', 'M', '2001-06-07'),
('000325-6271', 'Mariam Ritchie', 'F', '2000-03-25'),
('000425-224A', 'Christian McGlynn', 'M', '2000-04-25'),
('000506-642P', 'Cassandra Mayert', 'F', '2000-05-06'),
('010101-97E', 'Le Thai Son', 'M', '2002-03-03'),
('010201-5814', 'Harrison Heaney', 'M', '2001-02-01'),
('010327-525G', 'Dr. Mireille Hansen', 'M', '2001-03-27'),
('011103-6045', 'Mrs. Kailyn Collier ', 'F', '2001-11-03'),
('011112-5614', 'Magnus Gerhold', 'M', '2001-11-12'),
('011119-9865', 'Ahmad Kovacek', 'M', '2001-11-19'),
('021001-957O', 'John Larkin', 'M', '2002-10-01'),
('021130-649D', 'Dr. Jayson Glover DV', 'M', '2002-11-30'),
('021201-3734', 'Prof. Raymond Beahan', 'M', '2002-12-01'),
('031127-2165', 'Mathew Buckridge', 'M', '2003-11-27'),
('040113-8197', 'Santiago Hintz', 'M', '2004-01-13'),
('040208-7391', 'Prof. Sadye Walter', 'F', '2004-02-08'),
('041030-267L', 'Isabell Nader', 'F', '2004-10-30'),
('041113-8113', 'Prof. Yessenia Doole', 'F', '2004-11-13'),
('041122-6308', 'Prof. Demarco Hahn', 'M', '2004-11-22'),
('041208-5838', 'Dr. Margarette Mertz', 'F', '2004-12-08'),
('050218-4796', 'Ms. Hassie Runolfsso', 'F', '2005-02-18'),
('050922-330C', 'Mrs. Bulah Grant', 'F', '2005-09-22'),
('060325-323X', 'Darlene Brakus', 'F', '2006-03-25'),
('060406-686D', 'Dovie West', 'F', '2006-04-06'),
('060421-302M', 'Faustino Barton', 'M', '2006-04-21'),
('060729-292C', 'Marilou Ryan', 'F', '2006-07-29'),
('060925-8919', 'Prof. Garry Renner S', 'M', '2006-09-25'),
('060927-1438', 'Zetta Runolfsson', 'F', '2006-09-27'),
('070101-326Q', 'Orpha Bogisich', 'F', '2007-01-01'),
('070117-2839', 'Estrella Johns', 'F', '2007-01-17'),
('070218-9109', 'Angelina White', 'F', '2007-02-18'),
('071001-8429', 'Dr. Macie Ondricka', 'F', '2007-10-01'),
('080305-985A', 'Ricky Kuhn', 'M', '2008-03-05'),
('080514-3385', 'Dakota Greenfelder', 'F', '2008-05-14'),
('090202-1778', 'Alvera Medhurst', 'F', '2009-02-02'),
('090226-5673', 'Dr. Lamont Ferry', 'M', '2009-02-26'),
('090416-443L', 'Aliyah Harber', 'M', '2009-04-16'),
('090502-3556', 'Mr. Dereck Brekke IV', 'M', '2009-05-02'),
('090518-869W', 'Spencer Kunde', 'M', '2009-05-18'),
('090602-7898', 'Hillard Boehm V', 'M', '2009-06-02'),
('090707-295R', 'Alysson Jakubowski', 'F', '2009-07-07'),
('100825-914H', 'Astrid Willms', 'F', '2010-08-25'),
('101229-7602', 'Amelie Cummings', 'F', '2010-12-29'),
('110420-6983', 'Nellie Nitzsche', 'F', '2011-04-20'),
('110614-978B', 'Ms. Hanna Corkery', 'F', '2011-06-14'),
('110929-252V', 'Lilly Farrell V', 'F', '2011-09-29'),
('120203-4446', 'Mr. Oren Block IV', 'M', '2012-02-03'),
('120318-5791', 'Mathilde Smith', 'F', '2012-03-18'),
('120407-897G', 'Torey Mills', 'M', '2012-04-07'),
('123123', 'ditme', 'M', '2022-06-07'),
('130205-474D', 'Elenora Sawayn', 'F', '2013-02-05'),
('130701-235N', 'Arnold Medhurst', 'M', '2013-07-01'),
('130704-908X', 'Baby Kunde', 'M', '2013-07-04'),
('130725-3724', 'Shemar Bradtke', 'F', '2013-07-25'),
('140307-203V', 'Rhea Hettinger', 'M', '2014-03-07'),
('140620-7388', 'Tina Kshlerin', 'F', '2014-06-20'),
('141005-8066', 'Dr. Rhea Schaefer I', 'M', '2014-10-05'),
('141231-4486', 'Kristina Pagac', 'F', '2014-12-31'),
('150416-255C', 'Jacklyn Padberg', 'F', '2015-04-16'),
('150419-7928', 'Ona Crona III', 'M', '2015-04-19'),
('150601-1657', 'Mrs. Ophelia Corwin ', 'F', '2015-06-01'),
('151129-922D', 'Ned Ziemann', 'F', '2015-11-29'),
('160902-592P', 'Britney Gutmann', 'F', '2016-09-02'),
('160930-586P', 'Aiden Volkman', 'F', '2016-09-30'),
('161215-9509', 'Roslyn Rempel DDS', 'F', '2016-12-15'),
('171125-8471', 'Lucie Walter PhD', 'F', '2017-11-25'),
('180604-6419', 'Dr. Freddie Cartwrig', 'M', '2018-06-04'),
('181012-5367', 'Bulah Heidenreich', 'M', '2018-10-12'),
('190604-440B', 'Prof. Kevon Cummings', 'M', '2019-06-04'),
('190615-6325', 'Ms. Nelda Brekke PhD', 'F', '2019-06-15'),
('190709-8467', 'Zander Powlowski', 'M', '2019-07-09'),
('210318-737O', 'Corine Hane', 'F', '2021-03-18'),
('339944992', 'Hello My Friend', 'F', '2015-06-09'),
('701117-199K', 'Leland Moen', 'M', '1970-11-17'),
('701127-5340', 'Mrs. Lorena Kreiger', 'F', '1970-11-27'),
('701202-2506', 'Godfrey Haley Sr.', 'M', '1970-12-02'),
('710113-8500', 'Dr. Geovanni Krajcik', 'M', '1971-01-13'),
('710325-877I', 'Nicolette Moen', 'F', '1971-03-25'),
('710327-313B', 'Prof. Ewell Conn', 'M', '1971-03-27'),
('710422-6080', 'Mr. Ike Wyman III', 'M', '1971-04-22'),
('710724-5480', 'Dashawn Schamberger', 'M', '1971-07-24'),
('720214-2797', 'Abbey Schuppe', 'F', '1972-02-14'),
('720414-668E', 'Paige Conn', 'F', '1972-04-14'),
('720621-378H', 'Ms. Alisha Ortiz', 'F', '1972-06-21'),
('720801-8748', 'Braeden Hackett', 'M', '1972-08-01'),
('721030-5216', 'Noah Leuschke', 'M', '1972-10-30'),
('730126-956K', 'Kayden Farrell', 'M', '1973-01-26'),
('730218-253D', 'Dereck Beer', 'M', '1973-02-18'),
('730927-7319', 'Mr. Gunner O\'Hara MD', 'M', '1973-09-27'),
('731122-126T', 'Johanna McClure', 'F', '1973-11-22'),
('741104-114G', 'Marvin Fahey', 'M', '1974-11-04'),
('741222-8947', 'Devon Nicolas', 'M', '1974-12-22'),
('751211-287B', 'Taylor Krajcik', 'F', '1975-12-11'),
('760108-8906', 'Miss Helen Boyer', 'F', '1976-01-08'),
('760708-708H', 'Maia Towne II', 'M', '1976-07-08'),
('760823-949J', 'Helene Schiller I', 'F', '1976-08-23'),
('761223-707W', 'Jacinto Prohaska', 'M', '1976-12-23'),
('770504-8289', 'Andreanne Stamm', 'F', '1977-05-04'),
('780214-1893', 'Prof. Erling Morar M', 'F', '1978-02-14'),
('780613-7560', 'Silas Fay', 'F', '1978-06-13'),
('780807-657T', 'Prof. Jorge Ward Jr.', 'M', '1978-08-07'),
('790121-7800', 'Otilia Stamm', 'M', '1979-01-21'),
('790503-394M', 'Kathlyn Moore', 'F', '1979-05-03'),
('790608-9686', 'Gisselle Hilpert', 'F', '1979-06-08'),
('801022-152O', 'Dane Barrows I', 'F', '1980-10-22'),
('801108-303B', 'Reva Waelchi', 'F', '1980-11-08'),
('801127-1830', 'Ms. Ivy Nolan', 'F', '1980-11-27'),
('810616-9029', 'Dr. Hester Veum PhD', 'M', '1981-06-16'),
('811005-5518', 'Miss Charity Powlows', 'F', '1981-10-05'),
('820126-623A', 'Miss Rosalyn Reichel', 'F', '1982-01-26'),
('820428-701R', 'Dallas Collins', 'M', '1982-04-28'),
('820906-808J', 'Prof. Paula Schaden ', 'F', '1982-09-06'),
('821213-6162', 'Tabitha Howe', 'M', '1982-12-13'),
('830820-576C', 'Loyal Hoeger', 'M', '1983-08-20'),
('830908-9826', 'Ana Ward', 'F', '1983-09-08'),
('840301-7572', 'Maxine Russel', 'M', '1984-03-01'),
('840805-1135', 'Lonzo Collier', 'M', '1984-08-05'),
('841026-9331', 'Brad Lehner', 'M', '1984-10-26'),
('841229-112N', 'Rodolfo O\'Reilly', 'M', '1984-12-29'),
('850212-376B', 'Mr. Ellis Jaskolski ', 'M', '1985-02-12'),
('850310-787I', 'Cristal Borer', 'M', '1985-03-10'),
('850315-155F', 'Andreanne Jakubowski', 'M', '1985-03-15'),
('851228-732X', 'Shanna Osinski', 'F', '1985-12-28'),
('860804-829D', 'Miss Hope Jones', 'F', '1986-08-04'),
('860811-3456', 'Syble Howe', 'F', '1986-08-11'),
('871118-242U', 'Dr. Victor Armstrong', 'M', '1987-11-18'),
('871128-519R', 'Flossie Torp', 'F', '1987-11-28'),
('880706-240U', 'Prof. Willard Marqua', 'M', '1988-07-06'),
('880810-358W', 'Braxton Hane', 'M', '1988-08-10'),
('881006-6543', 'Trycia Jaskolski', 'F', '1988-10-06'),
('881119-6103', 'Destiny Konopelski P', 'F', '1988-11-19'),
('881210-971J', 'Brain Greenholt', 'M', '1988-12-10'),
('890104-753F', 'Lukas Runolfsdottir ', 'M', '1989-01-04'),
('890607-6113', 'Prof. Raphael Prosac', 'M', '1989-06-07'),
('891214-962C', 'Clifton Boyle DDS', 'M', '1989-12-14'),
('901010-3010', 'Emerald Johnson', 'F', '1990-10-10'),
('930106-189U', 'Julius Marks', 'M', '1993-01-06'),
('930508-413K', 'Mr. Reid Little II', 'M', '1993-05-08'),
('930804-509I', 'Fay Ryan', 'F', '1993-08-04'),
('930804-7021', 'Prof. Harrison Toy', 'M', '1993-08-04'),
('940214-8179', 'Glenna Collier II', 'F', '1994-02-14'),
('950303-191X', 'Dr. Simeon Keeling I', 'M', '1995-03-03'),
('950803-1903', 'Lyric Funk', 'M', '1995-08-03'),
('951217-488K', 'Casey Brown', 'M', '1995-12-17'),
('960629-4156', 'Rossie Spinka', 'F', '1996-06-29'),
('960807-613R', 'Omer Denesik', 'M', '1996-08-07'),
('970708-7885', 'Ilene Kris', 'F', '1997-07-08'),
('970801-218B', 'Jonathan Wyman', 'M', '1997-08-01'),
('971214-2818', 'Prof. Brice Metz PhD', 'M', '1997-12-14'),
('980626-9033', 'Leonie Dibbert', 'M', '1998-06-26'),
('990614-395X', 'Josefa Greenfelder D', 'M', '1999-06-14'),
('990622-5231', 'Sid Hahn', 'M', '1999-06-22'),
('990903-6514', 'Eldred Blanda', 'F', '1999-09-03'),
('9tang-dungken', 'Chin Tang', 'M', '2002-06-07'),
('alphamale123', 'AlphaMale', 'M', '2002-06-08'),
('duyleson123', 'Le Duy Duy', 'M', '2022-06-16'),
('lmao123-lmao', 'Le Duy Son', 'M', '2002-06-07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shifts`
--

CREATE TABLE `shifts` (
  `staffMemberSocialSecurityNumber` varchar(30) NOT NULL,
  `vaccinationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `shifts`
--

INSERT INTO `shifts` (`staffMemberSocialSecurityNumber`, `vaccinationID`) VALUES
('19571227-3064', 1),
('19750726-4531', 1),
('19920802-4854', 1),
('19940615-4448', 1),
('19720223-1761', 2),
('19731007-1310', 2),
('19740308-7818', 2),
('19740731-5488', 2),
('19771003-5988', 2),
('19571227-3064', 3),
('19720212-5327', 3),
('19750726-4531', 3),
('19871016-6825', 3),
('19630812-6581', 4),
('19700204-9152', 4),
('19760420-5220', 4),
('19790817-5492', 4),
('19920802-4854', 4),
('19930315-7195', 4),
('19740516-4369', 5),
('19820721-424H', 5),
('19910122-1693', 5),
('19610330-6066', 6),
('19660601-1051', 6),
('19700204-9152', 6),
('19731009-8366', 6),
('19751212-3265', 6),
('19880817-8027', 6),
('19900103-6172', 6),
('19920211-1565', 6),
('19920802-4854', 6),
('19940615-4448', 6),
('19680115-6662', 7),
('19760420-5220', 7),
('19771003-5988', 7),
('19771112-4048', 7),
('19790212-2618', 7),
('19820218-5928', 7),
('19860607-9671', 7),
('19750726-4531', 16),
('19731007-1310', 27),
('19740308-7818', 28),
('19571227-3064', 33),
('19720212-5327', 34),
('19731009-8366', 34);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staffmembers`
--

CREATE TABLE `staffmembers` (
  `staffMemberSocialSecurityNumber` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `staffmembers`
--

INSERT INTO `staffmembers` (`staffMemberSocialSecurityNumber`, `name`, `dateOfBirth`, `phone`, `role`) VALUES
('19571227-3064', 'Norwood Murphy', '1957-12-27', '044-488-4064', 'nurse'),
('19610330-6066', 'Nadia Jacobson', '1961-03-30', '041-144-8822', 'doctor'),
('19630812-6581', 'Jazlyn Schneider', '1963-08-12', '040-868-2528', 'nurse'),
('19660601-1051', 'Kelvin Hamill', '1966-06-01', '040-499-1574', 'doctor'),
('19680115-6662', 'Ned Bergnaum', '1968-01-15', '040-262-4581', 'nurse'),
('19700204-9152', 'Rod Upton', '1970-02-04', '050-590-9802', 'doctor'),
('19701208-3270', 'Blanca Gaylord', '1970-12-08', '050-833-6807', 'nurse'),
('19710226-109L', 'Cristopher Tillman', '1971-02-26', '040-115-0704', 'nurse'),
('19720212-5327', 'Brielle Botsford', '1972-02-12', '040-416-5419', 'nurse'),
('19720223-1761', 'Alfreda Champlin', '1972-02-23', '041-631-1851', 'nurse'),
('19731007-1310', 'Itzel Ernser', '1973-10-07', '050-354-1907', 'nurse'),
('19731009-8366', 'Rosie Hansen', '1973-10-09', '050-670-4220', 'doctor'),
('19740308-7818', 'Elwyn Heathcote', '1974-03-08', '040-077-0520', 'nurse'),
('19740516-4369', 'Jeramy Feest', '1974-05-16', '041-284-2831', 'nurse'),
('19740731-5488', 'Rosalia Simonis', '1974-07-31', '041-608-6703', 'doctor'),
('19740919-7140', 'Deon Hoppe', '1974-09-19', '040-399-1121', 'nurse'),
('19750726-4531', 'Shaylee Kris', '1975-07-26', '040-018-1740', 'doctor'),
('19751212-3265', 'Hilbert Purdy', '1975-12-12', '040-154-3703', 'doctor'),
('19760102-8374', 'Elnora Greenholt', '1976-01-02', '050-930-9351', 'doctor'),
('19760420-5220', 'Darryl Douglas', '1976-04-20', '040-363-8047', 'doctor'),
('19761205-4219', 'Richmond Kuvalis', '1976-12-05', '040-722-7332', 'nurse'),
('19771003-5988', 'Samir Hills', '1977-10-03', '040-093-0059', 'nurse'),
('19771112-4048', 'Greg Schuppe', '1977-11-12', '044-508-7140', 'nurse'),
('19781030-815P', 'Candido Anderson', '1978-10-30', '040-800-8852', 'nurse'),
('19790212-2618', 'Aimee Bruen', '1979-02-12', '050-867-1567', 'nurse'),
('19790817-5492', 'Keshawn DuBuque', '1979-08-17', '050-830-6384', 'nurse'),
('19800310-4996', 'Vesta Considine', '1980-03-10', '044-022-9671', 'nurse'),
('19810923-245N', 'Ollie Becker', '1981-09-23', '040-321-9861', 'nurse'),
('19820218-5928', 'Elena Bartell', '1982-02-18', '041-938-9451', 'nurse'),
('19820721-424H', 'Hiram Nicolas', '1982-07-21', '050-904-1622', 'nurse'),
('19831020-4745', 'Madisyn Shanahan', '1983-10-20', '044-646-8740', 'doctor'),
('19860607-9671', 'Mario Wuckert', '1986-06-07', '040-739-4876', 'doctor'),
('19871016-6825', 'Austen Simonis', '1987-10-16', '050-688-1407', 'doctor'),
('19880817-8027', 'Haylie Wintheiser', '1988-08-17', '050-448-8894', 'nurse'),
('19900103-6172', 'Philip Smitham', '1990-01-03', '044-086-4206', 'nurse'),
('19900513-9211', 'Monte Raynor', '1990-05-13', '040-114-9158', 'doctor'),
('19910122-1693', 'Ashley Konopelski', '1991-01-22', '041-898-5555', 'nurse'),
('19920211-1565', 'Rafaela Jerde', '1992-02-11', '040-860-5999', 'nurse'),
('19920720-966R', 'Florine Leannon', '1992-07-20', '044-525-4083', 'doctor'),
('19920802-4854', 'Kaden Tromp', '1992-08-02', '044-624-1591', 'nurse'),
('19930315-7195', 'Jeromy McKenzie', '1993-03-15', '040-135-4985', 'nurse'),
('19930608-7263', 'Autumn Abshire', '1993-06-08', '050-116-0560', 'nurse'),
('19940615-4448', 'Jordy Hilpert', '1994-06-15', '044-506-1982', 'doctor');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `symptoms`
--

CREATE TABLE `symptoms` (
  `symptomID` int(11) NOT NULL,
  `symptomName` varchar(30) NOT NULL,
  `criticality` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `symptoms`
--

INSERT INTO `symptoms` (`symptomID`, `symptomName`, `criticality`) VALUES
(1, 'diarrhea', '0'),
(2, 'joint pain', '0'),
(3, 'muscle ache', '0'),
(4, 'nausea', '0'),
(5, 'fatigue', '0'),
(6, 'chills', '0'),
(7, 'fever', '0'),
(8, 'high fever', '0'),
(9, 'inflammation near injection', '0'),
(10, 'itchiness near injection', '0'),
(11, 'warmth near injection', '0'),
(12, 'pain near injection', '0'),
(13, 'feelings of illness', '0'),
(14, 'lymfadenopathy', '0'),
(15, 'vomiting', '0'),
(16, 'anaphylaxia', '1'),
(17, 'shortness of breath', '1'),
(18, 'chest pain', '1'),
(19, 'leg swelling', '1'),
(20, 'prologned abdominal pain', '1'),
(21, 'sereve or prolonged headache', '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaccinations`
--

CREATE TABLE `vaccinations` (
  `vaccinationID` int(11) NOT NULL,
  `vaccineStationId` int(11) NOT NULL,
  `limitNumber` int(11) NOT NULL,
  `date` date NOT NULL,
  `vaccineType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `vaccinations`
--

INSERT INTO `vaccinations` (`vaccinationID`, `vaccineStationId`, `limitNumber`, `date`, `vaccineType`) VALUES
(1, 5, 300, '2021-01-30', 'AstraZeneca'),
(2, 3, 300, '2021-02-14', 'Moderna'),
(3, 3, 500, '2021-01-30', 'AstraZeneca'),
(4, 5, 300, '2021-03-16', 'Comirnaty'),
(5, 3, 200, '2021-05-10', 'Comirnaty'),
(6, 2, 300, '2021-05-14', 'AstraZeneca'),
(7, 4, 200, '2021-05-10', 'AstraZeneca'),
(16, 3, 300, '2022-05-08', 'AstraZeneca'),
(27, 1, 300, '2022-09-12', 'AstraZeneca'),
(28, 1, 300, '2022-11-13', 'AstraZeneca'),
(31, 1, 20, '2021-10-05', 'dsdada'),
(33, 14, 200, '2022-10-19', 'AstraZeneca'),
(34, 15, 200, '2022-06-23', 'AstraZeneca');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaccineregistrations`
--

CREATE TABLE `vaccineregistrations` (
  `patientSocialSecurityNumber` varchar(30) NOT NULL,
  `vaccinationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `vaccineregistrations`
--

INSERT INTO `vaccineregistrations` (`patientSocialSecurityNumber`, `vaccinationID`) VALUES
('021130-649D', 1),
('180604-6419', 1),
('721030-5216', 1),
('780613-7560', 1),
('841026-9331', 1),
('960807-613R', 1),
('000425-224A', 2),
('010201-5814', 2),
('011119-9865', 2),
('040208-7391', 2),
('050922-330C', 2),
('071001-8429', 2),
('130725-3724', 2),
('760108-8906', 2),
('801127-1830', 2),
('840805-1135', 2),
('860804-829D', 2),
('890104-753F', 2),
('000325-6271', 3),
('000506-642P', 3),
('040113-8197', 3),
('090226-5673', 3),
('110420-6983', 3),
('161215-9509', 3),
('181012-5367', 3),
('710325-877I', 3),
('710327-313B', 3),
('790503-394M', 3),
('820126-623A', 3),
('850315-155F', 3),
('880810-358W', 3),
('980626-9033', 3),
('060729-292C', 4),
('120318-5791', 4),
('150419-7928', 4),
('161215-9509', 4),
('720214-2797', 4),
('780613-7560', 4),
('790121-7800', 4),
('990614-395X', 4),
('000325-6271', 5),
('010201-5814', 5),
('021130-649D', 5),
('080514-3385', 5),
('101229-7602', 5),
('130725-3724', 5),
('140307-203V', 5),
('141231-4486', 5),
('181012-5367', 5),
('730126-956K', 5),
('761223-707W', 5),
('780807-657T', 5),
('790608-9686', 5),
('850212-376B', 5),
('890607-6113', 5),
('950303-191X', 5),
('960629-4156', 5),
('960807-613R', 5),
('971214-2818', 5),
('070218-9109', 6),
('090518-869W', 6),
('110929-252V', 6),
('180604-6419', 6),
('730218-253D', 6),
('770504-8289', 6),
('780613-7560', 6),
('811005-5518', 6),
('841229-112N', 6),
('850310-787I', 6),
('860811-3456', 6),
('930804-7021', 6),
('950303-191X', 6),
('021001-957O', 7),
('060325-323X', 7),
('090202-1778', 7),
('160930-586P', 7),
('181012-5367', 7),
('190615-6325', 7),
('721030-5216', 7),
('751211-287B', 7),
('990903-6514', 7),
('000128-4813', 16),
('000128-4813', 27),
('123123', 27),
('duyleson123', 27),
('alphamale123', 28),
('000128-4813', 33),
('339944992', 34);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaccinestations`
--

CREATE TABLE `vaccinestations` (
  `vaccineStationId` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `address` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `vaccinestations`
--

INSERT INTO `vaccinestations` (`vaccineStationId`, `name`, `phone`, `address`) VALUES
(1, 'Messukeskus', '093-101-0024', 'Ratapihantie 17 00520 HELSINKI'),
(2, 'Malmi', '093-105-7702', 'Vanha Helsingintie 5 00700 HELSINKI'),
(3, 'Tapiola Health Center', '098-162-7770', 'Ahertajantie 2 02100 ESPOO'),
(4, 'Iso Omena Vaccination Point', '098-163-4500', 'Suomelahdentie 1 02230 ESPOO'),
(5, 'Sanomala Vaccination Point', '093-105-3153', 'Sanomatie 1 01770 VANTAA'),
(6, 'Myyrmaki Energia Areena', '093-104-5930', 'Rajatorpantie 23 01600 VANTAA'),
(11, 'golden square', '095367289', '138 golden street'),
(12, 'ABC', '093-101-0025', '13 Thien Hien'),
(13, 'Trạm Y Tế America Đình', '321313123213', 'America Dinh'),
(14, 'Trạm Thương Xá Nigma', 'lmaoez', 'Hello from these other side'),
(15, 'Lmao station', '4434343', 'VN'),
(16, 'TramTiemChungVaccine', '2134210421', 'HaNoi');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountID`),
  ADD KEY `account_ibfk_2` (`socialSecurityNumber`);

--
-- Chỉ mục cho bảng `diagnoses`
--
ALTER TABLE `diagnoses`
  ADD PRIMARY KEY (`patientSocialSecurityNumber`,`symptomID`),
  ADD KEY `diagnoses_ibfk_2` (`symptomID`);

--
-- Chỉ mục cho bảng `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientSocialSecurityNumber`);

--
-- Chỉ mục cho bảng `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`staffMemberSocialSecurityNumber`,`vaccinationID`),
  ADD KEY `vaccinationID` (`vaccinationID`);

--
-- Chỉ mục cho bảng `staffmembers`
--
ALTER TABLE `staffmembers`
  ADD PRIMARY KEY (`staffMemberSocialSecurityNumber`);

--
-- Chỉ mục cho bảng `symptoms`
--
ALTER TABLE `symptoms`
  ADD PRIMARY KEY (`symptomID`);

--
-- Chỉ mục cho bảng `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD PRIMARY KEY (`vaccinationID`),
  ADD KEY `vaccinations_ibfk_1` (`vaccineStationId`);

--
-- Chỉ mục cho bảng `vaccineregistrations`
--
ALTER TABLE `vaccineregistrations`
  ADD PRIMARY KEY (`patientSocialSecurityNumber`,`vaccinationID`),
  ADD KEY `vaccineationID` (`vaccinationID`);

--
-- Chỉ mục cho bảng `vaccinestations`
--
ALTER TABLE `vaccinestations`
  ADD PRIMARY KEY (`vaccineStationId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT cho bảng `symptoms`
--
ALTER TABLE `symptoms`
  MODIFY `symptomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT cho bảng `vaccinations`
--
ALTER TABLE `vaccinations`
  MODIFY `vaccinationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT cho bảng `vaccinestations`
--
ALTER TABLE `vaccinestations`
  MODIFY `vaccineStationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `diagnoses`
--
ALTER TABLE `diagnoses`
  ADD CONSTRAINT `diagnoses_ibfk_1` FOREIGN KEY (`patientSocialSecurityNumber`) REFERENCES `patients` (`patientSocialSecurityNumber`),
  ADD CONSTRAINT `diagnoses_ibfk_2` FOREIGN KEY (`symptomID`) REFERENCES `symptoms` (`symptomID`);

--
-- Các ràng buộc cho bảng `shifts`
--
ALTER TABLE `shifts`
  ADD CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`staffMemberSocialSecurityNumber`) REFERENCES `staffmembers` (`staffMemberSocialSecurityNumber`),
  ADD CONSTRAINT `shifts_ibfk_2` FOREIGN KEY (`vaccinationID`) REFERENCES `vaccinations` (`vaccinationID`);

--
-- Các ràng buộc cho bảng `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD CONSTRAINT `vaccinations_ibfk_1` FOREIGN KEY (`vaccineStationId`) REFERENCES `vaccinestations` (`vaccineStationId`);

--
-- Các ràng buộc cho bảng `vaccineregistrations`
--
ALTER TABLE `vaccineregistrations`
  ADD CONSTRAINT `vaccineregistrations_ibfk_1` FOREIGN KEY (`patientSocialSecurityNumber`) REFERENCES `patients` (`patientSocialSecurityNumber`),
  ADD CONSTRAINT `vaccineregistrations_ibfk_2` FOREIGN KEY (`vaccinationID`) REFERENCES `vaccinations` (`vaccinationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
