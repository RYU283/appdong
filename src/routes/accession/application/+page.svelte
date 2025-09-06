<!-- src/routes/accession/application/+page.svelte -->
<script>
	import { enhance, applyAction } from '$app/forms';
	export let data;
	export let form;

	// 로그인 상태를 나타내는 변수
	const isLoggedIn = !!data.user;
	
	// 폼 데이터. 로그인 시 서버 데이터로, 비로그인 시 빈 객체로 초기화
	let formData = data.userData || {
		name: '', phone_number: '', department: '', student_id: ''
	};
	
	// 프로그래밍 경험 선택에 따라 하위 필드를 보여주기 위한 변수
	let programmingExperience = '';
	let motivationText = '';
</script>

<div class="application-container">
	{#if data.alreadySubmitted}
		<h1 class="title">지원서 제출 완료</h1>
		<p class="subtitle">지원서가 성공적으로 제출되었습니다. 감사합니다.</p>
	{:else if form?.success}
		<h1 class="title">제출 완료!</h1>
		<p class="subtitle">지원서가 성공적으로 제출되었습니다. 감사합니다.</p>
		<div class="home-link-container">
			<a href="/" class="home-link">홈으로 돌아가기</a>
		</div>
	{:else}
		<h1 class="title">지원서 작성</h1>
		<p class="subtitle">APPDONG에 지원해주셔서 감사합니다. 아래 항목을 모두 작성해주세요.</p>
		
		<form method="POST" use:enhance>
			<div class="form-grid">
				<div class="form-group">
					<label for="fullName">성명</label>
					<input type="text" id="fullName" name="fullName" bind:value={formData.name} readonly={isLoggedIn} class:readonly-input={isLoggedIn} required />
				</div>
				<div class="form-group">
					<label for="phoneNumber">전화번호</label>
					<input type="tel" id="phoneNumber" name="phoneNumber" bind:value={formData.phone_number} readonly={isLoggedIn} class:readonly-input={isLoggedIn} required />
				</div>
				<div class="form-group">
					<label for="university">대학</label>
					<input type="text" id="university" name="university" value="" required />
				</div>
				<div class="form-group">
					<label for="department">학과</label>
					<input type="text" id="department" name="department" bind:value={formData.department} readonly={isLoggedIn} class:readonly-input={isLoggedIn} required />
				</div>
				<div class="form-group">
					<label for="studentId">학번</label>
					<input type="text" id="studentId" name="studentId" bind:value={formData.student_id} readonly={isLoggedIn} class:readonly-input={isLoggedIn} required />
				</div>
			</div>

			<div class="form-group">
				<label for="motivation">지원 동기</label>
				<textarea id="motivation" name="motivation" rows="8" required bind:value={motivationText}></textarea>
				<div class="char-counter">
					{motivationText.length} 자
				</div>
			</div>

			<!-- 👇 (복원) 프로그래밍 경험 관련 필드들을 다시 추가했습니다. -->
			<div class="form-group">
				<label>프로그래밍 언어 경험</label>
				<select name="programmingExperience" bind:value={programmingExperience} required>
					<option value="" disabled selected>선택하세요</option>
					<option value="거의 없음">거의 없음</option>
					<option value="보통">보통</option>
					<option value="숙련자">숙련자</option>
				</select>
			</div>
			
			{#if programmingExperience === '보통' || programmingExperience === '숙련자'}
				<div class="form-group extra-fields">
					<label for="knownFields">다뤄본 분야 (쉼표로 구분)</label>
					<input type="text" id="knownFields" name="knownFields" placeholder="예: 웹 프론트엔드, 백엔드, 앱 개발, AI" />
				</div>
				<div class="form-group extra-fields">
					<label for="specificExperience">구체적인 경험 서술</label>
					<textarea id="specificExperience" name="specificExperience" rows="6" placeholder="진행했던 프로젝트, 사용 기술 스택, 기여한 부분 등을 자유롭게 서술해주세요."></textarea>
				</div>
			{/if}

			<div class="form-group">
				<label for="finalWords">마지막으로 할 말 (선택)</label>
				<textarea id="finalWords" name="finalWords" rows="4"></textarea>
			</div>

			{#if form?.message}
				<p class="error-message">{form.message}</p>
			{/if}

			<button type="submit" class="submit-button">제출하기</button>
		</form>
	{/if}
</div>

<style>
	.application-container { max-width: 800px; margin: 2rem auto; padding: 2.5rem; background-color: #252830; border-radius: 16px; border: 1px solid var(--border-color); }
	.title { text-align: center; font-size: 2.5rem; margin-bottom: 0.5rem; }
	.subtitle { text-align: center; color: var(--secondary-color); margin-bottom: 3rem; }
	form { display: flex; flex-direction: column; gap: 1.5rem; }
	.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
	label { font-weight: 500; font-size: 0.9rem; color: var(--secondary-color); }
	input, textarea, select { width: 100%; padding: 0.9rem; background-color: var(--bg-color); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-color); font-size: 1rem; }
	input:focus, textarea:focus, select:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2); }
	.readonly-input { background-color: #1c1e24; color: var(--secondary-color); cursor: not-allowed; }
	.readonly-input:focus { border-color: var(--border-color); box-shadow: none; }
	.submit-button { background-color: var(--primary-color); color: white; border: none; padding: 1rem; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-top: 1rem; }
	.error-message { color: #ff9494; background-color: rgba(255, 77, 77, 0.15); border: 1px solid rgba(255, 77, 77, 0.3); padding: 1rem; border-radius: 8px; text-align: center; }
	.home-link-container { text-align: center; margin-top: 2rem; }
	.home-link { background-color: var(--secondary-color); color: white; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; }
	.char-counter { text-align: right; font-size: 0.85rem; color: var(--secondary-color); margin-top: 0.25rem; }
	
	/* 경험이 있을 때 나타나는 필드에 애니메이션 효과 추가 */
	.extra-fields {
		animation: fadeIn 0.5s ease-out;
	}

	@media (max-width: 600px) { 
		.form-grid { grid-template-columns: 1fr; }
		.application-container { padding: 1.5rem; }
	}
</style>