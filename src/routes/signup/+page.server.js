// src/routes/signup/+page.server.js
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { nanoid } from 'nanoid';
import { fail } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';

export const actions = {
	default: async (event) => {
		// 1. formData는 함수 시작 부분에서 단 한번만 선언합니다.
		const formData = await event.request.formData();
		
		// 2. 모든 필드 값을 formData에서 가져옵니다.
		const username = formData.get('username');
		const name = formData.get('name');
		const student_id = formData.get('student_id');
		const department = formData.get('department');
		const phone1 = formData.get('phone1');
		const phone2 = formData.get('phone2');
		const phone3 = formData.get('phone3');
		const password = formData.get('password');
		const confirm_password = formData.get('confirm_password');

		// 3. 모든 필드에 대한 유효성 검사를 순서대로 수행합니다.
		if (password !== confirm_password) {
			return fail(400, { message: '비밀번호가 일치하지 않습니다.' });
		}
		if (!username || typeof username !== 'string' || username.length < 3) {
			return fail(400, { message: '아이디는 3글자 이상이어야 합니다.' });
		}
		if (!name || typeof name !== 'string' || name.length < 2) {
			return fail(400, { message: '성함을 올바르게 입력해주세요.' });
		}
		if (!student_id || typeof student_id !== 'string' || !/^\d{10}$/.test(student_id)) {
			return fail(400, { message: '학번은 숫자 10자리로 입력해야 합니다.' });
		}
		if (!department || typeof department !== 'string' || department.length < 2) {
			return fail(400, { message: '학과를 올바르게 입력해주세요.' });
		}
		if (!password || typeof password !== 'string' || password.length < 6) {
			return fail(400, { message: '비밀번호는 6글자 이상이어야 합니다.' });
		}

		const phone_number = `${phone1}${phone2}${phone3}`;
		if (!/^\d{11}$/.test(phone_number)) {
			return fail(400, { message: '전화번호 형식이 올바르지 않습니다.' });
		}

		// 4. 모든 중복 검사를 수행합니다.
		const [existingUser] = await db.select().from(userTable).where(eq(userTable.username, username));
		if (existingUser) {
			return fail(400, { message: '이미 사용 중인 아이디입니다.' });
		}
		const [existingStudentId] = await db.select().from(userTable).where(eq(userTable.student_id, student_id));
		if (existingStudentId) {
			return fail(400, { message: '이미 등록된 학번입니다.' });
		}
		const [existingPhone] = await db.select().from(userTable).where(eq(userTable.phone_number, phone_number));
		if (existingPhone) {
			return fail(400, { message: '이미 등록된 전화번호입니다.' });
		}

		// 5. 모든 검사를 통과하면 DB에 저장합니다.
		const hashedPassword = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		const userId = `user_${nanoid(15)}`;

		await db.insert(userTable).values({
			id: userId,
			username: username,
			hashed_password: hashedPassword,
			student_id: student_id,
			department: department,
			name: name,
			phone_number: phone_number
		});

		// 6. 성공 메시지를 반환합니다.
		return {
			success: true,
			message: '회원가입에 성공했습니다! 잠시 후 홈페이지로 이동합니다.'
		};
	}
};