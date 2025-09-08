<script>
	import { enhance, applyAction } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form;

	// 상태 변수들
	let step = form?.step || 1;
	let userId = form?.userId || null;
	let password = '', confirmPassword = '', showPassword = false;
	
	// 비밀번호 변경 성공 상태를 추적하는 변수
	let resetSuccess = false; 
</script>

<div class="auth-wrapper">
	<div class="auth-container">
		
		{#if resetSuccess}
			<!-- =================== 최종 성공 메시지 UI =================== -->
			<div class="success-container">
				<h2 class="title">변경 완료!</h2>
				<p class="subtitle">{form?.message || '비밀번호가 성공적으로 변경되었습니다.'}</p>
				<p class="redirect-notice">잠시 후 홈페이지로 이동합니다...</p>
			</div>
		{:else if step === 1}
			<!-- =================== 1단계: 본인 인증 폼 =================== -->
			<div>
				<h2 class="title">비밀번호 찾기</h2>
				<p class="subtitle">계정 정보를 입력하여 본인임을 인증하세요.</p>
				<form 
					method="POST"
					action="?/verifyUser"
					use:enhance={() => {
						return async ({ result }) => {
							// 인증 성공 시
							if (result.type === 'success') {
								// 서버가 보내준 userId를 저장하고, 2단계로 넘어갑니다.
								userId = result.data.userId;
								step = 2;
							}
							// 실패 시 (메시지 표시)
							await applyAction(result);
						};
					}}
				>
					<div class="form-group">
						<label for="username">아이디</label>
						<input type="text" id="username" name="username" placeholder="아이디를 입력하세요" required />
					</div>
					<div class="form-group">
						<label for="name">성함</label>
						<input type="text" id="name" name="name" placeholder="성함을 입력하세요" required />
					</div>
					<div class="form-group">
						<label for="student_id">학번</label>
						<input type="tel" id="student_id" name="student_id" placeholder="학번 10자리를 입력하세요" required inputmode="numeric" />
					</div>

					{#if form?.step === 1 && form?.message}
						<p class="error-message">{form.message}</p>
					{/if}
					<button type="submit" class="submit-button">인증하기</button>
				</form>
			</div>
		{:else if step === 2}
			<!-- =================== 2단계: 비밀번호 재설정 폼 =================== -->
			<div>
				<h2 class="title">새 비밀번호 설정</h2>
				<p class="subtitle">새롭게 사용할 비밀번호를 입력하세요.</p>
				<form 
					method="POST" 
					action="?/resetPassword"
					use:enhance={() => {
						// 서버로부터 응답이 오면 실행될 콜백
						return async ({ result }) => {
							// 서버 응답이 'success'일 때
							if (result.type === 'success') {
								// form prop을 수동으로 업데이트하여 성공 메시지를 표시
								form = result.data;
								// 성공 상태를 true로 변경하여 UI를 전환
								resetSuccess = true;
								
								// 2.5초 후에 홈페이지('/')로 이동
								setTimeout(() => {
									goto('/');
								}, 2500);
							} else {
								// 실패 시 에러 메시지를 표시
								await applyAction(result);
							}
						};
					}}
				>
					<!-- 인증된 사용자 ID를 서버로 함께 보냅니다. -->
					<input type="hidden" name="userId" value={userId} />

					<div class="form-group">
						<label for="password">새 비밀번호</label>
						<div class="password-input-wrapper">
							<input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="비밀번호 (6자 이상)" required bind:value={password}/>
							<button type="button" class="toggle-password" on:click={() => (showPassword = !showPassword)} aria-label="비밀번호 보기/숨기기">
								<img src={showPassword ? '/eye.png' : '/eye.png'} alt="toggle visibility" />
							</button>
						</div>
					</div>
					<div class="form-group">
						<label for="confirm_password">새 비밀번호 확인</label>
						<input type="password" id="confirm_password" name="confirm_password" placeholder="비밀번호를 다시 입력하세요" required bind:value={confirmPassword}/>
						{#if password && confirmPassword && password !== confirmPassword}
							<p class="password-mismatch">비밀번호가 일치하지 않습니다.</p>
						{/if}
					</div>

					{#if form?.step === 2 && form?.message}
						<p class="error-message">{form.message}</p>
					{/if}
					<button type="submit" class="submit-button">비밀번호 변경</button>
				</form>
			</div>
		{/if}
	</div>
</div>

<!-- 스타일은 회원가입 페이지와 동일한 것을 사용합니다. -->
<style>
	.auth-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 70vh;
		padding: 2rem;
	}

	.auth-container {
		width: 100%;
		max-width: 420px;
		background-color: #252830;
		padding: 2.5rem 3rem;
		border-radius: 16px;
		border: 1px solid var(--border-color);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		animation: fadeIn 0.5s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.title {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		text-align: center;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		text-align: center;
		color: var(--secondary-color);
		margin-bottom: 2.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		color: var(--secondary-color);
	}

	input {
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		padding: 0.9rem 1rem;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	input::placeholder {
		color: var(--secondary-color);
		opacity: 0.7;
	}

	input:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2);
	}
	
	.submit-button {
		background-color: var(--primary-color);
		color: white;
		border: none;
		padding: 1rem;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		margin-top: 1rem;
		transition: transform 0.2s ease, filter 0.2s ease;
	}

	.submit-button:hover {
		filter: brightness(1.1);
		transform: translateY(-2px);
	}

	.error-message {
		color: #ff9494;
		background-color: rgba(255, 77, 77, 0.15);
		border: 1px solid rgba(255, 77, 77, 0.3);
		padding: 1rem;
		border-radius: 8px;
		text-align: center;
	}

    .switch-form {
        text-align: center;
        margin-top: 2rem;
        font-size: 0.9rem;
        color: var(--secondary-color);
    }

    .switch-form a {
        color: var(--primary-color);
        font-weight: 500;
        text-decoration: none;
        transition: opacity 0.2s;
    }

	.switch-form a:hover {
		opacity: 0.8;
		text-decoration: underline;
	}
	.success-container {
		text-align: center;
		padding: 2rem 0;
	}
	.redirect-notice {
		margin-top: 1.5rem;
		color: var(--secondary-color);
		font-size: 0.9rem;
	}
	.phone-input-group {
		display: flex;
		align-items: center;
		gap: 0.75rem; /* 간격을 살짝 넓혀줍니다 */
	}
	.phone-input-group input {
		text-align: center;
		/* 기본 너비를 100%로 설정하여 flex가 크기를 조절할 수 있도록 합니다. */
		width: 100%; 
	}
	/* name 속성을 이용해 각 input을 개별적으로 타겟팅합니다. */
	.phone-input-group input[name="phone1"] {
		flex-grow: 3; /* 3의 비율로 공간을 차지합니다. */
	}
	.phone-input-group input[name="phone2"] {
		flex-grow: 4; /* 4의 비율로 공간을 차지합니다. */
	}
	.phone-input-group input[name="phone3"] {
		flex-grow: 4; /* 4의 비율로 공간을 차지합니다. */
	}
	
	.phone-input-group span {
		color: var(--secondary-color);
	}
	.password-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}
	/* 래퍼 안의 input은 오른쪽 패딩을 추가해 버튼과 겹치지 않게 함 */
	.password-input-wrapper input {
		width: 100%;
		padding-right: 3rem; /* 버튼이 들어갈 공간 확보 */
	}

	/* 비밀번호 보기/숨기기 버튼 스타일 */
	.toggle-password {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		background: none;
		border: none;
		padding: 0 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--secondary-color);
	}
	.toggle-password img {
		width: 20px;
		height: 20px;
		opacity: 0.6;
		transition: opacity 0.2s;
	}
	.toggle-password:hover img {
		opacity: 1;
	}

	/* 비밀번호 불일치 메시지 스타일 */
	.password-mismatch {
		font-size: 0.8rem;
		color: #ff9494;
		margin-top: 0.5rem;
	}
	.success-container {
		text-align: center;
		padding: 2rem 0;
	}
	.redirect-notice {
		margin-top: 1.5rem;
		color: var(--secondary-color);
		font-size: 0.9rem;
	}
@media (max-width: 480px) {
	.auth-wrapper {
		padding: 1rem;
		min-height: 80vh;
	}
	.auth-container {
		padding: 2rem 1.5rem;
	}
	.title {
		font-size: 2rem;
	}
}
</style>