import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue"

Vue.use(VueRouter);
Vue.use(Buefy);

const routes = [
  {
    path: "/",
    name: "home",
	component: Home,
	props: true
  },
  {
	  path: "/settings",
	  name: "settings",
	  component: Settings,
	  props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
