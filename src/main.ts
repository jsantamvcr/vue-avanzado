import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';

import './assets/main.css';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

VueQueryPlugin.install(app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 60  // Opcional: número de reintentos si falla
            }
        }
    }
})

app.mount('#app');
