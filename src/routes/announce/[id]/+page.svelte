<script>
	import DOMPurify from 'dompurify';
	import { onMount } from 'svelte';

	export let data;
	const { announcement } = data;

	let sanitizedContent = '';
	onMount(() => {
		if (announcement && announcement.content) {
			sanitizedContent = DOMPurify.sanitize(announcement.content);
		}
	});
</script>

<div class="page-container">
	{#if announcement}
		<article class="post">
			<header class="post-header">
				<a href="/announce" class="back-link">&larr; 공지사항 목록으로</a>
				<h1>{announcement.title}</h1>
				<p class="meta">
					<span>By <strong>{announcement.authorName}</strong></span>
					<span>&nbsp;·&nbsp;</span>
					<span>{new Date(announcement.createdAt).toLocaleString('ko-KR')}</span>
				</p>
			</header>
			
			<div class="content ql-snow">
				<div class="ql-editor">
					{@html sanitizedContent}
				</div>
			</div>
		</article>
	{:else}
		<div class="error-view">
			<h2>오류</h2>
			<p>해당 공지사항을 찾을 수 없거나 불러오는 데 실패했습니다.</p>
		</div>
	{/if}
</div>

<style>
	.page-container {
		max-width: 720px;
		margin: 4rem auto;
		padding: 2rem;
	}

	.post-header {
		text-align: left;
		margin-bottom: 4rem;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 2rem;
	}

	.back-link {
		display: block;
		margin-bottom: 2.5rem;
		color: var(--secondary-color);
		text-decoration: none;
		font-weight: 500;
	}
	
	.post-header h1 {
		font-family: var(--font-serif);
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -1.5px;
		color: var(--text-color);
		margin: 1rem 0;
	}

	.post-header .meta {
		color: var(--secondary-color);
		font-size: 1rem;
	}

	.meta strong, .author strong {
		color: var(--text-color);
		font-weight: 500;
	}
	
	/* ==========================================================================
	   (핵심 수정) Quill 콘텐츠 스타일
	   ========================================================================== */
	:global(.content .ql-editor) {
		padding: 0;
		font-size: 1.15rem;
		line-height: 2;
		color: #d1d5db;
	}
	
	/* 👇 (수정) 이 규칙은 오직 '아래 여백'만 담당하도록 합니다. 밑줄(border)은 절대 넣지 않습니다. */
	:global(.content .ql-editor > *) { 
		margin-bottom: 1.75rem !important;
	}

	/* 👇 (수정) 오직 h1, h2, h3 태그에만 밑줄(border-bottom)을 명확하게 적용합니다. */
	:global(.content .ql-editor h1),
	:global(.content .ql-editor h2),
	:global(.content .ql-editor h3) {
		font-family: var(--font-serif);
		font-weight: 700;
		line-height: 1.4;
		color: var(--text-color);
		border-bottom: 1px solid var(--border-color); /* 밑줄 스타일 */
		padding-bottom: 0.5rem;
		margin-top: 4rem;
		margin-bottom: 1.5rem !important;
	}
	:global(.content .ql-editor h1) { font-size: 2.2rem; }
	:global(.content .ql-editor h2) { font-size: 1.8rem; }
	:global(.content .ql-editor h3) { font-size: 1.5rem; }
	
	:global(.content .ql-editor a) {
		color: var(--primary-color);
		text-decoration: none;
		border-bottom: 2px solid rgba(255, 62, 0, 0.4);
		transition: all 0.2s;
	}
	:global(.content .ql-editor a:hover) {
		background-color: rgba(255, 62, 0, 0.1);
		border-bottom-color: var(--primary-color);
	}
	
	:global(.content .ql-editor strong) {
		color: var(--text-color);
		font-weight: 600;
	}
	
	.error-view { text-align: center; padding: 4rem 0; }

	@media (max-width: 768px) {
		.page-container { margin: 2rem auto; padding: 1.5rem; }
		.post-header h1 { font-size: 2.5rem; letter-spacing: -1px; }
	}
</style>