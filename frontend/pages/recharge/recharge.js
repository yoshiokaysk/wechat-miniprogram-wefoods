const API = require('../../utils/api')
const app = getApp()

Page({
  data: {
    balance: 0,
    recharge: 0
  },
  onLoad: function(options) {
    wx.request({
      url: API.user,
      method: 'GET',
      data: {
        token: app.globalData.token
      },
      success: res => {
        const balance = res.data.data[0].balance
        this.setData({
          balance
        })
      }
    })
  },
  /**
   * @evnet 提交事件
   */
  tapSubmit: function(e) {
    if (this.data.recharge < 0) return;

    wx.showToast({
      title: '正在提交...',
      icon: 'loading'
    })

    wx.request({
      url: API.recharge,
      method: 'PUT',
      data: {
        token: app.globalData.token,
        recharge: this.data.recharge
      },
      header: {
        'Content-type': 'application/json'
      },
      success: res => {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        this.setData({
          balance: +this.data.balance + +this.data.recharge,
          recharge: 0
        })
      }
    })
  },
  tapInput: function(e) {
    this.setData({
      recharge: e.detail.value,
    })
  }
})