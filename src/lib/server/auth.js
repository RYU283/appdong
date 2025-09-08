// src/lib/server/auth.js
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

// 1시간을 밀리초(ms) 단위로 계산
const HOUR_IN_MS = 1000 * 60 * 60;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token, userId) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = {
		id: sessionId,
		userId,
		// 세션 만료 기간: 1시간
		expiresAt: new Date(Date.now() + HOUR_IN_MS)
	};
	await db.insert(table.session).values(session);
	return session;
}

// ==========================================================================
// (핵심) 두 개의 함수를 하나로 완벽하게 합친 최종 버전입니다.
// ==========================================================================
/** @param {string} token */
export async function validateSessionToken(token) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	
	// 1. `user.role`을 포함한 완전한 select 구문
	const [result] = await db
		.select({
			user: { 
				id: table.user.id, 
				username: table.user.username,
				name: table.user.name,
				role: table.user.role
			},
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	// 2. 만료된 세션 자동 삭제 로직
	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	// 3. 1시간짜리 세션 갱신 로직
	const renewSession = Date.now() >= session.expiresAt.getTime() - (HOUR_IN_MS / 2);
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + HOUR_IN_MS);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

/** @param {string} sessionId */
export async function invalidateSession(sessionId) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

/** @param {import("@sveltejs/kit").RequestEvent} event */
export function setSessionTokenCookie(event, token, expiresAt) {
	// ... (이하 setSessionTokenCookie와 deleteSessionTokenCookie 함수는 그대로)
}

/** @param {import("@sveltejs/kit").RequestEvent} event */
export function deleteSessionTokenCookie(event) {
	// ...
}