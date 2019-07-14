const router = require('koa-router')()
const SQL = require('../db/sql').GOODS
/**
 * @interface b端餐品接口
 * @post 新增餐品
 * @put  更新餐品
 */
router
    .post('/api/b/goods', async ctx => {

        const {
            sortId,
            name,
            icon,
            des,
            price,
            discount
        } = ctx.request.body

        await SQL.insertGood(sortId,
            name,
            icon,
            des,
            price,
            discount).then(res => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })
    .put('/api/b/goods', async ctx => {

        const {
            id,
            name,
            icon,
            des,
            price,
            discount
        } = ctx.request.body

        await SQL.updateGood(id, name, icon, des, price, discount).then(res => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })

    })

module.exports = router