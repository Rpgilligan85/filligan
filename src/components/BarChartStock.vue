<template>
	<highcharts 
		id="chart_height" 
		:options="chartOptions" 
		ref="barChart"
		:constructor-type="'stockChart'"
	>
	</highcharts>
</template>

<script>
import { mapState, mapActions } from "vuex";
const d3 = require("d3");

export default {
	name: "BarChartStock",
	props: ['options'],
	data() {
	return {
		series: [],
		chartData: null
	};
	},
	computed: {
		...mapState({
			config: state => state.config,
			mapData: state => state.dataLoader.appData,
		}),
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
			.key(d => d[this.options.groupProp] || d.properties[this.options.groupProp])
			.key(d => new Date(d[this.options.dateProp]).getTime() || new Date(d.properties[this.options.dateProp]).getTime())
			.rollup(v => v.length)
			.entries(this.chartData);
			console.log('DATA', data)
			let arr = [];
	
			for (let i = 0; i < data.length; i++) {
				arr.push({ name: data[i].key, data: [], date:true, type:'column' })
				for (let k = 0; k < data[i].values.length; k++) {
					arr[i].data.push([Number(data[i].values[k].key),data[i].values[k].value])
				}
			}
			for (let j = 0; j < arr.length; j++) {        
				arr[j].data.sort(function(a,b){
					return a[0] - b[0]
				})
			}
			this.series = arr
			console.log('ARR',arr)

		}
	},
	beforeMount() {
		this.chartData = this.mapData.json[this.options.dataID]
	},
	mounted() {
		console.log('chartData', this.chartData)
		this.parseData()
	}
	};
</script>

<style lang="scss">

</style>
