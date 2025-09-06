
// src/lib/server/db/schema.js
import { mysqlTable, varchar, text, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	username: varchar('username', { length: 255 }).notNull().unique(),
	// ... (기존 다른 컬럼들은 그대로)

	// 👇 이 줄을 추가합니다.
	role: mysqlEnum('role', ['USER', 'ADMIN']).default('USER').notNull(),
	hashed_password: varchar('hashed_password', { length: 255 }).notNull(),

	student_id: varchar('student_id', { length: 10 }).notNull().unique(),
	department: varchar('department', { length: 255 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	phone_number: varchar('phone_number', { length: 11 }).notNull().unique()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { mode: 'date', fsp: 3 }).notNull()
});

// 👇 지원서를 저장할 새로운 테이블을 추가합니다.
export const application = mysqlTable('application', {
	id: varchar('id', { length: 255 }).primaryKey(),
	
	// 👇 바로 이 부분을 수정합니다!
	// userId를 더 이상 NOT NULL이 아니고, UNIQUE도 아니도록 변경합니다.
	userId: varchar('user_id', { length: 255 }).references(() => user.id, { onDelete: 'set null' }),
	
	// 지원서 내용
	fullName: varchar('full_name', { length: 255 }).notNull(),
	phoneNumber: varchar('phone_number', { length: 11 }).notNull(),
	university: varchar('university', { length: 255 }).notNull(),
	department: varchar('department', { length: 255 }).notNull(),
	studentId: varchar('student_id', { length: 20 }).notNull(),
	motivation: text('motivation').notNull(),
	programmingExperience: varchar('programming_experience', { length: 50 }).notNull(),
	knownFields: text('known_fields'), // 경험이 있는 경우에만 입력
	specificExperience: text('specific_experience'), // 경험이 있는 경우에만 입력
	finalWords: text('final_words'),
	
	submittedAt: timestamp('submitted_at').notNull().defaultNow()
});

