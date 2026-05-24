import { pgTable, text, timestamp, boolean, uuid, varchar, uniqueIndex, index } from "drizzle-orm/pg-core";
import { roleEnum } from "./enums";

export const users = pgTable('users', {
   id: uuid('id').primaryKey().defaultRandom(),
   email: varchar('email', { length: 255 }).notNull().unique(),
   password_hash: text('password_hash').notNull(),
   role: roleEnum('role').notNull(),
   is_active: boolean('is_active').notNull().default(true),
   created_at: timestamp('created_at').notNull().defaultNow(),
   updated_at: timestamp('updated_at').notNull().defaultNow(),
}, (t) => ({
   emailIdx: uniqueIndex("users_email_idx").on(t.email),
   roleIdx: index("users_role_idx").on(t.role),
}));