const SQL = require('../db/sql').CANTEEN
const router = require('koa-router')()
/**
 * @interface b端食堂接口
 * @get 获取食堂信息
 * @put 更新食堂信息
 */
router
    .put('/api/b/canteen', async ctx => {
        const {
            icon,
            notice,
            info,
            shipping,
            lowest,
            phone,
            id
        } = ctx.request.body

        await SQL.updateCanteenInfo(icon, notice, info, shipping, lowest, phone, id)
            .then(() => {
                ctx.body = {
                    code: 200,
                    message: 'success'
                }
            })
    })
    .get('/api/b/canteen', async ctx => {
        
        let canteenId = ctx.query.canteenId
        let res = await SQL.findCanteen(canteenId)
        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }
    })

module.exports = router