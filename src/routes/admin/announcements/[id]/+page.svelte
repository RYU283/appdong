<!-- src/routes/admin/announcements/[id]/edit/+page.svelte -->
<script>
	import { enhance, applyAction } from '$app/forms';
	import { goto } from '$app/navigation';
	// 👇 (핵심!) 중괄호 {} 없이 default export로 QuillEditor를 가져옵니다.
	import Quill from 'quill';

	export let data;
	export let form;
	
	let announcement = data.announcement;
	let contentHTML = data.announcement.content;
</script>

<div class="page-container">
	<header class="page-header">
		<a href="/admin/announcements" class="back-link">&larr; 공지사항 관리로 돌아가기</a>
		
		<form
			method="POST"
			action="?/delete"
			use:enhance={() => {
				if (!confirm(`'${announcement.title}' 공지사항을 정말 삭제하시겠습니까?`)) {
					return ({ cancel }) => cancel();
				}
				return async ({ result }) => {
					if (result.type === 'redirect') {
						await goto(result.location);
					}
				};
			}}
		>
			<button type="submit" class="delete-button">삭제하기</button>
		</form>
	</header>

	<h1>공지사항 수정</h1>

<form 
    method="POST" 
    action="?/deleteApplication"
    use:enhance={({ cancel }) => { // 1. (핵심) cancel 함수를 여기서 직접 받습니다.
        
        // 2. 사용자에게 먼저 물어봅니다.
        const isConfirmed = confirm(`${application.fullName}님의 지원서를 정말 삭제하시겠습니까?`);
        
        // 3. 사용자가 "취소(아니요)"를 누르면,
        if (!isConfirmed) {
            cancel(); // 4. 폼 제출 자체를 즉시 중단시킵니다.
        }

        // 5. 사용자가 "확인(예)"을 누른 경우에만, 폼 제출 후의 동작을 정의합니다.
        return async ({ result }) => {
            if (result.type === 'redirect') {
                await goto(result.location);
            }
        };
    }}
>
    <button type="submit" class="delete-button">지원서 삭제</button>
</form>
</div>

<style>
	.page-container {
		max-width: 800px;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.back-link {
		color: var(--secondary-color);
		text-decoration: none;
	}
	.back-link:hover {
		text-decoration: underline;
	}

	.delete-button {
		background-color: #e53e3e;
		color: white;
		border: none;
		padding: 0.7rem 1.3rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		font-size: 0.9rem;
		transition: filter 0.2s;
	}
	.delete-button:hover {
		filter: brightness(1.1);
	}

	h1 {
		font-family: var(--font-serif);
		font-size: 2.2rem;
		margin-top: 0;
	}

	.announcement-form {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
		color: var(--secondary-color);
	}

	input {
		width: 100%;
		padding: 0.8rem 1rem;
		background-color: #2c2f38;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		color: var(--text-color);
		font-size: 1rem;
	}

	input:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2);
	}
	
	.form-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	.submit-button {
		background-color: var(--primary-color);
		color: white;
		border: none;
		padding: 0.8rem 2rem;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: filter 0.2s;
	}
	.submit-button:hover {
		filter: brightness(1.1);
	}

	.error-message {
		color: #ff9494;
	}

	/* Quill 에디터 테마 오버라이드 */
	:global(.ql-toolbar) {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		border-color: var(--border-color) !important;
	}
	:global(.ql-container) {
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		border-color: var(--border-color) !important;
		min-height: 300px;
		font-size: 1rem;
	}
	:global(.ql-editor) {
		padding: 1.2rem;
		color: var(--text-color);
	}
	:global(.ql-snow .ql-stroke) {
		stroke: var(--secondary-color);
	}
	:global(.ql-snow .ql-picker-label) {
		color: var(--secondary-color);
	}
</style>