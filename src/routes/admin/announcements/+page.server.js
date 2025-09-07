// src/routes/admin/announcements/+page.server.js
import { db } from '$lib/server/db';

// 이 load 함수는 사용자가 /admin/announcements 페이지에 접속할 때 실행됩니다.
export async function load() {
	try {
		const announcements = await db.query.announcement.findMany({
			orderBy: (announcements, { desc }) => [desc(announcements.createdAt)]
		});
		// 'announcements'라는 이름으로 데이터를 포장해서 UI로 전달합니다.
		return { announcements };
	} catch (error) {
		console.error("공지사항 목록 로딩 실패:", error);
		// 오류 발생 시 빈 배열을 전달하여 UI가 깨지지 않도록 합니다.
		return { announcements: [] };
	}
}