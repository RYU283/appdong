// src/hooks.server.js
import { sessionCookieName, validateSessionToken } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	// ==========================================================
	// (핵심 디버깅) 모든 요청에 대해 들어온 쿠키를 터미널에 출력합니다.
	// ==========================================================
	const sessionId = event.cookies.get(sessionCookieName);
	console.log(`[HOOKS] Request to: ${event.url.pathname}`);
	console.log(`[HOOKS] Session Cookie found:`, sessionId ? `YES (${sessionId.substring(0, 10)}...)` : 'NO');
	// ==========================================================

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { user, session } = await validateSessionToken(sessionId);

	// ==========================================================
	// (핵심 디버깅) 토큰 검증 후 사용자 정보를 터미널에 출력합니다.
	// ==========================================================
	console.log('[HOOKS] User validated:', user ? user.name : null);
	// ==========================================================

	if (user && session) {
		event.locals.user = user;
		event.locals.session = session;
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}
	
	return resolve(event);
}