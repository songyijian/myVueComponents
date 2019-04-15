
// 抽出在别的地方有用
export default  [
  {
    path: '/',
    name: 'home',
    component:() => import('./views/Home.vue')
  },
  {
    path: '/component',
    name: 'Component',
    redirect: '/component/compmain',
    component:() => import('./views/Component.vue'),
    /**
      组建内容区域
    */
    children:[
      {
        type:'module',
        path: '/component/compmain',
        name:'compmain',
        component:() => import('./views/content/CompMain.vue')
      },{
        type:'module',
        path: '/component/schedule',
        name:'compmain',
        component:() => import('./views/content/schedule.vue')
      }
    ]
  }
]
