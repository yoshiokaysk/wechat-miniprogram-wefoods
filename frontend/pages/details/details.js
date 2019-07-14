const app = getApp()
Page({
  data: {
    details: {}
  },
  onShow: function() {
    this.setData({
      details: app.globalData.payload['data']
    })
  }
})