const query = require('../db/query')

module.exports = {
    /**
     * @更新用户余额
     */
    updateBlance(userId, balance) {
        return query('UPDATE USER SET balance = balance + ? WHERE id = ?', [balance, userId])
    }
}