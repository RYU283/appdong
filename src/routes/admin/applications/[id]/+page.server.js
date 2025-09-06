import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { application as appTable } from '$lib/server/db/schema';

// 1. (핵심) `load` 함수는 actions와 별개로 export 되어야 합니다.
export async function load({ params }) {
	const [application] = await db.select().from(appTable).where(eq(appTable.id, params.id));

	if (!application) {
		throw error(404, '지원서를 찾을 수 없습니다.');
	}
	return { application };
}

// 2. (핵심) `actions` 객체도 별개로 export 되어야 합니다.
export const actions = {
	deleteApplication: async ({ params }) => {
		const { id } = params;
		
		try {
			const result = await db.delete(appTable).where(eq(appTable.id, id));

			if (result.rowsAffected === 0) {
				throw error(404, '삭제할 지원서를 찾을 수 없습니다.');
			}
		} catch (e) {
			throw error(500, '지원서 삭제 중 오류가 발생했습니다.');
		}
		
		// 3. 성공 시, 지원서 목록 페이지로 리다이렉트합니다.
		throw redirect(303, '/admin/applications');
	}
};