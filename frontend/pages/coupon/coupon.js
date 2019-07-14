const app = getApp()
const API = require('../../utils/api')

Page({
  data: {
    coupon: []
  },
  onLoad: function() {
    wx.request({
      url: API.coupon,
      method: 'GET',
      data: {
        token: app.globalData.token
      },
      success: res => {
        // 格式化优惠券的日期
        // 过滤掉被使用的优惠券
        res.data.data.map(coupon => {
          if (coupon.end) {
            coupon.end = '' + coupon.end.match(/^\d{4}-\d{2}-\d{2}/g)[0]
          }
        })
        res.data.data.filter(coupon => (coupon.orderId === -1))
        // update
        this.setData({
          coupon: res.data.data
        })
      }
    })
  }
})