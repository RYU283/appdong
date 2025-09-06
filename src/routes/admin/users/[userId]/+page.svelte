<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { goto } from '$app/navigation';

	export let data;
	export let form;
	
	let user = data.user;
	let successMessage = '';

	// form prop이 바뀔 때마다 성공 메시지를 업데이트합니다.
	$: if (form?.success) {
		successMessage = form.message;
		// 3초 후에 메시지를 자동으로 지웁니다.
		setTimeout(() => {
			successMessage = '';
		}, 3000);
	}
</script>

<div class="header-actions">
	<a href="/admin/users">&larr; 회원 목록으로 돌아가기</a>

	<form
		method="POST"
		action="?/deleteUser"
		use:enhance={() => {
			if (!confirm(`${user.name}(${user.username})님의 계정을 정말 삭제하시겠습니까?`)) {
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
		<button type="submit" class="delete-button">회원 삭제</button>
	</form>
</div>

<h1>{user.username}님 정보 수정</h1>

<form class="edit-form" method="POST" action="?/updateUser">    
	<div class="form-group">
		<label for="name">이름</label>
		<input type="text" id="name" name="name" bind:value={user.name} />
	</div>
	<div class="form-group">
		<label for="student_id">학번</label>
		<input type="text" id="student_id" name="student_id" bind:value={user.student_id} />
	</div>
	<div class="form-group">
		<label for="department">학과</label>
		<input type="text" id="department" name="department" bind:value={user.department} />
	</div>
	<div class="form-group">
		<label for="phone_number">전화번호</label>
		<input type="tel" id="phone_number" name="phone_number" bind:value={user.phone_number} />
	</div>
	<div class="form-group">
		<label for="role">역할</label>
		<select id="role" name="role" bind:value={user.role}>
			<option value="USER">USER</option>
			<option value="ADMIN">ADMIN</option>
		</select>
	</div>

	{#if form?.message && !form?.success}
		<p class="error-message">{form.message}</p>
	{:else if successMessage}
		<p class="success-message">{successMessage}</p>
	{/if}
	
	<button type="submit">수정 완료</button>
</form>


<style>
	.edit-form {
		max-width: 600px;
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
	input, select {
		padding: 0.8rem; background-color: #2c2f38;
		border: 1px solid var(--border-color); border-radius: 4px;
		color: var(--text-color);
	}
	button {
		padding: 0.8rem; background-color: var(--primary-color);
		color: white; border: none; border-radius: 4px;
		cursor: pointer; font-size: 1rem;
	}
	.error-message { color: #ff9494; }
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
	.success-message {
		color: #a5d6a7;
		background-color: rgba(165, 214, 167, 0.15);
		padding: 0.5rem;
		border-radius: 4px;
		text-align: center;
	}
</style>