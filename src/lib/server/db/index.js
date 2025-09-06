
// src/lib/server/db/index.js
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import 'dotenv/config'; // .env 파일 로드

// .env 파일의 변수들을 이용해 DB 연결 풀 생성
const pool = mysql.createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});

export const db = drizzle(pool, { schema, mode: 'default' });