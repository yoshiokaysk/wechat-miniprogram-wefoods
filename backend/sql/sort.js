const query = require('../db/query')

const SORT = {
    /**
     * @获取食堂下所有的分类
     */
    findAllSort: canteenId => (query('select * from sort where canteenId = ? order by weight ASC', canteenId)),
    /**
     * @更新分类信息
     */
    updateSort: (id, name, des, weight) => (query('UPDATE sort SET  name=?,des=?,weight=? WHERE id = ? ', [name, des, weight, id])),
    /**
     * @新增分类
     */
    insertSort: (canteenId, name, des, weight) => (query('insert into sort set canteenId=?,name=?,des=?,weight=?', [canteenId, name, des,weight]))
}

module.exports = SORT