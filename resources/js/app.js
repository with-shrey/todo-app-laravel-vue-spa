import Vue from 'vue'
import VueRouter from 'vue-router'
import './bootstrap';
import App from "./App";
import {isAuthenticatedGuard, isNotAuthenticatedGuard} from "./utils/AuthGuard";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            meta: {
                title: 'Login'
            },
            beforeEnter: isNotAuthenticatedGuard,
            path: '/login',
            component: () => import('./pages/Login.vue')
        },
        {
            meta: {
                title: 'Register'
            },
            beforeEnter: isNotAuthenticatedGuard,
            path: '/register',
            component: () => import('./pages/Register.vue')
        },

        {
            meta: {
                title: 'Complete Todo List',
                completed: true
            },
            beforeEnter: isAuthenticatedGuard,
            path: '/todo/complete',
            component: () => import('./pages/Todo.vue')
        },
        {
            meta: {
                title: 'Incomplete Todo List',
                completed: false
            },
            beforeEnter: isAuthenticatedGuard,
            path: '/todo/incomplete',
            component: () => import('./pages/Todo.vue')
        },
        {
            path: '/todo',
            redirect: '/todo/incomplete'
        },

        {
            path: '/',
            redirect: '/todo'
        },
        {
            // will match everything
            path: '*',
            template: `404`
        }
    ],
});
// Vue.prototype.$axios = window.axios;
const app = new Vue({
    data: {routeLoading: true},
    el: '#app',
    components: {App},
    router,
});

router.beforeEach((to, from, next) => {
    app.routeLoading = true;
    console.log('start');
    next()
});

router.afterEach(() => {
    app.routeLoading = false;
    console.log('end');
});

