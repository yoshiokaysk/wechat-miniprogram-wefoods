const SQL = require('../db/sql').SEARCH
const router = require('koa-router')()

/**
 * @interface 查询接口
 * @get
 */
router
    .get('/api/search', async ctx => {

        const value = ctx.query.value
        const result = {}

        let centeenRes = await SQL.searchCanteen(value)
        let foodsRes = await SQL.searchFoods(value)
        result['canteen'] = centeenRes
        result['foods'] = foodsRes
        
        return ctx.body = {
            code: 200,
            data: result,
            message: 'success'
        }

    })

module.exports = router