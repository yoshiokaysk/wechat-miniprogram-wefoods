const router = require('koa-router')()
/**
 * @interface b端食堂登录
 * @post 登录
 */
router
    .post('/api/b/login', async ctx => {

        const query = ctx.request.body

        const {
            username,
            password
        } = query

        // 这里仅作 西园 管理 
        if (username === 'user' && password === '123') {
            ctx.body = {
                code: 200,
                data: 1,
                message: 'suceess'
            }
        } else ctx.body = {
            code: 4,
            message: 'unauthorized'
        }
    })

module.exports = router