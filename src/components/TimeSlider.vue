<template>
	<div id="slider"></div>
</template>

<script>

import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'
import dayjs from 'dayjs'

export default {
	name: 'TimeSlider',
	components: {
		noUiSlider
	},
	data: () => ({
		dates:['1/1/2019','1/2/2019','1/3/2019','1/4/2019','1/5/2019','1/6/2019','1/7/2019', '1/8/2019', '1/1/2019','1/2/2019','1/3/2019','1/4/2019','1/5/2019','1/6/2019','1/7/2019', '1/8/2019'],
		sliderValue: null
	}),
	methods: {
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
					values:6,
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
			this.$el.noUiSlider.on('update',(values, handle) => {
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
			console.log(this.sliderValue)
		}
	},
	mounted() {
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