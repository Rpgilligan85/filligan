<template>
  <v-dialog
		v-model="dialogObj.visible"
		@click:outside="closeDialog()"
		width="500"
	>
		<component v-if="dialogComponent" :is="dialogComponent" ref="globalComponent" :dialogObj="dialogObj" />
	</v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';


export default {
	name: 'Dialog',
	data: () => ({
		dialogComponent: null
	}),
	computed: {
		...mapState({
			dialogObj: state => state.dialog.dialogObj,
		}),
	},
  	methods: {
		...mapMutations({
			SET_DIALOG_OBJ: 'dialog/SET_DIALOG_OBJ'
		}),
	closeDialog() {
		console.log('dihi')
		this.SET_DIALOG_OBJ({visible:false})
	}
  },
	created() {
		console.log('start', this.dialogObj)
		const requireComponent = require.context(
    		"./", false, /[A-Z]\w+\.(vue|js)$/
  		);
		// const componentConfig = requireComponent('./CardTest.vue');
		const componentConfig = requireComponent(`./${this.dialogObj.component}.vue`);
		console.log('--->',componentConfig)
		this.$options.components.comp = componentConfig.default
		this.dialogComponent = 'comp'
	}

}
</script>