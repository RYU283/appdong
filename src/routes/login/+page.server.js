// src/routes/login/+page.server.js
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';

import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';

// ==========================================================
// 바로 이 `export const actions` 블록이 "우편함" 역할을 합니다.
// 이 블록이 없으면 SvelteKit은 POST 요청을 처리할 수 없습니다.
// ==========================================================
export const actions = {
	// `default` 액션은 form 태그에 별도의 action 이름이 없을 때 실행됩니다.
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
			return fail(400, { message: '아이디와 비밀번호를 모두 입력해주세요.' });
		}

		const [existingUser] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username));

		if (!existingUser) {
			return fail(400, { message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
		}
		
		const validPassword = await verify(existingUser.hashed_password, password);
		if (!validPassword) {
			return fail(400, { message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
		}

		const token = generateSessionToken();
		const session = await createSession(token, existingUser.id);
		setSessionTokenCookie(event, token, session.expiresAt);

		throw redirect(303, '/');
	}
};