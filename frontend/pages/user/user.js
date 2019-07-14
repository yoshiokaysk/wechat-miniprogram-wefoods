const API = require('../../utils/api')

const MENU_MAIN = require('../../utils/constants').MENU_MAIN
const MENU_OTHTER = require('../../utils/constants').MENU_OTHER
const app = getApp()

Page({
  data: {
    user: {},
    mainMenu: null,
    otherMenu: null
  },
  onLoad: function() {
    // setData
    this.setData({
      mainMenu: MENU_MAIN,
      otherMenu: MENU_OTHTER
    })   
  },
  onShow: function(){
    this.setData({
      user: app.globalData.user
    })
  },  
  /**
   * @method 用户注册
   * @param {appid} 用户id
   */
  tapRegister: function() {
    const openId = app.globalData.openId
    if (openId.length > 0) {
      wx.getUserInfo({
        success: res => {
          let userInfo = JSON.parse(res.rawData)
          wx.request({
            url: API.register,
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              openId,
              nickName: userInfo.nickName,
              avatar: userInfo.avatarUrl
            },
            success: res => {
              //注册成功
              app.globalData.token = res.data.data.token
              this.setData({
                user: res.data.data.user
              })
            }
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  /**
   * @event 点击了菜单 进行跳转
   */
  tapMenu: function(e) {

    if (!app.globalData.token) {
      return wx.showToast({
        icon: 'none',
        title: '请先登录你的账户。'
      })
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: 'ERROR REQUEST。'
        })
      }
    })
  }
})