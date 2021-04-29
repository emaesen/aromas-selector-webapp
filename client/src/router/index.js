import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Aromas from '../views/Aromas'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      next("aromas");
    },
  },
  {
    path: "/aromas",
    name: "Aromas",
    component: Aromas
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router