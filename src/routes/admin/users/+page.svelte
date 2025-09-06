<script>
	export let data;
</script>

<h1>회원 관리</h1>
<p>총 {data.users.length}명의 회원이 있습니다.</p>

<!-- 👇 테이블을 이 div로 감싸줍니다. -->
<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>아이디</th>
				<th>이름</th>
				<th>학번</th>
				<th>학과</th>
				<th>전화번호</th>
				<th>역할</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user}
				<tr>
					<td><a href={`/admin/users/${user.id}`}>{user.username}</a></td>
					<td>{user.name}</td>
					<td>{user.student_id}</td>
					<td>{user.department}</td>
					<td>{user.phone_number}</td>
					<td>{user.role}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* 👇 테이블 래퍼에 대한 스타일을 추가합니다. */
	.table-wrapper {
		width: 100%;
		overflow-x: auto; /* 내용이 넘치면 가로 스크롤바 생성 */
		-webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */
		border: 1px solid var(--border-color);
		border-radius: 8px;
	}
	table { width: 100%; border-collapse: collapse; margin-top: 0; }
	th, td { padding: 0.8rem 1rem; text-align: left; border-bottom: 1px solid var(--border-color); white-space: nowrap; /* 내용이 줄바꿈되지 않도록 */ }
	th { background-color: #2c2f38; }
	tr:last-child td { border-bottom: none; }
	a { color: var(--primary-color); text-decoration: underline; }
</style>