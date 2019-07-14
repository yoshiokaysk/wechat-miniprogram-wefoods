/**
 * @funs url路径参数拼接
 * @params
 *    url: string
 *    keyValues: Object
 * @return string
 */
function toPath(url, keyValues) {
  if (typeof url !== 'string'){
    throw new Error(`${url} must be String`)
  }

  if (typeof keyValues !== 'object') {
    keyValues = {
      param: keyValues
    }
  }

  let result = '?'
  Object.keys(keyValues).forEach(key => {
    result = result + key + '=' + keyValues[key] + '&'
  })

  if (result[result.length - 1] === '&') return url + result.substring(0, result.length - 1)
  return url + result
}

// TEST

// console.log(toPath('../user/user', {
//   p1: 22,
//   p2: 33,
//   p3: 44
// }))

module.exports = {
  toPath: toPath
}