import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";

// ID
export const id = () => uuid('id').primaryKey().default(sql`gen_random_uuid()`);

// Timestamps
export const createdAt = timestamp('created_at').defaultNow().notNull();
export const updatedAt = timestamp('updated_at').notNull();
export const deletedAt = timestamp('deleted_at').notNull();