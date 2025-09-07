<script>
	// ... (기존 import)
	import Quill from 'quill';

	// ... (기존 변수 선언)
	
	// 👇 첨부파일을 관리할 변수
	let attachments = [];
	let attachmentInput;

	onMount(() => {
		if (editorElement) {
			quillInstance = new Quill(editorElement, {
				theme: 'snow',
				modules: {
					toolbar: {
						container: [/* ... (툴바 옵션) ... */, ['image']], // 툴바에 'image' 버튼 추가
						handlers: {
							image: imageHandler // 이미지 버튼 클릭 시 실행될 함수
						}
					}
				}
			});
			// ...
		}
	});

	// (핵심) 이미지 버튼 클릭 시 실행될 커스텀 핸들러
	function imageHandler() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files[0];
			if (file) {
				const formData = new FormData();
				formData.append('file', file);

				// /api/upload로 파일 전송
				const response = await fetch('/api/upload', {
					method: 'POST',
					body: formData
				});
				const result = await response.json();

				if (response.ok) {
					const range = quillInstance.getSelection();
					// 에디터에 이미지 삽입
					quillInstance.insertEmbed(range.index, 'image', result.url);
				} else {
					alert('이미지 업로드 실패: ' + result.message);
				}
			}
		};
	}

	// 첨부파일 선택 시
	async function handleAttachmentChange(event) {
		const files = Array.from(event.target.files);
		for (const file of files) {
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch('/api/upload', { method: 'POST', body: formData });
			const result = await response.json();
			if (response.ok) {
				attachments = [...attachments, { name: file.name, url: result.url }];
			}
		}
	}
</script>

<a href="/admin/announcements">&larr; 공지사항 관리로 돌아가기</a>
<h1>새 공지사항 작성</h1>

<form class="announcement-form" method="POST" use:enhance>
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
		<button type="button" on:click={() => attachmentInput.click()}>파일 선택</button>
		<input 
			type="file" 
			bind:this={attachmentInput} 
			on:change={handleAttachmentChange}
			multiple
			style="display: none;"
		/>
		<div class="attachment-list">
			{#each attachments as file}
				<span>{file.name}</span>
			{/each}
		</div>
		<!-- 서버로 보낼 첨부파일 정보 -->
		<input type="hidden" name="attachments" value={JSON.stringify(attachments)} />
	</div>
	{#if form?.message}<p class="error-message">{form.message}</p>{/if}
	<button type="submit" class="submit-button">공지 등록</button>
</form>

<style>
	.page-container { max-width: 800px; }
	.back-link { display: inline-block; margin-bottom: 2rem; color: var(--secondary-color); }
	h1 { font-family: var(--font-serif); font-size: 2.2rem; }
	.announcement-form { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
	label { font-weight: 500; }
	input, textarea { width: 100%; padding: 0.8rem; background-color: #2c2f38; border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-color); font-size: 1rem; }
	input:focus, textarea:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2); }
	textarea { min-height: 300px; resize: vertical; }
	.submit-button {
		align-self: flex-end; /* 버튼을 오른쪽 끝으로 보냄 */
		background-color: var(--primary-color); color: white; border: none;
		padding: 0.8rem 2rem; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;
	}
	.error-message { color: #ff9494; }
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
		color: var(--text-color);
	}
	:global(.ql-editor) {
		padding: 1rem;
	}
</style>