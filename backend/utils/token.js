const jwt = require('jsonwebtoken')
/**
 * JWT token设置
 * 主要用于验证身份
 * 更多配置见文档 https://www.npmjs.com/package/jsonwebtoken
 */
class Token {

    /**
     * @method 由payload生成JWT
     * @param {object} payload 
     * @param {string} time 
     */
    encode(payload, time = '2 days') {
        return jwt.sign(payload, 'token', typeof payload !== 'number' && typeof payload !== 'string' && {
            expiresIn: time
        })
    }

    /**
     * @method 解析jwt,返回响应
     * @param {string} token 
     */
    decode(token) {
        try {
            token = jwt.verify(token, 'token')
            return {
                verify: true,
                data: token
            }
        } catch (err) {
            return {
                verify: false,
                data: err
            }
        }
    }
}

module.exports = new Token()