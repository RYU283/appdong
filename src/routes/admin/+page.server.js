import { count } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { user as userTable, application as appTable } from '$lib/server/db/schema';

// 이 파일은 /admin 경로에만 적용됩니다.
// 접근 제어는 부모인 /admin/+layout.server.js에서 이미 처리했으므로 여기서는 할 필요가 없습니다.
export async function load() {
	// 1. 총 회원 수를 계산합니다.
	const [userCountResult] = await db.select({ value: count() }).from(userTable);
	
	// 2. 총 지원서 수를 계산합니다.
	const [appCountResult] = await db.select({ value: count() }).from(appTable);
	
	// 3. 최근 가입한 회원 5명의 정보를 가져옵니다. (id 기준, 실제로는 가입일 기준이 더 좋습니다.)
	const recentUsers = await db.query.user.findMany({
		limit: 5,
		orderBy: (users, { desc }) => [desc(users.id)], // 가입일(createdAt) 컬럼이 있다면 그것으로 정렬
		columns: {
			username: true,
			name: true
		}
	});

	// 4. 최근 제출된 지원서 5개를 가져옵니다.
	const recentApps = await db.query.application.findMany({
		limit: 5,
		orderBy: (apps, { desc }) => [desc(apps.submittedAt)]
	});

	// 계산된 데이터를 페이지로 전달합니다.
	return {
		stats: {
			totalUsers: userCountResult.value,
			totalApps: appCountResult.value
		},
		recentUsers,
		recentApps
	};
}