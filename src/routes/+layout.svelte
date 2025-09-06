<!-- src/routes/+layout.svelte -->
<script>
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import './styles.css';
	import { isMenuOpen } from '$lib/stores.js';
	import { onMount } from 'svelte';

	export let data;

	let bodyEl;
	onMount(() => {
		bodyEl = document.body;
	});

	$: if (bodyEl) {
		if ($isMenuOpen) {
			bodyEl.classList.add('noscroll');
		} else {
			bodyEl.classList.remove('noscroll');
		}
	}
</script>

{#if $isMenuOpen}
	<div class="overlay" on:click={() => isMenuOpen.set(false)} on:keydown={() => {}} role="button" tabindex="0"/>
{/if}

<div class="app-container">
	<Header user={data.user} />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
	}

	@media (max-width: 768px) { main { padding: 1.5rem; } }
	@media (max-width: 480px) { main { padding: 1rem; } }
</style>