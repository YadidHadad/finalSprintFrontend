import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'


import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

import VueGeolocation from "vue3-geolocation";
// import GMaps from "vuejs3-google-maps";

import {
    focusDirective,
    rainbowDirective,
    customOnDirective,
    clickOutsideDirective,
} from './directives'

const app = createApp(rootCmp)
app.use(router)
app.use(store)


app.directive('click-outside', clickOutsideDirective)
app.directive('focus', focusDirective)

app.use(VueGeolocation);
// app.use(GMaps, {
//     load: {
//         apiKey: "AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw",
//         libraries: ["places"],
//     },
// });

app.mount('#app')
