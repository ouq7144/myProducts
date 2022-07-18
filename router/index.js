import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/Home',
                name: 'Home',
                meta: {
                    label: '首页',
                    index: 1
                },
                component: () => import('../views/Home/index.vue')
            },
            {
                path: '/Mall',
                name: 'Mall',
                meta: {
                    label: '商品管理',
                    index: 2
                },
                component: () => import('../views/Mall/index.vue')
            },
            {
                path: '/User',
                name: 'User',
                meta: {
                    label: '用户管理',
                    index: 2
                },
                component: () => import('../views/User/index.vue')
            },
            {
                path: '/Other/PageOne',
                name: 'PageOne',
                meta: {
                    label: '页面1',
                    index: 3
                },
                component: () => import('../views/Other/PageOne.vue')
            },
            {
                path: '/Other/PageTwo',
                name: 'PageTwo',
                meta: {
                    label: '页面2',
                    index: 3
                },
                component: () => import('../views/Other/PageTwo.vue')
            }
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import('../views/Login/index.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router