<template>
	<div id="map">
		<l-map
			style="height: 100%; width: 100%"
			:zoom="zoom"
			:center="center"
		>
		<l-tile-layer :url="url"></l-tile-layer>
		<Vue2LeafletMarkerCluster v-if="data.geojson.demo" ref="clusterRef">
			<LGeoJson
				:geojson="filteredData"
				:options="options"
				ref="geojsonRef"
			/>
		</Vue2LeafletMarkerCluster>
		</l-map>
	</div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet'
import { mapGetters } from 'vuex'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'

export default {
	name: 'Map',
	components: {LMap, LTileLayer, LMarker, LGeoJson, Vue2LeafletMarkerCluster},
	props:['data','state'],
	data: () => ({
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		zoom: 3,
		center: [47.413220, -1.219482],
		bounds: null,
		mapLoaded : false
	}),
	computed: {
		...mapGetters(['filteredData']),
		options() {
			return {
				onEachFeature: this.onEachMarker()
			}
		}
	},
	methods: {
		onEachMarker() {
			return (feature,layer) => {
				// console.log(feature)
				let myIcon = L.divIcon({
					html:'<div class="circle"></div>'
				})
				layer.setIcon(myIcon)
			}
		}
	},
	mounted() {
		console.log('map', this.filteredData)
	},
	watch: {
		filteredData(val) {
			console.log('val',this.$refs.clusterRef.mapObject)
			this.$refs.clusterRef.mapObject.clearLayers()
			this.$refs.clusterRef.mapObject.addLayers(this.$refs.geojsonRef.mapObject)
		}
	}
};
</script>

<style lang="scss">

	#map {
		width: 100vw;
		height: 100vh;
	}

	.circle {
		width: 50px;
		height: 50px;
		border-radius: 100%;
		background: red;
	}

</style>