const SQL = require('../db/sql').USER
const router = require('koa-router')()
const Token = require('../utils/token')
/**
 * @interface 注册接口
 * @post 注册用户
 */
router
    .post('/api/register', async (ctx, next) => {

        const {
            openId,
            nickName,
            avatar
        } = ctx.request.body

        // 缺少参数
        if (!openId || !nickName || !avatar) {
            return ctx.body = {
                code: 1,
                message: 'missing params'
            }
        }
        // 注册成功
        let res = await SQL.registerUser(openId, nickName, avatar)

        if (res) {
            let user = await SQL.findUserByOpenId(openId)
            user[0].coupon = 0

            ctx.body = {
                code: 200,
                data: {
                    user: user[0],
                    token: Token.encode(user[0].id)
                },
                message: 'success'
            }

        } else {
            ctx.body = {
                code: 3,
                message: 'register failed'
            }
        }
    })

module.exports = router