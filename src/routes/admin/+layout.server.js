import { error, redirect } from '@sveltejs/kit';

export function load({ locals }) {
    // 1. 로그인했는지 확인
    if (!locals.user) {
        throw redirect(303, '/login');
    }
    // 2. 관리자(ADMIN) 역할인지 확인
    if (locals.user.role !== 'ADMIN') {
        throw error(403, '접근 권한이 없습니다.'); // 403 Forbidden 에러 발생
    }
}