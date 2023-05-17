import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "主页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/guidance",
    component: Layout,
    redirect: "/guidance/career-plann",
    name: "guidance",
    meta: { title: "学生指导模块", icon: "el-icon-s-help" },
    children: [
      {
        path: "career-plann",
        name: "career-plann",
        component: () => import("@/views/guidance/career-plann/index"),
        meta: { title: "生涯规划指导", icon: "table" },
      },
    ],
  },
  {
    path: "/develop",
    component: Layout,
    redirect: "/develop/course-manage",
    name: "develop",
    meta: { title: "学生发展模块", icon: "el-icon-s-help" },
    children: [
      {
        path: "course-manage",
        name: "course-manage",
        component: () => import("@/views/develop/course-manage/index"),
        meta: { title: "课程管理", icon: "table" },
      },
      {
        path: "job-manage",
        name: "job-manage",
        component: () => import("@/views/develop/job-manage/index"),
        meta: { title: "岗位管理", icon: "table" },
      },
      {
        path: "company-manage",
        name: "company-manage",
        component: () => import("@/views/develop/company-manage/index"),
        meta: { title: "公司管理", icon: "table" },
      },
    ],
  },
  {
    path: "/life",
    component: Layout,
    redirect: "/life/game-manage",
    name: "life",
    meta: { title: "生活指导模块", icon: "el-icon-s-help" },
    children: [
      {
        path: "game-manage",
        name: "game-manage",
        component: () => import("@/views/life/game-manage/index"),
        meta: { title: "游戏管理", icon: "table" },
      },
      {
        path: "article-manage",
        name: "article-manage",
        component: () => import("@/views/life/article-manage/index"),
        meta: { title: "文章管理", icon: "table" },
      },
      {
        path: "chat",
        name: "chat",
        component: () => import("@/views/life/chat/index"),
        meta: { title: "实时聊天", icon: "table" },
      },
    ],
  },
  {
    path: "/record",
    component: Layout,
    redirect: "/record/user-manage",
    name: "record",
    meta: { title: "学生档案", icon: "el-icon-s-help" },
    children: [
      {
        path: "user-manage",
        name: "user-manage",
        component: () => import("@/views/record/user-manage/index"),
        meta: { title: "用户管理", icon: "table" },
      },
      {
        path: "survey",
        name: "survey",
        component: () => import("@/views/record/survey/index"),
        meta: { title: "学生生涯调查表", icon: "table" },
      },
    ],
  },

  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
