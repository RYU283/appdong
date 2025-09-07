// src/routes/api/upload/+server.js
import { json, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

// 1. (핵심) SvelteKit의 환경 변수 모듈을 import 합니다.
//    이 변수들은 Vercel 대시보드 또는 .env 파일에서 값을 가져옵니다.
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '$env/static/private';

// 2. 코드에는 실제 값이 아닌, 변수 이름만 사용합니다.
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

export async function POST({ request, locals }) {
	if (!locals.user || locals.user.role !== 'ADMIN') {
		throw error(403, '권한이 없습니다.');
	}

	const formData = await request.formData();
	const file = formData.get('file');

	if (!file) {
		throw error(400, '업로드할 파일이 없습니다.');
	}

	const fileName = `${Date.now()}_${file.name}`;

	const { data, error: uploadError } = await supabase.storage
		.from('announcements')
		.upload(fileName, file);

	if (uploadError) {
		console.error('Supabase upload error:', uploadError);
		throw error(500, '파일 업로드에 실패했습니다: ' + uploadError.message);
	}

	const { data: { publicUrl } } = supabase.storage
		.from('announcements')
		.getPublicUrl(fileName);

	return json({ url: publicUrl });
}