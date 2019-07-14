const query = require('../db/query')

module.exports = {
    /**
     * @获取骑手信息
     */
    findRider: riderId => (query(`SELECT * FROM rider WHERE id = ?`, riderId)),
    /**
     * @获取所有骑手
     */
    getAllRider: () => (query(`SELECT * FROM rider`))
}