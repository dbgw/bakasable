-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 11 oct. 2021 à 09:42
-- Version du serveur :  10.3.31-MariaDB-0+deb10u1
-- Version de PHP : 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fingz_dev`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `same_as_invoice` tinyint(1) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `user_id`, `first_name`, `last_name`, `address`, `additional_address`, `postal_code`, `city`, `type`, `same_as_invoice`, `latitude`, `longitude`) VALUES
(1, 5, 'Jeanne fac 1', 'Dumontelle 1', '400 Rue Saint Honoré', 'adresse complement 1', '75001', 'Paris', 'invoice', 0, 48.868016, 2.3250414),
(2, 5, 'Jeanne fac 1', 'Dumontelle 1', '400 Rue Saint Honoré', 'adresse complement 1', '75001', 'Paris', 'delivery', 1, 48.868016, 2.3250414),
(5, 9, 'Audrey C', 'Dieulle', '154 Boulevard Berthier', '', '75017', 'Paris', 'invoice', 1, 48.8868733, 2.2962392),
(6, 9, 'Audrey C', 'Dieulle', '154 Boulevard Berthier', '', '75017', 'Paris', 'delivery', 1, 48.8868733, 2.2962392),
(7, 11, 'Prénom là', 'Nom de famille', '07 Place Vendôme', 'compfac', '75001', 'Paris', 'invoice', 0, 48.8671834, 2.3283174),
(8, 11, 'Prénom là', 'Nom de famille', '08 Boulevard Richard-Lenoir', 'compliv', '75011', 'Paris', 'delivery', 1, 48.8544862, 2.3702593);

-- --------------------------------------------------------

--
-- Structure de la table `benefit`
--

CREATE TABLE `benefit` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type_service` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_quote` double DEFAULT NULL,
  `precision_quote` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `archive` smallint(6) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `benefit`
--

INSERT INTO `benefit` (`id`, `service_id`, `user_id`, `type_service`, `price_quote`, `precision_quote`, `created_at`, `updated_at`, `archive`) VALUES
(4, 32, 3, 'devis', 2, 'Voici mes précisions de prise en charge', '2021-08-13 10:35:00', '2021-10-04 14:19:17', 1),
(5, 33, 3, 'forfait', NULL, '', '2021-08-13 10:37:35', '2021-10-04 14:16:13', 1),
(7, 39, 3, 'devis', 16, 'le voici', '2021-08-19 13:04:50', '2021-08-19 13:35:11', 0),
(8, 40, 3, 'forfait', NULL, '', '2021-08-19 13:11:28', '2021-08-19 13:11:42', 0),
(11, 3, 3, 'forfait', NULL, '', '2021-08-25 08:43:25', '2021-08-25 08:54:48', 0),
(13, 2, 3, 'forfait', NULL, '', '2021-08-25 14:45:04', '2021-08-25 14:45:21', 0),
(14, 6, 3, 'forfait', NULL, '', '2021-08-31 10:13:07', '2021-08-31 10:13:26', 0),
(15, 45, 3, 'forfait', NULL, '', '2021-09-02 14:15:09', '2021-09-02 14:15:42', 0),
(16, 45, 14, 'forfait', NULL, '', '2021-09-02 14:20:19', '2021-09-02 14:20:56', 0),
(17, 33, 14, 'forfait', NULL, '', '2021-09-02 15:00:43', '2021-09-02 15:00:54', 0),
(18, 33, 15, 'devis', 10.99, 'Voici mon devis parce que c\'est comme ça', '2021-09-02 15:06:07', '2021-09-28 16:03:12', 0),
(19, 40, 15, 'devis', NULL, 'fdfsdgs rtfds fsd fs', '2021-09-28 16:04:14', '2021-09-28 16:05:31', 0),
(20, 32, 15, 'devis', NULL, 'dsfds fsfdsf ', '2021-10-04 14:19:45', '2021-10-04 14:21:13', 1),
(21, 20, 15, 'forfait', NULL, '', '2021-10-04 14:22:40', '2021-10-04 14:24:13', 1),
(22, 45, 15, 'devis', 10, '', '2021-10-04 15:05:52', '2021-10-04 15:06:01', 0),
(23, 45, 19, 'devis', 10, 'fgfdg', '2021-10-04 15:55:55', '2021-10-04 15:56:06', 0);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `universe_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` smallint(6) DEFAULT NULL,
  `position` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `universe_id`, `parent_id`, `name`, `level`, `position`, `created_at`, `updated_at`, `slug`) VALUES
(155, 12, NULL, 'cat 2', 0, 2, '2021-07-26 13:15:27', '2021-08-02 16:25:17', ''),
(157, 12, NULL, 'cat 1 bis', 0, 0, '2021-07-26 13:15:48', '2021-08-02 16:25:16', ''),
(158, NULL, 157, 'scat 1', 1, 0, '2021-07-26 13:15:57', '2021-08-19 13:06:03', ''),
(159, NULL, 157, 'scat 2', 1, 1, '2021-07-26 13:16:02', '2021-08-19 13:06:03', ''),
(161, 13, NULL, 'Cat 1', 0, 0, '2021-07-26 13:17:22', '2021-08-13 10:03:37', 'cat-1'),
(162, NULL, 157, 'scat3', 1, 2, '2021-07-26 15:11:35', '2021-08-19 08:14:35', ''),
(177, 12, NULL, 'cat 3 bis', 0, 1, '2021-07-28 09:44:58', '2021-08-02 16:25:17', ''),
(178, NULL, 155, 'fgfdxfds', 1, 0, '2021-08-02 16:06:31', '2021-08-19 13:06:38', ''),
(179, NULL, 155, 'sdfdfds', 1, NULL, '2021-08-02 16:14:57', '2021-08-02 16:53:26', ''),
(180, NULL, 155, 'sdfdfds', 1, NULL, '2021-08-02 16:15:00', '2021-08-02 16:53:19', ''),
(181, NULL, 155, 'fdsfds', 1, 1, '2021-08-02 16:15:08', '2021-08-02 16:15:08', ''),
(183, NULL, 161, 'dsfqfr erze rze', 1, 1, '2021-08-02 16:15:32', '2021-08-19 13:06:38', ''),
(185, 12, NULL, 'une autre catégorie là', 0, 4, '2021-08-02 16:36:54', '2021-08-02 16:36:54', ''),
(190, 13, NULL, 'dfgfg', 0, 1, '2021-08-03 13:18:03', '2021-08-03 13:18:03', ''),
(194, NULL, 157, 'test', 1, 2, '2021-08-09 16:05:38', '2021-08-09 16:05:38', ''),
(195, 16, NULL, 'Réparation écran', 0, 0, '2021-08-13 09:31:02', '2021-08-13 10:28:36', 'reparation-ecran'),
(197, NULL, 195, 'Ecrans Windows', 1, 1, '2021-08-13 10:29:00', '2021-08-19 08:45:50', 'ecrans-windows'),
(203, 16, NULL, 'Réparation claviers', 0, 1, '2021-08-13 10:30:35', '2021-08-13 10:30:35', 'reparation-claviers-2'),
(206, NULL, 203, 'Claviers Windows', 1, 1, '2021-08-13 10:31:43', '2021-08-13 10:37:05', 'claviers-windows'),
(207, 23, NULL, 'Catégorie 1 bis', 0, 9, '2021-08-19 08:24:16', '2021-08-19 08:27:26', 'categorie-1-bis'),
(208, 23, NULL, 'Catégorie 2', 0, 1, '2021-08-19 08:24:32', '2021-08-19 08:25:11', 'categorie-2'),
(209, NULL, 208, 'Sous-cat 1', 1, 0, '2021-08-19 08:24:40', '2021-08-19 08:32:05', 'sous-cat-1'),
(210, NULL, 208, 'Sous-cat 2', 1, 1, '2021-08-19 08:24:45', '2021-08-19 13:06:38', 'sous-cat-2'),
(211, 23, NULL, 'Catégorie 3', 0, 2, '2021-08-19 08:25:00', '2021-08-19 08:25:11', 'categorie-3'),
(212, 24, NULL, 'Plantations', 0, 0, '2021-08-25 08:23:28', '2021-08-25 08:24:35', 'plantations'),
(213, NULL, 212, 'Fleurs', 1, 0, '2021-08-25 08:23:40', '2021-08-25 08:23:40', 'fleurs'),
(214, NULL, 212, 'Légumes', 1, 1, '2021-08-25 08:23:45', '2021-08-25 08:23:45', 'legumes'),
(215, 24, NULL, 'Entretien', 0, 1, '2021-08-25 08:23:54', '2021-08-25 08:24:35', 'entretien'),
(216, NULL, 215, 'Eté', 1, 0, '2021-08-25 08:24:00', '2021-08-25 08:24:00', 'ete'),
(217, NULL, 215, 'Hivers', 1, 1, '2021-08-25 08:24:05', '2021-08-25 08:24:05', 'hivers'),
(218, NULL, 212, 'Arbres', 1, 2, '2021-09-02 14:11:47', '2021-09-02 14:13:00', 'arbres'),
(219, 21, NULL, 'efsrtg', 0, 0, '2021-09-27 10:06:00', '2021-09-27 10:06:00', 'efsrtg');

-- --------------------------------------------------------

--
-- Structure de la table `category_service`
--

CREATE TABLE `category_service` (
  `category_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category_service`
--

INSERT INTO `category_service` (`category_id`, `service_id`) VALUES
(158, 7),
(158, 10),
(158, 13),
(158, 15),
(158, 21),
(158, 23),
(158, 28),
(158, 30),
(158, 31),
(158, 32),
(158, 36),
(158, 37),
(158, 38),
(159, 6),
(159, 7),
(159, 10),
(159, 11),
(159, 14),
(159, 19),
(159, 23),
(159, 24),
(159, 30),
(159, 32),
(159, 34),
(159, 35),
(162, 2),
(162, 3),
(162, 8),
(162, 11),
(162, 12),
(162, 14),
(162, 24),
(162, 38),
(178, 12),
(178, 20),
(178, 32),
(179, 2),
(179, 3),
(179, 18),
(179, 19),
(179, 20),
(180, 4),
(180, 8),
(180, 12),
(180, 18),
(180, 19),
(183, 20),
(183, 32),
(197, 40),
(206, 33),
(210, 32),
(218, 45);

-- --------------------------------------------------------

--
-- Structure de la table `command`
--

CREATE TABLE `command` (
  `id` int(11) NOT NULL,
  `benefit_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `delivery_mode_id` int(11) DEFAULT NULL,
  `status` smallint(6) NOT NULL DEFAULT 0,
  `validation_date` datetime DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)',
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note_livreur` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `date_send` datetime DEFAULT NULL,
  `new_devis` tinyint(1) DEFAULT NULL,
  `reject_raison` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extra_note` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` double DEFAULT NULL,
  `is_command` tinyint(1) DEFAULT NULL,
  `right_to_cancel` tinyint(1) DEFAULT NULL,
  `facture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adjust` tinyint(1) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `paid_devis` tinyint(1) DEFAULT NULL,
  `is_devis_send` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `delivery_mode`
--

CREATE TABLE `delivery_mode` (
  `id` int(11) NOT NULL,
  `benefit_id` int(11) NOT NULL,
  `radius` tinyint(1) DEFAULT NULL,
  `distance` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `required_adress` tinyint(1) DEFAULT NULL,
  `delivery_mode_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `delivery_mode`
--

