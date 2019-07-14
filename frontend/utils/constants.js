module.exports = {
  WEATHER: {
    sun: {
      icon: 'i-sun',
      desc: '晴'
    },
    cloudy: {
      icon: 'i-cloudy',
      desc: '阴'
    },
    rain: {
      icon: 'i-rain',
      desc: '雨'
    },
    snow: {
      icon: 'i-snow',
      desc: '雪'
    },
    fog: {
      icon: 'i-fog',
      desc: '雾'
    }
  },
  MENU_MAIN: [{
    url: '../address/address',
    icon: 'i-location',
    name: '收货地址'
  }, {
    url: '../recharge/recharge',
    icon: 'i-recharge',
    name: '充值中心'
  }, {
    url: '../coupon/coupon',
    icon: 'i-coupon',
    name: '我的优惠券'
  }],
  MENU_OTHER: [{
    url: '',
    icon: 'i-service',
    name: '在线客服'
  }, {
    url: '../_index/_index',
    icon: 'i-shop',
    name: '商家入口'
  }]
}