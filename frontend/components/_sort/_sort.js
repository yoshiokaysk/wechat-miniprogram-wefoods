const API = require('../../utils/api')
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    sortList: {
      type: Array,
      value: []
    },
    canteenId: {
      type: Number,
      value: 0
    }
  },
  data: {
    sortVisilbe: false,
    isSortCreate: false,
    currentSort: {},

    foodVisible: false,
    isFoodCreate: false,
    currentFood: {}
  },
  methods: {
    tapNewSort() {
      this.setData({
        sortVisilbe: true,
        isSortCreate: true,
        currentSort: {
          canteenId: this.data.canteenId,
          name: '',
          des: '',
          weight: ''
        }
      })
    },
    tapNewFood(e) {
      const idx = e.currentTarget.dataset.index
      const sortId = this.data.sortList[idx].id

      this.setData({
        foodVisible: true,
        isFoodCreate: true,
        currentFood: {
          sortId,
          name: '',
          icon: '',
          des: '',
          price: '',
          discount: 1
        }
      })
    },
    /**
     * 新建
     */
    _createReqest(url, data) {
      console.log(data)
      wx.request({
        url,
        data,
        method: 'POST',
        success: res => {
          wx.showToast({
            title: '新建成功'
          })
          this.triggerEvent('isReload')
          this.__resetData()
        }
      })
    },
    /**
     * 保存食物 或 新建食物
     */
    tapFoodSave() {
      (this.data.isFoodCreate) ? this._createReqest(API._goods, this.data.currentFood): this._saveRequest(API._goods, this.data.currentFood)
    },
    /**
     * 保存分类 或 新建分类
     */
    tapSortSave() {
      (this.data.isSortCreate) ? this._createReqest(API._sort, this.data.currentSort): this._saveRequest(API._sort, {
        id: this.data.currentSort.id,
        name: this.data.currentSort.name,
        des: this.data.currentSort.des,
        weight: this.data.currentSort.weight
      })
    },
    /**
     * 上传食物图片
     */
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
              this.data.currentFood.icon = data.path
              this.setData({
                currentFood: this.data.currentFood
              })
            }
          })
        }
      })
    },
    _saveRequest(url, data) {
      wx.request({
        url,
        data,
        method: 'PUT',
        success: res => {
          wx.showToast({
            title: '保存成功'
          })
          this.triggerEvent('isReload')
          this.__resetData()
        }
      })
    },
    __resetData() {
      this.setData({
        sortVisilbe: false,
        isSortCreate: false,
        foodVisible: false,
        isFoodCreate: false,
        currentSort: {},
        currentFood: {}
      })
    },
    /**
     * 编辑食物
     */
    tapFoodEdit(e) {
      const item = e.currentTarget.dataset.item
      this.setData({
        foodVisible: true,
        currentFood: item
      })
    },
    /**
     * 编辑分类
     */
    tapSortEdit(e) {
      const idx = e.currentTarget.dataset.index
      const item = this.data.sortList[idx]

      this.setData({
        sortVisilbe: true,
        currentSort: item
      })
    },

    /**
     * 监听input输入并更新
     */
    tapInput(e) {
      const key = e.currentTarget.dataset.key
      const val = e.detail.value
      const type = e.currentTarget.dataset.type

      const obj = this.data[type]
      obj[key] = val
      this.setData({
        obj
      })
    },
    /**
     * 展开菜单
     */
    tapExpand(e) {
      const idx = e.currentTarget.dataset.index
      const item = e.currentTarget.dataset.item
      const sortList = this.data.sortList
      item.edit = !item.edit
      sortList[idx] = item
      this.setData({
        sortList
      })
    },
    /**
     * 修改弹窗
     */
    isVisible(e) {
      const visible = e.detail.visible
      const key = e.target.dataset.key
      this.setData({
        [key]: visible
      })
    }
  }
})