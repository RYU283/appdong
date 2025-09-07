<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import Quill from 'quill';

	export let form;

	let editorElement, quillInstance, contentHTML = '';
	let attachments = [], attachmentInput;

	onMount(() => {
		if (editorElement) {
			quillInstance = new Quill(editorElement, {
				theme: 'snow',
				modules: {
					toolbar: {
						container: [
							[{ header: [1, 2, 3, false] }], [{ size: ['small', false, 'large', 'huge'] }],
							['bold', 'italic', 'underline'], [{ color: [] }, { background: [] }],
							[{ list: 'ordered' }, { list: 'bullet' }], ['link', 'image', 'clean']
						],
						handlers: { image: imageHandler }
					}
				}
			});
			quillInstance.on('text-change', () => { contentHTML = quillInstance.root.innerHTML; });
		}
	});

	function imageHandler() { /* ... (이전과 동일한 imageHandler 함수) ... */ }
	async function handleAttachmentChange(event) { /* ... (이전과 동일한 handleAttachmentChange 함수) ... */ }
	function removeAttachment(index) { attachments = attachments.filter((_, i) => i !== index); }
</script>

<div class="page-container">
	<a href="/admin/announcements" class="back-link">&larr; 공지사항 관리로 돌아가기</a>
	<h1>새 공지사항 작성</h1>

	<form class="announcement-form" method="POST" action="?/create" use:enhance>
		<div class="form-group">
			<label for="title">제목</label>
			<input type="text" id="title" name="title" required />
		</div>
		<div class="form-group">
			<label for="content">내용</label>
			<div bind:this={editorElement} />
			<input type="hidden" name="content" value={contentHTML} />
		</div>
		<div class="form-group">
			<label for="attachments">첨부파일</label>
			<button type="button" class="file-select-button" on:click={() => attachmentInput.click()}>+ 파일 선택</button>
			<input type="file" bind:this={attachmentInput} on:change={handleAttachmentChange} multiple style="display: none;" />
			{#if attachments.length > 0}
				<div class="attachment-list">
					{#each attachments as file, i}
						<div class="attachment-item">
							<span>{file.name}</span>
							<button type="button" class="remove-attachment-button" on:click={() => removeAttachment(i)}>&times;</button>
						</div>
					{/each}
				</div>
			{/if}
			<input type="hidden" name="attachments" value={JSON.stringify(attachments)} />
		</div>
		{#if form?.message}<p class="error-message">{form.message}</p>{/if}
		<div class="form-actions">
			<button type="submit" class="submit-button">공지 등록</button>
		</div>
	</form>
</div>

<style>
	.page-container { max-width: 800px; }
	.back-link { display: inline-block; margin-bottom: 2rem; color: var(--secondary-color); text-decoration: none; }
	.back-link:hover { text-decoration: underline; }
	h1 { font-family: var(--font-serif); font-size: 2.2rem; }
	.announcement-form { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
	label { font-weight: 500; color: var(--secondary-color); }
	input[type="text"] {
		width: 100%; padding: 0.8rem 1rem; background-color: #2c2f38;
		border: 1px solid var(--border-color); border-radius: 8px;
		color: var(--text-color); font-size: 1rem;
	}
	input[type="text"]:focus {
		outline: none; border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2);
	}
	.file-select-button {
		align-self: flex-start; background-color: #3a3f4b; color: var(--text-color);
		border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;
	}
	.attachment-list { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
	.attachment-item { display: flex; justify-content: space-between; align-items: center; background-color: #2c2f38; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem; }
	.remove-attachment-button { background: none; border: none; color: var(--secondary-color); font-size: 1.5rem; cursor: pointer; padding: 0 0.5rem; }
	.form-actions { display: flex; justify-content: flex-end; margin-top: 1rem; }
	.submit-button {
		background-color: var(--primary-color); color: white; border: none;
		padding: 0.8rem 2rem; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;
	}
	.error-message { color: #ff9494; }
	:global(.ql-toolbar) { border-top-left-radius: 8px; border-top-right-radius: 8px; border-color: var(--border-color) !important; }
	:global(.ql-container) { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-color: var(--border-color) !important; min-height: 300px; font-size: 1rem; }
	:global(.ql-editor) { padding: 1.2rem; color: var(--text-color); }
	:global(.ql-snow .ql-stroke) { stroke: var(--secondary-color); }
	:global(.ql-snow .ql-picker-label) { color: var(--secondary-color); }
</style>