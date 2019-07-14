const query = require('../db/query')

module.exports = {
    /**
     * @查找食堂信息
     */
    findCanteen: canteenId =>
        (query(`select * from v_canteen_list ${canteenId ? 'where id = '+ canteenId : ''}`)),
    /**
     * @查找食堂评分
     */
    findCanteenRating: canteenId =>
        (query(`select * from v_canteen_rate where id = ?`, canteenId)),
    /**
     * @更新食堂数据
     */
    updateCanteenInfo: (icon, notice, info, shipping, lowest, phone, id) =>
        (query('UPDATE canteen SET  icon=?,notice=?,info=?,shipping=?,lowest=?,phone=? WHERE id = ? ',
            [icon, notice, info, shipping, lowest, phone, id]))
}