<!-- src/routes/+page.svelte -->
<script>
	// 홈페이지를 구성하는 각 섹션 컴포넌트들을 불러옵니다.
	import Hero from './components/Hero.svelte';
	import Introduction from './components/Introduction.svelte';
	import FeatureSection from './components/FeatureSection.svelte';
</script>

<!-- 각 섹션 컴포넌트들을 순서대로 배치합니다. -->
<Hero />

<Introduction />

<FeatureSection />