// src/routes/admin/announcements/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { db } from '$lib/server/db';
import { announcement as announcementTable } from '$lib/server/db/schema';

export const actions = {
	// 1. (핵심) form의 action="?/create"와 이름이 일치하는 'create' 액션을 만듭니다.
	create: async ({ request, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'ADMIN') {
			return fail(403, { message: '권한이 없습니다.' });
		}

		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');
		const attachments = formData.get('attachments');

		if (!title || !content) {
			return fail(400, { message: '제목과 내용을 모두 입력해주세요.' });
		}

		const announcementId = `ann_${nanoid(15)}`;
		
		try {
			await db.insert(announcementTable).values({
				id: announcementId,
				title: title,
				content: content,
				authorId: user.id,
				authorName: user.name,
				attachments: attachments // JSON 문자열을 그대로 저장
			});
		} catch (error) {
			console.error("공지사항 등록 실패:", error);
			return fail(500, { message: "데이터베이스 저장에 실패했습니다." });
		}
		
		// 2. 성공 시, 새로 만들어진 공지사항 상세 페이지로 이동시킵니다.
		throw redirect(303, `/announce/${announcementId}`);
	}
};