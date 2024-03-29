import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase/index.js';
import '@/styles/main.scss';
import { i18n } from '@/i18n';
import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(createPinia());
app.use(VueFire, {
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});

app.mount('#app');
