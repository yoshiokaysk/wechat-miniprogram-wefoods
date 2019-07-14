// navbar
const sliderWidth = 96
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  lifetimes: {},
  methods: {
    tabClick: function(e) {
      const offset = e.currentTarget.offsetLeft
      const id = e.currentTarget.id
      this.setData({
        sliderOffset: offset,
        activeIndex: id
      })
      this.triggerEvent('onClick', {
        id: id
      })

    }
  }
})