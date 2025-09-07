// src/routes/admin/announcements/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { db } from '$lib/server/db';
import { announcement as announcementTable } from '$lib/server/db/schema';

// 이 페이지는 load 함수가 필요 없습니다.
export const actions = {
	// 'default' 액션으로 이름을 변경하여 더 간단하게 만듭니다.
	default: async ({ request, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'ADMIN') {
			return fail(403, { message: '권한이 없습니다.' });
		}

		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');

		if (!title || !content) {
			return fail(400, { message: '제목과 내용을 모두 입력해주세요.' });
		}

		const announcementId = `ann_${nanoid(15)}`;
		await db.insert(announcementTable).values({
			id: announcementId,
			title,
			content,
			authorId: user.id,
			authorName: user.name
		});
		
		// 성공 시, 공지사항 관리(목록) 페이지로 이동
		throw redirect(303, `/admin/announcements`);
	}
};