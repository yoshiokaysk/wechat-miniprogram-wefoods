const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isEmptyStr = str => {
  return typeof str !== 'string' && str.length === 0
}
const cutDateStr = str => {
  if (typeof str != 'string') return;
  return str.substring(0, 9)
}


const getCurrentDate = () => {
  const dt = new Date()
  return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
}
module.exports = {
  formatTime,
  isEmptyStr,
  cutDateStr,
  getCurrentDate
}