
import 'dotenv/config';

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/lib/server/db/schema.js",
    out: "./drizzle",
    dialect: 'mysql',
    dbCredentials: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }
};