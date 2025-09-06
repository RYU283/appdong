import { db } from '$lib/server/db';

export async function load() {
	// 모든 지원서 정보를 불러옵니다.
	const applications = await db.query.application.findMany();
	return { applications };
}