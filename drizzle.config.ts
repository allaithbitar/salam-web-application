import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/lib/drizzle/schema.ts",
  dialect: "postgresql",
  out: "./src/lib/drizzle/migrations",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  verbose: true,
});
