// 'use strict'
const setWatermarkAloneFn = (str: string, nodeId: string) => {
  const id = '1.23452384164.123412416'
  const node = document.getElementById(id)
  const parentNode = document.getElementById(nodeId)
  if (!parentNode) return
  if (node !== null) {
    parentNode?.removeChild(node)
  }
  parentNode.style.position = 'relative' // 这里是给父盒子加上相对定义，便于水印子盒子定位
  const can = document.createElement('canvas')
  can.width = 100
  can.height = 100
  const cans: any = can.getContext('2d')

  cans.rotate((-20 * Math.PI) / 180)

  cans.font = '22px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.2)'
  cans.fillStyle = 'red'

  cans.textAlign = 'left'
  cans.textBaseline = 'Top'
  cans.fillText('hh', can.width / 3, can.height / 2)

  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'absolute'
  div.style.zIndex = '100000'
  div.style.transformOrigin = '0 0'
  // div.style.width = '200vw'
  div.style.width = '100%'
  div.style.height = '100%'

  // div.style.transform = 'scale(0.5)'
  // div.style.height = (document.documentElement.clientHeight - 100) * 2 + 'px'
  div.style.background =
    'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.getElementById(nodeId)?.appendChild(div)
  return id
}

/**
 * 添加水印方法
 * @param str 水印文字
 * @param nodeId 需要添加水印的节点id(给单个盒子添加水印)
 */
//本地存储删除数据方法
export const setWaterMarkAlone = (str: string, nodeId: string) => {
  setWatermarkAloneFn(str, nodeId)
  window.onresize = () => {
    if (document.getElementById(nodeId) !== null) {
      console.log('屏幕变化')
      setWatermarkAloneFn(str, nodeId)
    }
  }
}

const setWatermark = (str: string, str1?: string) => {
  const id = '1.23452384164.123412415'
  const node = document.getElementById(id)
  if (node !== null) {
    document.body.removeChild(node)
  }

  const can = document.createElement('canvas')
  can.width = 450
  can.height = 220
  if (str1) {
    can.height = 300
  }

  const cans: any = can.getContext('2d')
  if (str1) {
    cans.rotate((-10 * Math.PI) / 180)
  } else {
    cans.rotate((-20 * Math.PI) / 180)
  }

  cans.font = '26px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.2)'
  if (str1) {
    cans.font = '26px Vedana'
    cans.fillStyle = 'rgba(200, 200, 200, 0.5)'
  }
  cans.textAlign = 'left'
  cans.textBaseline = 'Top'
  cans.fillText(str, can.width / 3, can.height / 2)

  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = 100 + 'px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.transformOrigin = '0 0'
  div.style.width = '200vw'
  div.style.transform = 'scale(0.5)'
  div.style.height = (document.documentElement.clientHeight - 100) * 2 + 'px'
  div.style.background =
    'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

/**
 * 移除水印方法
 */
export const removeWatermarkAlone = () => {
  const id = '1.23452384164.123412416'
  if (document.getElementById(id) !== null) {
    const t: any = document.body
    t.removeChild(document.getElementById(id))
  }
}

/**
 * 添加水印方法 （给单个页面加水印）
 * @param str 水印文字
 * @param str1 有值则为放大水印，填1即可
 */
export const setWaterMark = (str: string, str1?: string) => {
  let id = setWatermark(str, str1)
  // if (document.getElementById(id) === null) {
  //   id = setWatermark(str)
  // }
  // setInterval(() => {
  if (document.getElementById(id) === null) {
    id = setWatermark(str, str1)
  }
  // }, 500)
  window.onresize = () => {
    if (document.getElementById(id) !== null) {
      console.log('屏幕变化')
      setWatermark(str, str1)
    }
  }
}

/**
 * 移除水印方法
 */
export const removeWatermark = () => {
  const id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    const t: any = document.body
    t.removeChild(document.getElementById(id))
  }
}
