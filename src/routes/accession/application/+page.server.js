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

		if (user) {
			const [existingApp] = await db.select().from(appTable).where(eq(appTable.userId, user.id));
			if (existingApp) { return fail(403, { message: '이미 지원서를 제출했습니다.' }); }
		}
		
		// 필수 필드 유효성 검사
		const requiredFields = ['fullName', 'phoneNumber', 'university', 'department', 'studentId', 'motivation', 'githubExperience', 'activityChoice'];
		for (const field of requiredFields) {
			if (!data[field]) {
				return fail(400, { message: `필수 항목인 '${field}'을(를) 채워주세요.` });
			}
		}
		
		// 체크박스 데이터는 별도로 처리
		const studySubjects = formData.getAll('studySubjects');
		const bootcampMemberLangs = formData.getAll('bootcampMemberLangs');
		const bootcampMentorLangs = formData.getAll('bootcampMentorLangs');

		const applicationId = `app_${nanoid(15)}`;
		await db.insert(appTable).values({
			id: applicationId,
			userId: user ? user.id : null,
			fullName: data.fullName,
			phoneNumber: data.phoneNumber,
			university: data.university,
			department: data.department,
			studentId: data.studentId,
			motivation: data.motivation,
			programmingExperience: data.programmingExperience,
			githubExperience: data.githubExperience,
			activityChoice: data.activityChoice,
			vibeServiceIdea: data.vibeServiceIdea || null,
			studySubjects: JSON.stringify(studySubjects),
			bootcampProjectIdea: data.bootcampProjectIdea || null,
			bootcampMemberLangs: JSON.stringify(bootcampMemberLangs),
			bootcampMemberLangsOther: data.bootcampMemberLangsOther || null,
			bootcampMentorLangs: JSON.stringify(bootcampMentorLangs),
			bootcampMentorLangsOther: data.bootcampMentorLangsOther || null,
			mentorAvailableTime: data.mentorAvailableTime || null,
			mentorExperience: data.mentorExperience || null,
			knownFields: data.knownFields || null,
			specificExperience: data.specificExperience || null,
			finalWords: data.finalWords || null
		});
		
		return { success: true };
	}
};