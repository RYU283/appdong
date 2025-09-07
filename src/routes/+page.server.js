import { db } from '$lib/server/db';

export async function load() {
	// (디버깅용) 이 함수가 실행되는지 터미널에 로그를 남깁니다.
	console.log('[SERVER] 메인 페이지 load 함수 실행됨.');

	try {
		const recentAnnouncements = await db.query.announcement.findMany({
			limit: 5,
			orderBy: (announcements, { desc }) => [desc(announcements.createdAt)]
		});

		console.log(`[SERVER] DB에서 찾은 공지사항 개수: ${recentAnnouncements.length}`);
		
		return { recentAnnouncements };

	} catch (error) {
		console.error('[SERVER] DB 조회 중 오류 발생:', error);
		// 오류가 발생해도 앱이 충돌하지 않도록 빈 배열을 반환합니다.
		return { recentAnnouncements: [] };
	}
}