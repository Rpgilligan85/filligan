import Vue from 'vue'
import _ from 'lodash'

const state = {
	selected: []
}

const getters = {
	selected: state => state.selected
}

const mutations = {
	SET_SELECTED: (state,arr) => {
		state.selected = arr
	},
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }