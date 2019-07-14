const SQL = require('../db/sql')
const router = require('koa-router')()
const ORDER = require('../utils/order')
const util = require('../utils/utils')

router
    .post('/api/order', async ctx => {
        const query = ctx.request.body

        const date = util.getCurrentDate()
        const {
            canteenId,
            addressId,
            note,
            price,
            shipping,
        } = query

        const {
            couponId,
            foods
        } = query

        await SQL.ORDER.insertOrder(canteenId, addressId, note, date, price, shipping).then(async res => {
            const orderId = res.insertId
            if (couponId) {
                await SQL.COUPON.updateCoupon(couponId, orderId)
            }
            for (let food of foods) {
                let goodsId = food.id,
                    count = food.count
                await SQL.DETAILS.insertAdetail(goodsId, orderId, count)
            }
            ctx.body = {
                code: 200,
                data: {
                    orderId
                },
                message: 'success'
            }
        })


    })
    .get('/api/order', async ctx => {

        const token = ctx.token
        const overview = await SQL.ORDER.findOrderOverview('userId', token.data)
        const res = []

        let canteen, address, rider, details

        for (let item of overview) {
            canteen = (await SQL.CANTEEN.findCanteen(item.canteenId))[0]
            address = (await SQL.ADDRESS.searchAddress(item.addressId))[0]
            details = await SQL.ORDER.findOrderDetails(item.orderId)
            item.riderId ? rider = (await SQL.RIDER.findRider(item.riderId))[0] : rider = undefined

            res.push({
                orderId: item.orderId,
                price: item.price,
                status: item.status,
                shipping: item.shipping,
                orderDate: item.orderDate,
                canteen,
                address,
                rider,
                details,
                detailsInfo: util.renderDetails(details),
                statusInfo: ORDER[item.status].value
            })
        }

        // 排序
        res.sort((a, b) => (a.status > b.status))
        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }

    })


module.exports = router