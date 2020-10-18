import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

let router = new VueRouter({

    mode: 'history',
    routes: [
        { 
            path: '/login',
            name: 'login',
            component: () => import("@/views/Login"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/clients',
            name: 'clients',
            component: () => import("@/views/Clients"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/client/:id',
            name: 'client',
            component: () => import("@/views/Client"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '*',
            name: 'unknown',
            redirect: { name: 'login' }
        }
    ]
})

router.beforeEach((to, from, next) => {

    const authenticated = store.state.auth.jwt;

    if(to.matched.some(record => record.meta.requiresAuth)){
        if(authenticated == null){
            // not authenticated, you need to login first
            next({
                name: 'login',
                params: { nextUrl: to.fullPath }
            });
        } else {
            next();
        }next() 
    } else if( to.name == 'login' && authenticated ){

        next({ name: 'clients' });
    } else {
        next();
    }
});

export default router;