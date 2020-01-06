import Vue from 'vue'
import Vuex from 'vuex'
import dataLoader from './modules/dataLoader'
import timeslider from './modules/timeslider'
import legend from './modules/legend'
Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
	  dataLoader,
	  timeslider,
	  legend,
	},
 	state: {
	  config: config
  	},
})
