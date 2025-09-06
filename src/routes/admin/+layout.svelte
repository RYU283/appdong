<!-- src/routes/admin/+layout.svelte -->
<script>
    import { page } from '$app/stores';

    // 현재 경로에 따라 활성화된 탭/메뉴에 스타일을 주기 위한 함수
    function isActive(path) {
        return $page.url.pathname === path;
    }
</script>

<div class="admin-container">
	<!-- =================== 데스크탑용 사이드바 (PC에서만 보임) =================== -->
	<aside class="admin-sidebar">
		<h2>관리자 메뉴</h2>
		<nav>
			<a href="/admin/users" class:active={isActive('/admin/users')}>회원 관리</a>
			<a href="/admin/applications" class:active={isActive('/admin/applications')}>지원서 조회</a>
		</nav>
	</aside>

	<div class="admin-main-wrapper">
		<!-- =================== 모바일용 상단 탭 (모바일에서만 보임) =================== -->
		<nav class="admin-mobile-nav">
			<a href="/admin/users" class:active={isActive('/admin/users')}>회원 관리</a>
			<a href="/admin/applications" class:active={isActive('/admin/applications')}>지원서 조회</a>
		</nav>

		<main class="admin-content">
			<slot />
		</main>
	</div>
</div>

<style>
	.admin-container { 
		display: flex;
		min-height: 80vh;
	}
	
	/* --- 데스크탑 스타일 --- */
	.admin-sidebar {
		width: 220px;
		padding: 2rem;
		background-color: #1f2128;
		flex-shrink: 0;
	}
	.admin-sidebar h2 { font-size: 1.5rem; margin-top: 0; color: var(--text-color); }
	.admin-sidebar nav { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 2rem; }
	.admin-sidebar nav a { color: var(--secondary-color); text-decoration: none; padding: 0.75rem 1rem; border-radius: 6px; transition: background-color 0.2s, color 0.2s; }
	.admin-sidebar nav a:hover { background-color: #3a3f4b; color: var(--text-color); }
	.admin-sidebar nav a.active { background-color: var(--primary-color); color: white; }

	.admin-main-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow-x: hidden; /* 내부 콘텐츠가 넘칠 때를 대비 */
	}
	
	.admin-content {
		flex: 1;
		padding: 2rem;
	}

	/* 모바일 탭은 평소에 숨겨둡니다. */
	.admin-mobile-nav {
		display: none;
	}


	/* --- 모바일 반응형 스타일 --- */
	@media (max-width: 768px) {
		.admin-container {
			flex-direction: column; /* 세로로 쌓이도록 변경 */
		}
		
		.admin-sidebar {
			display: none; /* 데스크탑 사이드바 숨김 */
		}

		.admin-main-wrapper {
			width: 100%;
		}

		.admin-mobile-nav {
			display: flex; /* 모바일 탭 보임 */
			border-bottom: 1px solid var(--border-color);
		}
		.admin-mobile-nav a {
			flex: 1; /* 탭이 동일한 너비를 갖도록 함 */
			padding: 1rem;
			text-align: center;
			color: var(--secondary-color);
			text-decoration: none;
			border-bottom: 2px solid transparent; /* 비활성 탭 하단선 */
			transition: color 0.2s, border-color 0.2s;
		}
		.admin-mobile-nav a.active {
			color: var(--text-color);
			border-bottom-color: var(--primary-color); /* 활성 탭 하단선 */
		}
		
		.admin-content {
			padding: 1.5rem;
		}
	}
</style>