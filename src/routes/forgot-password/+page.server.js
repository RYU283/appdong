// src/routes/forgot-password/+page.server.js
import { and, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';

import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';

export const actions = {
	// 1단계: 본인 인증을 위한 액션
	verifyUser: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const name = formData.get('name');
		const student_id = formData.get('student_id');

		if (!username || !name || !student_id) {
			return fail(400, { step: 1, message: '모든 필드를 입력해주세요.' });
		}

		// 아이디, 성함, 학번이 모두 일치하는 사용자를 찾습니다.
		const [user] = await db
			.select({ id: userTable.id })
			.from(userTable)
			.where(
				and(
					eq(userTable.username, username),
					eq(userTable.name, name),
					eq(userTable.student_id, student_id)
				)
			);
		
		if (!user) {
			return fail(400, { step: 1, message: '입력하신 정보와 일치하는 사용자가 없습니다.' });
		}

		// 인증 성공 시, 사용자 ID를 프론트엔드로 전달하여 다음 단계로 넘어갑니다.
		return {
			success: true,
			step: 2,
			userId: user.id
		};
	},

	// 2단계: 비밀번호 재설정을 위한 액션
	resetPassword: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');
		const password = formData.get('password');
		const confirm_password = formData.get('confirm_password');

		if (!userId || typeof userId !== 'string') {
			return fail(500, { step: 2, message: '사용자 정보가 유효하지 않습니다.' });
		}
		if (!password || typeof password !== 'string' || password.length < 6) {
			return fail(400, { step: 2, message: '비밀번호는 6글자 이상이어야 합니다.' });
		}
		if (password !== confirm_password) {
			return fail(400, { step: 2, message: '비밀번호가 일치하지 않습니다.' });
		}

		// 새 비밀번호를 해싱합니다.
		const hashedPassword = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// 해당 사용자의 비밀번호를 업데이트합니다.
		await db
			.update(userTable)
			.set({ hashed_password: hashedPassword })
			.where(eq(userTable.id, userId));
		
		// 성공 시 로그인 페이지로 리다이렉트합니다.
		return {
			success: true,
			message: '비밀번호가 성공적으로 변경되었습니다.'
		};
	}
};