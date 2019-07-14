const router = require('koa-router')()
const SQL = require('../db/sql')
const STATUS = require('../utils/order')

/**
 * @interface b端订单接口
 * @post 设置订单的骑手
 * @put  更新订单的状态
 * @get  获取订单列表，按照状态分类
 */
router
    .post('/api/b/order', async ctx => {
        const query = ctx.request.body

        const {
            riderId,
            orderId
        } = query

        await SQL.ORDER.updateOrderRider(riderId, orderId).then(() => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })
    .put('/api/b/order', async ctx => {

        const query = ctx.request.body
        const {
            status,
            orderId
        } = query

        await SQL.ORDER.updateOrderStatus(status, orderId).then(() => {
            ctx.body = {
                code: 200,
                message: 'success'
            }
        })
    })
    .get('/api/b/order', async ctx => {

        let canteenId = ctx.query.canteenId

        const overview = await SQL.ORDER.findOrderOverview('canteenId', canteenId)
        const res = {
            fail: [],
            success: [],
            shipping: [],
            complete: [],
            comment: []
        }

        let address, rider, details

        for (let item of overview) {
            address = (await SQL.ADDRESS.searchAddress(item.addressId))[0]
            details = await SQL.ORDER.findOrderDetails(item.orderId)
            item.riderId ? rider = (await SQL.RIDER.findRider(item.riderId))[0] : rider = undefined

            let order = {
                orderId: item.orderId,
                price: item.price,
                status: item.status,
                shipping: item.shipping,
                orderDate: item.orderDate,
                address,
                rider,
                details,
                statusInfo: STATUS[item.status].value
            }
            switch (order.status) {
                case 0:
                    res.fail.push(order)
                    break;
                case 1:
                    res.success.push(order)
                    break;
                case 2:
                    res.shipping.push(order)
                    break;
                case 3:
                    res.complete.push(order)
                    break;
                case 4:
                    res.comment.push(order)
                    break;
                default:
                    break;
            }

        }

        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }
    })

module.exports = router