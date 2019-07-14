const app = getApp()
const API = require('../../utils/api')

Page({
  data: {
    canteenId: 0,
    canteenInfo: {},
    foods: [],
    total: 0,
    selectAddress: {},
    userAddress: [],
    selectCoupon: {},
    userCoupon: [],
    note: '',
    popAddress: false,
    popCoupon: false
  },
  onShow: function () {
    const data = app.globalData.cart
    this.setData({
      canteenId: data.canteenId,
      foods: data.foods,
      total: data.total
    })
    // 获取食堂的信息
    this.fetchCanteenInfo()
    this.fetchuserAddress()
    this.fetchCoupon()
  },
  /**
   * @evnet 提交订单信息
   */
  tapSubmitOrder() {
    const data = this.data
    wx.request({
      url: API.order,
      method: 'POST',
      data: {
        canteenId: data.canteenId,
        addressId: data.selectAddress.id,
        note: data.note,
        price: data.total,
        shipping: data.canteenInfo.shipping,
        foods: data.foods,
        couponId: data.selectCoupon.id
      },
      success: () => {
        wx.showToast({
          title: '支付成功',
        })
        wx.navigateBack()
      }
    })
  },
  tapCoupon(e) {
    if (this.data.userCoupon.length === 0) return;
    this.setData({
      popCoupon: true
    })
  },
  tapInput(e) {
    this.setData({
      note: e.detail.value,
    })
  },
  /**
   * @method 获取可用优惠券
   */
  fetchCoupon() {
    wx.request({
      url: API.couponCanuse,
      data: {
        token: app.globalData.token,
        total: this.data.total
      },
      success: res => {
        const data = res.data.data.map(item => {
          item.end = item.end.substring(0, 7)
          return item
        })
        this.setData({
          userCoupon: data
        })
      }
    })
  },
  tapCreateAddress() {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  /**
   * @envet 选择优惠券
   */
  tapSelectCoupon(e) {
    const index = e.currentTarget.dataset.index
    const coupon = this.data.userCoupon[index]



    let total = 0
    // 之前使用过优惠券,变化价格
    if (this.data.selectCoupon.id) {
      total = this.data.total - coupon.amount + this.data.selectCoupon.amount
    } else {
      total = this.data.total - coupon.amount
    }

    this.setData({
      selectCoupon: coupon,
      popCoupon: false,
      total: total
    })

  },
  /**
   * @envet 选择地址
   */
  tapSelectAddress(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectAddress: this.data.userAddress[index],
      popAddress: false
    })
  },
  /**
   * @event 点击收货地址选择
   */
  tapAddress() {
    this.setData({
      popAddress: true
    })
  },
  /**
   * @evnet 修改弹窗
   */
  isVisible(e) {
    const type = e.currentTarget.dataset.type
    const visible = e.detail.visible
    if (type === 'address') return this.setData({
      popAddress: visible
    })
    if (type === 'popCoupon') return this.setData({
      popCoupon: visible
    })
  },
  fetchuserAddress: function () {
    wx.request({
      url: API.address,
      data: {
        token: app.globalData.token
      },
      success: res => {
        this.setData({
          userAddress: res.data.data,
          selectAddress: res.data.data[0]
        })
      }
    })
  },
  /**
   * @method 获取食堂信息
   */
  fetchCanteenInfo: function () {
    wx.showLoading({
      title: '正在加载....'
    })
    wx.request({
      url: API.canteen,
      data: {
        canteenId: this.data.canteenId
      },
      success: res => {
        const data = res.data.data[0]
        this.setData({
          canteenInfo: data,
          total: this.data.total + data.shipping
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})