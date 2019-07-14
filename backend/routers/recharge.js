const SQL = require('../db/sql').RECHARGE
const router = require('koa-router')()

/**
 * @interface 充值接口
 * @put 更新余额
 */
router
    .put('/api/recharge', async ctx => {


        const token = ctx.token
        const recharge = ctx.request.body.recharge

        if (recharge > 500) {
            return ctx.body = {
                code: 5,
                message: 'error'
            }
        }
        await SQL.updateBlance(token.data, recharge).then(() => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })

module.exports = router