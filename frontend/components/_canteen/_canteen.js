
const API = require('../../utils/api')
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    canteenInfo: {
      type: Object,
      value: {}
    }
  },
  methods: {
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
              this.data.canteenInfo.icon = data.path
              this.setData({
                canteenInfo: this.data.canteenInfo
              })
            }
          })
        }
      })
    },
    tapSubmit() {
      wx.request({
        url: API._canteen,
        data: this.data.canteenInfo,
        method: 'PUT',
        success: function (res) {
          wx.showToast({
            title: '保存成功'
          })
        }
      })
    },
    tapInfoInput(e) {
      const key = e.currentTarget.dataset.key
      const val = e.detail.value
      const canteenInfo = this.data.canteenInfo
      canteenInfo[key] = val
      this.setData({
        canteenInfo
      })
    },
  }
})