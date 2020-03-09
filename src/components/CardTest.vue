<template>
	<v-card>
		<v-card-title>
			{{dialogObj.title}}
		</v-card-title>
		<v-card-text>
			Here is some Text: {{dialogObj.data.properties.POI}}
		</v-card-text>
		<v-card-actions>
			<v-btn>Hello</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'MapTest',
	props: ['dialogObj'],
}
</script>
<style lang="scss">

	h1 {
		text-align: center;
	}

</style>