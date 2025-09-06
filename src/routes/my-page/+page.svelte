<script>
	import { enhance, applyAction } from '$app/forms';
	
	export let data;
	export let form;

	let step = form?.step || 1;
	
	// load 함수에서 전달받은 전체 사용자 정보를 사용합니다.
	let userData = data.user;
	
	let password = '', confirmPassword = '', showPassword = false;
	let phone1 = '', phone2 = '', phone3 = '';

	// 페이지가 로드되거나 step이 바뀔 때, 전화번호를 3부분으로 나눕니다.
	$: {
		if (userData && userData.phone_number) {
			phone1 = userData.phone_number.substring(0, 3);
			phone2 = userData.phone_number.substring(3, 7);
			phone3 = userData.phone_number.substring(7, 11);
		}
	}
</script>

<div class="auth-wrapper">
	<div class="auth-container">
		
		{#if step === 1}
			<div>
				<h2 class="title">마이페이지</h2>
				<p class="subtitle">개인정보를 보호하기 위해 비밀번호를 다시 한번 입력해주세요.</p>
				<form method="POST" action="?/reauthenticate" use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							step = 2;
						}
						await applyAction(result);
					};
				}}>
					<div class="form-group">
						<label for="password">비밀번호</label>
						<input type="password" id="password" name="password" required />
					</div>
					{#if form?.step === 1 && form?.message}
						<p class="error-message">{form.message}</p>
					{/if}
					<button type="submit" class="submit-button">확인</button>
				</form>
			</div>
		{:else if step === 2}
			<div>
				<h2 class="title">개인정보 수정</h2>
				<p class="subtitle">수정할 정보를 입력해주세요. 비밀번호는 변경할 경우에만 입력하세요.</p>
				<form method="POST" action="?/updateProfile" use:enhance>
					<div class="form-group">
						<label for="username">아이디</label>
						<input type="text" id="username" name="username_display" value={userData.username} readonly class="readonly-input"/>
					</div>
					<div class="form-group">
						<label for="name">성함</label>
						<input type="text" id="name" name="name" bind:value={userData.name} required />
					</div>
					<div class="form-group">
						<label for="department">학과</label>
						<input type="text" id="department" name="department" bind:value={userData.department} required />
					</div>
					<div class="form-group">
						<label for="phone1">전화번호</label>
						<div class="phone-input-group">
							<input type="tel" id="phone1" name="phone1" maxlength="3" required bind:value={phone1} />
							<span>-</span>
							<input type="tel" id="phone2" name="phone2" maxlength="4" required bind:value={phone2} />
							<span>-</span>
							<input type="tel" id="phone3" name="phone3" maxlength="4" required bind:value={phone3} />
						</div>
					</div>
					
					<!-- 👇 (복원) 새 비밀번호, 비밀번호 확인 필드를 다시 추가했습니다. -->
					<div class="form-group">
						<label for="password">새 비밀번호 (선택)</label>
						<div class="password-input-wrapper">
							<input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="변경할 경우에만 입력" minlength="6" bind:value={password}/>
							<button type="button" class="toggle-password" on:click={() => (showPassword = !showPassword)}>
								<img src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'} alt="toggle visibility" />
							</button>
						</div>
					</div>
					<div class="form-group">
						<label for="confirm_password">새 비밀번호 확인</label>
						<input type="password" id="confirm_password" name="confirm_password" placeholder="변경할 경우에만 입력" bind:value={confirmPassword}/>
						{#if password && confirmPassword && password !== confirmPassword}
							<p class="password-mismatch">비밀번호가 일치하지 않습니다.</p>
						{/if}
					</div>

					{#if form?.step === 2 && form?.message}
						<p class="error-message">{form.message}</p>
					{/if}
					<button type="submit" class="submit-button">수정 완료</button>
				</form>
			</div>
		{/if}
	</div>
</div>

<style>
	/* --- 기존 스타일 --- */
	.auth-wrapper { display: flex; align-items: center; justify-content: center; min-height: 70vh; padding: 2rem; }
	.auth-container { width: 100%; max-width: 420px; background-color: #252830; padding: 2.5rem 3rem; border-radius: 16px; border: 1px solid var(--border-color); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); animation: fadeIn 0.5s ease-out; }
	@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
	.title { font-family: var(--font-serif); font-size: 2.5rem; text-align: center; color: #fff; margin-bottom: 0.5rem; }
	.subtitle { text-align: center; color: var(--secondary-color); margin-bottom: 2.5rem; }
	form { display: flex; flex-direction: column; gap: 1.25rem; }
	.form-group { display: flex; flex-direction: column; }
	label { margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--secondary-color); }
	input { background-color: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); padding: 0.9rem 1rem; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
	input::placeholder { color: var(--secondary-color); opacity: 0.7; }
	input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2); }
	.submit-button { background-color: var(--primary-color); color: white; border: none; padding: 1rem; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-top: 1rem; transition: transform 0.2s ease, filter 0.2s ease; }
	.submit-button:hover { filter: brightness(1.1); transform: translateY(-2px); }
	.error-message { color: #ff9494; background-color: rgba(255, 77, 77, 0.15); border: 1px solid rgba(255, 77, 77, 0.3); padding: 1rem; border-radius: 8px; text-align: center; }
    .password-input-wrapper { position: relative; display: flex; align-items: center; }
	.password-input-wrapper input { width: 100%; padding-right: 3rem; }
	.toggle-password { position: absolute; right: 0; top: 0; bottom: 0; background: none; border: none; padding: 0 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--secondary-color); }
	.toggle-password img { width: 20px; height: 20px; opacity: 0.6; transition: opacity 0.2s; }
	.toggle-password:hover img { opacity: 1; }
	.password-mismatch { font-size: 0.8rem; color: #ff9494; margin-top: 0.5rem; }
	
	/* --- (복원) 전화번호 입력창 비율 스타일 --- */
	.phone-input-group { display: flex; align-items: center; gap: 0.75rem; }
	.phone-input-group input { text-align: center; width: 100%; }
	.phone-input-group input[name="phone1"] { flex-grow: 3; }
	.phone-input-group input[name="phone2"] { flex-grow: 4; }
	.phone-input-group input[name="phone3"] { flex-grow: 4; }
	.phone-input-group span { color: var(--secondary-color); }

	/* --- 읽기 전용 input 스타일 --- */
	.readonly-input {
		background-color: #1c1e24; 
		color: var(--secondary-color);
		cursor: not-allowed;
	}
	.readonly-input:focus {
		outline: none;
		border-color: var(--border-color);
		box-shadow: none;
	}
</style>