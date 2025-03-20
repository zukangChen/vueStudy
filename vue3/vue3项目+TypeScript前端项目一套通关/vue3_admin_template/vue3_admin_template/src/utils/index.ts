export const getBeforWeek = (date: any, week = 1) => {
  const d1 = new Date(date)
  const d2 = new Date(d1.getTime() - week * 6 * 24 * 60 * 60 * 1000)
  const yy = d2.getFullYear()
  let mm: any = d2.getMonth() + 1
  let dd: any = d2.getDate()
  dd = dd < 10 ? '0' + dd : dd
  mm = mm < 10 ? '0' + mm : mm
  return `${yy}-${mm}-${dd}`
}
export const getExcelData = (date: any) => {
  const yy = date.slice(0, 4)
  const mm = date.slice(4, 6)
  const dd = date.slice(6, 8)
  return `${yy}-${mm}-${dd}`
}
export const getFormateData = (date: any) => {
  const last = new Date(date.slice(0, 4), date.slice(4, 6), 0)
  return (
    date.slice(0, 4) +
    '-' +
    date.slice(4, 6) +
    (date.length > 6 ? '-' + date.slice(6, 8) : `-${last.getDate()}`)
  )
}
export const getBeforMonth = (date: any) => {
  const d1 = new Date(date)
  const yy = d1.getFullYear()
  let mm: any = d1.getMonth() + 1
  mm = mm < 10 ? '0' + mm : mm
  return `${yy}-${mm}-01`
}
export const getWeekString = (date: string, week = 1) => {
  if (!date) return
  const yy = Number(date.slice(0, 4))
  let mm: any = Number(date.slice(4, 6))
  let dd: any = Number(date.slice(6, 8))
  const currDate = new Date(yy, mm - 1, dd)
  mm = mm < 10 ? '0' + mm : mm
  dd = dd < 10 ? '0' + dd : dd
  const beforeDate = new Date(
    currDate.getTime() - 24 * 60 * 60 * 1000 * 7 * week + 24 * 60 * 60 * 1000,
  )

  const byy = beforeDate.getFullYear()
  let bmm: any = beforeDate.getMonth() + 1
  let bdd: any = beforeDate.getDate()
  bmm = bmm < 10 ? '0' + bmm : bmm
  bdd = bdd < 10 ? '0' + bdd : bdd
  return `${byy}${bmm}${bdd}-${yy}${mm}${dd}`
}
const ODT = 86400000
//北京时间每周一早上8点
export const getDateByMonday = () => {
  const now = new Date()
  let newData = now
  const day = now.getDay()
  const h = now.getHours()

  if ((day == 1 && h < 8) || day < 1) {
    newData = new Date(now.getTime() - ODT * 7 - day * ODT)
  } else {
    newData = new Date(now.getTime() - day * ODT)
  }
  return formateData(newData)
}
export const formateData = (date: any) => {
  const d1 = new Date(date)
  const yy = d1.getFullYear()
  let mm: any = d1.getMonth() + 1
  let dd: any = d1.getDate()
  mm = mm < 10 ? '0' + mm : mm
  dd = dd < 10 ? '0' + dd : dd
  return `${yy}${mm}${dd}`
}
//北京时间每月2号早上8点
export const getMonthByTwo = (currDate: any) => {
  const date1 = new Date()
  date1.setDate(0)
  const now = new Date()
  let newData = now
  const date = now.getDate()
  const h = now.getHours()
  if (date < 2 || (date === 2 && h < 8)) {
    newData = new Date(now.getTime() - ODT * date1.getDate() - date * ODT)
  } else {
    newData = new Date(now.getTime() - date * ODT)
  }
  const yy = newData.getFullYear()
  let mm: any = newData.getMonth() + 1
  let dd: any = newData.getDate()
  mm = mm < 10 ? '0' + mm : mm
  dd = dd < 10 ? '0' + dd : dd
  if (currDate) {
    const t1 = new Date(
      currDate.slice(0, 4),
      currDate.slice(4, 6),
      currDate.slice(6, 8),
    ).getTime()
    if (newData.getTime() > t1) {
      return `${currDate.slice(0, 4)}${currDate.slice(4, 6)}`
    } else {
      return `${yy}${mm}${dd}`
    }
  } else {
    return `${yy}${mm}${dd}`
  }
}
export function getUrlParams(name: string) {
  const search = document.location.href
    .replace(/%3D/g, '=')
    .replace(/%26/g, '&')
  const pattern = new RegExp('[?&]' + name + '=([^&]+)', 'g')
  const matcher = pattern.exec(search)
  let items = null
  if (null != matcher) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items == null ? false : items
}

