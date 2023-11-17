import { createWebHistory, createRouter } from 'vue-router'

import OverviewPage from "@/components/pages/overview/OverviewPage.vue";
import DetailPage from "@/components/pages/detail/DetailPage.vue";
import LoginPage from "@/components/pages/login/LoginPage.vue";
import SettingsPage from "@/components/pages/settings/SettingsPage.vue";
import NotFound from "@/components/pages/NotFound.vue";


const routes = [
    { path: '/', name: "Overview", component: OverviewPage },
    { path: '/favorites', name: "Favorites", component: OverviewPage, props: { favoritesOnly: true } },
    { path: '/login', name: "Login", component: LoginPage },
    { path: '/sell', name: "Sell", component: NotFound },
    { path: '/settings', name: "Settings", component: SettingsPage },
    { path: '/detail/:propertyId', name: "Detail", component: DetailPage, props: true },
    { path: "/notfound", name: "NotFound", component: NotFound },
    { path: "/:catchAll(.*)", redirect : "/notfound" },
]


const router = createRouter({
    history: createWebHistory(),
    
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, left: 0 };
        }
    },
})

export default router;