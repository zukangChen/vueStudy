export default () => {
  setRem()
  window.onload = function () {
    setRem()
  }
  window.onresize = function () {
    setRem()
  }
  function setRem() {
    const dpr = window.devicePixelRatio
    let meta = document.querySelector('meta[name="viewport"]')
    if (!meta) {
      meta = document.createElement('meta')
      document.getElementsByTagName('head')[0].appendChild(meta)
    }
    const scale = 1 / dpr
    meta.setAttribute('name', 'viewport')
    meta.setAttribute(
      'content',
      `width=device-width, user-scalable=no, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`,
    )
    document.documentElement.style.fontSize =
      (((16 / 9) * document.body.clientHeight) / 100).toFixed(5) + 'px'
  }
}
export function fontSize(size: number) {
  return (size * (((16 / 9) * document.body.clientHeight) / 1920)).toFixed(5)
}
export function fontSizeWidth(size: number) {
  return (size * document.body.clientWidth) / 1920
}
document.addEventListener(
  'keydown',
  function (event) {
    if (
      (event.ctrlKey === true || event.metaKey === true) &&
      (event.which === 61 ||
        event.which === 107 ||
        event.which === 173 ||
        event.which === 109 ||
        event.which === 187 ||
        event.which === 189)
    ) {
      event.preventDefault()
    }
  },
  false,
)
// Chrome IE 360
window.addEventListener(
  'mousewheel',
  function (event) {
    if (event.ctrlKey === true || event.metaKey) {
      event.preventDefault()
    }
  },
  { passive: false },
)

//firefox
window.addEventListener(
  'DOMMouseScroll',
  function (event) {
    if (event.ctrlKey === true || event.metaKey) {
      event.preventDefault()
    }
  },
  { passive: false },
)
