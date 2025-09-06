import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { verify, hash } from '@node-rs/argon2';

import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
// 👇 (중요) `deleteSessionTokenCookie`를 import 했는지 확인합니다.
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';

// 이 페이지는 로그인한 사용자만 접근해야 합니다.
export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	const fullUser = await db.query.user.findFirst({
		where: eq(userTable.id, locals.user.id),
		columns: {
			hashed_password: false
		}
	});
	return {
		user: fullUser
	};
}

export const actions = {
	reauthenticate: async ({ request, locals }) => {
		// ... (이 액션은 변경할 필요 없습니다)
	},

	// 👇 이 액션을 수정합니다.
	updateProfile: async (event) => { // event 객체 전체를 받습니다.
		const { request, locals, cookies } = event; // 1. event에서 cookies를 구조 분해 할당합니다.
		
		const formData = await request.formData();
		const name = formData.get('name');
		const department = formData.get('department');
		const phone1 = formData.get('phone1');
		const phone2 = formData.get('phone2');
		const phone3 = formData.get('phone3');
		const password = formData.get('password');
		const confirm_password = formData.get('confirm_password');
		const user = locals.user;

		if (!user) { throw redirect(303, '/login'); }

		// ... (모든 유효성 검사 로직은 그대로)

		let hashedPassword = null;
		if (password || confirm_password) {
			if (!password || password.length < 6) { return fail(400, { step: 2, message: '새 비밀번호는 6글자 이상이어야 합니다.' }); }
			if (password !== confirm_password) { return fail(400, { step: 2, message: '새 비밀번호가 일치하지 않습니다.' }); }
			hashedPassword = await hash(password, { /* ... */ });
		}

		// ... (전화번호 중복 확인 로직은 그대로)

		const updateData = { name, department, phone_number: `${phone1}${phone2}${phone3}` };
		if (hashedPassword) {
			updateData.hashed_password = hashedPassword;
		}

		await db.update(userTable).set(updateData).where(eq(userTable.id, user.id));
		
		const { session } = locals;
		if (session) {
			await invalidateSession(session.id);
			// 2. (핵심 수정) `deleteSessionTokenCookie`에 event 객체를 전달합니다.
			deleteSessionTokenCookie(event);
		}
		
		const successMessage = hashedPassword ? 'password_updated' : 'info_updated';
		throw redirect(303, `/login?message=${successMessage}`);
	}
};