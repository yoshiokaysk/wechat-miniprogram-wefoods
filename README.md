## wefoods

微信小程序 + Nodejs + MySQL + HTTP。

### 前言

wefoods是一个外卖系统，包含客户端和服务端，使用HTTP作为C/S通信协议，用微信小程序作为前端界面的展示，分为用户端和商家端，商家端入口在 “我的” 页面菜单栏中，前端样式模仿时下流行的外卖应用。
使用Nodejs(Koa2)和MySQL开发服务端，服务端大部分接口都遵循RESTful规范。


### 开发工具和环境

- Nodejs(>v7.6.0)  

    服务端开发语言。

- Nodemon

    nodejs模块，监听代码修改，自动重启服务。

- Postman		 

    模拟HTTP请求，用于测试服务端的接口服务。

- VSCode 		  

    非常适合Nodejs开发的IDE。

- 微信开发者工具   

    小程序官方提供的IDE。

- MySQL(v5.7)		

    服务端数据库。
- SQLyog				

    数据库图形界面工具，便于管理数据库。

### 服务端启动指南

backend目录下是服务端的源代码，以下命令都在此目录下执行。

1. 初始化数据库

   在MySQL中执行 `./database.sql` 文件，数据库名字默认为 `app`。

2. 修改配置文件
    
   修改 `./config.js` 配置文件，填写你的数据库信息，填写你的微信小程序 `appid`和 `appsecret`。

3. 安装Node依赖

   项目终端下执行 `npm install`。

4. 启动服务

   项目终端下执行 `npm run dev`，此时会监听代码修改，自动重启服务。

5. 服务启动在本地的 8086 端口。


### 前端启动指南

frontend目录下是服务端的源代码，以下命令都在此目录下执行。

1. 修改配置文件

   修改 `./project.config.json` 配置文件,填写你的微信小程序 `appid`。

2. 微信开发者工具启动即可


### 系统预览


#### 服务端运行预览

![Where is my image?](https://github.com/Lemonreds/wechat-miniprogram-wefoods/blob/master/preview/b1.png)

#### 前端运行预览

![Where is my image?](https://github.com/Lemonreds/wechat-miniprogram-wefoods/blob/master/preview/01.png)
![Where is my image?](https://github.com/Lemonreds/wechat-miniprogram-wefoods/blob/master/preview/02.png)
![Where is my image?](https://github.com/Lemonreds/wechat-miniprogram-wefoods/blob/master/preview/03.png)
![Where is my image?](https://github.com/Lemonreds/wechat-miniprogram-wefoods/blob/master/preview/04.png)
