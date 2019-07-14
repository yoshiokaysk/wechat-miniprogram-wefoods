const glob = require('glob')
const path = require('path')

// input'F:/app/sql/address.js'
// ouput address
const reg = /(?!\/)([^\/]+)(?=\.js)/g

let container = {}
let attribute = ''

/**
 * 读取 ./sql/*.js 
 * 导出 container = {
 *      ADDRESS: Object,
 *      CANTEEN: Object,
 *      ...
 *      ...
 * }
 */
glob.sync(path.resolve(__dirname, '../sql/*.js')).map(url => {
    attribute = url.match(reg)[0].toLocaleUpperCase()
    container[attribute] = require(url)
})

module.exports = container