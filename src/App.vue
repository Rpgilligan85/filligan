<template>
	<v-app v-if="dataLoaded">
		<v-container fluid class="pa-0">
			<v-row no-gutters>
				<v-col>
					<div id="timeslider-container">
						<TimeSlider />
					</div>
					<Map />
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import Map from './components/Map';
import TimeSlider from './components/TimeSlider';
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'App',
	components: {
		Map,
		TimeSlider,
	},
	data: () => ({
	}),
	computed: {
		...mapState(['data','dataLoaded']),
	},
	beforeMount() {
		this.$store.dispatch('loadData', {url:'./data/data.csv', id:'demo'})
	},
};
</script>

<style lang="scss">

	html {
		overflow: hidden !important;
	}

	#timeslider-container {
		position: absolute;
		bottom: 00px;
		left: 0;
		z-index: 20000;
		width: 100%;
		height: 125px;
		padding: 0 50px;
		background: rgba(255,255,255,0.6);
		display:flex;
		align-items: center
	}

</style>