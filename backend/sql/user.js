const query = require('../db/query')

const USER = {
    /**
     * @注册用户
     */
    registerUser: (openId, nickName, avatar) => (query(`insert into user(openId,nickName,avatar,balance) values('${openId}','${nickName}','${avatar}',0);`)),
    /**
     * @查找用户
     */
    findUserByOpenId: (openId) => (__findUser('openId', openId)),
    /**
     * @查找用户
     */
    findUserById: (id) => (__findUser('id', id)),
    /**
     * @查找用户
     */

}

__findUser = function (type, value) {
    return query(`select * from user where ${type} = '${value}'`)
}

module.exports = USER