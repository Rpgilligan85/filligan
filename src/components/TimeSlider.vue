<template>
	<div id="slider"></div>
</template>

<script>

import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'
import dayjs from 'dayjs'
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	name: 'TimeSlider',
	components: {
		noUiSlider
	},
	data: () => ({
		dates:null,
		sliderValue: null
	}),
	computed: {
		...mapState({
			mapData: state => state.dataLoader.appData.csv.demo
		}),
		getDates() {
			const dates = [...new Set(this.mapData.map(item => item.Date))]
			return dates.sort((a,b) => new Date(a) - new Date(b))
		}
	},
	methods: {
		...mapMutations({
			SET_DATE_RANGE: 'timeslider/SET_DATE_RANGE'
		}),
		...mapActions({
			filterData: 'timeslider/filterData'
		}),
		initSlider() {
			noUiSlider.create(this.$el, {
				start: [1, 7],
				// start:3,
				connect: true,
				step: 1,
				range: {
					min: 0,
					max: this.dates.length -1,
				},
				tooltips: [this.prettyDates(), this.prettyDates()],
				pips: {
					mode: 'count',
					density: this.dates.length / 2 ,
					values:10,
					// filter: this.filterPips,
					stepped: true,
					format: { 
						to: (value) => dayjs(this.dates[Math.floor(value)]).format('M/D/YYYY'),
						from: (value) => dayjs(this.dates[Math.floor(value)]).format('M/D/YYYY')
					} 
				},
				format: {
					to: (value) => Math.floor(value),
					from: (value) => Math.floor(value)
				}
			});
			this.$el.noUiSlider.on('end',(values, handle) => {
				this.updateValues(values, handle)
			});
		},
		filterPips(value,type) {
			return ((value % 2 === 1 && value > 2) || value === 0 || value === this.dates.length -1) ? 1 : 0
		},
		timestamp(date) {
			return new Date(date).getTime()
		},
		prettyDates(e) {
			return {to: (value) => dayjs(this.dates[Math.floor(value)]).format('M/D/YYYY')}
		},
		updateValues(values, handle) {
			let start,end;
			if(values.length === 1) {
				start = this.dates[values[0]]
				this.sliderValue = start
			} else {
				start = this.dates[values[0]]
				end = this.dates[values[1]]
				this.sliderValue = [start,end]
			}
			this.SET_DATE_RANGE([start,end])
			this.filterData('demo')
			console.log('state', this.$store.state)
			// console.log(this.sliderValue)
		}
	},
	mounted() {
		this.dates = this.getDates
		this.initSlider()
	},
};

</script>

<style lang="scss">

	#slider {
		width: 100%;
		height: 20px;

		.noUi-connects {
			background: #ccc;
		}

		.noUi-handle, .noUi-touch-area {
			cursor: pointer;
		}

		.noUi-pips {
			color: #333;
		}
		.noUi-marker {
			top: 0px;
			background: #666;
		}
		.noUi-marker-normal {
			height: 10px;
		}
		.noUi-marker-large {
			height: 20px;
		}
	}

</style>