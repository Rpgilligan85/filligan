<template>
	<v-app v-if="dataLoaded">
		<v-container fluid class="pa-0">
			<v-toolbar color="#222" dark>
				<v-toolbar-title>
					{{config.details.headerTitle}}
				</v-toolbar-title>
			</v-toolbar>
			<v-row no-gutters>
				<v-col>
					<div id="timeslider-container">
						<TimeSlider v-if="dataLoaded" />
					</div>
					<div id="legend-container">
						<Legend v-if="dataLoaded" />
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
import Legend from './components/Legend';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
		Map,
		TimeSlider,
		Legend,
	},
	data: () => ({
	}),
	computed: {
		...mapState({
			config: state => state.config,
			mapData: state => state.dataLoader.appData,
			dataLoaded: state => state.dataLoader.dataLoaded,
		})
	},
	methods: {
		...mapActions({
			loadData: 'dataLoader/loadData'
		})
	},
	beforeMount() {
		for (let f in this.config.data) {
			this.loadData(this.config.data[f])
		}
	},
	mounted() {
		console.log(this.mapData)
	}
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
	#legend-container {
		position: absolute;
		left: 20px;
		top: 150px;
		z-index: 20000;
		width: 200px;
		height: 400px;
		padding: 0;
		background: rgba(255,255,255,0.6);
		display:flex;
		align-items: center
	}

</style>