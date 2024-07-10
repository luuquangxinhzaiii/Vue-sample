import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                {path: 'contact', component: ContactCoach}
            ]
        },
        {path: '/register', component: CoachRegistration, meta: {requireAuth: true}},
        {path: '/requests', component: RequestReceived, meta: {requireAuth: true}},
        {path: '/auth', component: UserAuth, meta: {requireUnAuth: true} },
        {path: '/:notFound(.*)', component: NotFound},
    ]
});

router.beforeEach(function(to, _, next ){
    if(to.meta.requireAuth && !store.getters.isAuthenticated){
        next(false);
        //next('/auth');
    }else if(to.meta.requireUnAuth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next();
    }
})

export default router;
