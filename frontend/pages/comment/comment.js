const app = getApp()
const API = require('../../utils/api')
const utils = require('../../utils/util')

Page({
  data: {
    canteenName: '',
    canteenId: '',
    orderId: '',
    taste: 0,
    package: 0,
    delivery: 0,
    content: '',
    imgs: [],
    time: '',
  },
  onShow: function () {
    const data = app.globalData.payload['data']
    this.setData({
      canteenName: data.canteen.name,
      canteenId: data.canteen.id,
      orderId: data.orderId
    })
  },
  tapImg() {
    wx.chooseImage({
      count: 1,
      success: res => {
        wx.uploadFile({
          url: API.upload,
          name: 'file',
          filePath: res.tempFilePaths[0],
          success: (response) => {
            const data = JSON.parse(response.data)
            this.data.imgs.push(data.path)
            this.setData({
              imgs: this.data.imgs
            })
          }
        })
      }
    })
  },
  submit() {
     this.setData({
      time: utils.getCurrentDate()
    })
    this._comment()
  },
  _comment() {
    const data = this.data
    wx.request({
      url: API.comment,
      method: 'POST',
      data: {
        canteenId: data.canteenId,
        orderId: data.orderId,
        taste: data.taste,
        package: data.package,
        delivery: data.delivery,
        content: data.content,
        imgs: data.imgs,
        time: data.time,
      },
      success: res => {
        wx.navigateBack()
      },
      fail: () => {
        wx.showToast({
          title: '请求失败',
        })
      }
    })
  },
  changeRate(e) {
    const key = e.currentTarget.dataset.key
    const current = e.detail.current
    this.setData({
      [key]: current
    })
  },
  tapInput(e) {
    this.setData({
      content: e.detail.value,
    })
  }
})