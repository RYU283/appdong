import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

import { db } from '$lib/server/db';
import { application as appTable, user as userTable } from '$lib/server/db/schema';

export async function load({ locals }) {
	const user = locals.user;

	// 로그인 상태일 때만
	if (user) {
		// 이미 지원서를 제출했는지 확인
		const [existingApplication] = await db.select().from(appTable).where(eq(appTable.userId, user.id));
		if (existingApplication) {
			return { user, alreadySubmitted: true };
		}
		
		// 폼 자동 채우기를 위한 사용자 정보 가져오기
		const currentUser = await db.query.user.findFirst({
			where: eq(userTable.id, user.id),
			columns: { name: true, phone_number: true, department: true, student_id: true }
		});
		return { user, alreadySubmitted: false, userData: currentUser };
	}

	// 비로그인 상태일 때
	return { user: null, alreadySubmitted: false, userData: null };
}

export const actions = {
	default: async ({ request, locals }) => {
		const user = locals.user;
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		// 로그인 상태일 때만, 이미 제출했는지 다시 한번 확인 (중복 제출 방지)
		if (user) {
			const [existingApp] = await db.select().from(appTable).where(eq(appTable.userId, user.id));
			if (existingApp) { return fail(403, { message: '이미 지원서를 제출했습니다.' }); }
		}
		
		// ... (모든 필드에 대한 유효성 검사는 이전과 동일하게 유지)
		
		const applicationId = `app_${nanoid(15)}`;
		await db.insert(appTable).values({
			id: applicationId,
			// 👇 userId는 로그인 상태일 때만 넣고, 아니면 null을 넣습니다.
			userId: user ? user.id : null, 
			fullName: data.fullName,
			phoneNumber: data.phoneNumber,
			university: data.university,
			department: data.department,
			studentId: data.studentId,
			motivation: data.motivation,
			programmingExperience: data.programmingExperience,
			knownFields: data.knownFields || null,
			specificExperience: data.specificExperience || null,
			finalWords: data.finalWords || null
		});
		
		return { success: true };
	}
};