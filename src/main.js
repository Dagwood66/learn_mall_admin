import Vue from 'vue'
import "./style/reset.css"
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from "element-ui"
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.use(ElementUI);

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
