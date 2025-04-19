//src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import TimelinePage from '../pages/TimelinePage.vue'
import CurrentlyStatement from '../pages/currentlyStatement.vue'  // New page
import CensorLaws from '../pages/CensorLaws.vue'  // New page
import FaceGridPage from '../pages/FaceGridPage.vue'  // New page
import impactPage from '../pages/impactPage.vue'  // New page

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/timelinePage',
    name: 'TimelinePage',
    component: TimelinePage,
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

  {
    path: '/impactPage',
    name: 'impactPage',
    component: impactPage,
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router



