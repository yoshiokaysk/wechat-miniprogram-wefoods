const SQL = require('../db/sql').COUPON
const router = require('koa-router')()
const Utils = require('../utils/utils')
/**
 * @interface 优惠券接口
 * @get/canuse 获取可以使用的优惠券
 * @get/ 获取所有的优惠券
 */
router
    .get('/api/coupon/canuse', async ctx => {

        const token = ctx.token

        const total = ctx.query.total
        const date = Utils.getCurrentDate()

        await SQL.findCouponCanuse(token.data, total, date).then(res => {
            return ctx.body = {
                code: 200,
                data: res,
                message: 'success'
            }
        })
    })
    .get('/api/coupon', async ctx => {

        const token = ctx.token

        await SQL.findCoupon(token.data).then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: 'success'
            }
        })
    })


module.exports = router