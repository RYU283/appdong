import { db } from '$lib/server/db';

export async function load() {
	// 모든 사용자 정보를 불러오되, 비밀번호는 제외합니다.
	const users = await db.query.user.findMany({
		columns: {
			hashed_password: false
		}
	});
	return { users };
}