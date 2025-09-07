import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { announcement as announcementTable } from '$lib/server/db/schema';

export async function load({ params }) {
	const [announcement] = await db.select().from(announcementTable).where(eq(announcementTable.id, params.id));
	
	if (!announcement) {
		throw error(404, '공지사항을 찾을 수 없습니다.');
	}
	return { announcement };
}