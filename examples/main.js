import Vue from 'vue'
import App from './App.vue'
import SfRow from '../packages/row'
import SfCol from '../packages/col'
Vue.use(SfRow)
Vue.use(SfCol)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
