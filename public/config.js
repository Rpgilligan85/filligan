const config = {
	details: {
		headerTitle: 'Example 1'
	},
    data: {
		"demo": {
			id: "demo",
			type: 'csv',
			options: {
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
						color:'red',
						icon: 'beer',
						size: '32px'
					},
					{
						value:'Grocery Store',
						color:'red',
						icon: 'storefront',
						size: '32px'
					},
					{
						value:'Gas Station',
						color:'red',
						icon: 'gas-station',
						size: '32px'
					},
				]
			}
		}
	},
	timeslider: {
		data: ['demo'],
		prop: ['Date']
	}
}