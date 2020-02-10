<template>
	<highcharts 
		id="chart_height" 
		:options="chartOptions" 
		ref="barChart"
	>
	</highcharts>
</template>

<script>
import { mapState, mapActions } from "vuex";
const d3 = require("d3");

export default {
	name: "BarChart",
	props: ['options','chartData'],
	data() {
	return {
		series: [],
		categories: [],
	};
	},
	computed: {
		chartOptions: function() {
			return {
			chart: {
				type: this.options.type,
				isDirtyBox: true
			},
			title: {
				text: 'Bar Chart'
			},
			series: this.series
			};
		}
	},
	methods: {
		parseData() {
			let data = d3
			.nest()
			.key(d => d.properties[this.options.groupProp])
			.rollup(v => v.length)
			.entries(this.chartData);
			console.log('DATA', data)
	
			for (let i = 0; i < data.length; i++) {
				this.series.push({ name: data[i].key, data: [data[i].value] })
				// this.categories.push(data[i].key)
			}

		}
	},
	mounted() {
		console.log('chartData', this.chartData)
		this.parseData()
	}
	};
</script>

<style lang="scss">

</style>
