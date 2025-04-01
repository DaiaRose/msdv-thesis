// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import TimelineForecastPage from "../components/TimelineForecastPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/timeline",
    name: "TimelineForecastPage",
    component: TimelineForecastPage,
  },
  // Optionally, you can add more routes here.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



