import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },

  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard' , affix: true}
    }]
  },

  {
    path: '/articles',
    component: Layout,
    redirect: '/articles/list',
    name: 'Articles',
    meta: { title: '文章管理', icon: 'wz' },
    children: [
      {
        path: 'list',
        name: 'ArticlesList',
        component: () => import('@/views/articles/list'),
        meta: { title: '文章列表', icon: 'wenzhang' }
      },
      {
        path: 'add',
        name: 'Addrticles',
        component: () => import('@/views/articles/add'),
        meta: { title: '发布文章', icon: 'fabu' }
      },
    ]
  },


  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/list',
    name: 'Operation',
    meta: { title: '日志中心', icon: 'operationlog' },
    children: [
      {
        path: 'list',
        name: 'OperationList',
        component: () => import('@/views/operation/index'),
        meta: { title: '操作日志', icon: '' }
      },
      {
        path: 'loginlog',
        name: 'LoginLogList',
        component: () => import('@/views/operation/loginlog'),
        meta: { title: '登录日志', icon: '' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'introduction',
        name: 'Introduction',
        component: () => import('@/views/user/introduction'),
        meta: { title: '个人介绍', icon: 'jieshao' }
      },
    ]
  },

  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/list',
    name: 'Notice',
    meta: { title: '公告管理', icon: 'notice' },
    children: [
      {
        path: 'list',
        name: 'NoticeList',
        component: () => import('@/views/notice/list'),
        meta: { title: '公告列表', icon: 'notice' }
      },
      {
        path: 'add',
        name: 'AddNotice',
        component: () => import('@/views/notice/add'),
        meta: { title: '发布公告', icon: 'fabu' }
      },
    ]
  },
  {
    path: '/categories',
    component: Layout,
    redirect: '/categories/list',
    name: 'Categories',
    meta: { title: '分类管理', icon: 'fenlei' },
    children: [
      {
        path: 'list',
        name: 'CategoriesList',
        component: () => import('@/views/categories/list'),
        meta: { title: '分类管理', icon: 'fenlei' }
      },
    ]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tag/list',
    name: 'Tag',
    meta: { title: '标签管理', icon: 'biaoqian' },
    children: [
      {
        path: 'list',
        name: 'TagList',
        component: () => import('@/views/tag/list'),
        meta: { title: '标签管理', icon: 'biaoqian' }
      },
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})