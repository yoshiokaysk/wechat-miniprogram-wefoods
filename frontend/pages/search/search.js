const KEY = 'SEARCH_HISTORY'
const API = require('../../utils/api')
Page({
  data: {
    value: '',
    history: [],
    canteen: [],
    foods: []
  },
  tapJumpTo(e) {
    const index = e.currentTarget.dataset.index
    const canteenId = this.data.foods[index].id
    wx.navigateTo({
      url: `../shop/shop?canteenId=${canteenId}`
    })
  },
  _search() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: API.search,
      data: {
        value: this.data.value
      },
      success: res => {
        this.setData({
          canteen: res.data.data.canteen,
          foods: res.data.data.foods
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  tapHistory(e) {
    const index = +e.target.dataset.index
    if (index === -1) {
      wx.removeStorage({
        key: KEY,
        success: () => {
          this.setData({
            history: []
          })
          wx.showToast({
            title: '成功清空',
          })
        }
      })
    } else {
      this.setData({
        value: this.data.history[index]
      })
      this._search()
    }
  },
  tapInput(e) {
    this.setData({
      value: e.detail.value,
    })
  },
  onShow() {
    wx.getStorage({
      key: KEY,
      success: res => {
        this.setData({
          history: res.data
        })
      }
    })
  },
  tapSearch() {
    const history = this.data.history
    const value = this.data.value

    if (!value) {
      return wx.showToast({
        title: '搜索内容为空！',
        icon: 'none'
      })
    }

    let isExist = history.some(item => {
      return item === value
    })
    if (!isExist) {
      history.push(value)
      this.setData({
        history
      })
      wx.setStorage({
        key: KEY,
        data: history,
      })
    }
    this._search()
  }
})