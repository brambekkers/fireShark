import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import '@/styles/main.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
