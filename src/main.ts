import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
