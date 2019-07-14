/**
 *  后台配置文件
 */
module.exports = {
    // TODO
    // 不修改，前端部分固定了port

    port: 8086,

    // 静态文件
    staticPath: './static',

    // 微信小程序配置
    // 用于登录请求
    customer: {
        appid: 'wx85a68bdfcf0eac76',
        appsecret: '80a459b396467fa79b75bd8dd2144b05'
    }, 

    // 数据库设置
    database: {       
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'app'
    }
}