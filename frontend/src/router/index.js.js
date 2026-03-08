import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Dashboard from "../pages/Dashboard.vue"
import Catalog from "../pages/Catalog.vue"

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/books",
        component: Dashboard
    },
    {
        path: "/catalog",
        component: Catalog
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/login",
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;