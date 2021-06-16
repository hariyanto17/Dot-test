import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MovieDetail from "../views/MovieDetail.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie/:id",
    name: "Movie Detail",
    component: MovieDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAunthenticated = JSON.parse(localStorage.getItem("autenticated"));

  if(to.name !== "Login" && !isAunthenticated) next({name : 'Login'})
  if(to.name === "Login" && isAunthenticated) next({name : 'Home'})
  else next()

})

export default router;
