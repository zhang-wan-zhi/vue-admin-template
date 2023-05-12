import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getID } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/register"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasId = getID();
  console.log("hasId", hasId);
  if (hasId) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      // const hasGetUserInfo = store.getters.name;
      // if (hasGetUserInfo) {
      //   next();
      // } else {
      //   try {
      //     await store.dispatch("user/getInfo");
      //     next();
      //   } catch (error) {
      //     await store.dispatch("user/resetToken");
      //     Message.error(error || "Has Error");
      //     next(`/login?redirect=${to.path}`);
      //     NProgress.done();
      //   }
      // }
    }
  } else {
    /* has no token*/
    // 不做token校验,用id来判断是否登录
    // next();
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
