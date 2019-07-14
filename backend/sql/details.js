const query = require('../db/query')

module.exports = {
    /**
     * @插入一条订单详情
     */
    insertAdetail: (goodsId, orderId, count) =>
        (query('insert into details set goodsId = ? , orderId = ? , count = ?', [goodsId, orderId, count]))
}