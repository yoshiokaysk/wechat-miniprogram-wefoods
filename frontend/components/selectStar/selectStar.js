const map = {
  0: '',
  1: '很差',
  2: '一般',
  3: '满意',
  4: '非常满意',
  5: '无可挑剔'
}

Component({
  properties: {
    name: {
      type: String,
      value: '评分'
    }
  },
  data: {
    full: '/icons/star/star-full.png',
    half: '/icons/star/star-half.png',
    none: '/icons/star/star-none.png',
    total: 5,
    current: 0,
    info: ''
  },
  methods: {
    tapSelect(e) {
      let index = e.target.dataset.index + 1
      this.setData({
        current: index,
        info: map[index]
      })
      this.triggerEvent('changeRate', {
        current: this.data.current,
      })
    }
  }
})