const app = getApp()
const API = require('../../utils/api')

Page({
  data: {
    isLoading: true,
    orders: [],
    currentOrders: [],
    orderType: [{
      name: '全部订单',
      key: -1
    }, {
      name: '失败订单',
      key: 0,
    }, {
      name: '付款成功',
      key: 1,
    }, {
      name: '配送中',
      key: 2
    }, {
      name: '已完成',
      key: 3,
    }, {
      name: '已评价',
      key: 4,
    }],
    activeType: -1
  },
  onShow() {
    this._fetchOrder()
  },
  _filter(key) {
    if (key === -1) {
      this.setData({
        activeType: key,
        currentOrders: this.data.orders
      })
    } else {
      this.setData({
        activeType: key,
        currentOrders: this.data.orders.filter(item => (item.status === key))
      })
    }
  },
  tapTag(e) {
    const key = +e.target.dataset.key
    if (typeof key != 'number') return;
    this._filter(key)
  },
  tapAgain(e) {
    const index = e.currentTarget.dataset.index
    const id = this.data.orders[index].canteen.id
    wx.navigateTo({
      url: `../shop/shop?canteenId=${id}`,
    })
  },
  tapComment(e) {
    const index = e.currentTarget.dataset.index
    app.globalData.payload['type'] = 'comment'
    app.globalData.payload['data'] = this.data.currentOrders[index]
    wx.navigateTo({
      url: '../comment/comment'
    })
  },
  tapItem(e) {
    const index = e.currentTarget.dataset.index
    app.globalData.payload['type'] = 'details'
    app.globalData.payload['data'] = this.data.currentOrders[index]
    wx.navigateTo({
      url: '../details/details'
    })
  },
  _fetchOrder() {
    this.setData({
      isLoading: true
    })
    wx.request({
      url: API.order,
      data: {
        token: app.globalData.token
      },
      success: res => {
        this.setData({
          isLoading: false,
          orders: res.data.data
        })

      },
      complete: () => {
        this._filter(-1)
        wx.hideLoading()
      }
    })
  }
})