import { createApp } from 'vue'
import Vuex from 'vuex';
createApp(Vuex);

import { createI18n } from 'vue-i18n'
import store from "./store";

import { EventBus } from "./event-bus.js";
import { router } from "./plugins/vue-router";
import { i18n } from "./plugins/vue-i18n";

// components
import Master from "./layouts/Master.vue";
import MainLayout from "./layouts/MainLayout.vue";

const app = createApp(Master);

app.use(router);
app.use(i18n);
app.use(store);
app.use(EventBus);

app.component('m-layout', MainLayout);

app.mount('#app');