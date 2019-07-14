const Token = require('../utils/token')

/**
 * @拦截有token的请求并验证存储到ctx中
 */
module.exports = () => (async (ctx, next) => {

    // GET 请求
    let token = ctx.query.token

    // POST / PUT 请求
    if (!token && ctx.request.body) {
        token = ctx.request.body.token
    }
    // 验证token
    if (token) {
        const parseToken = Token.decode(token)
        if (!parseToken.verify) {
            return ctx.body = {
                code: 4,
                message: 'unauthorized'
            }
        } else {
            ctx.token = parseToken
        }
    }
    await next()
})