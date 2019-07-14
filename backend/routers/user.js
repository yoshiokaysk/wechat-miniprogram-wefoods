const SQL = require('../db/sql').USER
const router = require('koa-router')()

/**
 * @interface 用户接口
 * @get 获取用户信息
 */
router
    .get('/api/user', async ctx => {

        const token = ctx.token

        await SQL.findUserById(token.data).then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: 'success'
            }
        })
    })

module.exports = router