import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/components/Home";
import App from './App.vue'
import TestPage from "@/components/TestPage";

const routes = [
    { path: '/', component: Home },
    { path: '/test', component: TestPage}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
