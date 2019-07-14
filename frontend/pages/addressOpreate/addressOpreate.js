const app = getApp()
const API = require('../../utils/api')

Page({
  data: {
    type: 'add',
    id: '',
    contact: '联系人',
    address: '地址',
    details: '详细地址',
    gender: 1,
    phone: '电话',
    tag: '学校',
    latitude: 0,
    longitude: 0
  },
  onShow: function () {
    const {
      type,
      data
    } = app.globalData.payload

    if (type === 'add') this.setData({
      type: 'add',
      id: '',
      contact: '联系人',
      address: '地址',
      details: '详细地址',
      gender: 1,
      phone: '电话',
      tag: '学校',
      latitude: 0,
      longitude: 0
    })
    else if (type === 'edit') {
      this.setData(data)
      this.setData({
        type: 'edit'
      })
    }
  },
  _deleteAddress: function () {
    wx.request({
      url: API.address + '/' + this.data.id,
      method: 'DELETE',
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    })
  },
  _updateAddress: function () {
    wx.request({
      url: API.address,
      method: 'PUT',
      data: this.data,
      success: res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
      }
    })
  },
  _addAddress: function () {
    wx.request({
      url: API.address,
      method: 'POST',
      data: Object.assign({}, this.data, {
        token: app.globalData.token
      }),
      success: res => {
        wx.showToast({
          title: '新建成功',
          icon: 'success'
        })
      }
    })
  },
  /**
   * @evnet 操作事件
   */
  tapOp: function (e) {
    const type = e.target.dataset.type
    switch (type) {
      case 'del':
        if (this.data.id) {
          this._deleteAddress()
        }
        break;
      case 'confirm':
        (this.data.id) ? this._updateAddress(): this._addAddress()
        break;
      default:
        break;
    }
    wx.navigateBack()
  },
  tapInput: function (e) {
    const key = e.currentTarget.dataset.key
    const val = e.detail.value
    this.setData({
      [key]: val,
    })
  },
  /**
   * @evnet 修改性别
   */
  tapGender(e) {
    const gender = +e.target.dataset.gender
    this.setData({
      gender
    })
  },
  /**
   * @evnet
   */
  tapTag(e) {
    this.setData({
      tag: '学校'
    })
  }
})