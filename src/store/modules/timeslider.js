import Vue from 'vue'
import _ from 'lodash'

const state = {
	dateRange:[],
	dataUpdated: false
}

const getters = {
	dataUpdated: state => state.dataUpdated
}

const mutations = {
    SET_DATE_RANGE: (state,arr) => {
        state.dateRange = arr
	},
	SET_TIMESLIDER_DATA:(state,arr) => {
		state.timesliderData = arr
	},
	UPDATE_DATA:(state,bool) => {
		state.dataUpdated = bool
	}
}

const actions = {
	filterData: ({commit, rootState}) => {
		const slider = rootState.config.timeslider;
		for (let i = 0; i < slider.data.length; i++) {
			console.log('DATA',rootState.dataLoader.appData.geojson)
			const arr = rootState.dataLoader.appData.geojson[slider.data[i]].filter(item => {
				let date = new Date(item.properties[slider.prop[i]]).getTime()
				let start = new Date(state.dateRange[0]).getTime()
				let end = new Date(state.dateRange[1]).getTime()
				if( date >= start && date <= end ) {
					return item
				}
			})
			console.log('ARR',arr)
			commit('dataLoader/SET_FILTERED_DATA',{id:slider.data[i], data:_.groupBy(arr, x => x.properties[rootState.config.data[slider.data[i]].style.prop])}, {root:true})
		}
		console.log('------->')
		commit('UPDATE_DATA', true)
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }