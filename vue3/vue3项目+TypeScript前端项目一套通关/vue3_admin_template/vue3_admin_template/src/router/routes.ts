//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/custom',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/custom',
    component: () => import('@/layout/index.vue'),
    name: '自定义测试',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
    redirect: '/custom/calendar',
    children: [
      {
        path: '/custom/calendar',
        component: () => import('@/views/custom/calendar/index.vue'),
        name: 'Calendar',
        meta: {
          title: '日历组件',
          icon: 'calendar',
        },
      },
      {
        path: '/custom/progress',
        component: () => import('@/views/custom/progress/index.vue'),
        name: 'Progress',
        meta: {
          title: '进度条组件',
          icon: 'calendar',
        },
      },
      {
        path: '/custom/echarts',
        component: () => import('@/views/custom/echarts/index.vue'),
        name: 'Echarts',
        meta: {
          title: '图表组件',
          icon: 'calendar',
        },
      },
      {
        path: '/custom/PieEcharts',
        component: () => import('@/views/custom/pieEcharts/index.vue'),
        name: 'PieEcharts',
        meta: {
          title: '饼图图表组件',
          icon: 'calendar',
        },
      },
      {
        path: '/custom/BarEcharts',
        component: () => import('@/views/custom/BarEcharts/index.vue'),
        name: 'BarEcharts',
        meta: {
          title: '柱状图图表组件',
          icon: 'calendar',
        },
      },
      {
        path: '/custom/PbEcharts',
        component: () => import('@/views/custom/PbEcharts/index.vue'),
        name: 'PbEcharts',
        meta: {
          title: '瀑布图图表组件',
          icon: 'calendar',
        },
      },
    ],
  },
  {
    path: '/customTable',
    component: () => import('@/layout/index.vue'),
    name: '数据表格',
    meta: {
      hidden: false,
      title: '数据表格',
      icon: 'Platform',
    },
    redirect: '/customTable/chartTable',
    children: [
      {
        path: '/customTable/chartTable',
        component: () => import('@/views/customTable/chartTable/index.vue'),
        name: 'chartTable',
        meta: {
          title: '表格',
          icon: 'calendar',
        },
      },
    ],
  },
  {
    path: '/SpreadJS',
    component: () => import('@/layout/index.vue'),
    name: 'spread在线Excel编辑表格',
    meta: {
      hidden: false,
      title: '数在线编辑表格据表格',
      icon: 'Platform',
    },
    redirect: '/SpreadJS/index',
    children: [
      {
        path: '/SpreadJS/index',
        component: () => import('@/views/SpreadJS/index.vue'),
        name: 'spreadjsTable',
        meta: {
          title: 'SpreadJS表格',
          icon: 'calendar',
        },
      },
    ],
  },
]

//异步路由
export const asnycRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
]

//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
