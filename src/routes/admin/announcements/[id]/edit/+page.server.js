// src/routes/admin/announcements/[id]/edit/+page.server.js
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { announcement as announcementTable } from '$lib/server/db/schema';

// 페이지 로드 시, 수정할 공지사항 데이터를 불러옵니다.
export async function load({ params }) {
	const { id } = params;
	const [announcement] = await db.select().from(announcementTable).where(eq(announcementTable.id, id));
	if (!announcement) {
		throw error(404, '수정할 공지사항을 찾을 수 없습니다.');
	}
	return { announcement };
}

export const actions = {
	// 정보 수정 액션
	update: async ({ request, params, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'ADMIN') { return fail(403); }

		const { id } = params;
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');

		if (!title || !content) { return fail(400, { message: '제목과 내용을 모두 입력해주세요.' }); }

		await db.update(announcementTable)
			.set({ title, content, authorName: user.name }) // 수정자 이름으로 업데이트
			.where(eq(announcementTable.id, id));
		
		throw redirect(303, '/admin/announcements');
	},

	// 정보 삭제 액션
	delete: async ({ params }) => {
		const { id } = params;
		await db.delete(announcementTable).where(eq(announcementTable.id, id));
		throw redirect(303, '/admin/announcements');
	}
};