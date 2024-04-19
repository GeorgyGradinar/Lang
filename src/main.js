import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia';

// Vuetify
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

import 'animate.css';
import AOS from 'aos'
import 'aos/dist/aos.css';

const vuetify = createVuetify({
    components,
    directives,
    locale: {
        locale: 'ru',
        fallback: 'ru',
    },
    icons: {
        defaultSet: 'mdi',
    },
})

createApp(App)
    .use(router)
    .use(createPinia())
    .use(vuetify)
    .use(AOS.init())
    .mount('#app')
