import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Aromas from '../views/Aromas'
import AromaGroups from '../views/AromaGroups'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      next("aromas/");
    },
  },
  {
    path: "/aromas",
    name: "Aromas",
    component: Aromas
  },
  {
    path: "/aroma-groups",
    name: "AromaGroups",
    component: AromaGroups
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.options.scrollBehavior = function(to, from, savedPosition) {
  return new Promise((resolve) => {
    const is404 = to.name==="*"
    setTimeout(() => {
      if (to.hash && !is404) {
        resolve( {
          selector: to.hash,
          behavior: 'smooth'
        } );
      } else if (savedPosition) {
        resolve( savedPosition );
      } else {
        resolve( { x: 0, y: 0 } );
      }
    }, 500)
  })
}

export default router