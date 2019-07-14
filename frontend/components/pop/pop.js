Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    tapClose(e) {
      this.setData({
        visible: false,
      })
      this.triggerEvent('isVisible', {
        visible: this.data.visible
      })
    }
  }
})