import { createApp } from 'vue';
import '@/styles/main.scss';

import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from '@/App.vue';
import router from '@/router';

import nl from './locales/nl';
import en from './locales/en';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    nl,
  },
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(createPinia());

app.mount('#app');
