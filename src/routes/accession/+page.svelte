<script>
	// 활동 내용을 데이터로 관리하면 나중에 수정하기 쉽습니다.
	const tracks = [
		{
			tag: 'NEW!!',
			title: 'Vibe 클래스',
			description: '프로그래밍 경험이 전혀 없는 분들을 위해 준비했습니다. AI를 활용해 웹/앱을 만드는 방법을 기초부터 배우는 프로그램입니다. 컴퓨터에 대해 전혀 아는 것이 없어도 누구나 즐겁게 참여하실 수 있습니다!',
			recommendations: [
				'컴퓨터를 전혀 알지 못하는 분',
				'컴퓨터 관련 전공이 아닌 분',
				'코딩이 어렵게 느껴져서 시작을 못 해보신 분',
				'손쉽게 무언가를 만들어보고 싶으신 분',
				'즐겁게 코딩을 경험해보고 싶으신 분'
			]
		},
		{
			title: '스터디',
			description: '부원들끼리 조를 편성해 자율적으로 학습하는 프로그램입니다. 프로그래밍 개념을 탄탄하게 잡고 싶으신 분들을 위한 활동으로, 언어 경험에 맞는 스터디를 선택할 수 있습니다.',
			recommendations: [
				'언어 경험이 없으시거나 부족하신 분',
				'CS지식을 배우고 싶으신 분',
				'혼자 언어를 꾸준히 학습하기 어려우신 분',
				'소통하며 즐겁게 언어를 학습하고 싶으신 분'
			]
		},
		{
			title: '부트캠프',
			description: '팀을 구성하여 새로운 언어를 배우고 간단한 프로젝트를 완성해보는 프로그램입니다. 각 팀에는 멘토가 배정되어, Java / JavaScript / Kotlin 등 새로운 언어를 함께 학습하며 성장할 수 있습니다.',
			recommendations: [
				'프로그래밍 언어 경험이 있으신 분',
				'간단한 앱을 만들어 보고 싶으신 분',
				'원하는 플랫폼의 지식을 얻고 싶으신 분',
				'새로운 언어를 학습하고 무언가를 만들어보고 싶으신 분'
			]
		}
	];
</script>

<div class="page-container">
	<!-- 1. Hero Section -->
	<header class="hero-section">
		<h1 class="main-title">APPDONG 2025-2학기 신입 부원 모집</h1>
		<p class="subtitle">
			안녕하세요, 앱동 회장 송호민입니다.<br />
			한 학기 동안 하나의 서비스를 완성하는 경험, 앱동과 함께라면 가능합니다.
		</p>
		
		<!-- 👇 핵심 일정 요약을 Hero 섹션에 추가하여 강조합니다. -->
		<a href="/accession/application" class="cta-button primary">지금 바로 지원하기 &rarr;</a>
	</header>
	
	<!-- 2. 모집 일정 섹션 수정 -->
	<section class="section schedule-section">
		<h2 class="section-title">2025-2학기 모집 일정</h2>
		<div class="schedule-grid">
			<div class="schedule-item">
				<div class="date">9.9 (화) ~ 9.10 (수)</div>
				<div class="event">서류 모집</div>
				<div class="description">온라인 지원서를 통해 접수</div>
			</div>
			<div class="schedule-item">
				<div class="date">9.11 (목)</div>
				<div class="event">서류 결과 발표</div>
				<div class="description">합격자 개별 연락</div>
			</div>
			<div class="schedule-item">
				<div class="date">~ 9.12 (금)</div>
				<div class="event">최종 등록 (회비 입금)</div>
				<div class="description">기한 내 입금 시 최종 합격</div>
			</div>
		</div>
	</section>

	<!-- 3. 혜택 섹션 -->
	<section class="section">
		<h2 class="section-title">앱동에서는 무엇을 얻을 수 있나요?</h2>
		<div class="benefits-grid">
			<div class="benefit-card">
				<h3>부원 혜택</h3>
				<ul>
					<li>다양한 온라인 강의 지원</li>
					<li>다른 부원들과의 네트워킹</li>
					<li>실무 중심의 다양한 특강</li>
					<li>MT, 피크닉, 성과 공유회 등 즐거운 친목 활동</li>
					<li>중앙동아리 중 최대 규모의 동아리방 (3개)</li>
				</ul>
			</div>
			<div class="benefit-card mentor-benefits">
				<h3>멘토 혜택 (멘토도 상시 모집!)</h3>
				<p>팀을 이끌며 언어와 프로젝트 진행을 돕는 멘토로도 지원 가능합니다.</p>
				<ul>
					<li><strong>회비 면제</strong></li>
					<li><strong>활동비 지급 (5만원 이상)</strong></li>
				</ul>
			</div>
		</div>
	</section>
	
	<!-- 4. 기타 활동 -->
	<section class="section">
		<h2 class="section-title">더 많은 활동이 준비되어 있어요</h2>
		<ul class="activities-list">
			<li><strong>연합 해커톤 '달빛톤' (09.13~14):</strong> 경북대 등 4개 지역 대학과 함께하는 네트워킹 및 프로젝트 공유 행사</li>
			<li><strong>앱동 해커톤 & MT (9월 말 또는 10월 초):</strong> 중간고사 전, 부원들과 함께 즐기는 친목 및 팀워크 강화 활동</li>
			<li><strong>피크닉 (중간고사 이후):</strong> 선선한 가을, 함께 식사하며 다지는 동료애</li>
			<li><strong>특강 (학기 중):</strong> 취업 및 진로 설계에 도움이 되는 실무 중심 특강</li>
			<li><strong>성과 공유회 (중간/기말 직후):</strong> 스터디, 부트캠프 활동 성과를 공유하며 함께 성장하는 시간</li>
		</ul>
	</section>

	<!-- 5. Final CTA -->
	<footer class="final-cta">
		<h2 class="section-title">지원서 제출 바로가기</h2>
		<a href="/accession/application" class="cta-button primary">APPDONG 지원서 작성하기</a>
	</footer>
