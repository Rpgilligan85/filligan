<template>
	<div id="map">
		<l-map
			style="height: 100%; width: 100%"
			:zoom="zoom"
			:center="center"
		>
		<l-tile-layer :url="url"></l-tile-layer>
		<template v-for="(item, id) in mapData">
			<Vue2LeafletMarkerCluster 
				v-for="(geo, key) in item" :key="key"
				:ref="key"
				:options="clusterOptions"
			>
				<LGeoJson
					:geojson="geo"
					:options="options(id)"
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
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

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
		},
		iconObj: null
	}),
	computed: {
		...mapGetters({
			selectedItems: 'legend/selected',
			// dataUpdated: 'timeslider/dataUpdated'
		}),
		...mapState({
			config: state => state.config,
			mapData: state => state.dataLoader.appData.filtered,
			dataUpdated: state => state.timeslider.dataUpdated
		}),
		
	},
	methods: {
		...mapActions({
			filterData: 'timeslider/filterData'
		}),
		
		options(id) {
			return {
				onEachFeature: this.onEachMarker(id)
			}
		},
		onEachMarker(id) {
			const prop = this.config.data[id].style.prop;
			return (feature,layer) => {
				let myIcon = L.divIcon({
					html:`<div class="mdi mdi-${this.getIcon(feature,prop,id)}" style="${this.getStyles(feature,prop,id)}"</div>`
				})
				layer.setIcon(myIcon)
				layer.bindPopup(feature.properties[prop])
			}
		},
		getIcon(feature, prop, id) {

			return this.iconObj[`${id}_${feature.properties[prop]}`].icon
		},
		getStyles(feature, prop, id) {
			return `color: ${this.iconObj[`${id}_${feature.properties[prop]}`].color}; font-size: ${this.iconObj[`${id}_${feature.properties[prop]}`].size}`
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
		},
		createIconObj() {
			let obj = {};
			for (let f in this.config.data) {
				if (this.config.data[f].options.dataOutput === 'geojson') {
					this.config.data[f].style.styleObj.forEach(item => {
						obj[`${f}_${item.value}`] = item
						obj[`${f}_${item.value}`].prop = this.config.data[f].style.prop
					});
				}
			}
			this.iconObj = obj
			console.log('obj',obj)
		}
	},
	watch: {
		dataUpdated: {
			handler: function(val) {
				val ? this.updateData() : null
			},
			deep: true
		},
		selectedItems(val) {
			console.log('val',val)
			this.filterData()
			this.updateData()
		}
	},
	mounted() {
		this.createIconObj()
		console.log(this.dataUpdated)
	}
};
</script>

<style lang="scss">

	#map {
		width: 100vw;
		height: calc(100vh - 65px);
	}

	.leaflet-div-icon {
		border: none !important;
		background: none !important;
	}



</style>