import Vue from 'vue'
import Vuex from 'vuex'
import dataLoader from './modules/dataLoader'
import timeslider from './modules/timeslider'
import legend from './modules/legend'
import dialog from './modules/dialog'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
	  dataLoader,
	  timeslider,
	  legend,
	  dialog,
	},
 	state: {
	  config: config,
	  },
})
