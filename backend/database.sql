/*
SQLyog Ultimate v12.3.1 (64 bit)
MySQL - 5.7.25-log : Database - app
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`app` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `app`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `userId` int(5) DEFAULT NULL COMMENT '所属用户id',
  `gender` int(1) DEFAULT NULL COMMENT '1 - 男 | 2 - 女',
  `contact` varchar(30) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `details` varchar(50) DEFAULT NULL,
  `tag` varchar(10) DEFAULT NULL,
  `latitude` varchar(10) DEFAULT NULL,
  `longitude` varchar(10) DEFAULT NULL,
  `isDelete` int(1) DEFAULT '0' COMMENT '0 - 非删除 | 1 - 删除',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `address` */

insert  into `address`(`id`,`userId`,`gender`,`contact`,`phone`,`address`,`details`,`tag`,`latitude`,`longitude`,`isDelete`) values 
(3,8,1,'李同学','15622105162','华山区','16栋','学校','0','0',1),
(8,8,1,'阿陈','156225424','泰山区','14栋','学校','0','0',0),
(9,8,2,'阿陈47','156222457','泰山区444','14栋120','sc','0','0',1),
(10,8,1,'陈同学','123456789','华山区','16栋','学校','0','0',1),
(11,8,2,'吴同学','987456','泰山区','7栋','宿舍','0','0',0);

/*Table structure for table `canteen` */

DROP TABLE IF EXISTS `canteen`;

CREATE TABLE `canteen` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `notice` varchar(80) DEFAULT NULL,
  `info` varchar(200) DEFAULT NULL,
  `icon` varchar(200) DEFAULT NULL,
  `latitude` varchar(10) DEFAULT NULL,
  `longitude` varchar(10) DEFAULT NULL,
  `shipping` float DEFAULT NULL,
  `lowest` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `canteen` */

