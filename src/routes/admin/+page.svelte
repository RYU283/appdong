<!-- src/routes/admin/+page.svelte -->
<script>
	export let data;
	const { stats, recentUsers, recentApps } = data;
</script>

<div class="dashboard">
	<h1>관리자 대시보드</h1>
	
	<!-- 1. 핵심 지표 카드 -->
	<div class="stats-grid">
		<div class="stat-card">
			<h2>총 회원 수</h2>
			<p class="stat-number">{stats.totalUsers}</p>
			<a href="/admin/users">회원 관리 바로가기 &rarr;</a>
		</div>
		<div class="stat-card">
			<h2>총 지원서 수</h2>
			<p class="stat-number">{stats.totalApps}</p>
			<a href="/admin/applications">지원서 조회 바로가기 &rarr;</a>
		</div>
	</div>

	<!-- 2. 최근 활동 목록 -->
	<div class="recent-activity-grid">
		<div class="activity-list">
			<h3>최근 가입한 회원</h3>
			{#if recentUsers.length > 0}
				<ul>
					{#each recentUsers as user}
						<li><strong>{user.name}</strong> ({user.username})</li>
					{/each}
				</ul>
			{:else}
				<p>최근 가입한 회원이 없습니다.</p>
			{/if}
		</div>
		<div class="activity-list">
			<h3>최근 제출된 지원서</h3>
			{#if recentApps.length > 0}
				<ul>
					{#each recentApps as app}
						<li><a href={`/admin/applications/${app.id}`}><strong>{app.fullName}</strong> ({new Date(app.submittedAt).toLocaleDateString()})</a></li>
					{/each}
				</ul>
			{:else}
				<p>제출된 지원서가 없습니다.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: 2.2rem;
		margin-bottom: 2rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.stat-card {
		background-color: #2c2f38;
		padding: 2rem;
		border-radius: 12px;
		border: 1px solid var(--border-color);
	}
	.stat-card h2 {
		margin-top: 0;
		font-size: 1.2rem;
		color: var(--secondary-color);
	}
	.stat-number {
		font-size: 3.5rem;
		font-weight: bold;
		color: var(--text-color);
		margin: 1rem 0;
	}
	.stat-card a {
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 500;
	}

	.recent-activity-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.activity-list {
		background-color: #2c2f38;
		padding: 2rem;
		border-radius: 12px;
		border: 1px solid var(--border-color);
	}
	.activity-list h3 {
		margin-top: 0;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 1rem;
		margin-bottom: 1rem;
	}
	.activity-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.activity-list a {
		text-decoration: none;
		color: var(--text-color);
	}
	.activity-list a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.recent-activity-grid {
			grid-template-columns: 1fr;
		}
	}
</style>