// src/lib/server/db/schema.js
import { pgTable, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// 1. mysqlEnum 대신 pgEnum 사용
export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);

// 2. mysqlTable 대신 pgTable 사용
export const user = pgTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	username: varchar('username', { length: 255 }).notNull().unique(),
	hashed_password: varchar('hashed_password', { length: 255 }).notNull(),
	student_id: varchar('student_id', { length: 10 }).notNull().unique(),
	department: varchar('department', { length: 255 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	phone_number: varchar('phone_number', { length: 11 }).notNull().unique(),
	// 3. enum 타입 지정 방식 변경
	role: roleEnum('role').default('USER').notNull()
});

export const session = pgTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	// 4. onDelete를 'set null'에서 'cascade'로 변경하는 것이 더 일반적입니다.
	userId: varchar('user_id', { length: 255 }).references(() => user.id, { onDelete: 'cascade' }),
	// 5. timestamp 타입 지정 방식 변경
	expiresAt: timestamp('expires_at', { mode: 'date', withTimezone: true }).notNull()
});

export const application = pgTable('application', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 }).references(() => user.id, { onDelete: 'cascade' }),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	phoneNumber: varchar('phone_number', { length: 11 }).notNull(),
	university: varchar('university', { length: 255 }).notNull(),
	department: varchar('department', { length: 255 }).notNull(),
	studentId: varchar('student_id', { length: 20 }).notNull(),
	motivation: text('motivation').notNull(),
	programmingExperience: varchar('programming_experience', { length: 50 }).notNull(),
	knownFields: text('known_fields'),
	specificExperience: text('specific_experience'),
	finalWords: text('final_words'),
	submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow()
});