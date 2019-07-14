const API = require('../../utils/api')
const MAP = require('../../utils/map')
const WEATHER = require('../../utils/constants').WEATHER

Page({
  data: {
    isLoading: true,
    location: '',
    weather: {
      templ: '',
      desc: '',
      icon: ''
    },
    canteen: []
  },
  onLoad: function () {
    this._fetchWeather()
    this._fetchLocation()
    this._fetchAllCanteen()
  },
  onReady: function () {

  },
  /**
   * 点击了tab重新排序
   */
  tapView: function (e) {
    const id = e.detail.id
    const canteen = this.data.canteen

    if (id == 0) return this.setData({
      canteen: canteen.sort((a, b) => (a.id < b.id ? -1 : 1))
    })
    if (id == 1) return this.setData({
      canteen: canteen.sort((a, b) => (a.monthSell < b.monthSell ? 1 : -1))
    })
    if (id == 2) return this.setData({
      canteen: canteen.sort((a, b) => (a.rate < b.rate ? 1 : -1))
    })
  },
  tapSearch: function () {
    wx.navigateTo({
      url: `../search/search`
    })
  },
  /**
   * @event 点击店铺跳转事件
   */
  tapCanteen: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../shop/shop?canteenId=${id}`
    })
  },
  /**
   * @获取餐厅信息
   */
  _fetchAllCanteen: function () {
    wx.request({
      url: API.canteen,
      method: 'GET',
      success: res => {

        this.setData({
          isLoading: false,
          canteen: res.data.data
        })
      }
    })
  },
  /**
   * @event 获取地理位置
   */
  _fetchLocation: function () {
    wx.getLocation({
      success: res => {
        MAP.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            this.setData({
              location: res.result.ad_info.name.replace(/,*/g, '').replace('中国广东省', '')
            })
          }
        })
      },
      fail: () => {
        this.setData({
          location: '定位失败 :!'
        })
      }
    })
  },
  /**
   * @event 获取天气详情
   */
  _fetchWeather: function () {
    wx.request({
      url: API.weather,
      success: res => {
        const data = res.data.data
        this.setData({
          weather: {
            templ: data.tmpl,
            icon: WEATHER[data.type].icon,
            desc: WEATHER[data.type].desc
          }
        })
      }
    })
  }
})