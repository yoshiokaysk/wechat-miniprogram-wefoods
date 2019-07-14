const query = require('../db/query')
module.exports = {
    /**
     * @查找该种类的所有餐品
     */
    findGoods: sortId => (query('select * from goods where sortId = ? ', sortId)),
    /**
     * @更新餐品
     */
    updateGood: (id, name, icon, des, price, discount) => (query("UPDATE goods SET  name=?,icon=?,des=?,price=?,discount=? WHERE id = ?", [name, icon, des, price, discount, id])),
    /**
     * @新增餐品
     */
    insertGood: (sortId, name, icon, des, price, discount) => (query('insert into goods set sortId=?,name=?,icon=?,des=?,price=?,discount=?', [sortId, name, icon, des, price, discount]))
}