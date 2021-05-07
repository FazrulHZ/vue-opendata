import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../layout/main.vue'
import SubMain from '../layout/submain.vue'

import Home from '../views/Home.vue'
import Data from '../views/Data.vue'
import Organisasi from '../views/Organisasi.vue'
import Topik from '../views/Topik.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:
      [
        {
          path: '/',
          component: Home
        }
      ]
  },
  {
    path: '/data',
    name: 'SubMain',
    component: SubMain,
    children:
      [
        {
          path: '/data',
          component: Data
        },
        {
          path: '/Organisasi',
          component: Organisasi
        },
        {
          path: '/Topik',
          component: Topik
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
