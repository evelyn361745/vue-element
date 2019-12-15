import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home/home'
import login from '../page/login/login'
import city from '../page/city/city'
import msite from '../page/msite/msite'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/city/:cityid',
      component: city
    },
    {
      path: '/msite',
      component: msite,
      meta: {
        keepAlive: true
      }
    }
  ]
})
