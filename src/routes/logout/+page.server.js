import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		// 현재 활성화된 세션을 가져옵니다.
		const { session } = event.locals;

		// 세션이 존재하면 DB에서 삭제하고 쿠키도 삭제합니다.
		if (session) {
			await invalidateSession(session.id);
			deleteSessionTokenCookie(event);
		}

		// 메인 페이지로 리다이렉트합니다.
		throw redirect(303, '/');
	}
};