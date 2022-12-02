import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'


import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

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


app.mount('#app')
