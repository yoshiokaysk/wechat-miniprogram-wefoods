const SQL = require('../db/sql')
const router = require('koa-router')()

function turnImgs(list) {
    list.forEach(item => {
        if (item.imgs) {
            item.imgs = item.imgs.split('$')
        } else item.imgs = []
    })
}
/**
 * @interface 评论接口
 * @get  获取评论
 * @post 新增评论
 */
router
    .post('/api/comment', async ctx => {

        const query = ctx.request.body

        let id = query.orderId,
            canteenId = query.canteenId,
            taste = query.taste,
            packages = query.package,
            delivery = query.delivery,
            content = query.content,
            imgs = query.imgs && (query.imgs).join('$'),
            time = query.time,
            type = (taste + packages + delivery) / 3 >= 3 ? '好评' : '差评'

        await SQL.ORDER.updateOrderStatus(4, id)
        // params
        await SQL.COMMENT.insertComment(id, canteenId, taste, packages, delivery, content, imgs, time, type).then(res => {
            return ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })
    .get('/api/comment', async ctx => {
        let canteenId = ctx.query.canteenId

        let sorts = await SQL.COMMENT.findCommentSorts(canteenId)
        let list = await SQL.COMMENT.findCommentList(canteenId)

        turnImgs(list)
        ctx.body = {
            code: 200,
            data: {
                sorts,
                list
            },
            message: 'success'
        }
    })


module.exports = router