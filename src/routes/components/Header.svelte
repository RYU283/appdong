<!-- src/routes/components/Header.svelte -->
<script>
	import { menuData } from '$lib/menuData.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let user = null;
	
	let isMenuOpen = false;
	let bodyEl;

	onMount(() => {
		bodyEl = document.body;
	});

	$: if (bodyEl) {
		if (isMenuOpen) {
			bodyEl.classList.add('noscroll');
		} else {
			bodyEl.classList.remove('noscroll');
		}
	}

	$: $page.url, (isMenuOpen = false);

	let activeMenu = null;
	function closeDropdown() {
		activeMenu = null;
	}
</script>

{#if isMenuOpen}
	<div class="overlay" on:click={() => (isMenuOpen = false)} />
{/if}

<div class="mobile-nav" class:is-open={isMenuOpen}>
	<ul>
		{#each menuData as item}
			<li><a href={item.path}>{item.title}</a></li>
		{/each}
		{#if user}
			<li><a href="/my-page">마이페이지</a></li>
		{/if}
	</ul>
	<div class="mobile-auth-links">
		{#if user}
			<span class="welcome-message">{user.name}님</span>
			<form action="/logout" method="POST"><button type="submit" class="logout-button">로그아웃</button></form>
		{:else}
			<a href="/login" class="login-button">로그인</a>
			<a href="/signup" class="signup-button">회원가입</a>
		{/if}
	</div>
</div>

<header on:mouseleave={closeDropdown} role="banner">
	<nav role="navigation">
		<div class="logo">
			<a href="/"><img src="/apdoimg.png" alt="APPDONG Logo" /></a>
		</div>
		<div class="desktop-nav">
			<ul class="nav-links">
				{#each menuData as item}
					<li on:mouseenter={() => (activeMenu = item.title)}>
						<a href={item.path}>{item.title}</a>
					</li>
				{/each}
				{#if user}
					<li><a href="/my-page">마이페이지</a></li>
				{/if}
			</ul>
			<div class="nav-right">
				<div class="icons">
					<a href="https://discord.com"><img src="/dcimg.svg" alt="Discord" /></a>
					<a href="https://github.com"><img src="/ghimg.svg" alt="GitHub" /></a>
					<a href="https://instagram.com"><img src="/igimg.svg" alt="Instagram" /></a>
				</div>
				{#if user}
					<span class="welcome-message">{user.name}님</span>
					<form action="/logout" method="POST"><button type="submit" class="logout-button">로그아웃</button></form>
				{:else}
					<a href="/login" class="login-button">로그인</a>
					<a href="/signup" class="signup-button">회원가입</a>
				{/if}
			</div>
		</div>
		<button class="mobile-nav-toggle" on:click={() => (isMenuOpen = !isMenuOpen)} aria-label="메뉴 열기/닫기">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				{#if isMenuOpen}
					<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
				{:else}
					<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
				{/if}
			</svg>
		</button>
	</nav>

	{#if activeMenu}
		{@const currentMenu = menuData.find((item) => item.title === activeMenu)}
		{#if currentMenu && currentMenu.columns.length > 0}
			<div class="dropdown-panel" on:mouseenter={() => (activeMenu = currentMenu.title)} role="menu">
				<div class="dropdown-content">
					{#each currentMenu.columns as column}
						<div class="menu-column">
							<ul>
								{#each column.links as link}
									<li><a href={link.path}>{link.text}</a></li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</header>

<style>
	/* ==========================================================================
	   1. 공통 및 데스크탑 스타일
	   ========================================================================== */
	header { position: relative; z-index: 10; border-bottom: 1px solid var(--border-color); }
	nav { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; gap: 2rem; }
	.logo a { display: flex; align-items: center; flex-shrink: 0; }
	.logo img { height: 40px; width: auto; display: block; }
	.desktop-nav { display: flex; align-items: center; gap: 2rem; flex-grow: 1; justify-content: flex-end; }
	.nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 0.5rem; }
	.nav-links li { display: flex; align-items: center; }
	.nav-links a { color: var(--secondary-color); transition: color 0.2s, background-color 0.2s; padding: 0.75rem 1rem; font-weight: 500; border-radius: 6px; }
	.nav-links a:hover { color: var(--text-color); background-color: rgba(255, 255, 255, 0.05); }
	.nav-right { display: flex; align-items: center; gap: 1.5rem; }
	.icons { display: flex; align-items: center; gap: 1rem; }
	.icons img { width: 24px; height: 24px; opacity: 0.7; transition: opacity 0.2s; }
	.icons a:hover img { opacity: 1; }
	.login-button, .logout-button, .signup-button { font-weight: 500; font-size: 0.9rem; text-decoration: none; padding: 0.5rem 1.25rem; border-radius: 999px; transition: all 0.2s ease-in-out; white-space: nowrap; cursor: pointer; font-family: inherit; }
	.login-button, .logout-button { color: var(--secondary-color); border: 1px solid var(--secondary-color); background: none; }
	.login-button:hover, .logout-button:hover { background-color: var(--secondary-color); color: var(--bg-color); }
	.signup-button { background-color: var(--primary-color); color: white; border: 1px solid var(--primary-color); }
	.signup-button:hover { opacity: 0.85; }
	.welcome-message { font-size: 0.9rem; color: var(--secondary-color); white-space: nowrap; }

	/* ==========================================================================
	   2. 데스크탑 드롭다운 메뉴 스타일 (복원)
	   ========================================================================== */
	.dropdown-panel {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background-color: #2c2f38;
		border-top: 1px solid var(--border-color);
		z-index: 10;
		animation: fadeIn 0.3s ease-in-out;
	}
	@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
	.dropdown-content { max-width: 1200px; margin: 0 auto; padding: 2rem; display: flex; gap: 4rem; }
	.menu-column ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1.2rem; }
	.menu-column a { color: var(--secondary-color); font-size: 1rem; transition: color 0.2s; }
	.menu-column a:hover { color: var(--text-color); }

	/* ==========================================================================
	   3. 모바일 메뉴 공통 스타일 (초기 상태 및 레이아웃)
	   ========================================================================== */
	.overlay {
		position: fixed; top: 0; left: 0; width: 100%; height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
	}
	.mobile-nav-toggle { display: none; }
	.mobile-nav {
		position: fixed; top: 0; right: 0; bottom: 0; width: 280px;
		background-color: #1f2128; z-index: 1000;
		transform: translateX(100%); transition: transform 0.3s ease-in-out;
		display: flex; flex-direction: column; justify-content: space-between;
	}
	.mobile-nav.is-open { transform: translateX(0); }
	.mobile-nav ul { list-style: none; padding: 6rem 1.5rem 2rem; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
	.mobile-nav ul a { display: block; color: var(--text-color); font-size: 1.2rem; padding: 0.75rem; border-radius: 8px; text-decoration: none; transition: background-color 0.2s; }
	.mobile-nav ul a:hover { background-color: var(--border-color); }
	.mobile-auth-links {
		padding: 2rem; border-top: 1px solid var(--border-color);
		display: flex; gap: 1rem; flex-direction: row; 
		align-items: center; justify-content: space-between;
	}
	.mobile-auth-links .logout-button, .mobile-auth-links .login-button, .mobile-auth-links .signup-button { width: auto; }
	.mobile-auth-links form { display: contents; }

	/* ==========================================================================
	   4. 모바일 반응형 스타일 (@media 쿼리)
	   ========================================================================== */
	@media (max-width: 900px) {
		.desktop-nav, .dropdown-panel { display: none; }
		.mobile-nav-toggle { 
			display: block; position: fixed; top: 1rem; right: 1.5rem;
			background: none; border: none; cursor: pointer; padding: 0.5rem;
			z-index: 1001; color: var(--text-color);
		}
	}
</style>