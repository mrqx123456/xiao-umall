// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/http/index'

// 导入字体图标
import './assets/fonts/iconfont.css'
// 属性过滤器
import './filters/statusFormat.js'
// 类型过滤器
import './filters/typeFormat.js'
// 角色过滤器
import './filters/roleFormat.js'

// 新品过滤器
import './filters/isnewFormat.js'

// 热卖过滤器
import './filters/ishotFormat.js'


Vue.prototype.$http = http
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
