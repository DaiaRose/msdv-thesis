//src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
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

// Set the base path based on the environment
const base =
  process.env.NODE_ENV === 'production' ? '/msdv-thesis/' : '/'

const router = createRouter({
  history: createWebHistory(base),
  routes,
})

export default router



