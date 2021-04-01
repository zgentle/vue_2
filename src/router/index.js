import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Message
} from 'element-ui'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import ('@/views/Home'),
  },
  {
    path: '/example',
    name: 'Example',
    component: () =>
      import ( /* webpackChunkName: "example" */ '../views/Example.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*', // 页面不存在的情况下会跳到404页面
    name: 'notFound',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否判断权限
    let lock = true
    if (lock) { // 权限锁
      next();
    } else { // 无权限时弹窗提醒
      Message.error('您访问的页面不存在或者您无权访问该页面！');
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // window.document.title = 'XX'
})

export default router