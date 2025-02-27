import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerIcons from './global/register-icons'
/** element-plus暗黑主题 */
import 'element-plus/theme-chalk/dark/css-vars.css'

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(registerIcons)
app.use(store)
app.use(router)
app.mount('#app')
