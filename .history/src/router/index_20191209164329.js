import Vue from 'vue'
import App from '../App.vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '../page/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    }
  ]
})
