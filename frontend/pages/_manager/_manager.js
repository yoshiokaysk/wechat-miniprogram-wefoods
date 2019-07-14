const app = getApp()
const API = require('../../utils/api')

Page({
  data: {
    canteenId: 0,
    canteenInfo: {},
    sortList: [],
    orders: {},
  },
  onReady: function () {
    this.setData({
      canteenId: app.globalData._canteenId
    })
    this._fetchCanteenInfo()
    this._fetchOrder()
    this._fetchSortList()
  },
  _fetchOrder() {
    wx.showLoading({
      title: '正在加载....'
    })
    wx.request({
      url: API._order,
      data: {
        canteenId: this.data.canteenId
      },
      success: res => {
        this.setData({
          orders: res.data.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  _fetchSortList() {
    wx.showLoading({
      title: '正在加载....'
    })
    wx.request({
      url: API.goods,
      data: {
        canteenId: this.data.canteenId
      },
      success: res => {
        const data = res.data.data
        data.forEach(item => {
          item['edit'] = false
        })
        this.setData({
          sortList: data
        })
      },
      fail: function () {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  _fetchCanteenInfo() {
    wx.showLoading({
      title: '正在加载....'
    })
    wx.request({
      url: API._canteen,
      data: {
        canteenId: this.data.canteenId
      },
      success: (res) => {
        this.setData({
          canteenInfo: res.data.data[0]
        })
      },
      fail: function () {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})