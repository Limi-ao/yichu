import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import suidao from '@/views/suidao'
import guanshan from '@/views/guanshan'
import xiushan from '@/views/xiushan'
import video from '@/views/video'
import system from '@/views/system'
import qbb from '@/views/qbb'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // component: index,
      redirect:{ name: 'home' }
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/home',
      name:'home',
      component: index,
    },
    {
      path: '/suidao',
      name:'suidao',
      component: suidao,
    },
    {
      path: '/guanshan',
      name:'guanshan',
      component: guanshan,
    },
    {
      path: '/xiushan',
      name:'xiushan',
      component: xiushan,
    },
    {
      path: '/video',
      name:'video',
      component: video,
    },
    {
      path: '/system',
      name:'system',
      component: system,
    },
    {
      path: '/qbb',
      name:'qbb',
      component: qbb,
    },
  ]
})
