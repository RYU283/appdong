<script>
    // 1. SvelteKit의 page 스토어를 import 합니다.
    import { page } from '$app/stores';

    // 2. (핵심) 현재 경로와 링크 경로가 정확히 일치하는지 확인하는 함수입니다.
    //    startsWidth('/admin/users') 와 같이 더 넓은 범위로 체크할 수도 있습니다.
    function isActive(path) {
        return $page.url.pathname.startsWith(path);
    }
</script>

<div class="admin-container">
	<aside class="admin-sidebar">
		<h2>관리자 메뉴</h2>
		<nav>
			<!-- 3. (핵심) class:active 지시어를 사용하여 동적으로 클래스를 부여합니다. -->
			<a href="/admin/users" class:active={isActive('/admin/users')}>회원 관리</a>
			<a href="/admin/applications" class:active={isActive('/admin/applications')}>지원서 조회</a>
			<a href="/admin/announcements" class:active={isActive('/admin/announcements')}>공지사항 관리</a>
		</nav>
	</aside>
	<main class="admin-content">
		<slot />
	</main>
</div>

<style>
	.admin-container { 
		display: flex;
		min-height: 80vh;
	}
	
	.admin-sidebar {
		width: 220px;
		padding: 2rem;
		background-color: #1f2128;
		flex-shrink: 0;
	}
	.admin-sidebar h2 { font-size: 1.5rem; margin-top: 0; color: var(--text-color); font-family: var(--font-serif); }
	.admin-sidebar nav { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 2rem; }
	
	/* 4. (핵심) 기본 링크와 활성화된 링크(.active)의 스타일을 정의합니다. */
	.admin-sidebar nav a {
		color: var(--secondary-color);
		text-decoration: none;
		padding: 0.75rem 1rem;
		border-radius: 8px; /* 모서리를 둥글게 */
		transition: background-color 0.2s, color 0.2s;
		font-weight: 500;
	}
	.admin-sidebar nav a:hover {
		background-color: #3a3f4b;
		color: var(--text-color);
	}
	/* 활성화된 메뉴 링크에 적용될 스타일 */
	.admin-sidebar nav a.active {
		background-color: var(--primary-color);
		color: white;
	}

	.admin-main-wrapper {
		flex: 1; display: flex; flex-direction: column; overflow-x: hidden;
	}
	.admin-content {
		flex: 1; padding: 2rem;
	}

	.admin-mobile-nav { display: none; }

	@media (max-width: 768px) {
		/* ... (모바일 반응형 스타일은 그대로 유지) ... */
	}
</style>