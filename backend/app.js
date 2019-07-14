const config = require('./config')
const Koa = require('koa')

const static = require('koa-static')
const koaBody = require('koa-body')

const cors = require('koa2-cors')
const registerRouters = require('./routers/index')

const error = require('./middlewares/error')
const info = require('./middlewares/info')
const varify = require('./middlewares/varify')

const path = require('path')
const app = new Koa()


// 错误处理
app.use(error())

// 请求输出
app.use(info())

// 静态文件
app.use(static(
    path.join(__dirname, config.staticPath)
))

// 解析 post请求体
// 包括 常见的form提交和文件提交a
app.use(koaBody({
    multipart: true
}))

// token解析
app.use(varify())

// cors
app.use(cors())

// 注册路由
app.use(registerRouters())

// 404 路由
app.use(ctx => {
    ctx.body = '<h1>Hello World.</h1>'
})

// 启动服务器
app.listen(config.port)

// info
console.log()
console.log(`[App] serve started at port : ${config.port}`)
console.log()