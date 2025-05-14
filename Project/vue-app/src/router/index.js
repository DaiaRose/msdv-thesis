//src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import TimelinePage from '../pages/TimelinePage.vue'
import CurrentlyCensor from '../pages/CurrentlyCensor.vue' 
import CensorLaws from '../pages/CensorLaws.vue'  
import FaceGridIntroPage from '../pages/FaceGridIntroPage.vue'
import FaceGridStatsPage from '../pages/FaceGridStatsPage.vue'  
import impactPage from '../pages/impactPage.vue'  
import CurrentlyInclude from '../pages/CurrentlyInclude.vue'
// import WHY from '../pages/WHY.vue'
// import IMPACT from '../pages/IMPACT.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/timelinePage',
    name: 'TimelinePage',
    component: TimelinePage
  },
  {
    path: '/CurrentlyCensor',
    name: 'CurrentlyCensor',
    component: CurrentlyCensor,
    meta: { transition: 'scroll-down' }
  },
  {
    path: '/CensorLaws',
    name: 'CensorLaws',
    component: CensorLaws,
    meta: { transition: 'scroll-down' }
  },
  // {
  //   path: '/WHY',
  //   name: 'WHY',
  //   component: WHY
  // },
  {
    path: '/FaceGridIntroPage',
    name: 'FaceGridIntroPage',
    component: FaceGridIntroPage,
  },

  {
    path: '/FaceGridStatsPage',
    name: 'FaceGridStatsPage',
    component: FaceGridStatsPage,
  },
  {
    path: '/CurrentlyInclude',
    name: 'CurrentlyInclude',
    component: CurrentlyInclude
  },
  // {
  //   path: '/IMPACT',
  //   name: 'IMPACT',
  //   component: IMPACT
  // },
  {
    path: '/impactPage',
    name: 'impactPage',
    component: impactPage
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router