</div>

<style>
	.page-container { max-width: 900px; margin: 0 auto; padding: 4rem 2rem; }
	.section { margin-bottom: 6rem; }
	.section-title { font-size: 2.25rem; text-align: center; margin-bottom: 1rem; }
	.section-subtitle { text-align: center; color: var(--secondary-color); margin-top: 0; margin-bottom: 3rem; font-size: 1.1rem; }

	.hero-section { text-align: center; padding: 2rem 0; margin-bottom: 4rem; }
	.main-title { font-size: 2.7rem; color: var(--primary-color); }
	.subtitle { font-size: 1.2rem; color: var(--secondary-color); line-height: 1.7; margin: 1.5rem 0 2.5rem; }
	.cta-button { display: inline-block; background-color: var(--primary-color); color: white; padding: 1rem 2.5rem; border-radius: 999px; font-size: 1.1rem; font-weight: bold; text-decoration: none; transition: transform 0.2s, filter 0.2s; }
	.cta-button:hover { transform: translateY(-3px); filter: brightness(1.1); }

	.tracks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
	.track-card { background-color: #252830; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color); position: relative; }
	.track-card h3 { font-size: 1.5rem; margin-top: 0; }
	.card-description { color: var(--secondary-color); }
	.tag { position: absolute; top: 1.5rem; right: 1.5rem; background-color: var(--primary-color); color: white; font-size: 0.8rem; font-weight: bold; padding: 0.25rem 0.75rem; border-radius: 999px; }
	.track-card h4 { margin-top: 2rem; margin-bottom: 1rem; }
	.track-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
	.checkmark { color: var(--primary-color); margin-right: 0.5rem; }

	.benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
	.benefit-card { background-color: #252830; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color); }
	.benefit-card h3 { font-size: 1.5rem; margin-top: 0; }
	.benefit-card ul { padding-left: 1.2rem; }
	.mentor-benefits { border-color: var(--primary-color); }

	.activities-list { list-style: none; padding: 0; margin-top: 3rem; }
	.activities-list li { background-color: #252830; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--primary-color); }
	
	.final-cta { text-align: center; padding: 4rem 0; background-color: #1f2128; border-radius: 16px; }

	@media (max-width: 768px) {
		.page-container { padding: 3rem 1.5rem; }
		.main-title { font-size: 2.5rem; }
		.benefits-grid { grid-template-columns: 1fr; }
	}
	.hero-schedule-summary {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		background-color: rgba(255, 255, 255, 0.05);
		padding: 0.75rem 1.5rem;
		border-radius: 999px;
		margin: 2.5rem auto;
		border: 1px solid var(--border-color);
		max-width: fit-content;
	}
	.hero-schedule-summary strong {
		color: var(--text-color);
	}
	.hero-schedule-summary .divider {
		color: var(--border-color);
	}

	.schedule-section {
		background-color: #1f2128;
		padding: 4rem 2rem;
		border-radius: 16px;
	}

	.schedule-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-top: 3rem;
		text-align: center;
	}
	.schedule-item {
		background-color: #252830;
		padding: 2rem;
		border-radius: 12px;
	}
	.schedule-item .date {
		font-weight: bold;
		font-size: 1.2rem;
		color: var(--primary-color);
	}
	.schedule-item .event {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0.5rem 0;
	}
	.schedule-item .description {
		font-size: 0.9rem;
		color: var(--secondary-color);
	}
	
	@media (max-width: 768px) {
		.hero-schedule-summary {
			flex-direction: column;
			gap: 0.5rem;
			border-radius: 12px;
		}
		.hero-schedule-summary .divider {
			display: none;
		}
		.schedule-grid {
			grid-template-columns: 1fr;
		}
	}
</style>