/**
 * 获取table基本配置
 * @param { Boolean } hasIndex 是否展示索引
 * @param { Boolean } hasPagination 是否分页
 * @param { Boolean } hasSelect 是否可选
 * @param { Boolean } hasOperation 是否具有操作功能
 */
export const CommonTableConfig = (hasIndex:Boolean, hasPagination:Boolean, hasSelect:Boolean, hasOperation:Boolean) => {
  const obj = {
    hasIndex: hasIndex,
    showHeader: true,
    hasPagination: hasPagination || false,
    tableHeight: 400,
    heightLightClass:'height_light',
    hasExpand: false,
    hasSelect: hasSelect || false,
    emptyText: '暂无数据',
    border: true,
    stripe:false,
    hasOperation: hasOperation || false,
    hasEmptyCell: false,
  }
  const PaginationConfig = {
    totalCount: 0, // 表格数据总数
    pageSizes: [10, 50, 100, 150, 200, 250],
    pageSize: 50,
    page: 1,
    layout: 'total, prev, pager, next, sizes'
  }
  hasPagination && Object.assign(obj, PaginationConfig)
  return obj
}
