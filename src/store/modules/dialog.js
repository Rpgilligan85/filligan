import Vue from 'vue'
import _ from 'lodash'

const state = {
	dialogObj: {
		component: null,
		visible: false,
		template: null,
		data: null
	}

}

const mutations = {
	SET_DIALOG_OBJ: (state, obj) => {
		state.dialogObj = obj
	},
}

export default {
    namespaced: true,
    state,
    mutations
  }