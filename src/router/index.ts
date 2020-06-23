import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import AddPlayer from "../views/player/edit.vue";
import ViewPlayer from "../views/player/view.vue";
import TeamList from "../views/team/list.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/team",
    name: "Team",
    component: TeamList,
  },
  {
    path: "/player/add",
    name: "AddPlayer",
    component: AddPlayer,
  },
  {
    path: "/player/view",
    name: "ViewPlayer",
    component: ViewPlayer,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
