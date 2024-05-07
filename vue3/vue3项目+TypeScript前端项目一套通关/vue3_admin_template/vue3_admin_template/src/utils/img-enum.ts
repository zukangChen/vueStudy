const img_list = [
  {
    name: '碳排总量',
    url: new URL('@/assets/header/tan.png', import.meta.url).href,
  },
]

/**
 * 财务图标对照路径
 * @param val 财务卡片名称
 * @returns
 */
export const fliter_finance_img = (val: string) => {
  if (!val) return
  const item = img_list.filter((i) => val === i.name)
  const url =
    item.length > 0
      ? item[0].url
      : new URL('@/assets/HumanResourcesGroup/qita.png', import.meta.url).href
  return url
}
