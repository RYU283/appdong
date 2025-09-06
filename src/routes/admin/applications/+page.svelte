<!-- src/routes/admin/applications/+page.svelte -->
<script>
	export let data;
</script>

<h1>지원서 조회</h1>
<p>총 {data.applications.length}개의 지원서가 제출되었습니다.</p>

<div class="application-list">
	{#each data.applications as app}
		<a href={`/admin/applications/${app.id}`} class="application-item">
			{app.fullName} ({app.studentId})
		</a>
	{/each}
</div>

<style>
	/* 간단한 목록 스타일 */
	.application-list { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 2rem; }
	.application-item { padding: 1rem; background-color: #2c2f38; border-radius: 8px; text-decoration: none; color: var(--text-color); }
</style>