// 数据库配置文件
const config = require('../config').database

const mysql = require('mysql')
const pool = mysql.createPool(config)

/**
 * @method 数据库query
 * @param {string}  
 * @param {array}  
 */
module.exports = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(err)
            conn.query(sql, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
                conn.release()
            })
        })
    })
}