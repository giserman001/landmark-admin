// 公用函数方法

// 日期时间转换
export const $dateFormat = (date, type) => {
  if (!date) { return '' }
  const time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
  const day = time.getDate() < 10 ? '0' + (time.getDate()) : (time.getDate())
  const hours = time.getHours() < 10 ? '0' + (time.getHours()) : (time.getHours())
  const minutes = time.getMinutes() < 10 ? '0' + (time.getMinutes()) : (time.getMinutes())
  const seconds = time.getSeconds() < 10 ? '0' + (time.getSeconds()) : (time.getSeconds())
  if (type === 1) {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } else {
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }
}

// 日期转换
export const $dayFormat = (date, type) => {
  if (!date) { return '' }
  const time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
  const day = time.getDate() < 10 ? '0' + (time.getDate()) : (time.getDate())
  if (type === 1) {
    return `${year}-${month}-${day}`
  } else if (type === 2) {
    return `${year}-${month}`
  } else {
    return `${year}${month}${day}`
  }
}

// 金额格式化
export const formatCurrency = num => {
  if (isNaN(Number(num))) {
    return '-'
  }
  num = Number(num)
  if (num == null || isNaN(num)) { num = '0' }
  const sign = (num === (num = Math.abs(num)))
  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) { cents = '0' + cents }
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
  }
  return (((sign) ? '' : '-') + num + '.' + cents)
}

// 数字转换为大写
export const convertCurrency = (money) => {
  var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'] // 汉字的数字
  var cnIntRadice = ['', '拾', '佰', '仟'] // 基本单位
  var cnIntUnits = ['', '万', '亿', '兆'] // 对应整数部分单位
  var cnDecUnits = ['角', '分', '毫', '厘']// 对应小数部分单位
  var cnInteger = '整'// 整数金额时后面跟的字符
  var cnIntLast = '元'// 整型完以后的单位
  var maxNum = 999999999999999.9999// 最大处理的数字
  var integerNum// 金额整数部分
  var decimalNum// 金额小数部分
  var chineseStr = ''// 输出的中文金额字符串
  var parts// 分离金额后用的数组,预定义
  if (money === '') { return '' }
  money = parseFloat(money)
  if (money >= maxNum) {
    return money
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0
    var IntLen = integerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        zeroCount = 0// 归零
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    var decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

// 金额区间处理
export const priceTransform = (obj, startKey, endKey) => {
  if ((obj[startKey] === '' || obj[startKey] === undefined) && (obj[endKey] === '' || obj[endKey] === undefined)) { // 前后都为空
    return { [startKey]: '', [endKey]: '' }
  }
  if ((obj[startKey] === '' || obj[startKey] === undefined) && (obj[endKey] !== '')) { // 前为空,后不为空
    return { [startKey]: 0, [endKey]: obj[endKey] }
  }
  if ((obj[startKey] !== '') && (obj[endKey] === '' || obj[endKey] === undefined)) { // 前不为空,后为空
    return { [startKey]: 0, [endKey]: obj[startKey] }
  }
  if (Number(obj[startKey]) > Number(obj[endKey])) { // 前大于后
    return { [startKey]: obj[endKey], [endKey]: obj[startKey] }
  }
  return { [startKey]: obj[startKey], [endKey]: obj[endKey] }
}

// 时间段控件
export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }],
  disabledDate: time => {
    return time.getTime() > Date.now()
  }
}

// 功能权限判断
export const powerReg = code => {
  const codeArr = JSON.parse(window.localStorage.getItem('nodeAuth'))
  if (code === 1) { return true }
  return codeArr.includes(code)
}

/**
* 防抖
* @params {Function} fn 执行函数
* @params {Number} timerDelay 时间
* @params {Boolean} immediate 立即执行
*/
export const throttle = function(fn, timerDelay, immediate = false) {
  let timer
  return function() {
    const that = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, timerDelay)
      if (callNow) fn.apply(that, args)
    } else {
      timer = setTimeout(function() {
        fn.apply(that, args)
      }, timerDelay)
    }
  }
}
