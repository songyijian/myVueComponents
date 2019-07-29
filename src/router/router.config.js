// var routes
module.exports = routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('~views/Home.vue')
  },
  {
    path: '/DemoGetFileBase64',
    name: 'GetFileBase64',
    component: () => import('~views/DemoGetFileBase64.vue')
  },
  {
    path: '/DemoSchedule', //小时周期控件
    name: 'Schedule',
    component: () => import('~views/DemoSchedule.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('~views/test.vue')
  }
]