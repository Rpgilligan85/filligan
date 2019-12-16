import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import dataLoader from './modules/dataLoader'

export default new Vuex.Store({
  state: {
    ready: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dataLoader
  }
})
