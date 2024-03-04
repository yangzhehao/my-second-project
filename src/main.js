import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import 'default-passive-events'
import App from './App.vue'
import uviewPlus from 'uview-plus'
export function createApp() {
  const app = createSSRApp(App);
  const store = createPinia();
  app.use(store);
  app.use(uviewPlus);
 
  return {
    app
  }
}



