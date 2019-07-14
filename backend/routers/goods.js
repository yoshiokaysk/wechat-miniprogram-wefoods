const SQL = require('../db/sql')
const router = require('koa-router')()
const Utils = require('../utils/utils')
/**
 * @interface 食品接口
 * @get 获取所有食品
 */
router
    .get('/api/goods', async ctx => {

        const canteenId = ctx.query.canteenId

        if (Utils.isEmptyStr(canteenId)) {
            ctx.body = {
                code: 1,
                message: 'missing params'
            }
        }

        let sorts = await SQL.SORT.findAllSort(canteenId)

        for (let sort of sorts) {
            sort['goods'] = await SQL.GOODS.findGoods(sort.id)
        }

        ctx.body = {
            code: 200,
            data: sorts,
            message: 'success'
        }
    })

module.exports = router