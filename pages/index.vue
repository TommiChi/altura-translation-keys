<script lang="ts" setup>
	import Search from '~/components/search/Search.vue';
	import ResultsTable from '~/components/results/ResultsTable.vue';
	import DateFilter from '~/components/date-filter/DateFilter.vue';


</script>

<template>
	<main>
		<section>
			<Search dataSource="https://directus.altura.io/items/translationKeys?fields=*,translations.*" />
			<div>
				<span>Updated At:</span>
				<span><DateFilter /></span>
			</div>
			<div>
				<span>Page Size:</span>
				<span></span>
			</div>

		</section>
		<section>
			<ResultsTable />
		</section>
		<section></section>
	</main>
</template>
<style scoped>
h1 {
	text-align: center;
}

main {
	display: grid;
	place-content: center;
	min-height: 100vh;
	max-width: 40rem;
	gap: 0.5rem;
	margin: 0 auto;
	padding-block: 2.5rem;
	line-height: 1.5;
}

.goose {
	width: 10rem;
	justify-self: center;
}

.design {
	border: 1px solid var(--shade-200);
	border-radius: 0.5rem;
	box-shadow:
		rgba(0, 0, 0, 0.12) 0px 0px 2px 0px,
		rgba(0, 0, 0, 0.14) 0px 1px 2px 0px;
}
</style>
