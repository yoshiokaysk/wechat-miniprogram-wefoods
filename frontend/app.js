const API = require('./utils/api.js')
App({
  onLaunch: function () {
    // 请求登录
    wx.login({
      success: res => {
        wx.request({
          url: API.login.replace(':code', res.code),
          success: res => {
            if (res.data.code === 0) {
              // 未注册 
              this.globalData.openId = res.data.data.openid
            } else {
              // 登录成功
              this.globalData.token = res.data.data.token
              this.globalData.user = res.data.data.user
            }
          }
        })
      },
      fail: () => {
        /**
         * TEST 环境
         */
        wx.request({
          url: API.login.replace(':code', ''),
          method: 'POST',
          success: res => {

            // 登录成功
            this.globalData.token = res.data.data.token
            this.globalData.user = res.data.data.user
          }
        })
      }
    })
  },
  globalData: {
    // c端
    user: {},
    openId: '',
    payload: {
      type: '',
      data: null
    },
    cart: {},
    // b端
    _canteenId: 1,
  }
})