import { createApp } from 'vue'
import './assets/style/tailwind.css'
import './assets/style/style.css'
import { setupStore } from '@/store'
import { setupGlobDirectives } from '@/directives'
import { setupRouter, router } from '@/router'
import '@/core'
import { setupRouterGuard } from '@/router/guard'
import { printANSI } from '@/utils/log'
import App from './App.vue'
import { PasswordInput, NumberKeyboard } from 'vant';

(async () => {
    const app = createApp(App)
    app.use(PasswordInput);
    app.use(NumberKeyboard);
    setupStore(app)
    setupRouter(app)

    setupRouterGuard(router)

    // Register global directive
    setupGlobDirectives(app)

    printANSI()
    app.mount('#app')
})()
