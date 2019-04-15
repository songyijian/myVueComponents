import Vue from 'vue'
import Router from 'vue-router'



var routerData = [
  {
    path: '/',
    name: 'home',
    component:() => import('./views/Home.vue')
  },
  {
    path: '/component',
    name: 'Component',
    redirect: '/component/changelog',
    component:() => import('./views/Component.vue'),
    /**
      组建内容区域
    */
    children:[
      {
        type:'module',
        path: '/component/changelog',
        name:'compmain',
        component:() => import('./views/content/ChangeLog.vue')
      },
      {
        type:'module',
        path: '/component/compmain',
        name:'compmain',
        component:() => import('./views/content/CompMain.vue')
      },
      {
        type:'module',
        path: '/component/schedule',
        name:'compmain',
        component:() => import('./views/content/schedule.vue')
      }
    ]
  }
]

Vue.use(Router)
export default new Router({routes:routerData})




export {routerData}

/**
 * 路由：
 * 可以 - import Home from './views/Home.vue' 引入，component：直接使用
 * 也可以 - component: () => import('./views/Component.vue')
 * */
