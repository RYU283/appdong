<script>
	import { enhance } from '$app/forms';
	// 👇 1. 페이지 이동을 위한 `goto` 함수를 import 합니다.
	import { goto } from '$app/navigation';
	export let data;
	const { application } = data;
</script>

<div class="application-view">
	<div class="header-actions">
		<a href="/admin/applications" class="back-link">&larr; 지원서 목록으로 돌아가기</a>
		
		<form 
			method="POST" 
			action="?/deleteApplication"
			use:enhance={() => {
				if (!confirm(`${application.fullName}님의 지원서를 정말 삭제하시겠습니까?`)) {
					return ({ cancel }) => cancel();
				}
				
				// 👇 2. 폼 제출 완료 후 실행될 콜백을 추가합니다.
				return async ({ result }) => {
					// 3. 서버의 응답 타입이 'redirect'이면 (삭제 성공)
					if (result.type === 'redirect') {
						// 4. 서버가 지정한 경로(result.location)로 페이지를 이동시킵니다.
						await goto(result.location);
					}
				};
			}}
		>
			<button type="submit" class="delete-button">지원서 삭제</button>
		</form>
	</div>

	<h1>{application.fullName}님의 지원서</h1>
	
	<!-- 👇 (핵심 복원) 누락되었던 지원서 상세 정보 표시 HTML을 모두 다시 추가했습니다. -->
	<div class="detail-grid">
		<div><strong>학번:</strong> {application.studentId}</div>
		<div><strong>학과:</strong> {application.department}</div>
		<div><strong>전화번호:</strong> {application.phoneNumber}</div>
		<div><strong>대학:</strong> {application.university}</div>
		<div><strong>제출일:</strong> {new Date(application.submittedAt).toLocaleString('ko-KR')}</div>
	</div>

	<div class="content-block">
		<h2>지원 동기</h2>
		<p class="content-text">{application.motivation}</p>
	</div>
	
	<div class="content-block">
		<h2>프로그래밍 경험</h2>
		<p><strong>경험 수준:</strong> {application.programmingExperience}</p>
		{#if application.knownFields}
			<p><strong>다뤄본 분야:</strong> {application.knownFields}</p>
		{/if}
		{#if application.specificExperience}
			<p class="content-text"><strong>구체적 경험:</strong> {application.specificExperience}</p>
		{/if}
	</div>
	
	{#if application.finalWords}
		<div class="content-block">
			<h2>마지막으로 할 말</h2>
			<p class="content-text">{application.finalWords}</p>
		</div>
	{/if}
</div>

<style>
	.application-view a.back-link {
		display: inline-block;
		color: var(--secondary-color);
		text-decoration: none;
	}
	.application-view a.back-link:hover {
		text-decoration: underline;
	}

	.header-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.delete-button {
		background-color: #e53e3e;
		color: white;
		border: none;
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
	}

	h1 {
		margin-top: 0;
		font-family: var(--font-serif);
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		background-color: #1f2128;
		padding: 1.5rem;
		border-radius: 8px;
		margin: 2.5rem 0;
		line-height: 1.8;
		border: 1px solid var(--border-color);
	}
	.detail-grid strong {
		color: var(--secondary-color);
	}

	.content-block {
		margin-bottom: 2.5rem;
	}
	.content-block h2 {
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 0.8rem;
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
	}
	.content-block p {
		margin: 0.5rem 0;
	}
	.content-block .content-text {
		white-space: pre-wrap;
		line-height: 1.8;
		background-color: #1f2128;
		padding: 1.5rem;
		border-radius: 8px;
		border: 1px solid var(--border-color);
	}
	@media (max-width: 600px) {
		.detail-grid {
			grid-template-columns: 1fr;
		}
	}
</style>