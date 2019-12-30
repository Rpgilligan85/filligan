import Vue from 'vue'
import Vuex from 'vuex'
import dataLoader from './modules/dataLoader'
Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
	  dataLoader
	},
 	state: {
	  config: config
  	},
})
