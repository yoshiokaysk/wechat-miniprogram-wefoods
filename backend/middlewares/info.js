/**
 * @请求提示中间件
 */

module.exports = options => (async (ctx, next) => {

    const req = ctx.request

    if (options && options.ignoreStatic && (/\.{1}/g).test(req.url)) return await next()

    console.log(
        `${new Date().toLocaleString()} [${req.method.toString().toUpperCase()}] :: ${req.url}`
    )
    await next()
})