<template>
	<div id="slider"></div>
</template>

<script>

import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'
import dayjs from 'dayjs'
import { mapState, mapMutations, mapActions } from 'vuex';
import _ from 'lodash'

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
			mapData: state => state.dataLoader.appData.json
		}),
		async getDates() {
			let dates = [];
			for(let f in this.mapData) {
				if (f != 'chart') {
					dates.push([...new Set(this.mapData[f].map(item => item.Date))])
					let uniq = _.uniq(dates).flat()
					console.log(uniq)
					this.dates = uniq.sort((a,b) => new Date(a) - new Date(b))
				}
			}
		}
	},
	methods: {
		...mapMutations({
			SET_DATE_RANGE: 'timeslider/SET_DATE_RANGE',
			UPDATE_DATA: 'timeslider/UPDATE_DATA'
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
			this.UPDATE_DATA(false)
			this.filterData()
			console.log('state', this.$store.state)
			// console.log(this.sliderValue)
		}
	},
	beforeMount() {
		this.getDates.finally(()=> {
			this.initSlider()
		})
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