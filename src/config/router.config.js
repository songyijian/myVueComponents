// var routes
module.exports = routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('~views/Home.vue')
  },
  {
    path: '/DemoSUpload',
    name: 'SUpload',
    component: () => import('~views/DemoSUpload.vue')
  },
  {
    path: '/DemoSchedule', //小时周期控件
    name: 'Schedule',
    component: () => import('~views/DemoSchedule.vue')
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('~views/test.vue')
  // },
  {
    path: '/DemoFolding',
    name: 'Folding',
    component: () => import('~views/DemoFolding.vue')
  }
]


