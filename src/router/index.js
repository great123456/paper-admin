import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    base: '/paper-admin/',
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../pages/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/order',
                    component: resolve => require(['../pages/order.vue'], resolve),
                    meta: { title: '论文检测订单' }
                },
                {
                    path: '/fee',
                    component: resolve => require(['../pages/fee.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/editor',
                    component: resolve => require(['../pages/editor.vue'], resolve),
                    meta: { title: '酒店详情' }
                },
                {
                    // 账号管理
                    path: '/account',
                    component: resolve => require(['../pages/account.vue'], resolve),
                    meta: { title: '账号管理' }
                },
                {
                    // 充值订单
                    path: '/recharge',
                    component: resolve => require(['../pages/recharge.vue'], resolve),
                    meta: { title: '充值订单' }
                },
                {
                    // 人工查重
                    path: '/check',
                    component: resolve => require(['../pages/check.vue'], resolve),
                    meta: { title: '降重管理' }
                },
                {
                    //检测类型
                    path: '/type',
                    component: resolve => require(['../pages/type.vue'], resolve),
                    meta: { title: '价格设置' }
                },{
                    //论文监测
                    path: '/submit',
                    component: resolve => require(['../pages/submit.vue'], resolve),
                    meta: { title: '论文检测' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../pages/Login.vue'], resolve),
            meta: { title : '论文'}
        },
        {
            path: '/404',
            component: resolve => require(['../pages/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../pages/403.vue'], resolve),
             meta: { title : '403'}
        },
        {
            path: '*',
            redirect: '/404',
            meta: { title : '404'}
        }
    ]
})
