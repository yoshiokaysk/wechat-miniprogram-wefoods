const SQL = require('../db/sql').ADDRESS
const router = require('koa-router')()
/**
 * @interface 收货地址接口
 * @post   增加收货地址
 * @put    更新收货地址
 * @get    获取收货地址
 * @delete 删除收货地址
 */
router
    .post('/api/address', async ctx => {

        const query = ctx.request.body
        const token = ctx.token
        await SQL.insertAddress(
                [token.data, query.gender, query.contact, query.phone,
                    query.address, query.details, query.tag, 0, 0
                ])
            .then(() => {
                ctx.body = {
                    code: 200,
                    message: 'success'
                }

            })
    })
    .put('/api/address', async ctx => {

        const params = ctx.request.body
        await SQL.updateAddress(
            [params.gender, params.contact, params.phone,
                params.address, params.details, params.tag,
                params.latitude, params.longitude,
                params.id
            ]).then(() => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })
    .delete('/api/address/:id', async ctx => {

        const id = ctx.params.id

        await SQL.deleteAddress(id).then(() => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })

    })
    .get('/api/address', async ctx => {

        const token = ctx.token

        if (!token.verify) {
            return ctx.body = {
                code: 4,
                message: 'unauthorized'
            }
        }
        await SQL.findAddress(token.data).then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: 'success'
            }
        })
    })

module.exports = router