<!-- src/routes/+page.svelte -->
<script>
	// 홈페이지를 구성하는 각 섹션 컴포넌트들을 불러옵니다.
	import Hero from './components/Hero.svelte';
	import Introduction from './components/Introduction.svelte';
	import FeatureSection from './components/FeatureSection.svelte';
	export let data; // load 함수로부터 데이터를 받습니다.
</script>

<!-- 각 섹션 컴포넌트들을 순서대로 배치합니다. -->


<Hero />

<section class="announcements-section-v2">
	<h2 class="section-title">공지사항</h2>
	<div class="card-list">
		{#if data.recentAnnouncements && data.recentAnnouncements.length > 0}
			{#each data.recentAnnouncements as item}
				<a href={`/announce/${item.id}`} class="announcement-card">
					<div class="card-content">
						<h4 class="card-title">{item.title}</h4>
						<p class="card-meta">{new Date(item.createdAt).toLocaleDateString('ko-KR')}</p>
					</div>
					<div class="card-arrow">
						<span>&rarr;</span>
					</div>
				</a>
			{/each}
		{:else}
			<div class="empty-state">
				<p>등록된 공지사항이 없습니다.</p>
			</div>
		{/if}
	</div>
	<div class="more-link-container">
		<a href="/announce" class="more-link">모든 공지사항 보기</a>
	</div>
</section>
<Introduction />

<FeatureSection />




<style>
	/* 기존에 있던 .announcements-section 관련 스타일은 모두 지워도 됩니다. */
	
	.announcements-section-v2 {
		padding: 6rem 0;
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
	}

	.section-title {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		text-align: center;
		margin-top: 0;
		margin-bottom: 3rem;
	}

	.card-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.announcement-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.75rem 2rem;
		background-color: #252830;
		border: 1px solid var(--border-color);
		border-radius: 12px;
		text-decoration: none;
		transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}

	.announcement-card:hover {
		transform: translateY(-5px);
		border-color: var(--primary-color);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.card-title {
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--text-color);
		margin: 0;
	}

	.card-meta {
		font-size: 0.9rem;
		color: var(--secondary-color);
		margin: 0;
	}

	.card-arrow {
		font-size: 1.5rem;
		color: var(--secondary-color);
		opacity: 0; /* 평소에는 숨김 */
		transform: translateX(-10px); /* 왼쪽으로 살짝 이동 */
		transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
	}
	
	.announcement-card:hover .card-arrow {
		opacity: 1; /* 마우스를 올리면 나타남 */
		transform: translateX(0); /* 제자리로 이동 */
	}

	.more-link-container {
		text-align: center;
		margin-top: 3rem;
	}

	.more-link {
		color: var(--primary-color);
		font-weight: 500;
		text-decoration: none;
		border: 1px solid var(--border-color);
		padding: 0.75rem 1.5rem;
		border-radius: 999px;
		transition: background-color 0.2s, color 0.2s;
	}
	.more-link:hover {
		background-color: var(--primary-color);
		border-color: var(--primary-color);
		color: white;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		border: 1px dashed var(--border-color);
		border-radius: 12px;
		color: var(--secondary-color);
	}
	.list-item-home { display: flex; justify-content: space-between; padding: 1.2rem 0; border-bottom: 1px solid var(--border-color); text-decoration: none; }
	.item-title-home { color: var(--text-color); }
	.item-date-home { color: var(--secondary-color); }
	.more-link { display: block; text-align: right; margin-top: 1rem; }
</style>