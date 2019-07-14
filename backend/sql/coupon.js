const query = require('../db/query')

module.exports = {
    /**
     * @更新优惠券
     */
    updateCoupon: (couponId, orderId) => (query(`UPDATE coupon SET orderId = ? where id = ?;`, [orderId, couponId])),
    /**
     * @获取用户的优惠券
     */
    findCoupon: userId => (query('select * from coupon where userId = ?', userId)),
    /**
     * @查找用户可用的优惠券
     */
    findCouponCanuse: (userId, total, date) => (query('select * from v_coupon_nouse as v where v.userId = ? and v.limit < ? and v.end > ?', [userId, total, date]))
}