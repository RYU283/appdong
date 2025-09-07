import { db } from '$lib/server/db';

// 페이지 로드 시 모든 공지사항 목록을 불러옵니다.
export async function load() {
	const announcements = await db.query.announcement.findMany({
		orderBy: (announcements, { desc }) => [desc(announcements.createdAt)]
	});
	return { announcements };
}