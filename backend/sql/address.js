const query = require('../db/query')

module.exports = {
    /**
     * 插入一条收货地址信息
     * @param {object} array
     */
    insertAddress: address => (query(`insert into address set userId=?,gender=?,contact=?,phone=?,address=?,details=?,tag=?,longitude=?,latitude=?;`, address)),
    /**
     * 删除一条地址信息
     * @param {addressId} addressId 
     */
    deleteAddress: addressId => (query(`UPDATE address SET isDelete = 1 where id = ${addressId};`)),
    /**
     * 查找指定用户的收货地址信息
     * @param {string} userId 
     */
    findAddress: userId => (query(`select * from address where userId = ? and isDelete = 0;`, userId)),
    /**
     * 更新收货地址信息
     * @param {object} address 
     */
    updateAddress: address => (query('update address set gender=?,contact=?,phone=?,address=?,details=?,tag=?,longitude=?,latitude=? where id = ?;', address)),
    /**
     * 查找收货地址信息
     * @param {addressId} addressId 
     */
    searchAddress: addressId => (query('select * from address where id = ?', addressId))
}