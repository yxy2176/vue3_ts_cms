import './assets/main.css'
import 'normalize.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
