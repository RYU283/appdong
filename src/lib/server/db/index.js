// src/lib/server/db/index.js
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// 1. SvelteKit이 제공하는 환경 변수 모듈을 import 합니다.
import { DATABASE_URL } from '$env/static/private';

// 2. (핵심) `pg` Pool 대신, `postgres` 클라이언트를 사용합니다.
//    이 클라이언트는 서버리스 환경에 최적화되어 있습니다.
const client = postgres(DATABASE_URL, { ssl: 'require' });

// 3. (핵심) `drizzle-orm/node-postgres` 대신 `drizzle-orm/postgres-js`를 사용합니다.
export const db = drizzle(client, { schema, mode: 'default' });