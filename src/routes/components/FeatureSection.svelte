<!-- src/routes/components/FeatureSection.svelte -->

<!-- 1. HTML 구조가 먼저 나와야 합니다.
 
<section class="feature-section">
	<div class="feature-text">
		<h2>중앙동아리 유일 코딩동아리</h2>
		<p>
			73% of developers that used it want to keep working with Svelte.
			Fun fact: Our team at Stack Overflow used Svelte for the first time
			in building our 2024 Developer Survey results site.
		</p>
	</div>
	<div class="chart-mockup">
		<div class="chart-title">Most Admired Frameworks</div>
		<ul>
			<li><span>React</span> <div class="bar" style="width: 65%;"></div> <span>65%</span></li>
			<li><span>Svelte</span> <div class="bar svelte" style="width: 73%;"></div> <span>73%</span></li>
			<li><span>Vue.js</span> <div class="bar" style="width: 60%;"></div> <span>60%</span></li>
			<li><span>Angular</span> <div class="bar" style="width: 55%;"></div> <span>55%</span></li>
		</ul>
	</div>
</section> 
-->

<!-- 2. 모든 CSS 코드는 <style> 태그 안에 있어야 합니다. -->
<style>
	.feature-section {
		background-color: #2c2f38;
		border-radius: 16px;
		padding: 4rem;
		display: flex;
		gap: 3rem;
		align-items: center;
	}
	.feature-text {
		flex: 1;
	}
	h2 {
		font-size: 2rem;
		margin-top: 0;
	}
	.chart-mockup {
		flex: 1;
		background-color: var(--bg-color);
		padding: 1.5rem;
		border-radius: 8px;
	}
	.chart-title {
		font-weight: bold;
		margin-bottom: 1rem;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	li {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	li span:first-child {
		width: 80px;
	}
	.bar {
		height: 10px;
		background-color: var(--secondary-color);
		border-radius: 5px;
		flex-grow: 1;
	}
	.bar.svelte {
		background-color: var(--primary-color);
	}

	/* 3. 미디어 쿼리도 당연히 <style> 태그 안에 있어야 합니다. */
	@media (max-width: 768px) {
		.feature-section {
			flex-direction: column;
			padding: 2.5rem;
		}
	}
</style>