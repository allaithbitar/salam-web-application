import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
const dbConnectionString = process.env.DB_URL as string;

// for migrations
// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), {})

// for query purposes
const queryClient = postgres(dbConnectionString);
export const db = drizzle(queryClient, { schema });
