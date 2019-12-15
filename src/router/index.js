import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')),'home')
const login = r => require.ensure([], () => r(require('../page/login/login')),'login')
const city = r => require.ensure([], () => r(require('../page/city/city')),'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')),'msite')
const order = r => require.ensure([], () => r(require('../page/order/order')),'order')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')),'profile')
const search = r => require.ensure([], () => r(require('../page/search/search')),'search')
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
    },
    {
      path: '/search/:geohash',
      component: search
    },
    {
      path: '/profile',
      component: profile
    },
    {
      path: '/order',
      component: order
    }
  ]
})
