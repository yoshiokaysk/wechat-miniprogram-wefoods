const router = require('koa-router')()
/**
 * @interface 天气详情接口
 * @get 随机生成天气返回
 */

const WEATHER = [{
    type: 'snow',
    tmpl: [1, 2, 3, 4, 5, 6, 7, 8]
}, {
    type: 'sun',
    tmpl: [15, 17, 22, 26, 32, 34, 36, 38]
}, {
    type: 'cloudy',
    tmpl: [10, 11, 13, 14, 16, 18, 22, 24]
}, {
    type: 'rain',
    tmpl: [8, 10, 13, 14, 16, 18, 20, 22]
}, {
    type: 'fog',
    tmpl: [9, 10, 13, 14, 16, 17, 19, 20]
}]

router
    .get('/api/weather', async (ctx, next) => {
        // 今天的日期作为随机数
        // 生成任意的天气信息
        const random = new Date().getDate()

        try {
            let weather = WEATHER[random % 5]
            let data = {
                type: weather.type,
                tmpl: weather.tmpl[random % 8]
            }

            ctx.body = {
                code: 200,
                data,
                message: 'success'
            }
        } catch (err) {
            ctx.body = {
                code: -1,
                data: {
                    type: 'sun',
                    tmpl: 12
                },
                message: 'fail'
            }
        }
    })

module.exports = router