INSERT INTO `delivery_mode` (`id`, `benefit_id`, `radius`, `distance`, `price`, `required_adress`, `delivery_mode_type_id`) VALUES
(3, 4, 1, 70, 2, NULL, 1),
(4, 4, 1, 50, 58, NULL, 2),
(5, 5, 0, NULL, 72.4, NULL, 1),
(6, 5, 0, NULL, 65, NULL, 2),
(7, 8, 1, 9.7, 40, NULL, 1),
(8, 7, 0, NULL, 30, NULL, 2),
(11, 7, 0, NULL, 40, NULL, 5),
(21, 11, 0, NULL, 20, NULL, 1),
(22, 11, 0, NULL, 12, NULL, 2),
(24, 8, 1, 90, 20, NULL, 4),
(25, 11, 0, NULL, 30, NULL, 5),
(26, 13, 1, 90, 15, NULL, 1),
(28, 13, 0, NULL, 25, NULL, 4),
(30, 14, 0, NULL, 20, NULL, 1),
(31, 15, 1, 90, 30, NULL, 1),
(33, 16, 0, NULL, 50, NULL, 1),
(34, 16, 0, NULL, 40, NULL, 2),
(40, 14, 0, NULL, 0.3, NULL, 2),
(41, 17, 1, 100, 22.34, NULL, 1),
(42, 18, 0, NULL, NULL, NULL, 1),
(43, 18, 0, NULL, NULL, NULL, 3),
(44, 5, 1, 60, 70, NULL, 4),
(45, 5, 0, NULL, 24, NULL, 3),
(46, 5, 0, NULL, 10, NULL, 5),
(47, 19, 0, NULL, NULL, NULL, 3),
(48, 19, 0, NULL, NULL, NULL, 4),
(49, 19, 0, NULL, NULL, NULL, 5),
(50, 20, 0, NULL, NULL, NULL, 3),
(51, 21, 0, NULL, 12, NULL, 1),
(52, 22, 0, NULL, NULL, NULL, 3),
(53, 22, 0, NULL, NULL, NULL, 4),
(54, 23, 0, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `delivery_mode_type`
--

CREATE TABLE `delivery_mode_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `require_delivery_address` tinyint(1) DEFAULT NULL,
  `require_kilometer_radius` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `delivery_mode_type`
--

INSERT INTO `delivery_mode_type` (`id`, `name`, `require_delivery_address`, `require_kilometer_radius`) VALUES
(1, 'A domicile', 1, 1),
(2, 'Chez le réparateur', 0, 0),
(3, 'En visioconférence', 0, 0),
(4, 'Coursier', 1, 1),
(5, 'Point de collecte', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `devis_line`
--

CREATE TABLE `devis_line` (
  `id` int(11) NOT NULL,
  `command_id` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unity_price` double NOT NULL,
  `reduction` double NOT NULL,
  `tva` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `media_object`
--

CREATE TABLE `media_object` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `media_object`
--

INSERT INTO `media_object` (`id`, `file_path`) VALUES
(117, '60fe9696798ed_p_1_0_5_4_1054-reparer-au-luxembourg-camera-arriere-iphone-6.jpeg'),
(118, '60fe96a48397e_images.jpeg'),
(119, '60fe970943b3a_png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'),
(120, '60fe98000f8f6_cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png'),
(121, '61080b14130db_Accueil Organigramme - v2@2x.png'),
(122, '610817dd9b58d_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg'),
(123, '61081bf0760f8_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg'),
(124, '61081d2eb8315_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg'),
(125, '61081dd686af7_xe3hteqzpy.jpeg'),
(126, '6108209ab7d14_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg'),
(127, '610824aae55f6_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg'),
(128, '6109030c808ff_images.jpeg'),
(129, '610943f78d65f_images.jpeg'),
(130, '6111522802f7d_Capture d’écran 2021-08-09 à 16.50.40.png'),
(131, '61115334ec359_1k8dl3td74f.png'),
(132, '61163b2ba39c1_logo-fc.png'),
(134, '61163d4db1818_p_1_0_5_4_1054-reparer-au-luxembourg-camera-arriere-iphone-6.jpeg'),
(135, '61163db47036e_shutterstock_583717939.jpeg'),
(136, '6116428d5f3d7_images.jpeg'),
(138, '611646a79d912_images.jpeg'),
(140, '61164da6aa6bc_images.jpeg'),
(143, '611e11ccc1d80_i0yayfaczb.jpeg'),
(144, '611e139882b29_Capture d’écran 2021-08-13 à 15.12.17.png'),
(145, '611e1398ae513_02psj7lo4y53.png'),
(147, '611e142f6d846_h7l1rkm0cjk.jpeg'),
(148, '611e143e9b62b_images.jpeg'),
(149, '611e151e5ffc1_images.jpeg'),
(150, '611e15df72f28_lz6ijph288p.jpeg'),
(152, '611e1b6889e6b_clavier-windows.jpeg'),
(153, '611e1b6e7dd33_clavier-mac.jpeg'),
(159, '611e51e1a81b6_leroy-merlin.png'),
(160, '611e5287330cf_lr1.jpeg'),
(161, '611e52874961a_lm2.jpeg'),
(162, '611e528761aaf_lm3.jpeg'),
(163, '611e528774e81_lm4.jpeg'),
(170, '6125fdd07d6b2_jardinage.jpeg'),
(171, '6125fde3502df_ua4uigeqyni.jpeg'),
(173, '6126000fc073e_lr1.jpeg'),
(174, '6126000fdd6d0_lm2.jpeg'),
(175, '6126001009d75_lm3.jpeg'),
(176, '6126001023755_lm4.jpeg'),
(183, '612644c329631_lm3.jpeg'),
(186, '612df1d3eab3e_but.png'),
(187, '612df37070a33_darty.png'),
(188, '612df3b0297cf_jardinage.jpeg'),
(189, '6130994c966fd_darty.png'),
(191, '6130d6e61a224_commissions.jpeg'),
(193, '6130d74498f04_IMG_20210102_092213.jpg'),
(194, '6130db246013b_informatique.jpeg'),
(195, '6130dbf55cc8c_pourquoi-planter-des-arbres-a-grande-echelle-pourrait-etre-contre-productif-pour-lenvironnement.jpeg'),
(196, '6130dce6a4310_bricodepot.png'),
(197, '613a2b971a701_leroy-merlin.png'),
(198, '6141d24b753a0_IMG_20210102_092213.jpg'),
(199, '6141d251e864e_images.jpeg'),
(200, '6148b48aa984f_pexels-maxime-francis-2246476.jpg'),
(201, '6148b492e8061_p_1_0_5_4_1054-reparer-au-luxembourg-camera-arriere-iphone-6.jpeg'),
(203, '6148b4a2b2351_IMG_20210102_092213.jpg'),
(204, '6148b4a8350fd_smartphones-1.jpeg'),
(205, '6148b4c0ee7ca_images.jpeg'),
(206, '6148b4c6a6929_smartphones-1.jpeg'),
(208, '6148b8b7ebb03_pexels-maxime-francis-2246476.jpg'),
(209, '6148b8c8a5a9a_pexels-maxime-francis-2246476.jpg'),
(210, '6148b8ceef56c_p_1_0_5_4_1054-reparer-au-luxembourg-camera-arriere-iphone-6.jpeg'),
(211, '615196dfa96ea_IMG_20210102_092213.jpg'),
(212, '61533c067347c_lm2.jpeg'),
(213, '61533ebbc5df3_lm2.jpeg'),
(216, '61533ed5c7ea2_clavier-windows.jpeg'),
(217, '61533eef7e0dd_darty.png'),
(218, '61533ef9db5c9_commissions.jpeg'),
(219, '615738acce600_p_1_0_5_4_1054-reparer-au-luxembourg-camera-arriere-iphone-6.jpeg'),
(220, '615b098d9516f_informatique.jpeg'),
(221, '615b09924342e_jardinage.jpeg'),
(222, '615b0997f286f_clavier-mac.jpeg'),
(223, '615b1ded8726d_Ex pdf.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `thread_id` int(11) NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `seen` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `files` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `new_service`
--

CREATE TABLE `new_service` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `object` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `new_service`
--

INSERT INTO `new_service` (`id`, `user_id`, `object`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 'test', 'test', 0, '2021-08-09 16:15:04', '2021-08-09 16:15:04'),
(2, 3, 'mon souhait de service', 'voici pourquoi je veux ça', 0, '2021-08-19 13:02:53', '2021-08-19 13:02:53'),
(3, 3, 'mon titre ici', 'ma description là\net là aussi\nqu\'en penses-tu ?', 0, '2021-08-25 16:45:25', '2021-08-25 16:45:25');

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` int(11) NOT NULL,
  `command_id` int(11) NOT NULL,
  `object` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `amount` int(11) NOT NULL,
  `charge_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `refresh_token` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `refresh_token`, `username`, `valid`) VALUES
(1, 'f5256ce69ac8cd1b53770306ec034f6a8aa4247ac9c130eeb7eed432ceb0beadc19df973a08e908b602c690de7aedf36a2f004c8d4fa9d4fadfd9ec15f126e6b', 'superadmin@example.com', '2021-08-06 16:55:14'),
(2, '5bff863515db23a4debaa699e5ae08cc4d08be373667ac79447e3c1ac2c19723521a8bb589e7e17a9e54c6fafaaa15c2611ede9f86ef4d7896aa7a6b5e639a20', 'admin@example.com', '2021-08-06 16:57:29'),
(3, 'bbb4070aab9388c9e4cc1dbf6167efdbc84104b84f3f3d736401049b77c4eab147aad703ae1d6e485b1559394ee282da2eab43cf7a3d699030c67de9397798bd', 'repairman@example.com', '2021-08-06 17:01:08'),
(4, '57280d8e990e362903bf765539d0ff20aad655aaadab1445812190f3b02e2143e863b868d02c57bf793bed15d5c5abe9e8bf3e014613d6cbade5e51cd6ab5535', 'repairman@example.com', '2021-08-06 17:01:54'),
(5, '2865f11ea9e37abdcea1cd8254124c7e86f0724e6717b107a875fc906acdd4cf045ea44b7246ae0d85cae2d427d8911605c01aba5f70331f4d2cea1cd23e0d0a', 'repairman@example.com', '2021-08-06 17:09:00'),
(6, '0fa7a7c16836e4daa40bfcf7b66250c435fb8649f8c88d21b87d785643d21f3cb0bdfc49a4a550ec641ca21643a1ca88352a473b4da84aad321c684ec5fbb271', 'repairman@example.com', '2021-08-06 17:09:16'),
(7, '062dc2f423ea8971e13b0a88775e4108d703b51a1c7d7918e1dcc82f4805e063a7276908f0dfbef6501cd32ae9eda16afbb211b77ce922b577a455198fc4ee37', 'repairman@example.com', '2021-08-06 17:09:18'),
(8, '7089ed8611e2871f286ce32f15afbc40cc2a6804d2ac5280dfa4bcf930be81f4cca40345e9e817a3c0d48712cbe93eb9627a6d0aefb2e54ef3ad6e9849c0ce0a', 'admin@example.com', '2021-08-06 17:09:56'),
(9, 'db1e9218e835a365fba5b09cc0a1bbd58ea10a988719d89e12bd5d1844783b9cbd570a5093b5e0069723f5b8bed563d3f50d140d8ec6eb6055235ffc7be18be0', 'admin@example.com', '2021-08-06 17:11:10'),
(10, '4c3d725388d1672f2ad6015e4f9b3fa5c1771735ff29bf31480386a70ea2d669b8ad5a6e3394e7acc76c5b54a1803040587c9b292a0d80c642a31dd84ed1c858', 'admin@example.com', '2021-08-06 17:13:36'),
(11, '55105d953e16863a9e9e515d860e8c51c4ebff17d64649d309be1cae07df481c93c0326f3657db2e1dff9c439e1c66ab7ac90f39403a13bfdc69ff5dc90fd42d', 'admin@example.com', '2021-08-06 17:17:11'),
(12, '35e01e74fe2493dd866801a1424dd95988e8b9a6cb0d47c209fd83b9c5f07d29b800167c726a6f273f3e330161334f28cf0a43264dd239146207ed1ea7415b40', 'admin@example.com', '2021-08-06 17:45:42'),
(13, 'e751625bab17fba09630219764d9ae0f9f2a3bae36e5929aca17a5dbc5a8c0e2526503d0c4bdf1bf22b24ef08a96e0248f8387809b83bc18b58f5c07ef90d774', 'admin@example.com', '2021-08-06 17:46:09'),
(14, '407495006ca6b0c6b580fe2daa909f5132d637143af27b3eab0dd6ed029f5705601cbaf2f45bfc6e0e81cf1da993e20247c7eb4d79dbab273718d1747d679b6f', 'admin@example.com', '2021-08-06 17:46:17'),
(15, 'a99070f306de4aa88e66d4b941ededb6b9b22981a38bde13e2ad37347234e00e70bad2887db180257b20aeb17ea145a1728006fd615f4c630de3d26658c458bb', 'admin@example.com', '2021-08-11 10:46:42'),
(16, '936b46200cd7f6089f732ebce8cdb1d78098f5f0abebca189faecacb46ce6cd4062f9d7c1eab5c0c18927ab5812200450760bf80b00e591a5e0081d3850290f2', 'admin@example.com', '2021-08-11 10:46:54'),
(17, 'a1221e3e814d2b756456278cec973a5f8b48882e165bbcfea2a00ccf2accf6364a5bdd432307ece78425a03b517fa2efd169c32f4f7f05850d93875a93003f5b', 'admin@example.com', '2021-08-13 14:51:51'),
(18, 'e8815f2e3c1f262b268feb86104f0a8ed758fc53a641e043732dee5344042a1d45ff13b157a10451e27b6f3410d4fa3d22e02c6f5ab006e0dd363628dd1d04d6', 'admin@example.com', '2021-08-25 10:38:53'),
(19, '55478a989c380fb15f413fb646a3cfef1e96741e812cc04ef78272e44fe1fcef71284ad875dd35d6b2d2a27d3c8a1e58aa5dbba472e60f71bfee72f6516e1956', 'repairman@example.com', '2021-08-15 11:33:05'),
(20, '983389c10737dc8615061562c2a1baed0c903017b6d16c40063f3184b6ec0cb29134a222fffeb712bf2b13c5b7a37d4699ed41d742cbdb60ac046b528f348520', 'admin@example.com', '2021-08-25 10:40:30'),
(21, 'd159bbe541eae6b979df7d3d9f86ceb80a83cdaeaa2e0a718db6e9b534b70ad4e53406a916e20e6e47cb80a20243be65cc10b0f76b00fa0d468566c96b5b92f9', 'admin@example.com', '2021-08-25 11:38:50'),
(22, 'c0ec5108677778d647959b2ef29856df7827ab63e67c7a02ea17a66726189c7392ef8928bca6868300b4fb751cfeb665f0a095158ce5d25add36f6690c639bb0', 'admin@example.com', '2021-08-25 11:57:39'),
(23, '25e1476768be54bcf573eca4b88ba1a91305ccbef051897adb3ba9a9083d065e4517fbc383137bdd3d1ca6e27eeb76aed72dc63e02ab9acfb45083540e5a769e', 'admin@example.com', '2021-08-25 12:27:39'),
(24, '2c237c352f6fafdde0355a4b1d2e954d11208b6d7bc9c321c526e04a9355364c23fc11fe914b82ef5eec2a7c166e7bb70f9271e584c2e6b634d57ca7910d9f0d', 'admin@example.com', '2021-08-25 12:36:30'),
(25, 'ab347f51cebc27680d7971fc7c30d01db3a7c0689dc7f30a544579e76778d77baec7c4acffefb5b0065c302348edefcaf007d82f6501f2c887d2baaca558be71', 'admin@example.com', '2021-08-25 12:48:56'),
(26, '0129b430e6523131428e4ae83af3466bc06bac69e7d00fd408d2be9f1d1af7ebab5a5dffbdc1c0bf63338cbc279990402d71c38a49232ac6ac5511bcc1aaf2ec', 'admin@example.com', '2021-09-12 08:03:42'),
(27, '3598b4d9a85a9a6a349e01c24e017d537746b954a69116f95fb959b249ace72d6032cfe4a5c9d8a959feb5d06a710b2c9c7cf056621ee7174068f74b632b3cb1', 'admin@example.com', '2021-09-08 15:57:12'),
(28, '4a40268f530fbac729985ce7b2ad3dc063f7c62c1fe3ad64fb1b5b0b65fcca206e04594beb0696c2c13076e5152d0f0e54d2e8dfb29586b2191637dc992cb3d6', 'admin@example.com', '2021-09-01 15:00:56'),
(29, '62f3fc78d7b76ce5a2de115edd3f853866949bed309168bf055c677562aab8742112cf078759257e096bbce2fba7564007e9077fe6bbfb5366959736ebdce046', 'admin@example.com', '2021-09-08 07:53:38'),
(30, '1b4918dec874c728469be0f7101da5755094773bc58782cfd6d0c5488c0d603e2682a08aa87dcd4d2b175026d83be335757ff4b508468b79b41d61151c86e145', 'admin@example.com', '2021-09-01 15:09:58'),
(31, '74fd599aafbc9e279f90c5c89ae0696b1ee552415fa03bcf36a59f0384d95f67ae3b29736f471cd08d7561d95b1e6f0d7d2e5fd048ad57e0865861ca6ed9e9d8', 'admin@example.com', '2021-09-08 11:33:49'),
(32, '73449000ceec3c8e6d8372999c650f85011757ab64cb8da43c4710256fa9fbbe1b92a763230d6b3dd309a6a4b602bd725bb048fe22958004b2a928adfec4c436', 'admin@example.com', '2021-09-08 15:38:59'),
(33, 'a71f4df1a601c801df8ea48ec918d3ec199c6c285f55e443a4292ed16f8a41afa86d8c7ab4fee89aa2a8ecd9f259d82f14b1f14f52b95fee72b8a4d6de2b0428', 'repairman@example.com', '2021-09-08 15:39:58'),
(34, '542a5179268bcc6132fca6dfcd15c94afa8372f79da0b11d7d4de4ba22ad597a6b94ca9ca95d8e458b4c317d1b5c0a5a43a07fdbc76c733e8f0b4f504c7248fa', 'admin@example.com', '2021-09-08 16:00:36'),
(35, '920136253e2dc5d9243872b6678a8dfa762d116acb3c2761b124d474edd9a54a7f393b4854cfe9ab2c64d0b5a99072c67de93b63b335d9c4dc7b5eb7e58eea3f', 'repairman@example.com', '2021-09-08 16:14:22'),
(36, '85edc154fb0c13362db862f9cc9d643c7237f8742d3c3b1296b9fdeddab115eb725f244474dce699620c3c87949b16a7fff2cda1e0782f300aa917cc96f8da6f', 'admin@example.com', '2021-09-08 16:15:17'),
(37, '4c6af6498f98ee3f1d46fb3d19cb7780ab66e3b21555d2646540199df0e7dac4884f8dc58e1f4a9d6a276a136e9cd8844937850c6e074957b25546406acbc050', 'repairman@example.com', '2021-09-08 16:16:18'),
(38, '372d2074e3857f94379b0b56c419671e772aff044ff2ccfa3ec940ead20f6df4a39747cfed6f3a25b6fe3407f4877c850d4fc56f1c52d7f83833be6c3e39703f', 'repairman@example.com', '2021-09-08 16:22:58'),
(39, '1a1812e03e2a37eb39b51f6cb87bdb33b220bbfc72ba52268657f5fdc52623a20d86b86479930787a2ffea7a408bc7d951ab5c165ecb70fa90e96b31278f4fdb', 'admin@example.com', '2021-09-09 12:54:37'),
(40, '26b2d7a09a8312e08972e24b2ba6e4663d638eb13cd0c9bf231d3efcf7285219a78b2c54bea7fe8cc2d2b058962a06f37fb65269a99f1116753e403757b03943', 'repairman@example.com', '2021-09-18 03:51:55'),
(41, 'ca2eee621c4ec23512fab69dc03212ce6612800952883dffdae4fed014bcea13d4d03f6d7d98723224987f2af5a2490033340d5be19f4e5abca48fcf2712b0ab', 'repairman@example.com', '2021-09-12 09:18:15'),
(42, '4f3794f0b732ce68a0af8648f75f651d2ee91f664f6d5e547d9b4a9f82efc796b927cd3d25051b23f29b1499f56fed7857b39992a97ab661632bb82db169827e', 'admin@example.com', '2021-09-12 09:19:50'),
(43, 'a44c83826d0ef055127a75710ecdb2819a492fa0c4feadd4ed9e8314e0e87cb49ca96b523fe1cb6d84a204912173e1b291448724f455f954ea1fee47f676708d', 'admin@example.com', '2021-09-12 09:23:41'),
(44, 'ece57c2b4103aed3cc00efe6bd71abd3d42f47eec85cbdecccdd8d69a594d65593192d758c4a885cd8c6626cc5071dc334ffc118b1e96b4cca320c874d92dfee', 'admin@example.com', '2021-09-12 09:27:22'),
(45, '5101e2e2ec1a5b2da94011ee644a4c330c9091443c892dd0cf9615e9a97b71ba989f7dff1f4456d78239bad7209263eb6cff912ab68b87ce247ca15dc12600b4', 'admin@example.com', '2021-09-19 08:35:18'),
(46, 'b247e499c954d27603718179ec28164877b589dd19648326548150cfaa80c41533bcc2b3f6314d6c6f6a685fe92ce1afecbe6bc358bdb6553fb5d3f32fed6668', 'admin@example.com', '2021-09-12 09:49:17'),
(47, 'e70eecbb7702ffc685877298af6bad85495c2b633a1a7c9cac2d627e7744238bfdbc0f03001808f339321e1415b6303cc184e8bbacdfb5d078911a8e3d70cdc2', 'repairman@example.com', '2021-09-12 10:34:29'),
(48, '6186cf455fedfce1cb84db3e8de5123f8acd624e37af316e9ab88a8900c5d1f1922af2dfa4a193b7b52e4a6e8a4e776badacd67da75c1d5e1e0aa6c325b05e8e', 'admin@example.com', '2021-09-12 10:36:35'),
(49, '6fdbd545ba4f4ad6b1262e212f45ada65ef6df4dd684a374238d4e48b25aff22b77bc46967e1a0d34611fb89bc1f8e9d654ada8e9000de2f27bafd48396edb74', 'repairman@example.com', '2021-09-12 10:37:22'),
(50, '4faa18dc4b3a34e10d9416b39c6de76a21c60b9cc46f00fd2e664fac0a6f3a389062aae04051903ed61883423fb34bffd00eea0cdd9408f4968cda7853307608', 'admin@example.com', '2021-09-18 08:07:23'),
(51, '3f60813c3e723ef561cdfb54c99da024cf54e6d1c0a5326236a5cd8739af1f876207861d6feeca92085148e7d7cc9ef0a00eadb78c175d0ff7175108e65da621', 'admin@example.com', '2021-09-18 11:17:10'),
(52, '7549d5e47da1253c0b8dea2c1b916eb45a26d15fcd8cd0dd1d6a57afebe8a2053983944157e59bce99a871cf0103446fed6fba756512f2649b8876e23004507a', 'repairman@example.com', '2021-09-16 10:41:06'),
(53, '670b8d415b9a633c7cb1d0b5cd641d9f5314c37a7953518061c43b21e8dc8ec221f5c3ae772856f44baf23f179637c85b1f7287cafbab0cd89c5f3a8f312d0f1', 'repairman@example.com', '2021-09-18 04:57:28'),
(54, 'ec9427b534de37053c5da1058fa1fdfdb2ca8ed068c59901fa74dbdeb7e2233b120e08aa479fd01615c19ce3e453c012b25f8ebe54f23650305826670c6c5205', 'admin@example.com', '2021-09-18 08:08:04'),
(55, 'd87a1f02b4e47d687f59c1b39c85cfb2bfa48ec8adf379eed5300b504ab5b47b9615cb48264dadf7fc3f3f3e45fb4aee6a36572a05dc0953584a39884c3d7bd3', 'admin@example.com', '2021-10-09 15:50:37'),
(56, '258916969cd74108965e3d7d8444669b905f65767c1f7235640be248679c3b61d511ee469791ae5cdaa99983cc883cdeec85ad27d82182aa4756c6fe356b6872', 'repairman@example.com', '2021-09-18 08:55:54'),
(57, '30198405a14da839f60d3c0a271d53f951abb1195d0a8177bd6292c8347e26d12b37ac0547f72f42a19a105dd70a6303d0c288f3d86eb8feee6d0fbb0ddfc07c', 'repairman@example.com', '2021-09-18 10:17:53'),
(58, '0a4d38be3108f4274049705838b8d40c95f4e6d45b15d4186c82004ead01def60296e5939936583ec18f607eda5507550b663b603c44d0a095ca7fbe25f5bfe7', 'repairman@example.com', '2021-09-18 12:39:30'),
(59, 'd70d046dbccbeda5a42f35ad844b22dc9ae50b30d31149d4aa6d4c4c75346da4fc06feac700a755b435684256706293574d57132ec072bc611234c52800b3e74', 'repairman2@example.com', '2021-09-18 13:49:12'),
(60, '38e674fb82195abf293cec002469a8b2e2f2edfdf7e59076adc175f4012d4e3265acab249d046d18b3517a980408ea6ccbee70d11f7e3f7835c3926aad0aee1f', 'repairman@example.com', '2021-09-18 14:07:37'),
(61, '6e2bcce4b3aaec81632e3f10369746a10183d341b924bd8cbc80b304ad95adc4f20063cff6db1909f466aed1e224bde565951ec469c8c6001b1378e27b027d02', 'repairman@example.com', '2021-09-22 07:32:20'),
(62, '62b897ae10b6ace78e586748d7243c58c9452f388bbcc0cb137f5a3f2343598ec83ee9d81fd92ff1cd6626849576db784ad0e7e63b69a094fba7dcc16a4376b7', 'admin@example.com', '2021-09-18 14:11:02'),
(63, 'f16b186b6d201655f61948dc3cee0b0c32b2226ce159df51352ff45aad2ab7017c6a677878d261f204328a7b870ae52e97ee26087e7934f65be7a2fb5c6803a0', 'admin@example.com', '2021-09-22 10:25:25'),
(64, '4bb7974be4ef679b1506407ae6d3ddb31f040539e9117f206e8b57d0e62b21d938385180a693b0b41acbedc1a728ae3e265a7642bd0872a6f3c4d2e75513d6ad', 'repairman@example.com', '2021-09-19 08:35:54'),
(65, 'f2e153b7883f0b51640cb6a9ea0a725c9df301c1a4f56f750017f3c049ccd217c6c301ad739369b6e8c2e99cc745e41539634a5272dc21c77dae54eb3524997b', 'client@example.com', '2021-09-19 08:36:43'),
(66, 'e3152bf036400299a35cbd11c2b4218764f9d669271d1a68bbb4eb15ff3a1f34f18a056fcc862f13393333f42bf8bc3f77c490914f3ef36930849a3d31bb824f', 'client@example.com', '2021-09-19 09:36:07'),
(67, '51b61a6f4aaa2127e9bed55cde624b1f03b07bba51b3542a5ef2e0927a6656b3cfce698a24730b7d4f0e0bb3c9ca3487d0c972ef7eca166d2e91f4a946c9ffbd', 'client@example.com', '2021-09-19 09:38:08'),
(68, '7bf778380f5e2773995c72c90ed7c4540d54c2b13c812c46046d1480fa2aa809baf7c3a17688aa8f0c46b7e5a38f5b120d3d1256578756aa547badf7a2a6fcc5', 'client@example.com', '2021-09-19 09:38:15'),
(69, 'e415ddad03f98c93a972c030578cb05f253dc1033fd762add90238049d9e9459e872ebd2bd13d51796b4cc885c93228ade9b667328bd872bfd75129afe2bd340', 'repairman@example.com', '2021-09-23 11:07:24'),
(70, 'cf677604f983654f5dad9d1ab7bf0ba6ec5fdaa4091927aa9a78981e5a9cd49f2cc57365298606818a47782d33b764574ab67ec5a9039018d19755be7e50cd18', 'admin@example.com', '2021-09-19 15:23:13'),
(71, 'a0f516366388401c5d7dea7d8493e94259a8053147dde97604d21cf054fc8478b5a0992b93f53378b61a2b74c07c476caddb680fd771e6f29d6af576cd50a2e6', 'repairman@example.com', '2021-09-19 16:50:24'),
(72, '4e3c9000795c6cd1ac2f09a64c9b044fc6ad54aabed5c877cc9508d960e3ec5a831066540a7a9e13f8bc2baa2ff57d4779e4ac42b3db2776bda205cc4977f587', 'repairman@example.com', '2021-09-19 16:51:39'),
(73, '2cf625ae42d77db4dadba6b293e87234e4c8eccc091af2366a7c7ef2889542eff6795f9e9d6ccba0dc85c686097aaf7900ab387c3d9fc10667d9bff84a5e1240', 'admin@example.com', '2021-09-23 15:31:37'),
(74, '70dc6993117b79f6454058394d153728baa4d5d0263456d6a8c12c085fb1e4635cda7b82bb0c0b6d5cdc8a629657edb24c9dc2dac590bc9e1ec164cba89e7f17', 'repairman@example.com', '2021-09-22 07:32:52'),
(75, 'adbfcdb97f698f14474a180c5a485078e40f109ce84fe173a13ff3ae5a2f4874a385b5c6829f8c66e01a343ce2be32a6166dfcb9b7dfd9bb2737641dbd6c3c99', 'admin@example.com', '2021-09-22 14:59:39'),
(76, 'ef84514ccdbe1ee09f8e59ac32b12b0954c2293c7cf734276e3d2299e301884f51e571eabe4989179e648ef262ffd5f2018138c1703ec5eee6c0691ee20a42c8', 'admin@example.com', '2021-09-23 11:07:36'),
(77, '5ef572f6bc219818e9f69145ed0bdd26160bd397d9b9e6b63b4b42d32ddbd1e230f70928888a3b3b625d379cc26084971bed752e7ab4adeb389f51042f31edfe', 'admin@example.com', '2021-09-23 15:31:56'),
(78, 'b183b71c01da3e561ae9ce238f0804bb9d7b5ceafe237991ab5e9bfc9fabf81b2fe3d336529035954cd2adf17aa5de790deb6d6088c8702319c96314fd816239', 'admin@example.com', '2021-09-24 07:57:35'),
(79, '2f50bbcd2974b8359e5520ae0218d091edc0c72d71590a333a377547f1627d477dc632dbb44def231f1211215c016d4496dd3997c727961048b6deffe42056f0', 'repairman3@example.com', '2021-09-24 09:13:35'),
(80, '079e3ef5b90b52a8e5f04f7216101e86d977f45efa16415ac0112b98629818f557ce811d7ae4326e3c04a9d723da6d52d8327f0ba0f6f24f002bff8bfd4b83af', 'repairman4@example.com', '2021-09-24 09:14:07'),
(81, '42d335ea5165b05fb8690f447554881d308054f5c97d79fd6fdc87aab720a31c78321be1b8a39e7757c088725267474ea45babf862a0787a43ed2c85e85ba54f', 'repairman3@example.com', '2021-09-24 09:24:12'),
(82, 'b576c2de950958ef18d032df563f4258aa1c321098af6f03a72a35196a93f5dd62c4fbfb90dfe311bf8ed303c893dd4a0695200a15c53016dbcae3ac4d2fe73a', 'repairman@example.com', '2021-09-24 09:30:39'),
(83, 'a9a46a17ec9d29b04ce3a385e4dec3da8e7548f397062b61b9c3e37522b351e04dfcadb7b43f14338d1395b1bc9a7558e6d81ed2fb28dd3a5769b5c1eeccc80c', 'repairman@example.com', '2021-09-24 09:54:22'),
(84, '499358afc9234715739354298fbb42962597a6adbe453f7506a91b490643473c9750e3f16a543818ccc508ae0357f8fe20b93bd5b4086257199471f1a80fe098', 'client@example.com', '2021-09-24 09:54:42'),
(85, '09dfa8577254dfce928fd4f983bd06341624a9dd7a012d71b0dde5060d01558701f99b21d13e2e81358cd7243f4ff29e9d4de8ca80876074cd6a3cff02e74bf7', 'client@example.com', '2021-09-24 09:56:36'),
(86, '9b192677f52386fadb632327f2f8451023b10b099542874fe0cf2e2a6ab6bb31b659ce2b2a401faf240610925ff1002ac779f7e7b941a148b52c37bd3ea05761', 'client@example.com', '2021-09-24 09:56:48'),
(87, 'b777095ac85596498131ef0329ad4e03f0aee8d36978a43159d3147b4da497137ad387ffaddae22afb0bded06376a154c8ce69b7a0d7d2c61f16fa3905550103', 'client@example.com', '2021-09-24 10:05:48'),
(88, '7a7fdc1c79d051517f5d9887e84ba21204fb22031470a0ade3683dd6ab3deccfc95efa5adc650ddd4911f9c5149dcb9864c4cea1e94a8bac513c5264843f1e73', 'admin@example.com', '2021-09-24 10:06:27'),
(89, 'a5101e7619fae91b74f5aa0242e9feefbdd7e5e12ec7f539c82cc0340d48774adfaa6c2d5c647a6959c142385483e355a9920b71c394cda4a411e8d0064995ec', 'admin@example.com', '2021-09-24 10:10:24'),
(90, 'f2001a25e6f11c95cc2a38d9267dc74f8557933feef1b6172355658e1ab2211d9630bcc0ca2918432711e68c645e323291fc5aecc0da7094f738bfb664da537f', 'client@example.com', '2021-09-24 10:12:23'),
(91, '0c4039ba2cac399cc60f340caa3afc07f1e8bbb6bd118d8605f8271be70149a4b57e406c2f3c7e2a84ddfd0c93a14d540012e11538e6d74e3f9a290cfe614ba1', 'client@example.com', '2021-09-24 10:15:43'),
(92, '5877030a5952d2511a8b763ca69f8360891ef80f12d637b0b47416c03d4cb37157f52c2f68e4cb64792a75d4c9bf35e7d4546bac0b827bb5ce966288c87a4652', 'admin@example.com', '2021-09-24 13:13:40'),
(93, 'c44771823c3996283016a7c7b8a74c1127a32c7c4b688eb96b110418b519fa569606fa95a43d8225599b98078eda07ea0fc6e90bbaa6cab5d638aebcf0288bcc', 'repairman@example.com', '2021-09-24 13:24:06'),
(94, 'de67b9274334630903829f77ce5b41fc520908da46089bee776b09a7ef7e3d6493ff676d931564c1dd0e8687ad6df5cc766d2494b824bfd5504f0995ffeef0ec', 'repairman@example.com', '2021-09-24 13:24:20'),
(95, 'b0dd1072b4347851e8c5ecafaf91b42a78c00433eff8932f9b25548896ee937deb725f93cb81e6d4805fb2d9ef4e1a1e45c1d5b905e6fe73fd7d25754179854f', 'repairman4@example.com', '2021-09-24 13:32:45'),
(96, 'efaf1c661b6b7da37bc5cab52cb3a3589c9d834873b21a98447d17a88cbf19150272c624969b8bf4606382707b1acf8b7c9c47c1ec4a5ec94881d025712fe905', 'client@example.com', '2021-09-24 13:33:19'),
(97, '9975ce369c7b97f9cca206381eb399be7dddcd7f3462235c502c2474ed92cb074f6ffe260d62af788d2de40c808a88f8d13f6030a82d9ac03549659bc0098718', 'client@example.com', '2021-09-24 13:51:21'),
(98, '4c37ee3adb7cf4da963f68d5a5bbf9275014454bb0f42069c8ff53023e84cf6dfbe2b221db4825ec8c8e831140538be8e1aa03030a8a299d429541567ad5133a', 'client@example.com', '2021-09-24 13:52:01'),
(99, 'a7862222cc04d3112fcc11680df1573dda3ff953306aa94b2ded5d601d17702e55f5bed808e6002e35f536d9f05cf98f356dee93d3bc359ff5ddfa7ff8c9573b', 'client@example.com', '2021-09-24 13:54:36'),
(100, 'dfb45d78e822abc626a193147c5bb8d0480c0725f0ee6a9e98699659f738b990c6b3f38c1bf8cc3de227bf76d4e03c1c951c25ce73b69d503b3a1b85d3fae306', 'client@example.com', '2021-09-24 13:56:35'),
(101, 'b54cf8070cfbf149284806850418f8ed2f317afa64a782825f0c032b2245d35e379d53b0ab58f4fd72d828a29db003ec44351dfa317bb710a85c270d05a207f4', 'repairman@example.com', '2021-09-24 14:48:13'),
(102, '9d0881b174544a11224c5815a12ff4df1eb75b9129ce91cde707e708199391c25bed1794c0554ad66d2e6b9613c343c53a0b313d1b6004e1427897aa092f316f', 'repairman@example.com', '2021-09-30 11:12:50'),
(103, '5b8da0981eeba9bd6b93236280b4707426dc9082a1fb0df38309216cf84cbf72591a030168894dfbc69711f41da6a908ed5c9a37c95f2d74de5ff8b002c9c472', 'client@example.com', '2021-09-24 15:07:32'),
(104, 'f6c08f9d837d0921c7fffcb2ae0a92ef01f95744124ace20e6903d25b40c7b04cad08c73a662a46d2d25707b9bfd758e9c4d5c499d06dcce94bdb0306fe90c16', 'admin@example.com', '2021-09-24 15:51:13'),
(105, '5d390b5fcc7f4a9ca6a39be11a77581c781c32d069f4e64ebf80c357d44981ce4c41b74bde95079ed06e7fc98d1defff77ada3868e75a0fb0fd4e3cc0e4275a0', 'admin@example.com', '2021-09-24 15:52:03'),
(106, 'ee7e1e9c32016bbf4d467ae547004b34430393fff5e30a93d152bf7db88a925dc92c77ce7f9dcdda08deb859e44e5e3844664654340cfc7cd990fcc97df47b2f', 'repairman@example.com', '2021-09-24 16:17:20'),
(107, 'e9b4cafbe01946cc0eadd38eb3884325a03bcacdca4a32c33a9f022e9d1d868bc2bf7004f9fda51e86fc23aa5e999b16bba09516ff447819334a5d0cd8828da1', 'admin@example.com', '2021-09-24 16:21:09'),
(108, 'ba1334fcc148abcb51403a760a6b5962dca285eaedba7725f2d914b9cf9203fb9c348bf5f9992abb46240e46da71942fc85c865192b1084b9d936da81dd99efe', 'client2@example.com', '2021-09-24 16:21:52'),
(109, '02223cd44014a8916ff5fd7b2dd73388cb5eb5e127df1b7ccc6b4d1949c674d64e76167c846b4a1b52615a655744cf8c02aab111019fb77d35c4a2958a3cc33e', 'client2@example.com', '2021-09-24 16:22:10'),
(110, 'a8013b365078fc7f8cc72fb8c435b278026ca971af198548d07336761dd9c073f97b4dbb1fb956b5787acc962b6e74f6a8306c3050b67465428dec48f4b9945f', 'client2@example.com', '2021-09-24 16:23:41'),
(111, 'a3dc1f5aff20b798de82a993b45c5cb85466d7ddb8b3616a90d33dfb7d314a27a85bc0b0402225c6435d126eea2cfe37580432fc20f46f35d685c900ab49fa1c', 'client@example.com', '2021-09-24 16:24:23'),
(112, 'dc7f9255cadc3501dcab04209d47ddef99c05c1a40fc192339e1de61095d6d071d3a39e95a875cb6c436715aef854180fcc3ddf9657a4160e962fefc226aafe5', 'client2@example.com', '2021-09-24 16:34:38'),
(113, '92dae25ac716c68c1fff4360ec5fa30db0370073f9c81bbdf1f6f23961dd23e98d68c7f51208f0bffdd08e94d9fb5f85bf8960a1465f71512d622ba97c747d7c', 'client@example.com', '2021-09-24 16:35:30'),
(114, 'c1a8d071fb457e08502d6711fa40ca40dce3ad35be87e071f3b8790613fe482e8d8448d25aa6e98eace1f785dad98221b517de89a29767880181f3fbaebb63dc', 'repairman@example.com', '2021-09-24 16:45:02'),
(115, '92739f5ab0897895ebd5e5c318ddf3ba38338a0be744da412a6327eff589d98d13fd1ff44ce511cce59123bc8fc6890356b10d1b9134e08326e5ddc4013bc617', 'repairman@example.com', '2021-09-24 16:47:38'),
(116, '0f3756721f403a707c8a830f6299bc21ca6832208ef454d5284a2ac4c7eaecc8ba19988d96fec8662835434deebc6504233255e1dce5647d6573105dd883d6c4', 'admin@example.com', '2021-09-24 16:55:27'),
(117, 'bd922180ace0c2c0933867f0286b82aae5c04fccbf23ef93ec318c6266c882425c0156671c8b426e1f9a0b4d8093717ec93eccdce0f173420e13aa4d636a80a9', 'client@example.com', '2021-09-24 17:23:24'),
(118, 'e688b51640fb5acb1a538bd9b1ca15b5f09ff98b9dcc4b10b6c3028515d735c043ef2f08c7b952cb32dbbfd5171bba72e0b91e0f7cab25bf1faf40b6e212ee37', 'repairman@example.com', '2021-09-25 10:12:34'),
(119, '0ddbcfa09300797eaf7da0d65e8069e941c7c9fac05881f79e58453637de495fc7a8c569f63ba760ad0343b5568451c564f948722d5504d665e9fc9bb8da6bad', 'admin@example.com', '2021-09-25 14:21:42'),
(120, '028c118340c9514761dd5a4b1cfd8d1ec24dea08243969c3874166deb7a60b51ec8f02f1e02df90336638607ce67306e64e2e0979119a5334e1ed18dc1f9bd4b', 'audrey.dieulle@feelandclic.com', '2021-09-25 14:37:26'),
(121, '040f9657e09506cd0e6080c53d00ff67b879fd78e103f198429308759b2fffdd7c0343499b8d0e662e0149096214d7fe57e9fd140cc8e583a93beba6773a8628', 'client@example.com', '2021-09-25 14:41:01'),
(122, 'eb7f7d5db057bd97ff0fe2de65ef89cd90a8ca067eebbf7806878de6e09861cf8514f34e848ada0f9cdfc6a162f370927697e57916f19051be874b28a458008b', 'client@example.com', '2021-09-25 14:43:04'),
(123, 'f4a64ad58688d51ca33aeb036ec8330b335aeea62b3bfe1093de58c5812fa95ca0221e19a22dcbe5cb0155106279962b66c5a5824620968270b03b5f17aa291d', 'admin@example.com', '2021-09-25 14:43:32'),
(124, 'c4a6061a7fb9611d1e5f0c2dbc0e629ce4f1169ae9b41fae665138a8ad38d340e7593fdfd0e15f4329ecd3b681c70878468676ef838be850b343fd48b8eb5f10', 'repairman@example.com', '2021-09-25 14:50:26'),
(125, 'f21d6877d57ab2b91254abbae913d13aa4b8ea7f380ed5e349b2ba0de0c8fcd746edbf8f42a2f2703440898e9191295f3c65169497152b816da8afb7ba1aaa26', 'repairman@example.com', '2021-09-25 14:51:10'),
(126, '940b286e36f439f65eb6765f7424ce8cd337764e786cb6c55c55f1ba56b503f386566080295022c858d3b6a4eb2a0be18605faf65d4cfc182e386703482cb769', 'audrey.dieulleC@feelandclic.com', '2021-09-26 09:30:15'),
(127, 'c4127347c3aac1ec1696d905dab32831bb3e628d7fb35feebb6cda507e42c74c6c6028e391fbe6f39ae3567b012c3dac9dad35e201d52e0d6611c48be2309374', 'jean.dupont@feelandclic.com', '2021-09-26 09:37:30'),
(128, 'd135ec3777bd5b1b46d1d6bbd779ef00f08fcaaabc69352ff90b55c426b744061954fa1bb089479d00fd1897589fc8344acdd842d0de4079aba99ead310a405e', 'admin@example.com', '2021-09-26 09:42:23'),
(129, '00ccc06e7dcbd39fe1e4e16a637f7cae04c68980fd066ecd48b0fd804fe76eb83bce6bd19525334c9984e7e82e5306066cd1ed0d971de6d0927a6ea2c34f138d', 'audrey.dieulleC@feelandclic.com', '2021-09-26 09:43:28'),
(130, '3e2f1f20c3f55a50809eacefc763fc6a4a856aee4988a6a2642799c277ebe71ecc418d0d05d4177d5b551eaf82d4b9a8e4ececf3a6a7c15dad85156ed24c1251', 'admin@example.com', '2021-09-26 09:45:35'),
(131, 'edfa6fb8418af72a7b219b17bad89b97b7db4c2f3922f2e80b1f12f7d9e5b623a43ba447f7e93d448849e92bea22f93c462204d5a1c12bb450e5c6402a53fb64', 'admin@example.com', '2021-09-26 12:39:41'),
(132, 'aa6cc7ef789c10808ae53dc76811d70217232f724c6ebb354004dde1003498dda885593aa3efb4cfdacb1e8cbdcde53db1310e20dcf5696e1271d2be5217e6fc', 'admin@example.com', '2021-09-26 12:41:39'),
(133, 'fff5d659142543db6f3fe227e8c2b05251215848c1cfe6becb6c3c99bb0b10044c1f3986dd68336005d1c301a55c52d74993dc73f589c05da458c63d710c7a49', 'audrey.dieulleR@feelandclic.com', '2021-09-26 12:48:23'),
(134, 'fc94e84e541a46d7de7b341e0e7fa9ad0c4d83c38507ea92af600b5e2b72effb2ff65256399f5337d17b19afb2dadb81e0daa3d1a01c30f99b8c13adef6c072e', 'admin@example.com', '2021-09-26 12:53:37'),
(135, '8443f9963ea518f88b40fed0aec2a597504513183615bc6dc75f176c28ab52aa0677cb100167489ab9e8b6f61b836042a27a1a522fa4e10be02eb8c13614c102', 'audrey.dieulleR2@feelandclic.com', '2021-09-26 12:53:59'),
(136, '566346f74e77945d2daebc58bfd69f2aae5ac043263f541b859964828ac9cd7c85d7841347ebcd47d0bb95661cd1015b44bcd8ae21dc57b874102ae661c999ae', 'admin@example.com', '2021-09-26 12:59:03'),
(137, '9ba4a87da2e97f95f4b6a079f40133d0e4cae3785fbd4c85bfaac6e70ea6eea2f7083fd85b7b4ef4aa4c8e146b343bec8cd57461ff138ac69a0d605c30015dd6', 'audrey.dieulle@feelandclic.com', '2021-09-26 13:19:57'),
(138, '320f5b1af926152d67d04ec91394c2e01fdef895eec8b29761c64f4c9ac377e89924da2e71df5888cf4f92ad18e746f5a964b167b3ed88f439573cf399d22daa', 'client@example.com', '2021-09-26 13:20:05'),
(139, '72ef2e32bd8b0c3377408adeb64479080e4030894f38595f362ff50173766ccaca82efa1bb5e4ef246e517323b59dd86c344311c209613e260b9def2303964fe', 'audrey.dieulleR@feelandclic.com', '2021-09-26 13:35:35'),
(140, '5fd86e70a3e8a0c67c8a19cef808d5ade969f07e982fe818cb9ea56331cd6beb339db6696acdbf821583804d11bbade6dd558830168a8fc164577cfd1cdf5c0d', 'repairman@example.com', '2021-09-26 13:35:46'),
(141, 'c27e917db23d77c722206651222d1dc48dd547e03fd07a331b5f5f61695121c0e7246f84ae21f87c6c4cad1c6f19a05780178bc868af2a867be451dd9f104198', 'client@example.com', '2021-09-26 13:37:29'),
(142, '5932426d543a3b9524708787500069a0bdbdbf51941454d124b2d863b71f70bb0c5cc86ac7a5a2025944492ffcad251bf7e0c820491379024d11c926c54f9cd6', 'audrey.dieulleR@feelandclic.com', '2021-09-26 13:39:17'),
(143, 'e70cfb28f04d1d855fdc35048bc1261f10a453c5e5c7f96cc7e1345c1c7e3c2947c2b4b1d4bc8aef642f368a91fd2e958ef7f8cbb32de9a98cf576d913db27ff', 'audrey.dieulleR2@feelandclic.com', '2021-09-26 13:39:29'),
(144, 'e5edc10afe6fe7378fde50db1d50e3d98d24bff756b9b240ce6ddbe3f7ae1d2a49319f6f88efbb4b190c6912adea8446afc3a1e37468b3eae99752d63a3ebf05', 'client@example.com', '2021-09-26 13:40:46'),
(145, '12ded6eb6064c3d0c92e0db6123a23fc0fb9fbc0f8182f94ff2017a05490fcc94805d961bcf1b9e46a6e1c0764d4b6d4bcf32c318f94bb56e4e90ba36f572a59', 'repairman@example.com', '2021-09-26 13:41:25'),
(146, '03ea9af54d29fb8e3bfc9adca3107cbaf40f93af6b391992c1d88e7dd578bb21f1050ece959656ab33a922b62bcd623b59ab82374cb30ce082ea632301685487', 'audrey.dieulleR2@feelandclic.com', '2021-09-26 14:22:58'),
(147, '403a3504509f307b90d137c1f9c2dea830af23c22987f1f2c18d2a4aa863770b32aa9a2aafe5ed9c35c362af1106ca7475d195ff43a874294197735f5d0b499c', 'admin@example.com', '2021-09-29 09:04:19'),
(148, 'd56f534e7710f6ac759dd11eea890f8d0eba783633b4a6b5491e0b6f8c50fae1244153d43468d9ff185b53afc76d59adc30406490aa2ca601d62c7ea0c665e99', 'admin@example.com', '2021-09-30 09:07:57'),
(149, '53d13a31781183fbafb01abd2cce18ef72a0d5a31469b9acc035e6f71a02f86e1651470e142354a346552a87596bd1268109eaa57daf81e37938f7eeddf3d4f7', 'audrey.dieulleR3@feelandclic.com', '2021-09-30 09:09:57'),
(150, '73c8cd2a834eae8a4616f140f2a115461358750bdaea088741db0f320a811dd2495f6cbfdd1dc4aac10e251b02a27e2b4ad56c88652b074f995e89811336ffa5', 'audrey.dieulleR4@feelandclic.com', '2021-09-30 09:17:09'),
(151, '52027846b23e9d49022e048d3aeeed6816cd80fc1e8d0a432cd50e13d29ee540f1c716087b1ae1cb1fa0a4becbe1329ce1b96f1d50e469e74e73c2eb1ef4f255', 'admin@example.com', '2021-09-30 09:25:57'),
(152, '9761e9721df489200ce8096972025adb3ca092e07f74067564bc8c95372d6d49d21a7fa1751e416b8e19cfc9fa104cb942b8c12328229d542a65133a88143c9b', 'admin@example.com', '2021-09-30 09:58:42'),
(153, 'a386410224cfa554b9dd102bb5fa14c1ac0d78739fc1d86d18888fc25b311dbed5c5b0f184ee9dd4056a4f22cea47672b409b54b7eb6afdc76cf9e6b0e98c78e', 'audrey.dieulleR3@feelandclic.com', '2021-09-30 09:59:30'),
(154, '7ef56a462a63c0a04c6ccdf71c4a3dbd5f17080bcf66bce52160256849bc4759f911104c5f2620ed679df7683c680423b30b34cdcbdff697d9083c3666397646', 'audrey.dieulleR4@feelandclic.com', '2021-09-30 10:01:28'),
(155, 'e3f0eae35090697e482caac363481625564a19092089dc524d36bedd04e5b7918fa4c3cec5e69e6c9f70c5e5fecd2ffd79840cde3b1874959d860edbfe0f103a', 'repairman@example.com', '2021-09-30 10:09:27'),
(156, 'cbf83746cbd150cf6f58c2a2437d7249a6c71674c98a011460670ffff2bdc2bce073d2c91f65f6700d6e5d38b9b431616b898d5d4113dea8041884f3fabab105', 'admin@example.com', '2021-09-30 10:22:29'),
(157, '7e6604c108c56690def22af4601d94838c9990abdd95368b1d58a68203f291dcc02fdad0669ff56a58638cfc7e4502a826a853abd46458c240140a60d364a98b', 'client@example.com', '2021-09-30 10:28:55'),
(158, '67bf6ef8cdc6fc26c6d880b142e1ec631aadb87dbf993bfefbb9c10301b46374a70202ceff7337a6f3abe4802f5fd3e42ea0f1eef99a916dd4d7a7517b929c3f', 'admin@example.com', '2021-09-30 11:13:24'),
(159, 'e7edee718d288cacabfa981e0a7ad3e3ad12f8ff67515babdc1914d03c6ff7e47a077f2166474af65bea8f0b17dc94b3b2b084a0ef29f4e87e01c27a755284a6', 'audrey.dieulleR3@feelandclic.com', '2021-10-02 09:39:44'),
(160, 'a0553e93acdcbb983e6eff3434045540383e956c520a952bd9f77259a1b4dc3e9e58b0f1bf0e39d40a0d566b4e945ea74eba09df48282357cc6789f530b847e2', 'admin@example.com', '2021-10-02 09:42:37'),
(161, 'a72047fa8a8f7fdc520085b83d1b0aa54033f606b965cf25b12825347f1ccd47c2cef6eefb7b7cadd92c833911dc02a88e00cacb51f45874dc3af9223242b0e4', 'admin@example.com', '2021-10-02 09:45:04'),
(162, 'b72824ad7a7aa97f802bc326f3b7e68c6b418cb50d6ca9ba3658059c153b547ebd062d39270f68a5c675e8e4d9dc8b88234373eb933bad615dd0c0b7d4747eba', 'admin@example.com', '2021-10-02 13:42:16'),
(163, 'b2357959801d5dae8be89cf63ef879fe5fe9f35310647e7046d6ff9767d507da07f5c9ba5f232a3cc6d5748ba5dcbae9647599ca85be65f0b9092cac8710a033', 'audrey.dieulleR6@feelandclic.com', '2021-10-02 13:45:11'),
(164, 'e3fa74b769880b46c6add9eabc1a070afcc5eb543096415657be58ba4105e74c94b6740bbb0521f615e153c7cab267cb14dbc7b4fddd5b7c1ba9e4f92a2aedc8', 'admin@example.com', '2021-10-02 14:05:25'),
(165, 'cf1a5ad09eb18d6048fc74a5a099dccadc76ccb730cf54b35187fe4778cfeadd18e4dc1dd03e269840544a419b0fc9f9f6d5900950486a9c8d13d72fc16d0b2c', 'repairman@example.com', '2021-10-02 14:14:19'),
(166, '9551308a4c1b9a6e7446cb0250ae2125d27fb8eb24f93190c3c5989688ecb0f95f07dfcadb9fdbd0b45167b82f6e3f575b8235921645476e8574322457a27747', 'audrey.dieulleR2@feelandclic.com', '2021-10-02 14:16:16'),
(167, 'b31b5aebac0dde6b782df45bd76d520935213d07c7eb937e31475b6e8cb6a5d78db4d9c2565f09f6a1e5954126da97a4b262901327f5fe234b442eb7db5acf02', 'audrey.dieulleR2@feelandclic.com', '2021-10-02 14:28:25'),
(168, '38c76c0b140e93a0cc3d40f1725eff5a835a0a53c036a3ef212f6825ec4c4bd18e9ecae406f265069ec0acca7143d2e7c8f17a7a5fb2e91259bebfac0d469465', 'admin@example.com', '2021-10-02 14:31:00'),
(169, '7cb58ad7934116dd3503868b95fa350f92142322f68f396f4acd2105f822024c39314ad3b15ecab8fa1460f54589c69c4916bc9c8969fd383ca63df7a02addfd', 'admin@example.com', '2021-10-02 14:34:09'),
(170, '7cb2167c4c3ecf90ccf487778cf5c0a992952b396432d9878236e0cdbaf877e06e4199fd087aafcc10188dc59becacdb0bd005addc5dc993265c4e665b2f1071', 'audrey.dieulleR2@feelandclic.com', '2021-10-02 14:34:52'),
(171, 'd82641b9a3150e43b2315d2b6292723957d7aea165cbe45622d2f765a23c0f6b0183ec185c37f9ef27b03e84e37ec5e5df0197e9d9f10aed1719cbc42bebb787', 'admin@example.com', '2021-10-02 14:35:23'),
(172, '97994c487b13b0efa70115e8d39948e930c5099c7df870324a4bd352d10cdf35db9da3a04bc29f7e1d2bfca7f7c855dbf393f79df1f1dbf57ebf9d54bceec04f', 'repairman@example.com', '2021-10-02 14:46:19'),
(173, '334b8a47943cb15d06aba83e45571d1630ed699b69a112ff0a9cdec12b56403c08df3f719540ed9fa65ef93b381716bad311dba8eca9f7ba653057801648bf53', 'repairman@example.com', '2021-10-02 14:53:42'),
(174, '3b45dd465f7285e93ec1a3f80088140ba5f89a29311e0a9a57b4deabadd2729c9ef04fe523e3991e26fcafe0aceb1485c830e3e2ca07b96b2d0f08304f4be116', 'audrey.dieulleR2@feelandclic.com', '2021-10-02 15:00:36'),
(175, 'abff0f89f8b3dbea06702ea845377906899a434faa78b64207b31ed999104414d0b544a95a6aefd2f532b2f146d9ab762c75816e031f9c36b1d40fb0181aadaf', 'repairman@example.com', '2021-10-02 15:04:22'),
(176, '0d0214b23eaba95025d4406af925be79d395394517d38d98a672ce6a77d08b06290a6f108bd9e0f59d44603e54441fbc3ab758581c594b4ae0fc6c676ab05f20', 'audrey.dieulleR3@feelandclic.com', '2021-10-02 15:05:48'),
(177, '5950edb9c5ae2266653c06ac614ab4b1acf8c8dc0d783e1bd3d6acfd3032a4c57fadf02dfd0741420c76120d03dc8ccd4dd7a3153d6c06b04305618c7cb12058', 'repairman@example.com', '2021-10-02 15:15:02'),
(178, '76c60e82e9be96df8be84faa09269251168ac707419a1cab354362bc95c15fd84d2c453f6fc07eee47fb76209044b4126e0736571ade3e4a23a6e846c12c3d49', 'audrey.dieulleR2@feelandclic.com', '2021-10-06 09:07:05'),
(179, 'db04cbec63abc690390a307fd96041dcf4e04e7a35def3d89db5227b8b73cef6e53a620950655569ee4b4f19709901ddd0a498dd150d94230acd696ac8cd98c8', 'audrey.dieulleR2@feelandclic.com', '2021-10-06 08:17:46'),
(180, 'fb7055cd4f7c4abe6aa6031ab56007f8b36e66d11ca3f0aa9bc4c88b8cf5b5a34f44bba96289cba0dc59521042fc404588f1f13bfe822275c94402462c873967', 'admin@example.com', '2021-10-06 09:07:18'),
(181, 'd05bd4c8325ab19b71675485a8bd3848de6a0286dc1904b231c521efeb664d16b606c935bbd8c4ab161879b3f48c39866e7bfc7ee49eb78f991d36bb0414b5ac', 'client@example.com', '2021-10-06 09:07:41'),
(182, '08feb8d69a4d6e960c720c1315c6c86f92bb0873b635bbf4cb86f07ea77fc915940b509c6bd6f60ab0137dfcac289bdde76c861a5877f78b5da2dd0c3403f3ab', 'repairman@example.com', '2021-10-06 09:08:13'),
(183, 'de3fa936a8a7ccaf5283db44fbc2cf42f1948dad272d05c3253010c02b577ae0d9f8aa1ae4bba0c260bb8349bf14e63fbface2f9abfb944efd309aa2b9bcde9f', 'client@example.com', '2021-10-06 15:33:51'),
(184, 'fcc8dd8225a470bf7e6215d47471a1dbdbb2577056f2d883cd14cce0241cce742e64c703d0a64e6afd590f133f30d12ff2fe3cef1eb0b0b053cffeac828d38c7', 'Client1@example.com', '2021-10-06 15:35:34'),
(185, '20e8d825c8493cfb502bf3b1450222d19319d8336b875dc96d1bb4001b93159b91d439ff40c45a15f511400211896ed3ccf4fff6b5f0f108db501008a7b8417a', 'client@example.com', '2021-10-06 16:05:10'),
(186, 'c4b630306772cda52218d1911d91d0b575a3bf31636e85d89be238a271577e282cfbe293bab76e962b29834a24b6c43314633a9ebdad2db683ee2f8f6c0f271f', 'repairman@example.com', '2021-10-07 14:02:08'),
(187, 'e9bc4aca18fc93321108fd1556e050c5cfee96458b368e1099c0a2c0a687e25d3796f5bc1b1e954cf9a25cb7dbbc857042b24ec949943524758ab3d3db1b105e', 'admin@example.com', '2021-10-07 14:03:11'),
(188, '79cf3069acf48b8c64d838edea0c6a2bbf7f1bd5f21aa205524a944b2681d1a60df3e6eef3e50183e6979a099e5641834217693d4e38537376a5ca030491867d', 'repairman@example.com', '2021-10-07 14:09:24'),
(189, 'c70af630c552a5f66c7b152f0f2b3a880353a5d792e3e38ce0e1ff191c10783a74fc0da3f0ca60fe40bf6b045eab23732b9b715e0671614120760205802324f8', 'admin@example.com', '2021-10-07 14:13:13'),
(190, '8dc8bf7d78614e09467135ad070eac74b57b4c0befffe97e37dbd66afe6932e5e680db82ba8db9a44a397b01516ebaf86d81b0d40121f56c14c4d0b7b1b14d29', 'repairman@example.com', '2021-10-07 14:14:13'),
(191, 'e1723d7dde7b3946d0ebaa2c4507cc0c6277e2cfeaa922992660ede815c063121f9cca506b43e737c01e16dcaf366b550e404d0533efea1d1e7639d1faaf204d', 'client@example.com', '2021-10-07 14:23:47'),
(192, 'd8c44501e953034064e451cc1bcbfd3966560e72cab1d9a9b1896c695d717a8b49bf552775536598eb69820eb05bd4b735d8ed16d24e15f2b29d8a071e4b3076', 'repairman@example.com', '2021-10-07 14:29:38'),
(193, '0a62615f116052ee110a82cbc2b130dc3727f5c0900c39a6cd8e4f6618d2a6b61e13eb3b89bb1ffd8811dc735848f158c2b983baf8209d97cf0169dc92a40255', 'client@example.com', '2021-10-08 08:04:49'),
(194, '2440b77e06fccb69c1711b80692c752b5eb568d3467ffd8580e83f244af542e5cd8c7c0bc96d219ed66fd3dd7a247182fe5432e3a0fb573ad365548b94f7f7a8', 'repairman@example.com', '2021-10-08 09:36:44'),
(195, '0bd87aa0a8caacdb97284bb73deeb53dd9441b812e238ba7703828ac844384c5f7eb4d032ece5c68fc13bcd7e798fa71260d2bb9ed4d82d9eee7b12f6fd92ed6', 'admin@example.com', '2021-10-08 09:37:39'),
(196, '9490c9540d203cc4c9034dd7f9e0e9c8ab13fcaffb25a2a690e44b9f9b83c3e0bca7c02008e699fdb6b732d4c259f4e5421b4daf3d200d57f82b6ebbdd47bd67', 'client@example.com', '2021-10-09 08:28:13'),
(197, '9bec815b0bd4bda078a348885f1074f48360751ae221b2081c0421c1e49a4ef8aff5b5eda85fddec21cc8821e5827acfeb7505b014fb476423679ea4eb4cd678', 'client@example.com', '2021-10-09 08:55:40'),
(198, '8f844ef5a4c9b45c6f9122baff78ba92be13dbc80394de73e2178fc8eab572499b7e87c8b40831c548644271adeea5df6c01aaa5da0c5f47bbd21bf772e4b3be', 'client@example.com', '2021-10-09 09:44:58'),
(199, '1e870a2feb3da02acae38f8f2d6408b94bb8f3f6912e977339da8af87f9435d4ece7349a0caa1e7c7c78f3a0ba62293257511eef2719033ada85b2c780490f6c', 'client@example.com', '2021-10-09 09:45:06'),
(200, '92adb7afa3f817861955b37fb6af01f311fd5ba675677e6568fed191525cf2df91647a1cc4ac87f589c463e3d1653a6d7890785367f9db65ac20aa6f4686576a', 'admin@example.com', '2021-10-15 10:58:36'),
(201, '622360d97c15b048645d2d9407af3003838df2261d33759bafa18d02dc6bc4a959cc66288f9f228459f1c99170bffdc60237fc0f8b68b8e198acbf873ef99e44', 'repairman@example.com', '2021-10-09 14:36:04'),
(202, '91e4f353db50492fcae9fb4bc39af5f9751ab749da96b735c61e65bf6fa057190b602aff74e25b1b825b1e7fb2e59fa8cec85ef596a6303e084e50a243c6007c', 'client@example.com', '2021-10-09 15:46:39'),
(203, '995f2999819fae22ceb89e5cd695f35a94b934b61896107216a068b77205c61ae89872c9c0d8a7f56254b605af36e44db5bd68635b7afa328957ecb300ccf743', 'repairman@example.com', '2021-10-09 15:47:01'),
(204, 'fca418949432b8845de298b231e5ad4dacaae5a7eed7113c6973fd2baa649423bf58ce052655c78e95ee1b3fcc384d30dbea1ee6f21359260ecdafca20af98aa', 'client@example.com', '2021-10-09 15:49:04'),
(205, '4acabe2011d525ad9cb1d415eafcd347eb750f104beb497f8432684e66c10ca5120ddf9a9f307e3f213613552dbca27e489d29c63a1231a234c566c4ebb40983', 'audrey.dieulleC3@feelandclic.com', '2021-10-09 16:11:06'),
(206, 'a99c4ff15bc193191b3b599c97816faab7ba60aa75f26a5e6ec88ba7e4432178ba8a404ee842f80a769ae77d213d64a539049adb315e23d80ff1b9f58fc16ca9', 'audrey.dieulleC3@feelandclic.com', '2021-10-09 16:11:56'),
(207, '6da74ba3ffbbc571afb82d940b0535d7aafd8896ea164d476e1cd5961f5ef3edd2c2fe62fee62272f2644d8d7d87a1e4eb1e3ae34b4f028dc3197293b68d2d29', 'audrey.dieulleR2@feelandclic.com', '2021-10-09 16:12:15'),
(208, 'ead4124ea1297667e64c6761fac4d8d461caf36f8c2bf4a59c0853c800cbe3f42e67ea9e769d0db473d140a66f25a4748011bb67554a466924694b7cfd81d57f', 'repairman@example.com', '2021-10-09 16:12:28'),
(209, '4cf51a43e93459269b587d80c79cfb29511dcad98c75b7daec11306c846c6c47b317df4e4b51cb6622378cf393df5cf145a3fd310b1cfc3aaa2fa1b5c408f390', 'client@example.com', '2021-10-09 16:22:28'),
(210, 'c5c6bdf21c8816a6f3aaf281b0716dd320a01b7d4ac5e39d4d2c1fc2b2604eb66dc1f3d192348945db6cffda74fbf8653cacb87ea32c10a7076d7a4d5e23b0de', 'repairman@example.com', '2021-10-09 16:28:42'),
(211, '3c1369a84bf768d89bffa3ae831ccdefdfbec10c606db3c84f9bbb39266cc89f132e94f9dcd2ce864a4817129fe28d55674132a65877b45de744297ec3b18315', 'admin@example.com', '2021-10-27 09:49:01'),
(212, 'fe226af66a3400ace2fbd58d2adbb9d2d267466a235dcc85f56866d9776c5c536b4a0416f0bd3affcc2de1652892e291e280e4d61ba7cbb1abba0f1f7dfe2604', 'client@example.com', '2021-10-15 11:00:09'),
(213, 'bfca17cf4638bd39ffdc4e32330f302e292f596d2334582bbfcfbb16729651ca4112bbc924e31a43f7a8fa3c677d62232768e428217ad090f28ff80b8085cdb5', 'client@example.com', '2021-10-20 16:18:50'),
(214, '7cc46c8a7206c32b0d5bf8a8b81fa63d317fcaf4f803b583f66a75d0adf28e67829bd4a72f203861c77578ccc58bf0a6532c06dbfbd6872444225c23ec22cf0d', 'client@example.com', '2021-10-21 10:01:03'),
(215, '8b49d36ba8a573b4cf68f2ced9b41b0f654bff643c340c05516c95bed3ebef5484d64875eb8b4a012693a46e74f0bdd7af2a674c3b071d410fe799bda516c9df', 'client@example.com', '2021-10-27 08:46:05'),
(216, '0c6aaf7685ae20ecf3a62b781c086fdfaeab91283b64452ba154797523c6a7ee2c773819e72e3ef23566b47378e59e06834eb9b18c47e5b0ccea461cb943df8c', 'client@example.com', '2021-10-27 08:46:57'),
(217, '8a892a2eb4ba34c8f961abab4ac5dc6d63bf095d016b0ae5623e428d9e190b972d96beb59a1604a7d7781ddbc08650f5123fa535b4163a1208fad7bd8e9b218f', 'client@example.com', '2021-10-30 11:46:53'),
(218, 'b66908d93900c5031866c51ed4a01cf306a3209c6b6e3069c88254ba137c27f08e27ca8e0a779f6d55a00a71565334b053b15bf285bbfaba1bb6463c2801034c', 'admin@example.com', '2021-10-27 09:49:15'),
(219, '403071c0554f924b2642a2a5217c722c634976e33b6274b4bcb0d2ccce9f376d2d7754cc7324a182179292951b99710f1f76d08ae33427ff417661e7c33c5664', 'audrey.dieulleR2@feelandclic.com', '2021-10-28 14:56:30'),
(220, 'f1919e952f41e3a3fcf6eeb3e1cea4bfcc10847703137e8d8d82fb598e5a32ab46a9c28128b4557e411bbe74ac4df13bc0c7045985bfd84acfb83747b272c460', 'repairman@example.com', '2021-10-28 15:18:19'),
(221, '197d149006368504b7a7fd2f87c55fdce6f8d2b7782b4baa40f6ffcf05db37bf4c1e601b9fd958f6457d9845d6797f0fd93b416299a296072d488e2bc25e9baa', 'client@example.com', '2021-10-28 15:23:43'),
(222, '9231430f94a52d4dcce086923a037e41e3693f550b05ab7ad2aad866dfe2bb13fb95dc0506a7e8d8287234bba6d14e6e309d218658393c72102ffdeb9bd5c292', 'audrey.dieulleR2@feelandclic.com', '2021-10-28 15:58:44'),
(223, '5de3d182883726acf530375fff43832cd0b389ee0fb52eaa61fce49ecf7ef1952c1415e1b4791f83e18fd95a3c1eab4e6c408662e1c6e98abf8959397dd8bd5a', 'audrey.dieulleR3@feelandclic.com', '2021-10-28 15:58:56'),
(224, '528b0205cad59bc32c29b6b17aa3a8d15fa717be81369035c44c99a603497d931d1dcf2e3a86086fcb42e89b4a6a7368bed2d77238028f9c40a30c987df6445d', 'admin@example.com', '2021-10-28 16:07:43'),
(225, '1cb2126c60c25b9f625498275b2c45c1073daa59e89ee1562c5eba6cfb14726b4b91ec9bcf51578d38ffb324d3362a3471668d4dfbc90de8f920fdcf59953b76', 'audrey.dieulleR2@feelandclic.com', '2021-10-28 16:07:57'),
(226, 'fdb8be963fd159c9526baecabdb0e6c978fae442d334e501db166adabbfe76e9c384c8f2067b1d51c2bd1c7e9b50a694be7c502aaf709271cdaacad04d806fa4', 'client@example.com', '2021-10-28 16:08:14'),
(227, 'abec7de25bb3c575268f6267a954a655215827bed9aa342def2e5d0e475042741b38785d0e330a9e685305ba45fa424ead24b83b6fdca153a62fe8cdb38f7934', 'admin@example.com', '2021-10-28 16:16:11'),
(228, '901485aa369144fbfd510dc05a2e09e3171c928d9d8c49f146fd6017eae9fbbf2c38db66628e299e1d768dcb52db6320f321d668cf7311596aca59a5c341a983', 'audrey.dieulleR3@feelandclic.com', '2021-10-28 16:20:45'),
(229, '1b2fba64fdae52bc4a4e759aafbdb54693cadb8cccc098cfe2991ea96d3013bcd14b6120c0d38d4f6768c38b170974c24e72b45240dd85855f13454dde4dd9b9', 'audrey.dieulleR3@feelandclic.com', '2021-10-28 16:34:47'),
(230, 'ea78d3c3c43aef18bae8d124bf3e56997a1bebf2a24787add62bd60ed47b47ecfa9ea185d19d9296400d4eff513d6ea0c44b080323a71060868a41e3ac2c9742', 'admin@example.com', '2021-10-28 16:55:15'),
(231, 'd5b3c98e5ee4696a66d547239479a6663ae478ae479cd5cad2af4bb707e93026c8a8e25dd69e8d193f5d895be9b390a208164aa82256e3cb81142efb277b9c15', 'client@example.com', '2021-10-28 16:57:31'),
(232, '3dc7e64b108d1757cb047ec959f7238e7ceca076ec2ae0a07aa47dcf7527340dc313e484b3f467a19faa023d28c896e1097259f6060402efbb67e1d093229595', 'admin@example.com', '2021-11-03 07:57:17'),
(233, '5fd9c39ad8e68ed3fe64f1a92c8dbe3252c8150f5d95f57d9a43a88a30500710033d23789e43fa015c84492664dec6ce435ccdf2a1a00b6a313aa84b5c6ab6f5', 'client@example.com', '2021-10-30 15:28:29'),
(234, '477577e6ff75a14bdbb77152e05dfdca2085845afb2aa3714cadbcfe3cd375976ae38d46d6d11acd27cdfcc272b18fef3870dd3aad18a588e5e9cee5d3aea9cd', 'admin@example.com', '2021-10-31 16:36:06'),
(235, '16aeb07c104ff216531e994926b1dc25e1d576ef2c608b939dbfafce8223469f256b01bad1cf9e98626a90c3c6adcd17d9c2e5d25027f469ebe462b0cd4d76ca', 'repairman@example.com', '2021-10-31 16:36:49'),
(236, 'd69724d46f69b707167e94abd55eb6e25634a63072d992d3ff142410c7224a4f3c3f104bb57f5d873aff2a903c32cca2d10ffc2ebe9049d9f175d113f3ec8b00', 'admin@example.com', '2021-11-03 07:57:23'),
(237, 'b6b746ef88e22ebd7f95688ca3cd5f2ee320a7b62947ed09131f1a70229e7fac0e9bbb93c579c6a081b4366681cf977702e38d763854dbda71e45863155f82eb', 'admin@example.com', '2021-11-03 08:10:34'),
(238, 'f0f5b657ae229cf639c94e5b6e1e0824fb3592552a3413b0ae2a015c7b9725f65629e98770aec927be7e3090a9781b254ab0e56b1899fe37165ae8e2421ebc0a', 'audrey.dieulleR2@feelandclic.com', '2021-11-03 08:20:26'),
(239, 'db80df8a98815fa881f356dabec5a63d70500f2a30e6077bd46e84e48b2394f5e6fe69245133dd0483c5ad56360c56c975d064ec06557eccb3c06dc2171b1937', 'admin@example.com', '2021-11-03 08:48:58'),
(240, '0f8f51e41b8f730fa605a7f5647e10d8a5dc1f1e8d091348a642d75df47d64dd6ebf8cc8e6cba25c6bb58b1bb455ea3e6aa9e2a4dccb28e7ea561fa2e2229aa9', 'client@example.com', '2021-11-03 08:51:53'),
(241, '18676f59b6d244b60c75b64d29d2c48b7d1dcf1a2891b4c878a9223ffda9a16d663d74f335cba8bb909c4e202ae3891b79fe9a3cc55f00933b4798225e9ef899', 'admin@example.com', '2021-11-03 08:54:19'),
(242, '9f9a61fca777724dc096e6eaab9def05d842dd54b684fc15b46a9992e2440cd209b46d778a4cc426394232e64126d8f510d1dd1e6fd2ee41b3b8c5dae1fca274', 'audrey.dieulleR2@feelandclic.com', '2021-11-03 13:43:13'),
(243, '983446b338d0af6757ea59272be5ba6620808147d2bd9613629990cb207363d7dc4257b77b4c6e3542592891b5da31ddfb49cf17125942c38d300763e8deefb5', 'audrey.dieulleC@feelandclic.com', '2021-11-03 13:45:50'),
(244, '00d02345fd5957a7a1ad2668fe845d69a09148a5473049867b85feb6ed440c067d6edb03bad81080ca9188ee5ff1de2d8ee7deecd1727374f51d1dd92c602c98', 'client@example.com', '2021-11-03 14:01:59'),
(245, 'a11b925b125848a33c4608bb3583c2bd5d0d7d6bf4c0a0242d75bbf0a9a839c06837e01ff2bdb800968e402df8ffe96c6e739eff959ae4bf7f44db3c20ea8309', 'audrey.dieulleR3@feelandclic.com', '2021-11-03 14:04:26'),
(246, 'ad5a5b22b388710531b1469ccb9301e585f6439d4d15001c7274aefaa0d93a524fafb3859b7be5e7361dc76aa9fff94e0d26a957c40878b0e1459eabd6d25b3b', 'audrey.dieulleBUT@feelandclic.com', '2021-11-03 14:04:37'),
(247, '08615a64265f094c36c2d890474b7d4c34cf0b3e57fc90fbc3d0995e34ed514328fbb38f20b513b1fd2007eb2fd8b60d4320105752fde9b2d5751c551eb33562', 'admin@example.com', '2021-11-03 14:10:51'),
(248, 'e68192a3bab6dd7e254231ef08403d256ebdde1f72479ee58c7e3f6bad0b21a609b283964efc9af5bc253398ecc0a1dcce5d651d931990e41398745e209242a3', 'audrey.dieulleBUT@feelandclic.com', '2021-11-03 14:19:35'),
(249, '33cfadd639a4468d0c6acda7d403d424ba3b6c74c631de05411605429cbe229e5dacb8a2acd282294da453b7a109a1aa3c92208c73cbe72b2a06ac8db9916415', 'client@example.com', '2021-11-03 14:20:27'),
(250, '918c8bac27ca7fc283104fbf7904069f64ec7389ebf8b6209fa23ece8e672eb75a18996e64fb54ef0a0aef58cb11f234375a5ffd6c208e1717f5840570c94117', 'admin@example.com', '2021-11-03 14:20:59'),
(251, '0fcb808489f3bee935a90d24a1c05ed35f0e093dd51d92531eadc420c0630b55b04ebf1bfb490e22c59aede3ea9b30e52198913a8015ee847c697ebcc6f7efb7', 'audrey.dieulleBUT@feelandclic.com', '2021-11-03 14:22:09'),
(252, '78cd04d3c41af6ad4023837097854bb27e3aad631d41dc01190551ec8829b27e425d13bc0ba75858aa63b8e9de0df28b23dab235bbdd1359fad447c7379bc565', 'audrey.dieulleC2@feelandclic.com', '2021-11-03 14:23:07'),
(253, 'bc6640db9e1c7ea4f345eae12e89248c00d7f1fa4ee6e1077842757c8b0d12291f5e5f25628c45745157d7b084aebaebf2b8cf31bce33ed1e2f2aed2c1f964e8', 'admin@example.com', '2021-11-03 14:24:03'),
(254, 'd9908b3d24bd684ba00ef25a6876392b3b3c213c0e1286951297a4d8045c2eaa4af5f98266310f7441c55db87d5bf535f278e4490c1a40ce17edb93176889e62', 'audrey.dieulleC2@feelandclic.com', '2021-11-03 14:25:33'),
(255, '939a97fb7b20c01320f49b05ac4ecf6af8d7b771405f1d8f533f7f02e36980384c44b22c47c6ff8655397a5e2bad2e860e8bde9bcded5593f266fa1a5b0a4f3d', 'admin@example.com', '2021-11-03 14:28:09'),
(256, '066236972178504153f9730dd765ebcd4cbf198c15a161db45db5d92f266f95d974d456d138be0b26d3e1c0aa63e30b5293f02412c8afc1e832a4c7b9b65db0c', 'client@example.com', '2021-11-03 14:36:37'),
(257, '2d63b72011f98a90fd88b90b0856d3c5aadd022e4ed181dd042f841043e9e2ffe97ba4411b678c514423b59cddfed19b23b40a11f6528cabe5bd79a5660efc34', 'client@example.com', '2021-11-03 14:49:08'),
(258, '9e524606599c40ca54edabb4b9bb0bf41d93eec3d90eb268467b50c6fd44c5a2c28a027266eb03b159c868f4bcd2baa0c3b0e102fe0604280c71453b045a123f', 'audrey.dieulleBUT@feelandclic.com', '2021-11-03 14:56:11'),
(259, 'e0969ae6dbfda6e9fba750842e71709e92f285b82cef52e89dae27f150ddb5409097e51a4759cd4ed71a668484272c056524e91d4a901943da44fec9b10d5551', 'audrey.dieulleR2@feelandclic.com', '2021-11-03 15:25:10'),
(260, '67a9bb594cfb50d60d16d5ffcdd2daba99f6e09255d5ad3a3b356537f1ae61557c6d1184805bcc960d3b24b3307932892cf69e678d39b62f6989b8a3e8a00506', 'audrey.dieulleBUT@feelandclic.com', '2021-11-03 15:41:03'),
(261, '47c228e72a340a9940ae7d80202e81324d3e18f10d230aea652f061dcd85e149da45886c12428dfb864005a011c9b19e3c3195afee69b324fe7c62f50b342a36', 'admin@example.com', '2021-11-03 15:51:15'),
(262, '566b5da442051d14c3b15572e421742ecf3b9d4347ff11609cdb21b00cdcb6c9cb4e2087af8d0cc8afbd7ca107b5341119f45ca3366bd93ffb5b3a2f70f1b399', 'audrey.dieulleR6@feelandclic.com', '2021-11-03 15:55:25'),
(263, 'dda75bde1b9b3c14bf5c5cb45dc5d35c3e00720b1b8d5c4807c7b4ed2d5816bd1f6392d866f6dbe94fb89eda8c5b17d134e9bcb3555e05e196519b151528e706', 'client@example.com', '2021-11-03 15:57:01'),
(264, '5fe42a139aa4b2d98f861e77f21cf9e4efdd6b9561e7674a99f2c8ec86dfc816182923af955d0f8470eab4fa08b09af870fcf7404525f51482977b054d6190cb', 'audrey.dieulleR2@feelandclic.com', '2021-11-04 10:18:41'),
(265, 'db89fffdf0331634dac748fa6d3b197b1d721111eac7adea536422a81827ee11badc3730bf09b68e3719f48d8d5115ac1fe7f889879473ec693914050528b65f', 'repairman@example.com', '2021-11-04 10:18:59'),
(266, 'b631a6342d110dc7cb51780852de26b7fde6376a6a36521e0dd72888e18780ceb4c165dd1e7ad2898f9bf4cac0870647fe97d6d70860b6e94a93d06a0489f214', 'audrey.dieulleBUT@feelandclic.com', '2021-11-04 10:19:29'),
(267, '5ed16f3f74e4e7483901e38c9e7ba1364422f5f4f5ea638b8d18d820c3b3dcd32028536e53747f4c5f6337b05dbbf29bb1975f893bd3f94c555805a6425d7bbc', 'admin@example.com', '2021-11-07 14:48:06'),
(268, '1794a0a2390dd10c790525de887895314bc635b3b613033a137e50710a1dce9364125b09bd3214a7a391a50b8e347af70507ec04a3a68b0326156ce819103954', 'admin@example.com', '2021-11-10 08:30:17'),
(269, '92914d342ddadadd5fff97a128ab382e329dc7fff0ceea997f01b5af80cb659cf59b68d91d2e0bf7ced9ba4c8422a34a6a4d1e1aa48fb25ca06f804ee6f50807', 'client@example.com', '2021-11-10 08:10:44'),
(270, 'bc08d11920bea905279e8fa4505618d59e5835827e8dbdd358951c67ea5efed0f33b89b399805d0677c5db798a555e94135727fa5ad80eec1c48214eca5b4c0b', 'admin@example.com', '2021-11-10 08:30:25');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `name`, `picture`, `description`, `created_at`, `updated_at`, `slug`) VALUES
(1, 'Service 8', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2021-07-12 18:16:22', '2021-07-12 18:16:22', ''),
(2, 'Service Audrey 2 ', NULL, '', '2021-08-02 16:42:58', '2021-08-02 16:43:16', ''),
(3, 'Service Audrey', '/media/6108209ab7d14_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg', 'Description du service Audrey ici', '2021-08-02 16:43:06', '2021-08-25 08:43:09', ''),
(4, 'Service sur la catégorie 2 : sous-cat sdf..', NULL, '', '2021-08-02 16:45:20', '2021-08-02 16:45:20', ''),
(6, 'fdsfdsf', NULL, '', '2021-08-02 16:50:59', '2021-08-02 16:50:59', ''),
(7, 'fqdfsfsdg', NULL, '<p>gfdqgfd</p>', '2021-08-02 16:51:07', '2021-08-02 16:51:07', ''),
(8, 'dsfqfqf', NULL, '<p><br></p>', '2021-08-02 16:51:17', '2021-08-02 16:51:17', ''),
(10, 'test', NULL, '', '2021-08-02 16:51:46', '2021-08-02 16:51:46', ''),
(11, 'teste', NULL, '', '2021-08-02 16:51:58', '2021-08-02 16:51:58', ''),
(12, 'test 6', NULL, '', '2021-08-02 16:52:13', '2021-08-03 09:17:24', ''),
(13, 'tesestse', NULL, '', '2021-08-02 16:52:43', '2021-08-02 16:52:43', ''),
(14, 'testests', NULL, '', '2021-08-02 16:52:48', '2021-08-02 16:52:48', ''),
(15, 'estes', NULL, '', '2021-08-02 16:52:53', '2021-08-02 16:52:53', ''),
(18, 'teqerqzrq', NULL, '', '2021-08-02 16:53:12', '2021-08-02 16:53:12', ''),
(19, 'dfsqfdsdw', NULL, '', '2021-08-02 16:53:19', '2021-08-02 16:53:19', ''),
(20, 'tygfhgfxhg', NULL, '', '2021-08-02 16:53:26', '2021-08-02 16:53:26', ''),
(21, 'gdqsdgfxg', NULL, '', '2021-08-02 16:53:31', '2021-08-02 16:53:31', ''),
(23, 'ABCDE', '/media/610824aae55f6_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg', 'ma description est la suivante blablabla', '2021-08-02 16:54:32', '2021-08-25 13:15:06', 'abcde'),
(24, 'ZYX', NULL, '', '2021-08-02 16:54:43', '2021-08-02 16:54:43', ''),
(28, 'fgfsfsgs', NULL, '', '2021-08-03 09:02:22', '2021-08-03 09:02:22', ''),
(30, 'fdsfsdfdsf', NULL, '', '2021-08-03 13:18:39', '2021-08-03 13:18:39', ''),
(31, 'test14:27', NULL, '', '2021-08-03 13:27:27', '2021-08-03 13:27:27', ''),
(32, 'Réparation de clavier Mac', '/media/611e1b6e7dd33_clavier-mac.jpeg', 'Description du service de réparation de clavier mac actuellement présent dans l\'univers informatique', '2021-08-13 10:32:44', '2021-08-19 08:50:54', 'reparation-de-clavier-mac'),
(33, 'Réparation clavier Windows (tous types de clavier)', '/media/611e1b6889e6b_clavier-windows.jpeg', 'voici ma description de ce service', '2021-08-13 10:37:05', '2021-08-19 14:17:11', 'reparation-clavier-windows-tous-types-de-clavier'),
(34, 'tests', NULL, '', '2021-08-13 10:42:53', '2021-08-13 10:42:53', 'tests'),
(35, 'fdsfds', NULL, '', '2021-08-13 10:43:12', '2021-08-13 10:43:32', 'fdsfds'),
(36, 'testestest', NULL, '', '2021-08-13 10:45:37', '2021-08-13 10:45:37', 'testestest'),
(37, 'testestest', '/media/61164da6aa6bc_images.jpeg', '', '2021-08-13 10:47:02', '2021-08-13 10:47:02', 'testestest-1'),
(38, 'autre service', '/media/611e143e9b62b_images.jpeg', 'ma description', '2021-08-19 08:14:35', '2021-08-19 08:20:14', 'autre-service'),
(39, 'Réparation écran mac', '', 'description de ce service', '2021-08-19 08:44:32', '2021-08-19 08:47:32', 'reparation-ecran-mac'),
(40, 'Réparation écran windows', NULL, '', '2021-08-19 08:44:44', '2021-08-19 08:45:50', 'reparation-ecran-windows'),
(43, 'Encore 1 service', NULL, '', '2021-08-19 08:55:04', '2021-08-19 08:55:04', 'encore-1-service'),
(45, 'Un service pour planter des arbres', '/media/6130dbf55cc8c_pourquoi-planter-des-arbres-a-grande-echelle-pourrait-etre-contre-productif-pour-lenvironnement.jpeg', 'Voici la description de mon service de plantation d\'arbre', '2021-09-02 14:13:00', '2021-09-02 14:13:09', 'un-service-pour-planter-des-arbres');

-- --------------------------------------------------------

--
-- Structure de la table `thread`
--

CREATE TABLE `thread` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `thread`
--

INSERT INTO `thread` (`id`, `created_at`, `updated_at`) VALUES
(1, '2021-09-28 13:35:54', '2021-09-28 13:35:54'),
(2, '2021-10-04 14:53:44', '2021-10-04 14:53:44');

-- --------------------------------------------------------

--
-- Structure de la table `thread_user`
--

CREATE TABLE `thread_user` (
  `thread_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `thread_user`
--

INSERT INTO `thread_user` (`thread_id`, `user_id`) VALUES
(1, 5),
(1, 14),
(2, 5),
(2, 15);

-- --------------------------------------------------------

--
-- Structure de la table `type_company`
--

CREATE TABLE `type_company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_company`
--

INSERT INTO `type_company` (`id`, `name`) VALUES
(1, 'Individuelle');

-- --------------------------------------------------------

--
-- Structure de la table `universe`
--

CREATE TABLE `universe` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int(11) DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pictures` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `description_pictures` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `universe`
--

INSERT INTO `universe` (`id`, `name`, `position`, `description`, `pictures`, `image`, `created_at`, `updated_at`, `description_pictures`, `slug`) VALUES
(12, 'Univers 3', 3, 'tseest', 'a:0:{}', '/media/61080b14130db_Accueil Organigramme - v2@2x.png', '2021-07-26 13:03:50', '2021-08-25 08:24:31', '<p>dsfd</p>', 'univers-3'),
(13, 'Univers 2', 2, 'testest dd', 'a:1:{i:0;s:36:\"/media/61115334ec359_1k8dl3td74f.png\";}', '/media/6111522802f7d_Capture d’écran 2021-08-09 à 16.50.40.png', '2021-07-26 13:04:04', '2021-08-26 14:25:30', '<p><img src=\"https://fingz.feelandclic.dev/media/61115334ec359_1k8dl3td74f.png\"></p><p>sddsd</p>', 'univers-2'),
(16, 'Informatique', 0, 'Cet univers permet aux réparateurs de proposer tout type de réparations liées à l\'informatique ', 'a:1:{i:0;s:37:\"/media/611e142f6d846_h7l1rkm0cjk.jpeg\";}', '/media/6130db246013b_informatique.jpeg', '2021-08-02 16:05:49', '2021-09-27 10:03:53', '<p>voici l\'aide ici :</p><p><img src=\"https://fingz.feelandclic.dev/media/611e142f6d846_h7l1rkm0cjk.jpeg\"></p><p><br></p><p>et là, voilà</p>', 'informatique'),
(17, 'Univers 4', 4, '', 'a:0:{}', '/media/61081bf0760f8_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg', '2021-08-02 16:23:12', '2021-08-25 08:24:31', NULL, 'univers-4'),
(18, 'Univers 5 bis', 5, 'voici mon texte', 'a:1:{i:0;s:36:\"/media/61081dd686af7_xe3hteqzpy.jpeg\";}', '/media/61081d2eb8315_couple-prenant-son-petit-dejeuner-maison_23-2147892033.jpeg', '2021-08-02 16:28:30', '2021-08-25 08:24:31', NULL, 'univers-5'),
(19, 'Univers 6', 6, 'test1', 'a:0:{}', '/media/61163db47036e_shutterstock_583717939.jpeg', '2021-08-03 13:26:15', '2021-08-25 08:24:31', NULL, 'univers-6'),
(20, 'Univers 7', 7, 'testestes', 'a:0:{}', '/media/611646a79d912_images.jpeg', '2021-08-13 10:17:11', '2021-08-25 08:24:31', '<p>dsfdsfdsf</p>', 'univers-7'),
(21, 'Univers 8', 8, 'ma description là', 'a:1:{i:0;s:36:\"/media/611e11ccc1d80_i0yayfaczb.jpeg\";}', '/media/615196dfa96ea_IMG_20210102_092213.jpg', '2021-08-19 08:09:48', '2021-09-27 10:03:11', '<p><img src=\"https://fingz.feelandclic.dev/media/611e11ccc1d80_i0yayfaczb.jpeg\"></p><p><br></p><p>blablabla</p>', 'univers-8'),
(22, 'test123', 9, 'test', 'a:1:{i:0;s:37:\"/media/611e1398ae513_02psj7lo4y53.png\";}', '/media/611e139882b29_Capture d’écran 2021-08-13 à 15.12.17.png', '2021-08-19 08:17:28', '2021-08-25 08:24:31', '<p>blabla</p><p><br></p><p><img src=\"https://fingz.feelandclic.dev/media/611e1398ae513_02psj7lo4y53.png\"></p>', 'test123'),
(23, 'Univers 9 ici', 10, 'ma descriptiooooo n', 'a:1:{i:0;s:37:\"/media/611e15df72f28_lz6ijph288p.jpeg\";}', '/media/611e151e5ffc1_images.jpeg', '2021-08-19 08:23:58', '2021-08-25 08:24:31', '<p>l\'ajouuut</p><p><img src=\"https://fingz.feelandclic.dev/media/611e15df72f28_lz6ijph288p.jpeg\"></p><p><br></p><ul><li>fsdfdsf</li><li>dsfdsf</li><li>fdsf</li></ul>', 'univers-9-ici'),
(24, 'Jardinage', 1, 'ma description de mon univers 10', 'a:1:{i:0;s:37:\"/media/6125fde3502df_ua4uigeqyni.jpeg\";}', '/media/6125fdd07d6b2_jardinage.jpeg', '2021-08-25 08:21:45', '2021-09-27 10:03:53', '<p>tuto </p><p><img src=\"https://fingz.feelandclic.dev/media/6125fde3502df_ua4uigeqyni.jpeg\"></p><p><br></p><p>tutoooo</p>', 'jardinage');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `type_company_id` int(11) DEFAULT NULL,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 0,
  `last_connection` datetime DEFAULT NULL,
  `siret` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enterprise` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_address` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intra_community_vat` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `is_registration_completed` tinyint(1) NOT NULL DEFAULT 1,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `achievements` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)',
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linked_in` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `you_tube` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `address_billing` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_seen` datetime DEFAULT NULL,
  `stripe_customer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_account_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_account_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `type_company_id`, `username`, `roles`, `password`, `email`, `gender`, `status`, `last_connection`, `siret`, `enterprise`, `address`, `additional_address`, `postal_code`, `city`, `intra_community_vat`, `phone`, `latitude`, `longitude`, `is_registration_completed`, `description`, `achievements`, `website`, `twitter`, `facebook`, `instagram`, `linked_in`, `you_tube`, `picture`, `created_at`, `updated_at`, `address_billing`, `first_name`, `last_name`, `last_seen`, `stripe_customer_id`, `stripe_account_id`, `stripe_account_link`) VALUES
(1, NULL, 'superadmin@example.com', 'a:1:{i:0;s:16:\"ROLE_SUPER_ADMIN\";}', '$2y$13$Tdwi9oycaolI40PwjENNIuISBpo6zOU8gkurXjy5hBO9jR7NI8vZm', 'superadmin@example.com', 'Monsieur', 1, '2021-07-07 16:55:13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL, 'user', 'superadmin', NULL, NULL, NULL, NULL),
(2, NULL, 'admin@example.com', 'a:1:{i:0;s:10:\"ROLE_ADMIN\";}', '$2y$13$3HvX9OLNI6BijJdrcFLZxO3bj6/kvZI84h76oRUfgUdDPc9OVOm0S', 'admin@example.com', 'Monsieur', 1, '2021-10-11 08:30:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-10-11 08:30:26', NULL, 'admin', 'test', '2021-10-11 08:30:26', NULL, NULL, NULL),
(3, 1, 'repairman@example.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$48EL3X5rNvuElPQyy9W2Mu/RRnpNgrM2bWabYx2BanVLUZG4no6Wu', 'repairman@example.com', 'Monsieur', 1, '2021-10-05 10:18:59', '98765432198765', 'Leroy Merlin', '14 Place du 8 Mai 1945', 'ddsdsds', '92300', 'Levallois-Perret', '111111', '01 23 45 67 89', 48.8963458, 2.2979187, 1, 'La description de Leroy Merlin ? Vous connaissez déjà cet établissement, j\'en suis sûr !\nEt si je fais un saut de ligne ?\n\nEt là ?', 'a:5:{i:0;s:29:\"/media/6126000fc073e_lr1.jpeg\";i:1;s:29:\"/media/6126000fdd6d0_lm2.jpeg\";i:2;s:29:\"/media/6126001009d75_lm3.jpeg\";i:3;s:29:\"/media/6126001023755_lm4.jpeg\";i:4;s:29:\"/media/612644c329631_lm3.jpeg\";}', 'http://www.google.fr', 'http://www.google.fr', 'http://www.google.fr', 'https://www.google.fr', 'http://www.google.fr', 'http://www.google.fr', '/media/613a2b971a701_leroy-merlin.png', '0000-00-00 00:00:00', '2021-10-05 10:19:12', '15 rue tartempion', 'George', 'Boulanger', '2021-10-05 10:19:12', NULL, NULL, NULL),
(4, 1, 'repairman2@example.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$1PkdgXRWq.W/1UdeyyflwOW8tz9uAbz3M/3SHvSmFwwiF5CyFoJBC', 'repairman2@example.com', 'Monsieur', 0, NULL, '12345678912345', 'IKEA', 'string', 'string', 'string', 'string', 'string', '', 48.886900736442, 2.342311803469, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '2021-08-25 09:19:23', NULL, 'Dupont', 'Jean', NULL, NULL, NULL, NULL),
(5, NULL, 'client@example.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$1ib3Fidnpb4AxrGq0hMt.OXffab2fLX30P22XREGiP6icNJZbwTmC', 'client@example.com', 'Madame', 1, '2021-10-11 08:10:44', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 48.886900736442, 2.342311803469, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-10-11 08:12:22', NULL, 'Jeanne', 'Dumontelle', '2021-10-11 08:12:22', 'cus_KJJ5niJlckiCaX', NULL, NULL),
(6, 1, 'josette.poilue@gmail.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$SeYlUqafTlvz1aEwhtX3K.TDE4FzQIkO2jRaKDiHIe2X2qQJJD2YG', 'josette.poilue@gmail.com', 'Madame', 0, NULL, '9876543216521', 'Conforama', '92 avenue de la montagne enneigée', 'compl', '75008', 'PARIS', '', '', NULL, NULL, 0, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, '', '2021-08-25 09:43:04', '2021-08-25 09:43:04', NULL, 'Poilue', 'Josette', NULL, NULL, NULL, NULL),
(7, NULL, 'client2@example.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$1ib3Fidnpb4AxrGq0hMt.OXffab2fLX30P22XREGiP6icNJZbwTmC', 'client2@example.com', 'Monsieur', 1, '2021-08-25 17:23:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 48.886900736442, 2.342311803469, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-08-25 17:23:46', NULL, 'Jack', 'Daniel', NULL, NULL, NULL, NULL),
(8, NULL, 'audrey.dieulle@feelandclic.com', 'a:1:{i:0;s:10:\"ROLE_ADMIN\";}', '$2y$13$dq51rRhDldwjDxqiQNZiQegKzSuvyGrz9xstzIV0wy2gyzuYtIc6S', 'audrey.dieulle@feelandclic.com', 'Madame', 1, '2021-08-27 13:19:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0137465746', NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-26 14:34:19', '2021-09-02 13:43:06', NULL, 'Audrey', 'Dieulle', NULL, NULL, NULL, NULL),
(9, NULL, 'audrey.dieulleC@feelandclic.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$OGQo2of828F6.fhLk36tSuPUQwxq4x.HduMVNUCS3Y6BKFe.xy3Ui', 'audrey.dieulleC@feelandclic.com', 'Monsieur', 1, '2021-10-04 13:45:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-27 09:20:31', '2021-10-04 13:59:12', NULL, 'Audrey C', 'Dieulle', '2021-10-04 13:59:12', 'cus_KLYlqtMCqqNuaK', NULL, NULL),
(10, NULL, 'jean.dupont@feelandclic.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$STef3U8J1/q9JLxPYtFemOfTeEI5YN0eXgU/KZ0hY6fCNMXZEd78m', 'jean.dupont@feelandclic.com', 'Monsieur', 1, '2021-08-27 09:37:30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-27 09:30:50', '2021-09-02 14:32:56', NULL, 'Jean', 'Dupont', NULL, NULL, NULL, NULL),
(11, NULL, 'audrey.dieulleC2@feelandclic.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$O4hz2a1UNiuOlH4PZCZY8O2xpcwhMmVncRgDooBC4.REWvpNYtYTS', 'audrey.dieulleC2@feelandclic.com', 'Madame', 1, '2021-10-04 14:25:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-27 09:45:08', '2021-10-04 14:28:04', NULL, 'Prénom là', 'Nom de famille', '2021-10-04 14:28:04', 'cus_KLZDZiIkqxte93', NULL, NULL),
(12, NULL, 'georges.po@feelandclic.com', 'a:1:{i:0;s:10:\"ROLE_ADMIN\";}', '$2y$13$rgJJPLAJJSQ8y/26FfV8peh1SikWdq7UFFmU49IlUo9GCtLU02V1S', 'georges.po@feelandclic.com', 'Monsieur', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-27 09:53:03', '2021-09-02 09:45:17', NULL, 'Geaorges', 'Pompidou', NULL, NULL, NULL, NULL),
(13, 1, 'audrey.dieulleR@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$lCl5XfWRfunrwURVUhedXeUfdk0wCbiy6hVVnK.JG3Q9bmcz1WaY6', 'audrey.dieulleR@feelandclic.com', 'Monsieur', 1, '2021-08-27 13:39:17', '12345678998745', 'Castorama', '128 avenue du Général Leclerc', '', '77600', 'BUSSY-SAINT-GEORGES', '12345687851', '', NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, '', '2021-08-27 12:32:23', '2021-08-27 13:39:17', NULL, 'Picasso', 'Pablo', NULL, NULL, NULL, NULL),
(14, 1, 'audrey.dieulleR2@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$IPLV9wZC6fEvF4B47sLfFeEQssGGC/jI2skqCdRK28lp/x0A2Ehpm', 'audrey.dieulleR2@feelandclic.com', 'Madame', 1, '2021-10-05 10:18:41', '5465341164652', 'Brico Dépôt', '15 Rue Merlin', 'batiment 3', '75011', 'Paris', '65465345653', '0231654578', 48.8603915, 2.3848221, 1, 'Voici une description de qui je suis\net voilà', 'a:0:{}', NULL, NULL, NULL, NULL, NULL, NULL, '/media/6130dce6a4310_bricodepot.png', '2021-08-27 12:39:00', '2021-10-05 10:18:42', '32 route de n\'importe où', 'Aristo', 'Nadine', '2021-10-05 10:18:42', NULL, NULL, NULL),
(15, 1, 'audrey.dieulleBUT@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$es9kHYC565579iNskqFZue/nz5N9PiWzTEJNOEgWIpLqf49SVw4ru', 'audrey.dieulleBUT@feelandclic.com', 'Monsieur', 1, '2021-10-05 10:19:29', '12345678998653', 'But', '32 Boulevard Lannes', 'ddsdsds', '75008', 'PARIS', '136539', '', 48.8672444, 2.2717725, 1, 'description de ma société ici', 'a:1:{i:0;s:29:\"/media/61533c067347c_lm2.jpeg\";}', NULL, NULL, NULL, NULL, NULL, NULL, '/media/612df1d3eab3e_but.png', '2021-08-31 09:02:32', '2021-10-05 16:38:31', '15 rue tartempion', 'Patrick', 'Callaw', '2021-10-05 16:38:31', NULL, NULL, NULL),
(16, NULL, 'audrey.dieulleC3@feelandclic.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$eq3DaQq19I7Awh8d9p/BPeltKMVUzQH/RUVHQR5NoeTKSJEmBKeAe', 'audrey.dieulleC3@feelandclic.com', 'Monsieur', 1, '2021-09-09 16:11:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-31 09:05:03', '2021-09-09 16:11:57', NULL, 'Monique', 'Wonderbald', '2021-09-09 16:11:57', NULL, NULL, NULL),
(17, 1, 'audrey.dieulleR4@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$nyhR6AQYJpTG9PvZ7N1u9ejOAvBwEDTbV00C6A/z70xAj.KIXb0Ne', 'audrey.dieulleR4@feelandclic.com', 'Monsieur', 1, '2021-08-31 10:01:28', '65423185649756', 'Darty', 'tgdrtd', 'étage 5', '75015', 'Paris', '463123', '0165459856', 21.0106018, 105.8221243, 1, NULL, 'a:1:{i:0;s:35:\"/media/612df3b0297cf_jardinage.jpeg\";}', NULL, NULL, NULL, NULL, NULL, NULL, '/media/612df37070a33_darty.png', '2021-08-31 09:16:32', '2021-08-31 10:09:03', '10 rue Treilhard', 'Jacques', 'Parby', NULL, NULL, NULL, NULL),
(18, 1, 'audrey.dieulleR5@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$rjg2czE.haWg2mSXhEul9Ozuah.FLI0AAEiHKrIJQd5v5.UYn7lKq', 'audrey.dieulleR5@feelandclic.com', 'Monsieur', 0, NULL, '73638193847583', 'Encore une entreprise', '75007', 'Bâtiment B', '75007', 'Paris', '984738743', '0165459856', 48.8543345, 2.3134029, 0, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, '/media/6130994c966fd_darty.png', '2021-09-02 09:28:45', '2021-09-02 09:28:45', '75007', 'Micheline', 'Tralala', NULL, NULL, NULL, NULL),
(19, 1, 'audrey.dieulleR6@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$xoFqoAYqGexMV/fO1W/3Pe0JxywNObcQ4EjeDIQqmCLtYGU1WjCF2', 'audrey.dieulleR6@feelandclic.com', 'Monsieur', 1, '2021-10-04 15:55:25', '73982832329389', 'BABOU', '35 Rue Cuvier', 'complément', '69006', 'Lyon', '849384934', '0463746574', 45.7669551, 4.845061, 1, NULL, 'a:0:{}', NULL, NULL, NULL, NULL, NULL, NULL, '/media/6130d74498f04_IMG_20210102_092213.jpg', '2021-09-02 13:39:25', '2021-10-04 15:55:38', '35 Rue Cuvier', 'TOTO', 'TREOU', '2021-10-04 15:55:38', NULL, NULL, NULL),
(20, NULL, 'audrey.dieulleC4@feelandclic.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$T5RRpzWynHPFdP05cJ/oXOM8Yxpd9puma35J7Pfy7YXY7sy.n5pKe', 'audrey.dieulleC4@feelandclic.com', 'Monsieur', 1, '2021-09-02 13:40:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-02 13:40:26', '2021-09-02 13:40:26', NULL, 'Jacques', 'TROUEZE', NULL, NULL, NULL, NULL),
(21, NULL, 'prenom.nom@feelandclic.com', 'a:1:{i:0;s:11:\"ROLE_CLIENT\";}', '$2y$13$ONGKUPqsU/fzcLYXuFKUqeTlkUI5k94KRmHIkTH9mYKDJNwaRyMJe', 'prenom.nom@feelandclic.com', 'Monsieur', 1, '2021-09-02 14:33:47', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-02 14:33:47', '2021-09-02 14:33:47', NULL, 'mon prénom', 'mon nom', NULL, NULL, NULL, NULL),
(23, NULL, 'toto@feelandclic.com', 'a:1:{i:0;s:10:\"ROLE_ADMIN\";}', '$2y$13$HzgO1eJ/lamh68ob783U5ek.QEnIHibxRpHwHQz4cp79wWEW/I7Ly', 'toto@feelandclic.com', 'Monsieur', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 1, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:50:01', '2021-09-27 09:50:01', NULL, 'Toto', 'Adminos', NULL, NULL, NULL, NULL),
(24, 1, 'fdsfds@fdsfds.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$KSRFDJogNZcbs0shYCCXmu4NpUri2W1DqKr40gAeq0xGF1XJTzLqm', 'fdsfds@fdsfds.com', 'Monsieur', 0, NULL, '12345678945612', 'Mon entreprise', '12 Rue Pierre Castagnou', '', '75014', 'Paris', '64163124', '', 48.8328119, 2.3258751, 0, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, '', '2021-10-04 08:05:53', '2021-10-04 08:05:53', '12 Rue Pierre Castagnou', 'fdsf', 'fdsfds', NULL, NULL, NULL, NULL),
(25, 1, 'audrey.dieulleR7@feelandclic.com', 'a:1:{i:0;s:14:\"ROLE_REPAIRMAN\";}', '$2y$13$gW04UWPo.tpJ6zzv/aRHAeSJx8UDlNzGfHP8ZDDWSl8LTOlPZLyUG', 'audrey.dieulleR7@feelandclic.com', 'Monsieur', 1, NULL, '123456987654123', 'mon entreprise 2', 'fdsfdsf', 'batiment 3', '65123', 'bordeaux', '16346541235', '0231654578', NULL, NULL, 0, NULL, 'N;', NULL, NULL, NULL, NULL, NULL, NULL, '', '2021-10-04 13:14:10', '2021-10-04 13:14:14', 'fdsfdsf', 'dfsfdsf', 'fdsf', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_universe`
--

CREATE TABLE `user_universe` (
  `user_id` int(11) NOT NULL,
  `universe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_universe`
--

INSERT INTO `user_universe` (`user_id`, `universe_id`) VALUES
(3, 12),
(3, 16),
(3, 18),
(3, 19),
(3, 24),
(14, 16),
(14, 24),
(15, 13),
(15, 16),
(15, 24),
(17, 12),
(17, 13),
(17, 16),
(17, 17),
(17, 18),
(17, 19),
(17, 20),
(17, 21),
(17, 22),
(17, 23),
(17, 24),
(19, 13),
(19, 16),
(19, 24);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D4E6F81A76ED395` (`user_id`);

--
-- Index pour la table `benefit`
--
ALTER TABLE `benefit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5C8B001FED5CA9E6` (`service_id`),
  ADD KEY `IDX_5C8B001FA76ED395` (`user_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_64C19C15CD9AF2` (`universe_id`),
  ADD KEY `IDX_64C19C1727ACA70` (`parent_id`);

--
-- Index pour la table `category_service`
--
ALTER TABLE `category_service`
  ADD PRIMARY KEY (`category_id`,`service_id`),
  ADD KEY `IDX_2645DAAC12469DE2` (`category_id`),
  ADD KEY `IDX_2645DAACED5CA9E6` (`service_id`);

--
-- Index pour la table `command`
--
ALTER TABLE `command`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_8ECAEAD4B517B89` (`benefit_id`),
  ADD KEY `IDX_8ECAEAD419EB6921` (`client_id`),
  ADD KEY `IDX_8ECAEAD47DFB3A94` (`delivery_mode_id`),
  ADD KEY `IDX_8ECAEAD4727ACA70` (`parent_id`);

--
-- Index pour la table `delivery_mode`
--
ALTER TABLE `delivery_mode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_46568F31B517B89` (`benefit_id`),
  ADD KEY `IDX_46568F318B59E215` (`delivery_mode_type_id`);

--
-- Index pour la table `delivery_mode_type`
--
ALTER TABLE `delivery_mode_type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `devis_line`
--
ALTER TABLE `devis_line`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9EC6D52933E1689A` (`command_id`);

--
-- Index pour la table `media_object`
--
ALTER TABLE `media_object`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B6BD307FA76ED395` (`user_id`),
  ADD KEY `IDX_B6BD307FE2904019` (`thread_id`);

--
-- Index pour la table `new_service`
--
ALTER TABLE `new_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_3ADEC93CA76ED395` (`user_id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B1DC7A1E33E1689A` (`command_id`);

--
-- Index pour la table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_9BACE7E1C74F2195` (`refresh_token`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `thread_user`
--
ALTER TABLE `thread_user`
  ADD PRIMARY KEY (`thread_id`,`user_id`),
  ADD KEY `IDX_922CAC7E2904019` (`thread_id`),
  ADD KEY `IDX_922CAC7A76ED395` (`user_id`);

--
-- Index pour la table `type_company`
--
ALTER TABLE `type_company`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `universe`
--
ALTER TABLE `universe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  ADD KEY `IDX_8D93D6498A98CCF3` (`type_company_id`);

--
-- Index pour la table `user_universe`
--
ALTER TABLE `user_universe`
  ADD PRIMARY KEY (`user_id`,`universe_id`),
  ADD KEY `IDX_81B8DC35A76ED395` (`user_id`),
  ADD KEY `IDX_81B8DC355CD9AF2` (`universe_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `benefit`
--
ALTER TABLE `benefit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT pour la table `command`
--
ALTER TABLE `command`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `delivery_mode`
--
ALTER TABLE `delivery_mode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `delivery_mode_type`
--
ALTER TABLE `delivery_mode_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `devis_line`
--
ALTER TABLE `devis_line`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `media_object`
--
ALTER TABLE `media_object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `new_service`
--
ALTER TABLE `new_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=271;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `thread`
--
ALTER TABLE `thread`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `type_company`
--
ALTER TABLE `type_company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `universe`
--
ALTER TABLE `universe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_D4E6F81A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `benefit`
--
ALTER TABLE `benefit`
  ADD CONSTRAINT `FK_5C8B001FA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_5C8B001FED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

--
-- Contraintes pour la table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_64C19C15CD9AF2` FOREIGN KEY (`universe_id`) REFERENCES `universe` (`id`),
  ADD CONSTRAINT `FK_64C19C1727ACA70` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`);

--
-- Contraintes pour la table `category_service`
--
ALTER TABLE `category_service`
  ADD CONSTRAINT `FK_2645DAAC12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_2645DAACED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `command`
--
ALTER TABLE `command`
  ADD CONSTRAINT `FK_8ECAEAD419EB6921` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_8ECAEAD4727ACA70` FOREIGN KEY (`parent_id`) REFERENCES `command` (`id`),
  ADD CONSTRAINT `FK_8ECAEAD47DFB3A94` FOREIGN KEY (`delivery_mode_id`) REFERENCES `delivery_mode` (`id`),
  ADD CONSTRAINT `FK_8ECAEAD4B517B89` FOREIGN KEY (`benefit_id`) REFERENCES `benefit` (`id`);

--
-- Contraintes pour la table `delivery_mode`
--
ALTER TABLE `delivery_mode`
  ADD CONSTRAINT `FK_46568F318B59E215` FOREIGN KEY (`delivery_mode_type_id`) REFERENCES `delivery_mode_type` (`id`),
  ADD CONSTRAINT `FK_46568F31B517B89` FOREIGN KEY (`benefit_id`) REFERENCES `benefit` (`id`);

--
-- Contraintes pour la table `devis_line`
--
ALTER TABLE `devis_line`
  ADD CONSTRAINT `FK_9EC6D52933E1689A` FOREIGN KEY (`command_id`) REFERENCES `command` (`id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK_B6BD307FA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_B6BD307FE2904019` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`id`);

--
-- Contraintes pour la table `new_service`
--
ALTER TABLE `new_service`
  ADD CONSTRAINT `FK_3ADEC93CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `FK_B1DC7A1E33E1689A` FOREIGN KEY (`command_id`) REFERENCES `command` (`id`);

--
-- Contraintes pour la table `thread_user`
--
ALTER TABLE `thread_user`
  ADD CONSTRAINT `FK_922CAC7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_922CAC7E2904019` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D6498A98CCF3` FOREIGN KEY (`type_company_id`) REFERENCES `type_company` (`id`);

--
-- Contraintes pour la table `user_universe`
--
ALTER TABLE `user_universe`
  ADD CONSTRAINT `FK_81B8DC355CD9AF2` FOREIGN KEY (`universe_id`) REFERENCES `universe` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_81B8DC35A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
