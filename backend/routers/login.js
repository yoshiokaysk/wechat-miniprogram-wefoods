const config = require('../config')
const SQL = require('../db/sql')
const Utils = require('../utils/utils')
const Token = require('../utils/token')

const axios = require('axios')
const router = require('koa-router')()
/**
 * @method 小程序验证,获取appid
 * @param {string} code 
 */
const wechat_auth = code => {

    return new Promise((resolve, reject) => {
        axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                grant_type: 'authorization_code',
                appid: config.customer.appid,
                secret: config.customer.appsecret,
                js_code: code
            }
        }).then(res => {
            resolve({
                code: 200,
                openid: res.data.openid,
                message: 'success'
            })
        }).catch(err => {
            console.error(err)
            reject({
                code: -1,
                data: err,
                message: 'fail'
            })
        })

    })

}
/**
 * @interface 登录接口
 * @get 获取登陆信息
 */
router
    .get('/api/login/:code', async (ctx, next) => {
        let auth = await wechat_auth(ctx.params.code)
        let res = await SQL.USER.findUserByOpenId(auth.openid)
        // 用户不存在 返回openid
        if (Utils.isEmptyArray(res)) {
            ctx.body = {
                code: 0,
                data: {
                    openid: auth.openid
                },
                message: 'unregistered user'
            }
        } else {
            // 登录成功 返回用户数据和token    
            let coupon = await SQL.COUPON.findCoupon(res[0].id)
            res[0].coupon = coupon.length

            ctx.body = {
                code: 200,
                data: {
                    user: res[0],
                    token: Token.encode(res[0].id)
                },
                message: 'success'
            }
        }
    })
    /**
     * 
     * 用于测试的接口
     * 
     */
    .post('/api/login', async (ctx, next) => {

        let res = await SQL.USER.findUserByOpenId('ovkFd5ZS5C51-3lH3YKJ2qlXRO2A')

        // 登录成功 返回用户数据和token    
        let coupon = await SQL.COUPON.findCoupon(res[0].id)
        res[0].coupon = coupon.length

        ctx.body = {
            code: 200,
            data: {
                user: res[0],
                token: Token.encode(res[0].id)
            },
            message: 'success'
        }
    })


module.exports = router