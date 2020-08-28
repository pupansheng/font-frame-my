import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export const constantRouterMap = [

  {
    path: '/login',
    name: 'Login',
    component :resolve=>require(['../corePage/login/Login'], resolve) ,
  }
]

export const asyncRouterMap = [

  {
    path: '/',
    name: 'Index',
    component:resolve=>require(['../projectPage/index/index'], resolve) ,
    meta: { role: ['all'] },
    children:[

      {
        path: 'test1',
        component:resolve=>require(['../projectPage/test1/test1'], resolve),
        name: '权限测试页1',
        meta: { role: ['all'] }  //页面需要的权限
      },
      {
        path: 'test2',
        component:resolve=>require(['../projectPage/test2/test2'], resolve),
        name: '权限测试页2',
        meta: { role: ['ROLE_ADMIN'] }  //页面需要的权限
      },
      {
        path: 'test3',
        component:resolve=>require(['../projectPage/test3/test3'], resolve),
        name: '权限测试页3',
        meta: { role: ['ROLE_USER'] }  //页面需要的权限
      }

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];



export default new Router({
  routes: constantRouterMap
})
