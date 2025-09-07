// src/routes/admin/+page.server.js
import { count } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { user as userTable, application as appTable } from '$lib/server/db/schema';

export async function load() {
	try {
		const [userCountResult] = await db.select({ value: count() }).from(userTable);
		const [appCountResult] = await db.select({ value: count() }).from(appTable);
		
		const recentUsers = await db.query.user.findMany({
			limit: 5,
			orderBy: (users, { desc }) => [desc(users.id)],
			columns: { username: true, name: true }
		});

		const recentApps = await db.query.application.findMany({
			limit: 5,
			orderBy: (apps, { desc }) => [desc(apps.submittedAt)]
		});

		// 👇 (핵심) 이 return 구문이 모든 데이터를 포함하고 있는지 확인합니다.
		return {
			stats: {
				totalUsers: userCountResult.value,
				totalApps: appCountResult.value
			},
			recentUsers,
			recentApps
		};
	} catch (error) {
		console.error("Admin dashboard data loading failed:", error);
		// (안전장치) 오류 발생 시, 빈 배열을 반환하여 .length 오류를 방지합니다.
		return {
			stats: { totalUsers: 0, totalApps: 0 },
			recentUsers: [],
			recentApps: []
		};
	}
}