insert  into `canteen`(`id`,`name`,`phone`,`address`,`notice`,`info`,`icon`,`latitude`,`longitude`,`shipping`,`lowest`) values 
(1,'西园','123456','华山区','用餐高峰期，请同学们提前下单。','西园历史悠久，至今已有十余年。公司食堂总建筑面积750平方米,共设座位500余个,为员工提供日常饭。','/canteen/xy.png','0','0',1,10),
(2,'芷园','0361464416','泰山区','用餐高峰期，请同学们提前下单。','目前没啥信息','/canteen/zy.png','0','0',5,8),
(3,'荷园','2514646487','启林区','用餐高峰期，请同学们提前下单。','目前没啥信息','/canteen/hy.png','0','0',2,4),
(4,'食园','123456','华山区','用餐高峰期，请同学们提前下单。','目前没啥信息','/canteen/sy.png','0','0',0,1);

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) DEFAULT NULL,
  `taste` int(5) DEFAULT NULL,
  `package` int(5) DEFAULT NULL,
  `delivery` int(5) DEFAULT NULL,
  `content` varchar(250) DEFAULT NULL,
  `imgs` varchar(250) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `canteenId` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `canteenId` (`canteenId`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`id`) REFERENCES `order` (`id`),
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`canteenId`) REFERENCES `canteen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

insert  into `comment`(`id`,`type`,`taste`,`package`,`delivery`,`content`,`imgs`,`time`,`canteenId`) values 
(31,'好评',1,4,5,'还不错，感觉能吃。','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.SKtAquceeJCC1f4f857aa29028d6c8aa66c09910c9d1.jpg','2019-4-2',1),
(32,'好评',4,4,5,'香菇滑鸡饭 美汁源果粒橙 无骨大鸡排 鱼豆腐 爆浆大鸡排 原味肠 蘑菇盖饭 大鸡排 招牌肥牛饭 麻辣香锅饭 西红柿鸡蛋饭 鸡排伴侣 香辣鱿鱼饭 招牌鸡排 红烧狮子头饭 红烧肉饭 康师傅绿茶 ','','2019-4-2',1),
(33,'好评',3,4,5,'好吃好评。','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.lk4ZumDOzRfx3c8634b0ad61962857cf19046d969163.webp$/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.2w2IIRYTT7FY18d23781acb4a8ef68f6ede619a76684.webp','2019-4-2',1),
(34,'好评',5,5,4,'无敌好吃 ：）','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.rjsvQ38lPmEue7a57ae49c188094d406bcc17ee46a48.jpg','2019-4-2',1),
(35,'好评',2,4,5,'我觉得很一般。','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.tKO9H0srA2EE7fbe05b37bfa6eb9d77514314ebfafac.jpg','2019-4-2',1),
(36,'好评',5,5,5,'完美叉烧','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.CV4vyKKDOqDva321315fee9bf14ba4d330b744eb78e2.webp','2019-4-2',1),
(37,'好评',3,3,5,'香菇滑鸡饭 美汁源果粒橙 无骨大鸡排 鱼豆腐 爆浆大鸡排 原味肠 蘑菇盖饭 大鸡排 招牌肥牛饭 麻辣香锅饭 西红柿鸡蛋饭 鸡排伴侣 香辣鱿鱼饭 招牌鸡排 红烧狮子头饭 红烧肉饭 康师傅绿茶 ','','2019-4-2',2),
(38,'差评',1,1,1,'','','2019-4-2',2),
(39,'好评',5,5,5,'五星好评啦。','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.6DwAQ13PI8iD1f1cc301b4fb541219d2036518f5e7fe.jpg$/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.dYO562reHGIq3c8634b0ad61962857cf19046d969163.webp','2019-4-2',2),
(40,'差评',1,1,1,'香菇滑鸡饭 美汁源果粒橙 无骨大鸡排 鱼豆腐 爆浆大鸡排 原味肠 蘑菇盖饭 大鸡排 招牌肥牛饭 麻辣香锅饭 西红柿鸡蛋饭 鸡排伴侣 香辣鱿鱼饭 招牌鸡排 红烧狮子头饭 红烧肉饭 康师傅绿茶 ','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.C3VLy3jNqpjeed9b32b82456c1bb088af10f1fb88c5f.webp','2019-4-2',2),
(41,'好评',1,4,5,'香菇滑鸡饭 美汁源果粒橙 无骨大鸡排 鱼豆腐 爆浆大鸡排 原味肠 蘑菇盖饭 大鸡排 招牌肥牛饭 麻辣香锅饭 西红柿鸡蛋饭 鸡排伴侣 香辣鱿鱼饭 招牌鸡排 红烧狮子头饭 红烧肉饭 康师傅绿茶 ','','2019-4-2',3),
(42,'差评',3,2,2,'香菇滑鸡饭 美汁源果粒橙 无骨大鸡排 鱼豆腐 爆浆大鸡排 原味肠 蘑菇盖饭 大鸡排 招牌肥牛饭 麻辣香锅饭 西红柿鸡蛋饭 鸡排伴侣 香辣鱿鱼饭 招牌鸡排 红烧狮子头饭 红烧肉饭 康师傅绿茶 ','','2019-4-2',3),
(43,'好评',3,3,3,'人生最幸福的事,莫过于有一群懂你的食客。','','2019-4-2',3),
(44,'差评',1,1,1,'难吃。。','','2019-4-2',4),
(45,'差评',2,1,2,'送太慢了','','2019-4-2',4),
(46,'好评',2,3,5,'我也是感觉还能吃得下。','/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.BG7FDknGT9os7fbe05b37bfa6eb9d77514314ebfafac.jpg$/upload/wx85a68bdfcf0eac76.o6zAJs7D9znxOEO0pGSsRNOoKJ_4.86iPJiCKnaG618d23781acb4a8ef68f6ede619a76684.webp','2019-4-2',1),
(47,'好评',3,4,5,'还不错啦！','','2019-4-2',2),
(48,'好评',3,4,3,'d\'da\'da','','2019-4-2',1);

/*Table structure for table `coupon` */

DROP TABLE IF EXISTS `coupon`;

CREATE TABLE `coupon` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `userId` int(5) DEFAULT NULL,
  `orderId` int(5) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `des` varchar(80) DEFAULT NULL,
  `limit` float DEFAULT '0',
  `amount` float DEFAULT NULL,
  `end` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `coupon_ibfk_4` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `coupon` */

insert  into `coupon`(`id`,`userId`,`orderId`,`name`,`des`,`limit`,`amount`,`end`) values 
(1,8,48,'新人优惠券','众所周知，是新人用的券。',0,10,'2020-02-29'),
(2,8,31,'普通优惠券','众所周知，是一张普通卷',5,10,'2019-04-29'),
(3,8,49,'优惠券','还是一张优惠券',1,8,'2019-04-29'),
(4,8,NULL,'新人优惠券','众所周知，是新人用的券。',0,10,'2019-04-29'),
(5,8,NULL,'优惠券','还是一张优惠券',2,10,'2019-04-29');

/*Table structure for table `details` */

DROP TABLE IF EXISTS `details`;

CREATE TABLE `details` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `orderId` int(5) NOT NULL,
  `goodsId` int(5) DEFAULT NULL,
  `count` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goodsId` (`goodsId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `details_ibfk_1` FOREIGN KEY (`goodsId`) REFERENCES `goods` (`id`),
  CONSTRAINT `details_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;

/*Data for the table `details` */

insert  into `details`(`id`,`orderId`,`goodsId`,`count`) values 
(46,31,11,1),
(47,31,12,1),
(48,32,12,2),
(49,32,13,1),
(50,33,1,2),
(51,33,2,1),
(52,34,1,1),
(53,34,2,1),
(54,34,3,1),
(55,34,9,2),
(56,34,10,2),
(57,35,12,1),
(58,35,13,1),
(59,36,11,1),
(60,36,13,1),
(61,37,15,1),
(62,37,16,1),
(63,37,17,1),
(64,38,15,2),
(65,39,20,1),
(66,39,21,1),
(67,40,15,2),
(68,41,23,1),
(69,41,25,1),
(70,42,23,1),
(71,43,24,1),
(72,44,27,1),
(73,45,28,2),
(74,46,12,1),
(75,46,13,1),
(76,47,17,1),
(77,47,20,1),
(78,48,11,2),
(79,48,13,1),
(80,49,11,3),
(81,50,11,3),
(82,50,12,4),
(83,51,15,3),
(84,51,16,2);

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `sortId` int(5) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `icon` varchar(200) DEFAULT NULL,
  `des` varchar(200) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `discount` float DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `sortId` (`sortId`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`sortId`) REFERENCES `sort` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

insert  into `goods`(`id`,`sortId`,`name`,`icon`,`des`,`price`,`discount`) values 
(1,1,'西园汤净面','/goods/stjm.jpg','上汤净面',10,0.8),
(2,1,'猪手面','/goods/zsm.jpg','猪手面',16,0.5),
(3,1,'云吞面','/goods/ytm.jpg','云吞面',11,0.6),
(4,2,'净捞面','/goods/jlm.jpg','里面是用牛腩汁，来拌面的',10,1),
(5,3,'原味河粉','/goods/hf.jpg','河粉',12,0.9),
(6,3,'牛肉河粉','/goods/hf.jpg','牛肉河粉',16,0.8),
(7,4,'生菜','/goods/sc.jpg','生菜',8,1),
(8,4,'煎蛋','/goods/jd.jpg','煎蛋',4,1),
(9,5,'白咖啡','/goods/cf.jpg','白咖啡',10,1),
(10,5,'绿茶','/goods/lc.jpg','绿茶',3,1),
(11,6,'港式烧鸭饭','/goods/syf.webp','港式烧鸭饭',12,1),
(12,6,'滑鸡饭','/goods/hjf.webp','就是很滑稽的饭咯',10,0.8),
(13,6,'排骨饭','/goods/pgf.webp','正宗排骨',22,0.5),
(14,6,'隆江猪脚饭','/goods/ljzz.webp','隆江猪脚饭',20,0.9),
(15,7,'烧鸭腿饭','/goods/sytf.webp','烧鸭腿饭',12,1),
(16,7,'排骨饭','/goods/pgf.webp','正宗排骨',12,1),
(17,7,'滑鸡饭','/goods/hjf.webp','就是很滑稽的饭咯',12,1),
(18,8,'冰红茶','/goods/bhc.webp','冰红茶',3,1),
(19,8,'菊花茶','/goods/jhc.webp','菊花茶',2.5,1),
(20,9,'云吞面','/goods/ytm.jpg','云吞面',4,1),
(21,9,'拌面','/goods/jlm.jpg','拌面',4,1),
(22,10,'排骨饭','/goods/pgf.webp','正宗排骨',10,0.8),
(23,10,'排骨饭(大份)','/goods/pgf.webp','正宗排骨',22,0.8),
(24,10,'港式烧鸭饭','/goods/syf.webp','港式烧鸭饭',10,1),
(25,11,'冰红茶','/goods/bhc.webp','冰红茶',4,1),
(26,11,'菊花茶','/goods/jhc.webp','菊花茶',1,1),
(27,12,'金牌叉烧','/goods/cs.webp','金牌叉烧',14,0.5),
(28,12,'金牌叉烧(大)','/goods/cs.webp','金牌叉烧',22,1),
(29,12,'金牌叉烧(超大)','/goods/cs.webp','金牌叉烧',28,1);

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `addressId` int(5) DEFAULT NULL,
  `riderId` int(5) DEFAULT NULL,
  `status` int(2) DEFAULT '1',
  `note` varchar(200) DEFAULT NULL,
  `canteenId` int(5) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `shipping` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_ibfk_1` (`addressId`),
  KEY `order_ibfk_2` (`riderId`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`riderId`) REFERENCES `rider` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

/*Data for the table `order` */

insert  into `order`(`id`,`addressId`,`riderId`,`status`,`note`,`canteenId`,`date`,`price`,`shipping`) values 
(31,8,1,4,'',1,'2019-04-02',11,1),
(32,8,1,4,'',1,'2019-04-02',28,1),
(33,8,2,4,'',1,'2019-04-02',25,1),
(34,8,2,4,'',1,'2019-04-02',49.6,1),
(35,8,1,4,'',1,'2019-04-02',20,1),
(36,8,1,4,'',1,'2019-04-02',24,1),
(37,8,3,4,'',2,'2019-04-02',41,5),
(38,8,3,4,'',2,'2019-04-02',29,5),
(39,11,2,4,'',2,'2019-04-02',13,5),
(40,11,1,4,'',2,'2019-04-02',29,5),
(41,8,1,4,'',3,'2019-04-02',23.6,2),
(42,8,1,4,'',3,'2019-04-02',19.6,2),
(43,8,2,4,'',3,'2019-04-02',12,2),
(44,8,1,4,'',4,'2019-04-02',7,0),
(45,8,2,4,'',4,'2019-04-02',44,0),
(46,8,3,4,'',1,'2019-04-02',20,1),
(47,8,1,4,'',2,'2019-04-02',21,5),
(48,11,1,4,'',1,'2019-04-02',26,1),
(49,8,NULL,1,'',1,'2019-04-04',29,1),
(50,8,NULL,1,'',1,'2019-04-05',69,1),
(51,8,NULL,1,'',2,'2019-04-08',65,5);

/*Table structure for table `rider` */

DROP TABLE IF EXISTS `rider`;

CREATE TABLE `rider` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `rider` */

insert  into `rider`(`id`,`name`,`phone`) values 
(1,'张三','08221654'),
(2,'李四','00688755'),
(3,'王五','55568711');

/*Table structure for table `sort` */

DROP TABLE IF EXISTS `sort`;

CREATE TABLE `sort` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `canteenId` int(5) DEFAULT NULL,
  `weight` int(10) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `des` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `canteenId` (`canteenId`),
  CONSTRAINT `sort_ibfk_1` FOREIGN KEY (`canteenId`) REFERENCES `canteen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `sort` */

insert  into `sort`(`id`,`canteenId`,`weight`,`name`,`des`) values 
(1,1,1,'汤面类','老广州，老味道。'),
(2,1,2,'捞面类','一种古老的特色传统面食品种。'),
(3,1,3,'河粉类','巨好吃的河粉。'),
(4,1,4,'加料类','吃不饱，这里还有。'),
(5,1,5,'饮料类','一些喝的！'),
(6,1,0,'港式类','港式正宗，我家最棒。'),
(7,2,1,'港式类','港式正宗，我家最棒。'),
(8,2,5,'饮料类','一些喝的！'),
(9,2,2,'汤面类','面食'),
(10,3,1,'港式类','港式正宗，我家最棒。'),
(11,3,2,'饮料类','饮料类'),
(12,4,1,'热销','热销');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `openId` varchar(30) NOT NULL COMMENT '小程序的用户id',
  `nickName` varchar(30) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  PRIMARY KEY (`id`,`openId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`openId`,`nickName`,`avatar`,`balance`) values 
(8,'ovkFd5ZS5C51-3lH3YKJ2qlXRO2A','prefixer','https://wx.qlogo.cn/mmopen/vi_32/jyX6tz2Iwq8ibhI9vldicziaicnbJJzMlYy1EZ6Tvz0pmI7HJvW1NkyRpmb4JI6lLNKjuwUd5Q4jIryMEvNkJy7sHQ/132',135);

/*Table structure for table `v_canteen_list` */

DROP TABLE IF EXISTS `v_canteen_list`;

/*!50001 DROP VIEW IF EXISTS `v_canteen_list` */;
/*!50001 DROP TABLE IF EXISTS `v_canteen_list` */;

/*!50001 CREATE TABLE  `v_canteen_list`(
 `id` int(5) ,
 `icon` varchar(200) ,
 `name` varchar(20) ,
 `shipping` float ,
 `lowest` float ,
 `notice` varchar(80) ,
 `info` varchar(200) ,
 `phone` varchar(11) ,
 `monthSell` bigint(21) ,
 `rate` decimal(10,1) 
)*/;

/*Table structure for table `v_canteen_rate` */

DROP TABLE IF EXISTS `v_canteen_rate`;

/*!50001 DROP VIEW IF EXISTS `v_canteen_rate` */;
/*!50001 DROP TABLE IF EXISTS `v_canteen_rate` */;

/*!50001 CREATE TABLE  `v_canteen_rate`(
 `id` int(5) ,
 `taste` decimal(10,1) ,
 `package` decimal(10,1) ,
 `delivery` decimal(10,1) ,
 `rate` decimal(10,1) 
)*/;

/*Table structure for table `v_comment_list` */

DROP TABLE IF EXISTS `v_comment_list`;

/*!50001 DROP VIEW IF EXISTS `v_comment_list` */;
/*!50001 DROP TABLE IF EXISTS `v_comment_list` */;

/*!50001 CREATE TABLE  `v_comment_list`(
 `canteenId` int(5) ,
 `imgs` varchar(250) ,
 `content` varchar(250) ,
 `id` int(5) ,
 `type` varchar(30) ,
 `uerId` int(5) ,
 `nickName` varchar(30) ,
 `avatar` varchar(200) ,
 `date` varchar(50) ,
 `rate` decimal(10,1) 
)*/;

/*Table structure for table `v_coupon_nouse` */

DROP TABLE IF EXISTS `v_coupon_nouse`;

/*!50001 DROP VIEW IF EXISTS `v_coupon_nouse` */;
/*!50001 DROP TABLE IF EXISTS `v_coupon_nouse` */;

/*!50001 CREATE TABLE  `v_coupon_nouse`(
 `id` int(5) ,
 `userId` int(5) ,
 `orderId` int(5) ,
 `name` varchar(60) ,
 `des` varchar(80) ,
 `limit` float ,
 `amount` float ,
 `end` varchar(50) 
)*/;

/*Table structure for table `v_foods_list` */

DROP TABLE IF EXISTS `v_foods_list`;

/*!50001 DROP VIEW IF EXISTS `v_foods_list` */;
/*!50001 DROP TABLE IF EXISTS `v_foods_list` */;

/*!50001 CREATE TABLE  `v_foods_list`(
 `id` int(5) ,
 `canteenName` varchar(20) ,
 `canteenIcon` varchar(200) ,
 `foodName` varchar(60) ,
 `foodIcon` varchar(200) ,
 `price` float ,
 `discount` float 
)*/;

/*Table structure for table `v_order_details` */

DROP TABLE IF EXISTS `v_order_details`;

/*!50001 DROP VIEW IF EXISTS `v_order_details` */;
/*!50001 DROP TABLE IF EXISTS `v_order_details` */;

/*!50001 CREATE TABLE  `v_order_details`(
 `id` int(5) ,
 `name` varchar(60) ,
 `icon` varchar(200) ,
 `price` float ,
 `discount` float ,
 `orderId` int(5) ,
 `count` int(5) 
)*/;

/*Table structure for table `v_order_overview` */

DROP TABLE IF EXISTS `v_order_overview`;

/*!50001 DROP VIEW IF EXISTS `v_order_overview` */;
/*!50001 DROP TABLE IF EXISTS `v_order_overview` */;

/*!50001 CREATE TABLE  `v_order_overview`(
 `status` int(2) ,
 `canteenId` int(5) ,
 `riderId` int(5) ,
 `addressId` int(5) ,
 `userId` int(5) ,
 `orderDate` varchar(50) ,
 `price` float ,
 `shipping` float ,
 `orderId` int(5) 
)*/;

/*View structure for view v_canteen_list */

/*!50001 DROP TABLE IF EXISTS `v_canteen_list` */;
/*!50001 DROP VIEW IF EXISTS `v_canteen_list` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_canteen_list` AS (select `c`.`id` AS `id`,`c`.`icon` AS `icon`,`c`.`name` AS `name`,`c`.`shipping` AS `shipping`,`c`.`lowest` AS `lowest`,`c`.`notice` AS `notice`,`c`.`info` AS `info`,`c`.`phone` AS `phone`,count(`m`.`id`) AS `monthSell`,cast(avg((((`m`.`taste` + `m`.`package`) + `m`.`delivery`) / 3)) as decimal(10,1)) AS `rate` from (`canteen` `c` left join `comment` `m` on((`c`.`id` = `m`.`canteenId`))) group by `c`.`id`) */;

/*View structure for view v_canteen_rate */

/*!50001 DROP TABLE IF EXISTS `v_canteen_rate` */;
/*!50001 DROP VIEW IF EXISTS `v_canteen_rate` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_canteen_rate` AS (select `c`.`id` AS `id`,cast(avg(`m`.`taste`) as decimal(10,1)) AS `taste`,cast(avg(`m`.`package`) as decimal(10,1)) AS `package`,cast(avg(`m`.`delivery`) as decimal(10,1)) AS `delivery`,cast(avg((((`m`.`taste` + `m`.`package`) + `m`.`delivery`) / 3)) as decimal(10,1)) AS `rate` from (`canteen` `c` join `comment` `m` on((`c`.`id` = `m`.`canteenId`))) group by `c`.`id`) */;

/*View structure for view v_comment_list */

/*!50001 DROP TABLE IF EXISTS `v_comment_list` */;
/*!50001 DROP VIEW IF EXISTS `v_comment_list` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_comment_list` AS (select `c`.`canteenId` AS `canteenId`,`c`.`imgs` AS `imgs`,`c`.`content` AS `content`,`c`.`id` AS `id`,`c`.`type` AS `type`,`u`.`id` AS `uerId`,`u`.`nickName` AS `nickName`,`u`.`avatar` AS `avatar`,`o`.`date` AS `date`,cast((((`c`.`delivery` + `c`.`taste`) + `c`.`package`) / 3) as decimal(10,1)) AS `rate` from (((`comment` `c` join `order` `o` on((`c`.`id` = `o`.`id`))) join `address` `a` on((`o`.`addressId` = `a`.`id`))) join `user` `u` on((`a`.`userId` = `u`.`id`)))) */;

/*View structure for view v_coupon_nouse */

/*!50001 DROP TABLE IF EXISTS `v_coupon_nouse` */;
/*!50001 DROP VIEW IF EXISTS `v_coupon_nouse` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_coupon_nouse` AS (select `coupon`.`id` AS `id`,`coupon`.`userId` AS `userId`,`coupon`.`orderId` AS `orderId`,`coupon`.`name` AS `name`,`coupon`.`des` AS `des`,`coupon`.`limit` AS `limit`,`coupon`.`amount` AS `amount`,`coupon`.`end` AS `end` from `coupon` where isnull(`coupon`.`orderId`)) */;

/*View structure for view v_foods_list */

/*!50001 DROP TABLE IF EXISTS `v_foods_list` */;
/*!50001 DROP VIEW IF EXISTS `v_foods_list` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_foods_list` AS (select `c`.`id` AS `id`,`c`.`name` AS `canteenName`,`c`.`icon` AS `canteenIcon`,`g`.`name` AS `foodName`,`g`.`icon` AS `foodIcon`,`g`.`price` AS `price`,`g`.`discount` AS `discount` from ((`canteen` `c` join `sort` `s` on((`s`.`canteenId` = `c`.`id`))) join `goods` `g` on((`g`.`sortId` = `s`.`id`)))) */;

/*View structure for view v_order_details */

/*!50001 DROP TABLE IF EXISTS `v_order_details` */;
/*!50001 DROP VIEW IF EXISTS `v_order_details` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_order_details` AS (select `g`.`id` AS `id`,`g`.`name` AS `name`,`g`.`icon` AS `icon`,`g`.`price` AS `price`,`g`.`discount` AS `discount`,`d`.`orderId` AS `orderId`,`d`.`count` AS `count` from (`goods` `g` join `details` `d`) where (`g`.`id` = `d`.`goodsId`)) */;

/*View structure for view v_order_overview */

/*!50001 DROP TABLE IF EXISTS `v_order_overview` */;
/*!50001 DROP VIEW IF EXISTS `v_order_overview` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_order_overview` AS (select `o`.`status` AS `status`,`o`.`canteenId` AS `canteenId`,`o`.`riderId` AS `riderId`,`a`.`id` AS `addressId`,`a`.`userId` AS `userId`,`o`.`date` AS `orderDate`,`o`.`price` AS `price`,`o`.`shipping` AS `shipping`,`o`.`id` AS `orderId` from (`order` `o` join `address` `a` on((`o`.`addressId` = `a`.`id`))) order by `o`.`date` desc) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
