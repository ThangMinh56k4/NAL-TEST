import Vue from "vue";
import Router from "vue-router";

const List = () => import(`./views/list.vue`);
const Create = () => import(`./views/create.vue`);
const Detail = () => import(`./views/detail.vue`);
const Edit = () => import(`./views/edit.vue`);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: `/`,
      name: `list`,
      component: List,
    },
    {
      path: `/create`,
      name: `create`,
      component: Create,
    },
    {
      path: `/edit/:id`,
      name: `edit`,
      component: Edit,
    },
    {
      path: `/Detail/:id`,
      name: `detail`,
      component: Detail,
    },
  ],
  mode: `history`,
});
