// drizzle.config.js
import 'dotenv/config';

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/lib/server/db/schema.js",
    out: "./drizzle",
    dialect: 'postgresql', // mysql -> postgresql
    dbCredentials: {

      url: process.env.DATABASE_URL,
    }
};
