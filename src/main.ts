import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importer routeren
import './assets/style.css'

const app = createApp(App)

app.use(router) // Fortæl appen at den skal bruge routeren

app.mount('#app')
