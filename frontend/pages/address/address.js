const API = require('../../utils/api')
const app = getApp()
Page({
  data: {
    isLoading: true,
    address: []
  },
  onShow: function () {
    this._fetchAddress()
  },
  _fetchAddress: function () {
    wx.request({
      url: API.address,
      method: 'GET',
      data: {
        token: app.globalData.token
      },
      success: res => {
        this.setData({
          isLoading: false,
          address: res.data.data
        })
      },
      complete: () => (wx.hideLoading())
    })
  },
  /**
   * @event 点击编辑
   */
  tapEdit(e) {
    const item = e.currentTarget.dataset.item
    // 传值
    app.globalData.payload['type'] = 'edit'
    app.globalData.payload['data'] = item
    wx.navigateTo({
      url: '../addressOpreate/addressOpreate'
    })
  },
  /**
   * @event 点击新建
   */
  tapAdd(e) {
    // 传值
    app.globalData.payload['type'] = 'add'
    app.globalData.payload['data'] = null
    wx.navigateTo({
      url: '../addressOpreate/addressOpreate'
    })
  }
})