export function getValueUnit(value: number | string, dot = 1, unit = '元') {
  if (value == null) {
    return `<span class="value">-</span></span>`
  }
  value = Number(value)
  const newValue = Math.abs(value)
  if (unit == 'g') {
    if (newValue == 0) {
      return `<span class="value">${value.toFixed(0)}</span></span>`
    } else if (newValue < 1000) {
      return `<span class="value">${value.toFixed(
        0,
      )}</span><span class="unit">${unit}</span>`
    } else if (newValue < 1000 * 1000 * 10) {
      unit = 'kg'
      return `<span class="value">${(value / 1000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else if (newValue < 1000 * 1000 * 1000 * 10) {
      unit = 't'
      return `<span class="value">${(value / 1000000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else {
      unit = 'wt'
      return `<span class="value">${(value / 10000000000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    }
  } else if (unit == '元' || unit == '%') {
    if (newValue < 10000) {
      if (unit == '元') {
        unit = '元'
      }
      return `<span class="value">${value.toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else if (newValue < 10000 * 10000) {
      if (unit == '元') {
        unit = '万元'
      } else if (unit == '%') {
        unit = '‱'
      }
      return `<span class="value">${(value / 10000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else if (newValue < 10000 * 10000 * 10000) {
      if (unit == '元') {
        unit = '亿元'
      } else if (unit == '%') {
        unit = '‰ooooo'
      }
      return `<span class="value">${(value / 100000000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else if (newValue < 10000 * 10000 * 10000 * 10000) {
      if (unit == '元') {
        unit = '万亿元'
      }
      return `<span class="value">${(value / 1000000000000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else if (newValue < 10000 * 10000 * 10000 * 10000 * 10000) {
      if (unit == '元') {
        unit = '京元'
      }
      return `<span class="value">${(value / 10000000000000000).toFixed(
        dot,
      )}</span><span class="unit">${unit}</span>`
    } else {
      return `<span class="value">${value.toFixed(dot)}</span>`
    }
  } else {
    return `<span class="value">${value.toFixed(
      dot,
    )}<span class="unit">${unit}</span></span>`
  }
}
//防抖
export const debounce = function (fn: Function, wait = 50) {
  let timeId: any = null
  return function () {
    // 此函数上下文
    const context = this
    // 调用此函数的实参
    const ags = arguments
    // 清除已有的定时器
    if (timeId) clearTimeout(timeId)
    // 定义回调函数是否执行的标志
    const cllNow = !timeId
    // 起一个定时器
    timeId = setTimeout(() => {
      // 在wait内没有再次触发时重置timeId
      timeId = null
    }, wait)
    // 根据标记 是否执行回调函数
    if (cllNow) fn && fn.apply(context, ags)
  }
}
//节流
export const throttle = function (fn: Function, wait = 100) {
  let timeId: any = null,
    startTime = Date.now()
  return function () {
    const curTime = Date.now()
    const remaining = wait - (curTime - startTime)
    // 此函数上下文
    const context = this
    // 调用此函数的实参
    const ags = arguments
    timeId && clearTimeout(timeId)
    if (remaining <= 0) {
      fn.apply(context, ags)
      startTime = Date.now()
    } else {
      timeId = setTimeout(() => {
        fn.apply(context, ags)
        startTime = Date.now()
      }, remaining)
    }
  }
}

/**
 *
 * @param str 或者字符串长度区分中英文
 * @returns
 */
export const strlen = function (str: string) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}
