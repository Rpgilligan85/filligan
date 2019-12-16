import Vue from 'vue'
const d3 = require('d3')

const state = {
    data:{
        csv: {},
        geojson: {}
    },
    dataLoaded: false
}

const getters = {
    dataLoaded: state => state.dataLoaded
}

const mutations = {
    loadCsvData: (state, obj) => {
        Vue.set(state.data.csv, obj.id, obj.data)
    },
    loadGeojsonData: (state, obj) => {
        Vue.set(state.data.geojson, obj.id, obj.data)
    },
    dataLoaded:(state, bool) => {
        state.dataLoaded = bool
    }
}

const actions = {
    loadData: ({commit, dispatch}, obj) => {
        d3.csv(obj.url).then((data) => {
            commit('loadCsvData',{id:obj.id,data:data})
            dispatch('createGeojson', {id:obj.id,data:data,lat:'lat',lng:'lng'})
            commit('dataLoaded', true)
        })
    },
    createGeojson:({commit}, obj) => {
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
        
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}