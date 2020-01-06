<template>
	<div id="map">
		<l-map
			style="height: 100%; width: 100%"
			:zoom="zoom"
			:center="center"
		>
		<l-tile-layer :url="url"></l-tile-layer>
		<template v-for="item in mapData">
			<Vue2LeafletMarkerCluster 
				v-for="(geo, key) in item" :key="key"
				:ref="key"
				:options="clusterOptions"
			>
				<LGeoJson
					:geojson="geo"
					:options="options"
					:ref="`geojson_${key}`"
				/>
			</Vue2LeafletMarkerCluster>
		</template>
		</l-map>
	</div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	name: 'Map',
	components: {LMap, LTileLayer, LMarker, LGeoJson, Vue2LeafletMarkerCluster},
	data: () => ({
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		zoom: 3,
		center: [47.413220, -1.219482],
		bounds: null,
		mapLoaded : false,
		clusterOptions: {
			maxClusterRadius:30
		}
	}),
	computed: {
		...mapGetters({
			selectedItems: 'legend/selected',
		}),
		...mapState({
			config: state => state.config,
			mapData: state => state.dataLoader.appData.filtered
		}),
		options() {
			return {
				onEachFeature: this.onEachMarker()
			}
		}
	},
	methods: {
		...mapActions({
			filterData: 'timeslider/filterData'
		}),
		onEachMarker() {
			return (feature,layer) => {
				let myIcon = L.divIcon({
					className:`marker mdi mdi-${feature.properties.POI.toLowerCase()}`
				})
				layer.setIcon(myIcon)
				layer.bindPopup(feature.properties.POI)
			}
		},
		toggleData(key) {
			let items = this.selectedItems.map(x => x.name)
			return items.indexOf(key) != -1 ? true : false
		},
		updateData() {
			setTimeout(() => {
				let items = this.selectedItems.map(x => x.name)
				for(let f in this.$refs) {
					this.$refs[f][0].mapObject.clearLayers()
					if(items.indexOf(f) != -1) {
						this.$refs[f][0].mapObject.addLayers(this.$refs[`geojson_${f}`][0].mapObject)
					}
				}
			}, 1);
		}
	},
	watch: {
		mapData: {
			handler: function(val) {
				this.updateData()
			},
			deep: true
		},
		selectedItems(val) {
			this.filterData('demo')
		}
	},
	mounted() {
		console.log('STATE', this.mapData)
	}
};
</script>

<style lang="scss">

	#map {
		width: 100vw;
		height: calc(100vh - 65px);
	}

	.marker {
		font-size: 32px;
		color: red;
		background: red;
	}



</style>