SET SESSION sql_require_primary_key = 0;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2026 at 09:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `christy_bakery`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Cakes', 'cakes', 'Decadent and beautifully decorated cakes for all occasions.', '2026-06-07 20:41:27', '2026-06-07 20:41:27'),
(2, 'Breads', 'breads', 'Freshly baked artisan breads, hand-kneaded and baked daily.', '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(3, 'Pastries', 'pastries', 'Sweet and savory laminated pastries that melt in your mouth.', '2026-06-07 20:41:29', '2026-06-07 20:41:29'),
(4, 'Cookies', 'cookies', 'Freshly baked cookies, crunchy on the outside and chewy on the inside.', '2026-06-07 20:41:30', '2026-06-07 20:41:30');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'feedback',
  `reservation_date` date DEFAULT NULL,
  `reservation_time` time DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_06_06_224128_create_categories_table', 1),
(5, '2026_06_06_224159_create_products_table', 1),
(6, '2026_06_06_224213_create_orders_table', 1),
(7, '2026_06_06_224218_create_order_items_table', 1),
(8, '2026_06_06_224236_create_inquiries_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(255) NOT NULL,
  `delivery_address` text NOT NULL,
  `delivery_date` date NOT NULL,
  `delivery_time` time NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'pending',
  `payment_method` varchar(255) NOT NULL DEFAULT 'card',
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `description`, `price`, `image_path`, `is_available`, `stock`, `created_at`, `updated_at`) VALUES
(1, 1, 'Chocolate Fudge Cake', 'chocolate-fudge-cake', 'Rich, moist chocolate cake layered with decadent fudge frosting and topped with chocolate curls.', 25.00, NULL, 1, 15, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(2, 1, 'Red Velvet Delight', 'red-velvet-delight', 'Classic red velvet cake layers with a light cocoa flavor, frosted with rich cream cheese icing.', 28.00, NULL, 1, 10, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(3, 1, 'Strawberry Shortcake', 'strawberry-shortcake', 'Light, fluffy sponge cake filled with fresh strawberries and sweet whipped cream.', 22.00, NULL, 1, 12, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(4, 1, 'Vanilla Bean Dream', 'vanilla-bean-dream', 'Elegant Madagascan vanilla sponge paired with silky smooth vanilla buttercream.', 20.00, NULL, 1, 20, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(5, 2, 'Sourdough Boule', 'sourdough-boule', 'Naturally leavened artisan bread with a crisp crust and a soft, tangy, chewy crumb.', 6.50, NULL, 1, 30, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(6, 2, 'Brioche Loaf', 'brioche-loaf', 'Rich, buttery French bread with a golden crust and a pillow-soft, tender crumb.', 8.00, NULL, 1, 25, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(7, 2, 'Whole Wheat Loaf', 'whole-wheat-loaf', 'Hearty and nutritious bread made from 100% stoneground whole wheat flour.', 5.50, NULL, 1, 30, '2026-06-07 20:41:28', '2026-06-07 20:41:28'),
(8, 2, 'French Baguette', 'french-baguette', 'Traditional long, thin loaf with a crackly crust and a light, airy interior.', 3.50, NULL, 1, 40, '2026-06-07 20:41:29', '2026-06-07 20:41:29'),
(9, 3, 'Butter Croissant', 'butter-croissant', 'Flaky, golden-brown laminated pastry made with layers of high-quality French butter.', 4.00, NULL, 1, 50, '2026-06-07 20:41:29', '2026-06-07 20:41:29'),
(10, 3, 'Pain au Chocolat', 'pain-au-chocolat', 'Decadent butter croissant dough wrapped around two bars of premium dark chocolate.', 4.50, NULL, 1, 45, '2026-06-07 20:41:30', '2026-06-07 20:41:30'),
(11, 3, 'Cinnamon Roll', 'cinnamon-roll', 'Soft, warm cinnamon swirl pastry topped with a generous layer of sweet cream cheese glaze.', 5.00, NULL, 1, 35, '2026-06-07 20:41:30', '2026-06-07 20:41:30'),
(12, 3, 'Almond Danish', 'almond-danish', 'Flaky Danish pastry filled with sweet almond frangipane and topped with sliced almonds.', 4.50, NULL, 1, 30, '2026-06-07 20:41:30', '2026-06-07 20:41:30'),
(13, 4, 'Chocolate Chip Cookie', 'chocolate-chip-cookie', 'Classic soft-baked cookie loaded with semi-sweet chocolate chunks and a touch of sea salt.', 2.50, NULL, 1, 100, '2026-06-07 20:41:30', '2026-06-07 20:41:30'),
(14, 4, 'Oatmeal Raisin Cookie', 'oatmeal-raisin-cookie', 'Chewy, spiced oatmeal cookie packed with sweet, plump raisins.', 2.50, NULL, 1, 80, '2026-06-07 20:41:30', '2026-06-07 20:41:30'),
(15, 4, 'Assorted Macaron Box', 'assorted-macaron-box', 'A colorful box of 6 delicate French macarons in raspberry, pistachio, chocolate, and vanilla.', 15.00, NULL, 1, 25, '2026-06-07 20:41:31', '2026-06-07 20:41:31'),
(16, 4, 'Double Chocolate Cookie', 'double-chocolate-cookie', 'Decadent chocolate cookie dough loaded with both milk and white chocolate chips.', 3.00, NULL, 1, 90, '2026-06-07 20:41:31', '2026-06-07 20:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6pHIhtW1WJuqV0fGCfS6CTckf8arKuxkUbsSAY01', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib2p3dDBXb3o0VUFueVA1NktmY2F5M2hsemRuMXNVMlBqeDJ5enRGNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1780997326),
('CgnvHffuHhwZns77H8dmFIIKLBrnrQ7dDFGXsAlo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2VVQXExdGxKdDh5cmoxNWNJRVM5WXVuVTBOWXNmOFc0MDIxUWNreiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cy9hbG1vbmQtZGFuaXNoIjtzOjU6InJvdXRlIjtzOjEzOiJwcm9kdWN0cy5zaG93Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1780999165),
('GFAwU2oELdXRCUh7ayc3Kiger89EfiASJhBgcFGA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/3.7.21 Chrome/142.0.7444.265 Electron/39.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2pqTHZvY1ozOFN1bnFxWFBoM1loaFcydGJIUVlZaWN5amplQ2RkTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxNDoicHJvZHVjdHMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1780997485),
('GmIVmrxVyMzeC9awb453aRlrpqpOerS5pYiL4T0k', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/3.7.21 Chrome/142.0.7444.265 Electron/39.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2czcFVYcW8wQ0VqQUo1anNZbUt3c1UwcDNlV0RKdjV1VU1ISVp5SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxNDoicHJvZHVjdHMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1780997526),
('gQmPTWm5k3RyrfwnI1jf76IKMJZujm5c3r9f5gjc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/3.7.21 Chrome/142.0.7444.265 Electron/39.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSjdOb0lld25iZm9JMnR0QlJBa0tlanRSMWlLRFhVeFFTaWFtVWRWbSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cy9jaG9jb2xhdGUtY2hpcC1jb29raWUiO3M6NToicm91dGUiO3M6MTM6InByb2R1Y3RzLnNob3ciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1780998503);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `is_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Christy Admin', 'iamchristy@gmail.com', '2026-06-07 20:41:26', '$2y$12$bSeTwIE.p8y2LUiG.KV5K.CMqTmxZbkDH/w1DwDI250k0JzW7yxmu', 1, 'vwtLi61V5E', '2026-06-07 20:41:26', '2026-06-07 20:41:26'),
(2, 'Customer User', 'customer@christybakery.com', '2026-06-07 20:41:27', '$2y$12$qVRIzdxjAv/SbobCXePRyeY32clm14Vs11DJnwqmBSBgXqpmXqZLK', 0, 'p7FIyjLvkB', '2026-06-07 20:41:27', '2026-06-07 20:41:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
