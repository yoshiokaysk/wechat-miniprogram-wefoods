const query = require('../db/query')

module.exports = {
    /**
     * @新增一条评论
     */
    insertComment: (id, canteenId, taste, packages, delivery, content, imgs, time, type) => (
        query('insert into comment(id,canteenId,taste,package,delivery,content,imgs,time,type) values(?,?,?,?,?,?,?,?,?) ',
            [id, canteenId, taste, packages, delivery, content, imgs, time, type])
    ),
    /**
     * @查找食堂的评论种类
     */
    findCommentSorts: async canteenId => {
        let res = await query(`SELECT canteenId, type, COUNT(*) AS amount FROM COMMENT  WHERE canteenId = ? GROUP BY type`, canteenId)
        let total = {
            canteenId: +canteenId,
            type: "全部",
            amount: 0
        }
        res.forEach(item => (total.amount += item.amount))
        res.unshift(total)
        return Promise.resolve(res)
    },
    /**
     * @查找食堂的所有评论
     */
    findCommentList: canteenId => (query('SELECT * FROM v_comment_list WHERE canteenId = ?', canteenId))
}