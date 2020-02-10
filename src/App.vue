<template>
	<v-app v-if="appReady">
		<v-container fluid class="pa-0">
			<v-toolbar color="#222" dark>
				<v-toolbar-title>
					{{config.details.headerTitle}}
				</v-toolbar-title>
			</v-toolbar>
			<v-row no-gutters>
				<v-col>
					<div id="timeslider-container">
						<TimeSlider v-if="appReady" />
					</div>
					<div id="legend-container">
						<Legend v-if="appReady" />
					</div>
					<div id="chart-container">
						<component 
							v-if="mapData.json.chart"
							:is="'BarChartStock'" 
							:options="config.BarChartStock" 
						/>
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
import BarChart from './components/BarChart';
import BarChartStock from './components/BarChartStock';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	name: 'App',
	components: {
		Map,
		TimeSlider,
		Legend,
		BarChart,
		BarChartStock,
	},
	data: () => ({
		appReady: false,
		count:0
	}),
	computed: {
		...mapState({
			config: state => state.config,
			mapData: state => state.dataLoader.appData,
		}),
		
	},
	methods: {
		...mapActions({
			loadData: 'dataLoader/loadData',
			createGeojson: 'dataLoader/createGeojson'
		}),

	},
	beforeMount() {
		let Keys = Object.keys(this.config.data);
		console.log('Jeys',Keys)
		Keys.forEach((key,index) => {
			this.loadData(this.config.data[key]).finally(() => {
			this.count++
				if(Keys.length === this.count) {
					console.log('hi', this.mapData) 
					this.appReady = true
				} 
			})
		})
	},
	mounted() {
	}
};
</script>

<style lang="scss">

	html {
		overflow: hidden !important;
	}
	#chart-container {
		position: absolute;
		top: 250px;
		left: calc(100vw / 2 - 425px);
		width: 850px;
		height: 500px;
		z-index: 1000;
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