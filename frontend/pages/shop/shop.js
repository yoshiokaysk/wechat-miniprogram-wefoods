const API = require('../../utils/api')
Page({
  data: {
    isLoading: true,
    canteenId: -1,
    canteenInfo: {},
    rating: {},
    commentList: [],
    commentSorts: []  
  },
  onLoad: function(options) {
    // set id
    this.setData({
      canteenId: options.canteenId
    })
    // fetchData
    this._fetchRating()
    this._fetchInfo()
    this._fetchComment()
  },
  _fetchComment: function() {
    wx.request({
      url: API.comment,
      data: {
        canteenId: this.data.canteenId
      },
      success: res => {
        const data = res.data.data
        this.setData({
          commentList: data.list,
          commentSorts: data.sorts
        })
      }
    })
  },
  _fetchRating: function() {
    wx.request({
      url: API.canteenRating,
      data: {
        canteenId: this.data.canteenId
      },
      success: res => {
        this.setData({
          rating: res.data.data[0]
        })
      }
    })
  },
  _fetchInfo: function() {
    wx.request({
      url: API.canteen,
      data: {
        canteenId: this.data.canteenId
      },
      success: res => {
        this.setData({
          isLoading: false,
          canteenInfo: res.data.data[0]
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})