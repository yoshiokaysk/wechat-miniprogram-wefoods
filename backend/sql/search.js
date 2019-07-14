const query = require('../db/query')

module.exports = {
    /**
     * @查找食堂
     */
    searchCanteen: val => (query(`SELECT id,icon,name,shipping,monthSell,rate FROM v_canteen_list WHERE NAME LIKE '%${val}%'`)),
    /**
     * @查找餐品
     */
    searchFoods: val => (query(`SELECT * FROM v_foods_list WHERE foodName LIKE '%${val}%'`))
}