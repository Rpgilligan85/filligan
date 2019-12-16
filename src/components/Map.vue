<template>
	<div id="map">
		<l-map
			style="height: 100%; width: 100%"
			:zoom="zoom"
			:center="center"
		>
		<l-tile-layer :url="url"></l-tile-layer>

		<!-- <LGeojson 
			:geojson="data.geojson.demo"
			:options="options"
		/> -->

		</l-map>
	</div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet'
import { mapState } from 'vuex'

export default {
	name: 'Map',
	components: {LMap, LTileLayer, LMarker},
	data: () => ({
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		zoom: 3,
		center: [47.413220, -1.219482],
		bounds: null
	}),
	computed: {
		...mapState(['data']),
		options() {
			return {
				onEachFeature: this.onEachMarker()
			}
		}
	},
	methods: {
		onEachMarker() {
			return(feature,layer) => {
				console.log(feature)
			}
		}
	}
};
</script>

<style lang="scss">

	#map {
		width: 100vw;
		height: 100vh;
	}

</style>