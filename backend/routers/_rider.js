const SQL = require('../db/sql').RIDER
const router = require('koa-router')()

/**
 * @interface b端骑手接口
 * @get  获取所有的骑手信息
 */
router
    .get('/api/b/rider', async ctx => {

        let res = await SQL.getAllRider()
        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }
    })


module.exports = router