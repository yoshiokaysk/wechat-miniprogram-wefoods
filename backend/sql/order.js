const query = require('../db/query')

module.exports = {
    /**
     * @获取订单预览
     */
    findOrderOverview: (key, value) =>
        (query(`select * from v_order_overview where ${key} = ${value} `)),
    /**
     * @获取订单详情
     */
    findOrderDetails: orderId =>
        (query('select * from v_order_details where orderId = ? ', orderId)),
    /**
     * @更新订单状态
     */
    updateOrderStatus: (orderStatus, orderId) =>
        (query('UPDATE `order` SET status = ? WHERE id = ? ', [orderStatus, orderId])),
    /**
     * @更新订单骑手
     */
    updateOrderRider: (riderId, orderId) =>
        (query('UPDATE `order` SET riderId = ?,status = 2 WHERE id = ? ', [riderId, orderId])),
    /**
     * @新增一条订单
     */
    insertOrder: (canteenId, addressId, note, date, price, shipping) =>
        (query('insert into `order` set canteenId=?,addressId=?,note=?,date=?,price=?,shipping=?', [canteenId, addressId, note, date, price, shipping])),
}