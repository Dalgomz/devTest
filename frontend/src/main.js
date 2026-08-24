import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import axios from './api/axiosSetup.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(axios);

app.mount('#app');
