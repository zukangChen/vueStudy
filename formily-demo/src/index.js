// 防抖：在某一时间段内，连续出发多次，只执行最后一次。
function debounce(fn, defer) {
  let timer
  let that = this
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(that)
    }, defer)
  }
}

// 节流：在某一时间段内，连续出发多次，只执行第一次
function throttle(fn, defer) {
  let now = 0
  return function () {
    if (new Date() - now > defer) {
      setTimeout(() => {
        now = new Date()
        fn()
      })
    }
  }
}

export default debounce

export { throttle }