import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"
import API from "./lib/API";
import httpUtil from "../projectCommon/js/request";
import ElementUI from 'element-ui';
import apiConfig from '../../config/api.config'
Vue.use(Vuex);
import { asyncRouterMap, constantRouterMap } from '../router/index';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {

    if(route.meta.role.indexOf('all')>=0){// 若为all 则无角色限制
      return  true;
    }
    return roles.some(roleName => route.meta.role.indexOf(roleName.name) >= 0)//判断 路由的角色是否包含当前角色
  } else {
    return true
  }
}

let store = new Vuex.Store({
  // 1. state
  state: {
    userInfo: {
      name:''
    },
    isLogin:false,
    token:'',
    role:[],
    pages:[],
    routers: constantRouterMap,
    addRouters: []
  },

  getters: {

    getUser(state) {
      return state.userInfo;
    },
    getToken(state){
      return state.token
    },
    getRole(state){
      return state.role
    },
    getPages(state){
      return state.pages
    },
    getIsLogin(state){
      return state.isLogin;
    },
    getAddRouters(state){
      return state.addRouters;
    }

  },
  actions: {//异步操作

    // commit调用mutations的方法
    login({commit, state}, user) {

      return new Promise(((resolve, reject) => {

        httpUtil.postXWFrom({
          url:API.login,
          data:user,
          isDone:true
        }).then(res=>{
          commit("setUserInfo", user);
          if(apiConfig.isJwt) {
            commit("setToken", res.token);
          }
          ElementUI.Message({
            message: '登录成功',
            type: 'success'
          });
          resolve("登录成功")

        },err=>{

          reject(err);

        })
      }))

    },
    GetUserInfo({commit, state}){
      return new Promise(((resolve, reject) => {

        httpUtil.postXWFrom({
          url:API.getLoginInfo,
          isDone:true
        }).then(res=>{
          commit("setUserInfo",res.userInfo)
          commit("setRole", res.roles);
          resolve(res.roles)

        },err=>{

          reject(err);

        })
      }))


    },
    loginOut({commit, state}){
      commit('clearData')
    },
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        console.log(data)
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          // if (roles.indexOf('admin') >= 0) return true;

          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  },
  // 4. mutations
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    setRole(state,role){

      state.role=role;


    },
    setUserInfo(state, user) {

      Object.assign(state.userInfo,user)
      state.isLogin=true;

    },
    setToken(state, token) {

      state.token = token;//将传参设置给state的city
      Window.localStorage.setItem("token",token)

    },
    clearData(state){

      state.isLogin=false;
      state.userInfo={},
      state.token=''
      state.role=[]

      ElementUI.Message({
        message: '退出登录',
        type: 'success'
      });

    }
  },
  //持久化到sessionStore 默认是localStore
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});

export default  store;


