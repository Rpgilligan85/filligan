<template>
	<v-treeview
		v-if="legendItems"
		selectable
		return-object
		:items="legendItems"
		v-model="selected"
  ></v-treeview>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	name: 'Legend',
	components: {
	},
	data: () => ({
		selected:[],
		legendItems:null
	}),
	computed: {
		...mapState({
			legendData: state => state.dataLoader.appData.legend,
		}),
		getItems() {
			let arr = [];
			let count = 0;
			for (let f in this.legendData) {
				count++
				arr.push({
					id: count,
					name: f,
					visible: true
				})
			}
			this.selected = arr
			return arr
		}
	},
	methods: {
		...mapMutations({
			SET_SELECTED: 'legend/SET_SELECTED'
		}),
		...mapActions({
			createLegendData: 'dataLoader/createLegendData'
		})
	},
	mounted() {
		this.createLegendData()
		this.legendItems = this.getItems
		console.log(this.legendData)
	},
	watch: {
		selected(val) {
			this.SET_SELECTED(val)
		}
	}
};

</script>

<style lang="scss">


</style>