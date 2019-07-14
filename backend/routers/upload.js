const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

/**
 * @interface 上传接口
 * @post key=file
 */


/**
 * @method 存储到本地硬盘
 * @param {file} file 
 * @return {string} 绝对路径
 */
function storage(file) {
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(path.join(__dirname, '../static/upload', file.name))
    reader.pipe(writer)
    return '/upload/' + file.name
}
router
    .post('/api/upload', async (ctx, next) => {

        try {

            let files = ctx.request.files.file
            let path = ''

            if (Array.isArray(files)) {
                path = []
                for (let file of files) {
                    path.push(storage(file))
                }
            } else path = storage(files)
            ctx.set("Content-Type", "application/json")
            ctx.body = {
                code: 200,
                path,
                message: 'success'
            }
        } catch (err) {
            console.error(err)
            ctx.body = {
                code: -1,
                message: `error [${err}]`
            }
        }
    })

module.exports = router