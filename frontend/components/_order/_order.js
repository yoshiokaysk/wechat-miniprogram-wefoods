const API = require('../../utils/api')
const STATUS = require('../../utils/status')
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    orders: {
      type: Object,
      value: []
    },
    canteenId: {
      type: Number,
      value: 0
    }
  },
  data: {
    activeType: 0,
    orderType: [{
      name: '失败订单',
      key: 'fail',
    }, {
      name: '付款成功',
      key: 'success',
    }, {
      name: '配送中',
      key: 'shipping'
    }, {
      name: '已完成',
      key: 'complete',
    }, {
      name: '已评价',
      key: 'comment',
    }],

    riderVisible: false,
    currentOrders: [],
    riders: [],

    orderId: ''
  },
  pageLifetimes: {
    show() {
      this._fetchRiders()
    }
  },
  methods: {
    tapRider(e) {
      const riderId = e.currentTarget.dataset.riderid
      wx.request({
        url: API._order,
        method: 'POST',
        data: {
          orderId: this.data.orderId,
          riderId
        },
        success: () => {
          wx.showToast({
            title: '操作成功'
          })
          this.triggerEvent('isReload')
          this.setData({
            currentOrders: this.data.orders['shipping']
          })
        },
        complete: () => {
          this.setData({
            riderVisible: false,
            orderId: ''
          })
        }
      })
    },
    /**
     * 获取所有骑手
     */
    _fetchRiders() {
      wx.request({
        url: API._rider,
        success: res => {
          this.setData({
            riders: res.data.data
          })
        }
      })
    },
    tapShipping(e) {
      const orderId = e.target.dataset.id
      this.setData({
        orderId,
        riderVisible: true
      })
    },
    tapComplete(e) {
      const orderId = e.target.dataset.id
      wx.request({
        url: API._order,
        method: 'PUT',
        data: {
          status: STATUS.COMPLETE_ORDER,
          orderId
        },
        success: () => {
          this.triggerEvent('isReload')
          this.setData({
            currentOrders: this.data.orders['shipping']
          })
        }
      })
    },
    tapTag(e) {
      const idx = e.target.dataset.index
      const key = e.target.dataset.key
      if (key) {
        this.setData({
          currentOrders: this.data.orders[key],
          activeType: idx
        })
      }
    },
    /**
     * 修改弹窗
     */
    isVisible(e) {
      const visible = e.detail.visible
      this.setData({
        riderVisible: visible
      })
    }
  }
})