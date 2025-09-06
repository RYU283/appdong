// drizzle.config.js
import 'dotenv/config';

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/lib/server/db/schema.js",
    out: "./drizzle",
    dialect: 'postgresql', // mysql -> postgresql
    dbCredentials: {
      // host, user 등이 아닌 URL 하나만 사용합니다.
      url: process.env.DATABASE_URL,
    }
};