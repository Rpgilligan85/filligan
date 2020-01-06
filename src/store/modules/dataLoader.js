import Vue from 'vue'
const d3 = require('d3')

const state = {
    appData:{
        csv: {},
		geojson: {},
		grouped: {},
		legend: {},
		filtered: {},
    },
    dataLoaded: false,
    dateRange:[]
}

const getters = {
    dataLoaded: state => state.dataLoaded,
}

const mutations = {
    loadCsvData: (state, obj) => {
        Vue.set(state.appData.csv, obj.id, obj.data)
    },
    loadGeojsonData: (state, obj) => {
        Vue.set(state.appData.geojson, obj.id, obj.data)
    },
    SET_GROUP_DATA: (state, obj) => {
        Vue.set(state.appData.grouped, obj.id, obj.data)
    },
    SET_FILTERED_DATA: (state, obj) => {
        Vue.set(state.appData.filtered, obj.id, obj.data)
    },
    dataLoaded:(state, bool) => {
        state.dataLoaded = bool
    },
    SET_DATE_RANGE: (state,arr) => {
        state.dateRange = arr
	},
	SET_LEGEND_DATA:(rootState,arr) => {
		state.appData.legend = arr
	}
}

const actions = {
    loadData: ({commit, dispatch}, obj) => {
        d3.csv(obj.options.url).then((data) => {
            commit('loadCsvData',{id:obj.id,data:data})
            dispatch('createGeojson', {id:obj.id,data:data,lat:obj.options.lat,lng:obj.options.lng})
            commit('dataLoaded', true)
        })
    },
    createGeojson:({commit, rootState}, obj) => {
        let geo = [];
        for (let i = 0; i < obj.data.length; i++) {
            let _lat = Number(obj.data[i][obj.lat]);
            let _long = Number(obj.data[i][obj.lng]);
            geo[i] = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [_long,_lat]
                },
                properties: obj.data[i]
            }
        }
        console.log('geo',geo)
        commit('loadGeojsonData',{id:obj.id,data:geo})
        commit('SET_GROUP_DATA',{id:obj.id,data:_.groupBy(geo, x => x.properties[rootState.config.data[obj.id].style.prop])})
	},
	createLegendData: ({commit, state, rootState}, obj) => {
		commit('SET_LEGEND_DATA', _.groupBy(state.appData.geojson.demo, x => x.properties[rootState.config.data.demo.style.prop]))
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }