import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home/home'
import login from '../page/login/login'

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
    }
  ]
})
