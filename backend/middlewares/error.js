/**
 * @异常捕获中间件
 */

module.exports = () => (async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: -1,
            data: err,
            message: 'fail'
        }
    }
})