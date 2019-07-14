const SQL = require('../db/sql').CANTEEN
const router = require('koa-router')()
/**
 * @interface 食堂接口
 * @get/rating 获取食堂评分
 * @get/       获取食堂信息
 */
router
    .get('/api/canteen/rating', async ctx => {
        let canteenId = ctx.query.canteenId
        let res = await SQL.findCanteenRating(canteenId)
        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }
    })
    .get('/api/canteen', async ctx => {
        let canteenId = ctx.query.canteenId
        let res = await SQL.findCanteen(canteenId)
        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }
    })

module.exports = router