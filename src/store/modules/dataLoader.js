import Vue from 'vue'
const d3 = require('d3')

const state = {
    appData:{
        json: {},
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
    SET_JSON_DATA: (state, obj) => {
        Vue.set(state.appData.json, obj.id, obj.data)
    },
    SET_GEOJSON_DATA: (state, obj) => {
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
       switch (obj.dataInput) {
		   case 'csv':
			   await dispatch('loadCSVData', obj)
			   await dispatch('formatData', obj)
			   break;
	   
		   default:
			   break;
	   }
	},
	formatData: async ({commit, dispatch}, obj) => {
		switch (obj.options.dataOutput) {
			case 'geojson':
				await dispatch('createGeojson', obj)
				break;
		
			default:
				break;
		}
	 },
	loadCSVData: async ({commit, dispatch}, obj) => {
		await d3.csv(obj.options.url).then(async (data) => {
			console.log('CSVVVVVVVVVVV')
			await commit('SET_JSON_DATA',{id:obj.id,data:data})
        })
	},
    createGeojson: async ({commit, state, rootState}, obj) => {
		console.log('GEOJSONNNNNNNNNNNN')
		obj.data = state.appData.json[obj.id]
		console.log('OBJ',obj)
        let geo = [];
        for (let i = 0; i < obj.data.length; i++) {
			let _lat = Number(obj.data[i][obj.options.lat]);
            let _long = Number(obj.data[i][obj.options.lng]);
            geo[i] = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [_long,_lat]
                },
                properties: obj.data[i]
            }
        }
        commit('SET_GEOJSON_DATA',{id:obj.id,data:geo})
        commit('SET_GROUP_DATA',{id:obj.id,data:_.groupBy(geo, x => x.properties[rootState.config.data[obj.id].style.prop])})
	},
	createLegendData: ({commit, state}) => {
		console.log('STATE',state.appData.geojson)
		let combined = {};
		let all = [];
		for (let f in state.appData.grouped) {
			_.assign(combined,{...state.appData.grouped[f]})
			
		}
		for (let i in state.appData.geojson) {
			all.push(state.appData.geojson[i])
		}
		commit('SET_LEGEND_DATA', combined)
		commit('SET_GEOJSON_DATA',{id:'combined',data:_.flatten(all)})
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }