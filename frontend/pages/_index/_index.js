const app = getApp()
const API = require('../../utils/api')

Page({
  data: {
    username: 'user',
    password: '123'
  },
  onLoad() {},
  tapLogin(){
    wx.request({
      url: API._login,
      method: 'POST',
      data:{
        username: this.data.username,
        password: this.data.password,
      },
      success: res=>{
        app.globalData._canteenId = res.data.data
        wx.navigateTo({
          url: '../_manager/_manager',
        })
      }
    })
  },
  tapInput(e) {
    const key = e.currentTarget.dataset.key
    const val = e.detail.value
    this.setData({
      [key]: val,
    })
  },
})