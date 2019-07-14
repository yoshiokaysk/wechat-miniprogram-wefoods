const API = require('../../utils/api')
const utils = require('../../utils/util')
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    canteenId: {
      type: Number
    },
    canteenInfo: {
      type: Object,
      value: {}
    }
  },
  data: {
    cartVisible: false,
    goods: [],
    active: 0,
    foods: [],
    length: 0,
    total: 0
  },
  lifetimes: {
    ready() {
      this._fetchGoods()
    }
  },
  pageLifetimes: {
    show() {
      this.setData({
        foods: [],
        total: 0,
        length: 0
      })
    }
  },
  methods: {
    _fetchGoods() {
      wx.request({
        url: API.goods,
        data: {
          canteenId: this.data.canteenId
        },
        success: res => {
          this.setData({
            goods: res.data.data
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    tapClearAll() {
      this.setData({
        foods: [],
        length: 0,
        total: 0,
        cartVisible: false
      })
    },
    /**
     * @event 选择菜单项
     */
    tapActive(e) {
      const id = +e.currentTarget.id
      if (this.data.active !== id) {
        this.setData({
          active: id
        })
      }
    },
    /**
     * @event 增加减少食品
     */
    tapOp(e) {

      const type = e.target.dataset.type
      const {
        id,
        price,
        name,
        icon,
        discount
      } = e.currentTarget.dataset.item
      let {
        length,
        foods,
        total
      } = this.data


      let amount = price * discount

      if (type == 'add') {
        if (foods.hasOwnProperty(id)) {
          foods[id].count++;
        } else {
          foods[id] = {
            id,
            price,
            discount,
            name,
            icon,
            count: 1
          }
        }
        length++
        total += amount
      } else if (type == 'sub') {
        foods[id].count--;
        length--
        total -= amount
      }



      this.setData({
        foods,
        length,
        total: +total.toFixed(2)
      })
    },
    /**
     * @event 点击购物车
     */
    tapCart() {
      this.setData({
        cartVisible: !this.data.cartVisible
      })
    },
    _compact(arr) {
      return arr.filter(current => {
        return current && current.count != 0
      })
    },
    /**
     * 点击结算
     */
    tapSettle(e) {
      const data = this.data
      if (data.total < data.canteenInfo.lowest) {
        return wx.showToast({
          title: '未达到最低起送费',
          icon: 'none'
        })
      }
      app.globalData.cart = {
        canteenId: data.canteenId,
        foods: this._compact(data.foods),
        total: data.total
      }
      wx.navigateTo({
        url: '../../pages/pay/pay',
      })
    },
    /**
     * @evnet 修改弹窗
     */
    isVisible(e) {
      const visible = e.detail.visible
      this.setData({
        cartVisible: visible
      })
    },
    tapActive(e) {
      const id = e.currentTarget.id
      this.setData({
        active: +id
      })
      this.createSelectorQuery().select('#tips' + id).boundingClientRect(res => {
        const top = res.top
        wx.pageScrollTo({
          scrollTop: top,
          duration: 400
        })
      }).exec()

    }
  }
})