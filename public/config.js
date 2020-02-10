const config = {
	details: {
		headerTitle: 'Example 1'
	},
    data: {
		"demo": {
			id: "demo",
			dataInput: 'csv',
			options: {
				dataOutput: 'geojson',
				url: './data/data1.csv',
				lat: 'lat',
				lng:'lng'
			},
			style: {
				prop: 'POI',
				styleObj: [
					{
						value:'Bank',
						color:'red',
						icon: 'bank',
						size: '32px'
					},
					{
						value:'Bar',
						color:'blue',
						icon: 'beer',
						size: '32px'
					},
					{
						value:'Grocery Store',
						color:'green',
						icon: 'office-building',
						size: '32px'
					},
					{
						value:'Gas Station',
						color:'orange',
						icon: 'gas-station',
						size: '32px'
					},
				]
			}
		},
		"test": {
			id: "test",
			dataInput: 'csv',
			options: {
				dataOutput: 'geojson',
				url: './data/data2.csv',
				lat: 'lat',
				lng:'lng'
			},
			style: {
				prop: 'POI',
				styleObj: [
					{
						value:'Hospital',
						color:'red',
						icon: 'hospital',
						size: '32px'
					},
					{
						value:'School',
						color:'blue',
						icon: 'school',
						size: '32px'
					},
					{
						value:'Restaurant',
						color:'green',
						icon: 'food',
						size: '32px'
					},
					{
						value:'Hotel',
						color:'orange',
						icon: 'hotel',
						size: '32px'
					},
				]
			}
		},
		"chart": {
			id: "chart",
			dataInput:'csv',
			options: {
				dataOutput: 'json',
				url:'./data//export.csv'
			}
		},
	},
	timeslider: {
		data: ['demo','test'],
		prop: ['Date','Date']
	},
	BarChart: {
		dataFormat: 'column',
		groupProp: 'Category',
	},
	BarChartStock: {
		dataFormat: 'column',
		groupProp: 'Security',
		// groupProp: 'POI',
		dateProp: 'Date',
		dataID: 'chart'
		// dataID: 'demo'
	}
}