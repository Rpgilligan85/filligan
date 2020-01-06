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
	SET_LEGEND_DATA:(rootState,arr) => {
		state.appData.legend = arr
	}
}

const actions = {
    loadData: async ({commit, dispatch}, obj) => {
       await d3.csv(obj.options.url).then((data) => {
            commit('loadCsvData',{id:obj.id,data:data})
        })
    },
    createGeojson: async ({commit, rootState}, obj) => {
		console.log('OBJ',obj)
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
        commit('loadGeojsonData',{id:obj.id,data:geo})
        commit('SET_GROUP_DATA',{id:obj.id,data:_.groupBy(geo, x => x.properties[rootState.config.data[obj.id].style.prop])})
	},
	createLegendData: ({commit, state}) => {
		let combined = {};
		for (let f in state.appData.grouped) {
			_.assign(combined,{...state.appData.grouped[f]})
			
		}
		console.log('combined',combined)
		commit('SET_LEGEND_DATA', combined)
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }