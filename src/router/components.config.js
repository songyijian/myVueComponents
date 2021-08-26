// var routes

function loadDeom(path) {
  return view => import(/* webpackChunkName: "demo-[request]" */ `@/views/demo/${view}.vue`)
}

let components = {
  path: '/components',
  name: 'components',
  redirect: '/components/install',
  component: () => import('@/views/Layout/demoLayout.vue'),
  children: [
    {
      path: '/components/install',
      name: '安装',
      component: () => import('@/views/demo/install.vue')
    },
    {
      path: '/components/paymentPin',
      name: 'paymentPin 支付验证',
      component: () => import('@/views/demo/paymentPin.vue')
    },
    {
      path: '/components/weekMolecule',
      name: 'WeekMolecule 周小时粒度管理控件',
      component: () => import('@/views/demo/weekMolecule.vue')
    },
    {
      path: '/components/decayLodingBar',
      name: 'DecayLodingBar 衰减加载条',
      component: () => import('@/views/demo/decayLodingBar.vue')
    },
    {
      path: '/components/input',
      name: '表单-输入类',
      component: () => import('@/views/demo/input.vue')
    }
  ]
}

export default components
