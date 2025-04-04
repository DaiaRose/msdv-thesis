//src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import TimelineForecastPage from '../components/TimelineForecastPage.vue'
import CurrentlyStatement from '../components/currentlyStatement.vue'  // New page
import CensorLaws from '../components/CensorLaws.vue'  // New page
import FaceGrid from '../components/FaceGrid.vue'  // New page

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/timeline',
    name: 'TimelineForecast',
    component: TimelineForecastPage,
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
    path: '/FaceGrid',
    name: 'FaceGrid',
    component: FaceGrid,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router



