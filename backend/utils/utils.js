/**
 * 工具包
 */
module.exports = {
    /**
     * 判断空字符串
     */
    isEmptyStr: str => {
        return typeof str === 'string' && str.length === 0
    },
    /**
     * 判断空数组
     */
    isEmptyArray: array => {
        return Object.prototype.toString.call(array) === "[object Array]" && array.length === 0
    },
    /**
     * 获取当前时间
     * 格式： 2019-03-23
     */
    getCurrentDate: () => {
        const dt = new Date()
        let y = dt.getFullYear(),
            m = dt.getMonth() + 1,
            d = dt.getDate()
        return `${y}-${m < 10 ? '0'+ m : m }-${d < 10 ? '0'+ d : d}`
    },
    /**
     * 渲染菜品概况
     * 如： 炒饭等6件商品
     */
    renderDetails: arr => {
        if (!Array.isArray(arr)) return;
        let len = arr.length,
            res = ''

        for (let i = 0; i < len && i < 3; i++) {
            res = res + arr[i].name + ' '
        }
        res = `${res}等${len}件商品`

        return res
    }
}