//src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import HistoryPage from '../components/HistoryPage.vue'
import CurrentlyStatement from '../components/currentlyStatement.vue'  // New page
import CensorLaws from '../components/CensorLaws.vue'  // New page
import FaceGridPage from '../components/FaceGridPage.vue'  // New page

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/historyPage',
    name: 'HistoryPage',
    component: HistoryPage,
  },
  {
    path: '/currently-statement',
    name: 'CurrentlyStatement',
    component: CurrentlyStatement,
  },

  {
    path: '/CensorLaws',
    name: 'CensorLaws',
    component: CensorLaws,
  },

  {
    path: '/FaceGridPage',
    name: 'FaceGridPage',
    component: FaceGridPage,
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router



