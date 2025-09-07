// src/routes/announce/+page.server.js
import { db } from '$lib/server/db';

// 이 load 함수는 사용자가 /announce 페이지에 접속할 때마다 서버에서 실행됩니다.
export async function load() {
	console.log('[SERVER] /announce 페이지의 모든 공지사항을 불러옵니다.');

	try {
		// Drizzle ORM을 사용하여 announcement 테이블의 모든 데이터를 조회합니다.
		const announcements = await db.query.announcement.findMany({
			// createdAt 컬럼을 기준으로 내림차순(desc) 정렬하여,
			// 가장 최근에 작성된 글이 맨 위에 오도록 합니다.
			orderBy: (announcements, { desc }) => [desc(announcements.createdAt)]
		});
		
		// 조회한 데이터를 'announcements'라는 이름의 꾸러미에 담아
		// +page.svelte 파일로 전달합니다.
		return { announcements };

	} catch (error) {
		// 만약 데이터베이스 조회 중 오류가 발생하면,
		// 서버 터미널에 에러를 기록하고 빈 배열을 전달하여 앱이 충돌하는 것을 방지합니다.
		console.error('[SERVER] 공지사항 목록을 불러오는 중 오류 발생:', error);
		return { announcements: [] };
	}
}