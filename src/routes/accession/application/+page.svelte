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
	
	// 👇 (핵심!) 누락되었던 폼 상태 변수들을 모두 선언합니다.
	let programmingExperience = '';
	let motivationText = '';
	let activityChoice = ''; // 이 변수가 누락되었습니다.
	let studySubjects = [];
	let bootcampMemberLangs = [];
	let bootcampMentorLangs = [];

	// 옵션 데이터를 배열로 관리하여 코드 중복을 줄임
	const studyOptions = ['알고리즘', '자료구조', 'C', 'C++', 'Python', 'Java'];
	const bootcampMemberOptions = ['Java', 'JavaScript', 'Kotlin'];
	const bootcampMentorOptions = ['JavaScript', 'Kotlin', 'Swift', 'C#'];
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
					<option value="" disabled>선택하세요</option>
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
				<label>GitHub 사용 경험 유무</label>
				<div class="radio-group">
					<label><input type="radio" name="githubExperience" value="유" required /> 유</label>
					<label><input type="radio" name="githubExperience" value="무" /> 무</label>
				</div>
			</div>

			<!-- 2. 참가할 활동 선택 -->
			<div class="form-group">
				<label>참가할 활동</label>
				<select name="activityChoice" bind:value={activityChoice} required>
					<option value="" disabled>선택하세요</option>
					<option value="Vibe 클래스">Vibe 클래스</option>
					<option value="스터디">스터디</option>
					<option value="부트캠프 (일반)">부트캠프 (일반)</option>
					<option value="부트캠프 (멘토)">부트캠프 (멘토)</option>
				</select>
			</div>
			
			<!-- =================== 조건부 질문들 =================== -->
			
			{#if activityChoice === 'Vibe 클래스'}
				<div class="form-group conditional">
					<label for="vibeServiceIdea">만들고 싶은 서비스 아이디어</label>
					<textarea id="vibeServiceIdea" name="vibeServiceIdea" rows="4"></textarea>
				</div>
			{/if}

			{#if activityChoice === '스터디'}
				<div class="form-group conditional">
					<label>배우고 싶은 스터디 과목 (중복 선택 가능)</label>
					<div class="checkbox-group">
						{#each studyOptions as subject}
							<label><input type="checkbox" name="studySubjects" value={subject} bind:group={studySubjects}/> {subject}</label>
						{/each}
					</div>
				</div>
			{/if}

			{#if activityChoice === '부트캠프 (일반)'}
				<div class="conditional">
					<div class="form-group">
						<label for="bootcampProjectIdea">진행하고 싶은 프로젝트 주제</label>
						<textarea id="bootcampProjectIdea" name="bootcampProjectIdea" rows="4"></textarea>
					</div>
					<div class="form-group">
						<label>사용하고 싶은 언어 (중복 선택 가능)</label>
						<div class="checkbox-group">
							{#each bootcampMemberOptions as lang}
								<label><input type="checkbox" name="bootcampMemberLangs" value={lang} bind:group={bootcampMemberLangs}/> {lang}</label>
							{/each}
							<label><input type="checkbox" name="bootcampMemberLangs" value="기타" bind:group={bootcampMemberLangs}/> 기타</label>
						</div>
						{#if bootcampMemberLangs.includes('기타')}
							<input type="text" name="bootcampMemberLangsOther" placeholder="기타 언어 직접 입력" />
						{/if}
					</div>
				</div>
			{/if}

			{#if activityChoice === '부트캠프 (멘토)'}
				<div class="conditional">
					<div class="form-group">
						<label>지도 가능한 언어 (중복 선택 가능)</label>
						<div class="checkbox-group">
							{#each bootcampMentorOptions as lang}
								<label><input type="checkbox" name="bootcampMentorLangs" value={lang} bind:group={bootcampMentorLangs}/> {lang}</label>
							{/each}
							<label><input type="checkbox" name="bootcampMentorLangs" value="기타" bind:group={bootcampMentorLangs}/> 기타</label>
						</div>
						{#if bootcampMentorLangs.includes('기타')}
							<input type="text" name="bootcampMentorLangsOther" placeholder="기타 언어 직접 입력" />
						{/if}
					</div>
					<div class="form-group">
						<label for="mentorAvailableTime">지도 가능 시간대</label>
						<textarea id="mentorAvailableTime" name="mentorAvailableTime" rows="3"></textarea>
					</div>
					<div class="form-group">
						<label for="mentorExperience">멘토링 관련 경험</label>
						<textarea id="mentorExperience" name="mentorExperience" rows="5"></textarea>
					</div>
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
	/* ==========================================================================
	   기본 스타일 (데스크탑 기준)
	   ========================================================================== */
	.application-container { max-width: 800px; margin: 2rem auto; padding: 2.5rem; background-color: #252830; border-radius: 16px; border: 1px solid var(--border-color); }
	.title { text-align: center; font-size: 2.5rem; margin-bottom: 0.5rem; }
	.subtitle { text-align: center; color: var(--secondary-color); margin-bottom: 3rem; }
	form { display: flex; flex-direction: column; gap: 1.5rem; }
	
	/* PC에서는 2단 그리드를 기본으로 합니다. */
	.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
	
	.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
	label { font-weight: 500; font-size: 0.9rem; color: var(--secondary-color); }
	input, textarea, select { width: 100%; padding: 0.9rem; background-color: var(--bg-color); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-color); font-size: 1rem; }
	input:focus, textarea:focus, select:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2); }
	.readonly-input { background-color: #1c1e24; color: var(--secondary-color); cursor: not-allowed; }
	.readonly-input:focus { border-color: var(--border-color); box-shadow: none; }
	
	hr { border: none; border-top: 1px solid var(--border-color); margin: 2rem 0; }
	
	.radio-group, .checkbox-group { display: flex; flex-wrap: wrap; gap: 1.5rem; }
	.radio-group label, .checkbox-group label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
	
	.conditional { border-left: 3px solid var(--primary-color); padding-left: 1.5rem; margin-top: 1rem; animation: fadeIn 0.5s; }
	@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

	.char-counter { text-align: right; font-size: 0.85rem; color: var(--secondary-color); margin-top: 0.25rem; }
	.submit-button { /* ... */ }
	.error-message { /* ... */ }

	/* ==========================================================================
	   (핵심 수정) 모바일 반응형 스타일
	   ========================================================================== */
	@media (max-width: 640px) { 
		.application-container {
			/* 모바일에서는 좌우 여백을 줄여 더 넓게 보이도록 합니다. */
			padding: 1.5rem;
		}
		
		.title {
			font-size: 2rem;
		}
		
		/* 개인정보 입력 그리드를 1단(세로)으로 변경합니다. */
		.form-grid {
			grid-template-columns: 1fr;
		}
		
		/* 라디오/체크박스 그룹의 아이템 간격을 줄입니다. */
		.radio-group, .checkbox-group {
			gap: 1rem 1.5rem; /* 세로 간격, 가로 간격 */
		}
	}
</style>