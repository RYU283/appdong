// src/lib/server/db/index.js
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';
import 'dotenv/config';

const { Pool } = pg;

// Supabase는 보안을 위해 SSL 연결이 필수입니다.
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true, 
});

export const db = drizzle(pool, { schema, mode: 'default' });