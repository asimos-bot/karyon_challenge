import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let router = new VueRouter({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/login',
            meta: {
                requiresAuth: false
            }
        },
        { 
            path: '/login',
            name: 'login',
            component: () => import("@/views/Login"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){

        const authenticated = this.$store.state.auth.user;

        if(authenticated == null){
            // not authenticated, you need to login first
            next({
                name: 'login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            // authenticated, go somewhere else if you are going
            // to '/login'
            next({
                name: to.name == 'login' ? 'cliente' : to.name
            })
        } 
    } else {
        next();
    }
});

export default router;