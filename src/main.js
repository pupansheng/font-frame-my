// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store/store";
import http from "./projectCommon/js/request";
import whitePage from "./router/whitePage";
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.http=http;
router.beforeEach((to, from, next) => {

  if (store.getters.getIsLogin) { // 判断是否登录
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.getRole.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取info
          const roles = res;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.getAddRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {


      if (whitePage.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next();
      } else {
        next('/login'); // 否则全部重定向到登录页
      }

  }
});





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
