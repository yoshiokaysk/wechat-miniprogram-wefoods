const router = require('koa-router')()
const SQL = require('../db/sql').SORT

/**
 * @interface b端分类接口
 * @post 增加新的分类
 * @put  更新分类
 */
router
    .post('/api/b/sort', async ctx => {
        const query = ctx.request.body

        const {
            canteenId,
            name,
            des,
            weight
        } = query

        await SQL.insertSort(canteenId, name, des, weight).then(() => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })
    .put('/api/b/sort', async ctx => {

        const query = ctx.request.body

        const {
            id,
            name,
            des,
            weight
        } = query

        await SQL.updateSort(id, name, des, weight).then(res => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })

    })

module.exports = router