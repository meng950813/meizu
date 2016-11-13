-- MySQL dump 10.13  Distrib 5.5.5-m3, for Win32 (x86)
--
-- Host: localhost    Database: forum
-- ------------------------------------------------------
-- Server version	5.5.5-m3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hot`
--

DROP TABLE IF EXISTS `hot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hot` (
  `count` int(11) DEFAULT NULL,
  `topic_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`topic_id`),
  CONSTRAINT `hot_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot`
--

LOCK TABLES `hot` WRITE;
/*!40000 ALTER TABLE `hot` DISABLE KEYS */;
INSERT INTO `hot` VALUES (2,16);
/*!40000 ALTER TABLE `hot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relevance`
--

DROP TABLE IF EXISTS `relevance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relevance` (
  `topic_id` int(11) NOT NULL DEFAULT '0',
  `weight` int(11) DEFAULT NULL,
  `rekey` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`topic_id`,`rekey`),
  CONSTRAINT `relevance_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relevance`
--

LOCK TABLES `relevance` WRITE;
/*!40000 ALTER TABLE `relevance` DISABLE KEYS */;
INSERT INTO `relevance` VALUES (7,2,'就是'),(7,3,'是的'),(7,1,'蝙蝠侠'),(8,2,'就是'),(8,3,'是的'),(8,1,'蝙蝠侠'),(9,2,'就是'),(9,3,'是的'),(9,1,'蝙蝠侠'),(10,2,'就是'),(10,3,'是的'),(10,1,'蝙蝠侠'),(11,2,'就是'),(11,3,'是的'),(11,1,'蝙蝠侠'),(12,2,'就是'),(12,3,'是的'),(12,1,'蝙蝠侠'),(13,2,'就是'),(13,3,'是的'),(13,1,'蝙蝠侠'),(14,2,'就是'),(14,3,'是的'),(14,1,'蝙蝠侠'),(15,2,'就是'),(15,3,'是的'),(15,1,'蝙蝠侠'),(16,2,'就是'),(16,3,'是的'),(16,1,'蝙蝠侠');
/*!40000 ALTER TABLE `relevance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `content` text,
  `from_user` int(11) DEFAULT NULL,
  `to_user` int(11) DEFAULT NULL,
  `lef` int(11) DEFAULT NULL,
  `righ` int(11) DEFAULT NULL,
  `from_user_name` varchar(10) DEFAULT NULL,
  `to_user_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,16,0,NULL,0,0,0,5,NULL,NULL),(2,16,1,'放屁，我才是蝙蝠侠',4,0,1,2,'tt',NULL),(3,16,1,'我是三楼我才是蝙蝠侠',4,0,3,4,'tt',NULL);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) DEFAULT '1',
  `name` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,NULL),(2,NULL),(3,NULL),(NULL,'a'),(1,'a');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) DEFAULT NULL,
  `content` text,
  `author_id` int(11) DEFAULT NULL,
  `create_time` date DEFAULT NULL,
  `modify_time` date DEFAULT NULL,
  `reply_count` int(11) DEFAULT '0',
  `read_count` int(11) DEFAULT '0',
  `praise_count` int(11) DEFAULT '0',
  `oppose_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (5,'test','hello,I am test',4,'2016-10-29',NULL,0,18,0,NULL),(6,'test2','hello,I am test',4,'2016-10-29',NULL,0,0,0,NULL),(7,'蝙蝠侠','是的，我就是蝙蝠侠。',4,'2016-10-29',NULL,0,16,0,NULL),(8,'aa蝙蝠侠','是的，我就是蝙蝠侠2。',4,'2016-10-29',NULL,0,0,0,NULL),(9,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,0,0,NULL),(10,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,0,0,NULL),(11,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,0,0,NULL),(12,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,0,0,NULL),(13,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,0,0,NULL),(14,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,0,0,NULL),(15,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,0,3,0,NULL),(16,'科大第一蝙蝠侠','是的，我就是蝙蝠侠3。',4,'2016-10-29',NULL,1,20,0,NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'tt',NULL,'123456',NULL),(5,'545',NULL,'555','42');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-13 15:15:15
