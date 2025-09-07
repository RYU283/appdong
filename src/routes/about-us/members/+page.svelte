<script>
	// 나중에 멤버 정보가 변경되면 이 배열만 수정하면 됩니다.
	const leadership = [
		{
			name: '송호민',
			department: '전자공학부',
			role: '회장',
			// 👇 나중에 실제 이미지 경로로 바꿔주세요. (예: '/images/members/homin.jpg')
			// imageUrl: 'https://placehold.co/400x400/252830/FFF?text=Homin'
            imageUrl: '/homin1.png'
		},
		{
			name: '이고은',
			department: '일어일문학과',
			role: '부회장',
			imageUrl: '/goeun.jpeg'
		}
	];

	const members = [
		{
			name: '임정민',
			department: '컴퓨터학부',
			role: '기획부장',
			imageUrl: 'https://placehold.co/400x400/252830/FFF?text=Jeongmin'
		},
		{
			name: '이경언',
			department: '컴퓨터학부',
			role: '교육부장',
			imageUrl: 'https://placehold.co/400x400/252830/FFF?text=Gyeongeon'
		},
		{
			name: '이화영',
			department: '에너지공학부',
			role: '홍보부장',
			imageUrl: 'https://placehold.co/400x400/252830/FFF?text=Hwayeong'
		},
		{
			name: '유준호',
			department: '전자공학부',
			role: '총무 및 웹, 서버관리', // 나중에 직책을 수정하세요.
			imageUrl: '/junho.png'
		},
	];
</script>

<div class="page-container">
	<header class="page-header">
		<h1>주요 임원진</h1>
		<p>APPDONG을 이끌어가는 임원진을 소개합니다.</p>
	</header>

	<!-- 회장단 섹션 -->
	<section class="team-section">
		<h2 class="section-title">임원진</h2>
		<div class="members-grid leadership-grid">
			{#each leadership as member}
				<div class="member-card">
					<div class="member-photo">
						<img src={member.imageUrl} alt="{member.name} 프로필 사진" />
					</div>
					<div class="member-info">
						<h3>{member.name}</h3>
						<p class="role">{member.role}</p>
						<p class="department">{member.department}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
	
	<!-- 부원 섹션 -->
	<section class="team-section">
		<h2 class="section-title"></h2>
		<div class="members-grid">
			{#each members as member}
				<div class="member-card">
					<div class="member-photo">
						<img src={member.imageUrl} alt="{member.name} 프로필 사진" />
					</div>
					<div class="member-info">
						<h3>{member.name}</h3>
						<p class="role">{member.role}</p>
						<p class="department">{member.department}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.page-container { max-width: 1100px; margin: 0 auto; padding: 4rem 2rem; }
	.page-header { text-align: center; margin-bottom: 5rem; }
	.page-header h1 { font-family: var(--font-serif); font-size: 3.5rem; margin-bottom: 1rem; }
	.page-header p { font-size: 1.2rem; color: var(--secondary-color); }

	.team-section { margin-bottom: 5rem; }
	.section-title {
		font-family: var(--font-serif);
		font-size: 2.2rem;
		text-align: center;
		margin-bottom: 3rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.members-grid {
		display: grid;
		/* 화면 크기에 맞춰 2개~4개의 카드가 자동으로 배치되는 반응형 그리드 */
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}
	/* 회장단은 더 적은 수이므로 중앙에 보기 좋게 배치 */
	.leadership-grid {
		max-width: 600px;
		margin: 0 auto;
	}

	.member-card {
		background-color: #252830;
		border: 1px solid var(--border-color);
		border-radius: 16px;
		padding: 2rem;
		text-align: center;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.member-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
	}

	.member-photo {
		width: 120px;
		height: 120px;
		margin: 0 auto 1.5rem;
	}
	.member-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover; /* 이미지가 찌그러지지 않도록 */
		border-radius: 50%; /* 원형 프로필 사진 */
		border: 3px solid var(--border-color);
	}

	.member-info h3 {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text-color);
		margin: 0 0 0.25rem;
	}
	.member-info .role {
		font-size: 1rem;
		color: var(--primary-color);
		font-weight: 500;
		margin: 0 0 0.5rem;
	}
	.member-info .department {
		font-size: 0.9rem;
		color: var(--secondary-color);
		margin: 0;
	}

	@media (max-width: 768px) {
		.page-header h1 { font-size: 2.8rem; }
		.leadership-grid { max-width: 100%; }
	}
</style>