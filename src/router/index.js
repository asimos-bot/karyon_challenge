import Vue from 'vue';
import VueRouter from 'vue-router';

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
            path: '/cliente',
            name: 'clientes',
            component: () => import("@/views/Clients"),
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

    const authenticated = localStorage.getItem('jwt');

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

        next({ name: 'clientes' });
    } else {
        next();
    }
});

export default router;