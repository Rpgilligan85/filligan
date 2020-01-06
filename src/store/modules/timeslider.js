import Vue from 'vue'
import _ from 'lodash'

const state = {
	dateRange:[],
}

const getters = {
}

const mutations = {
    SET_DATE_RANGE: (state,arr) => {
        state.dateRange = arr
	},
	SET_TIMESLIDER_DATA:(state,arr) => {
		state.timesliderData = arr
	}
}

const actions = {
	filterData: ({commit, rootState}, id) => {
		const slider = rootState.config.timeslider;
		const arr = rootState.dataLoader.appData.geojson[slider.data[0]].filter(item => {
			let date = new Date(item.properties[slider.prop[0]]).getTime()
			let start = new Date(state.dateRange[0]).getTime()
			let end = new Date(state.dateRange[1]).getTime()
			if( date >= start && date <= end ) {
				return item
			}
		})
		commit('dataLoader/SET_FILTERED_DATA',{id:id, data:_.groupBy(arr, x => x.properties[rootState.config.data[id].style.prop])}, {root:true})
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }