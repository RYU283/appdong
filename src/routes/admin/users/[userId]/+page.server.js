import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';

export async function load({ params }) {
	const { userId } = params;
	const [user] = await db
		.select({
			id: userTable.id, username: userTable.username, name: userTable.name,
			student_id: userTable.student_id, department: userTable.department,
			phone_number: userTable.phone_number, role: userTable.role
		})
		.from(userTable)
		.where(eq(userTable.id, userId));
	
	if (!user) {
		throw error(404, '사용자를 찾을 수 없습니다.');
	}
	return { user };
}

export const actions = {
	// 👇 'default' 대신 'updateUser'라는 명확한 이름을 부여합니다.
	updateUser: async ({ request, params }) => {
		const { userId } = params;
		const formData = await request.formData();
		const name = formData.get('name');
		const student_id = formData.get('student_id');
		const department = formData.get('department');
		const phone_number = formData.get('phone_number');
		const role = formData.get('role');

		// ... (유효성 검사 로직은 그대로)

		try {
			await db
				.update(userTable)
				.set({ name, student_id, department, phone_number, role })
				.where(eq(userTable.id, userId));
		} catch (e) {
			return fail(500, { message: '데이터베이스 업데이트에 실패했습니다. 입력값을 확인해주세요.' });
		}
		
		return { success: true, message: '성공적으로 수정되었습니다.' };
	},

	// 회원 삭제를 위한 deleteUser 액션
	deleteUser: async ({ params }) => {
		const { userId } = params;
		try {
			const result = await db.delete(userTable).where(eq(userTable.id, userId));
			if (result.rowsAffected === 0) {
				throw error(404, '삭제할 사용자를 찾을 수 없습니다.');
			}
		} catch (e) {
			throw error(500, '회원 삭제 중 오류가 발생했습니다.');
		}
		throw redirect(303, '/admin/users');
	}
};