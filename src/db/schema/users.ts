import {pgEnum, pgTable, text, timestamp, boolean, uuid, varchar} from "drizzle-orm/pg-core";

export const userRole = pgEnum('role', [
   'COMPANY', 'JOB_SEEKER', 'ADMIN'
]);

export const users = pgTable('users', {
   id: uuid('id').primaryKey().defaultRandom(),
   full_name: varchar('full_name', {length: 255}).notNull(),
   email: varchar('email', {length: 255}).notNull().unique(),
   password_hash: text('password_hash').notNull(),
   role: userRole('role').notNull(),
   avatar_url: text('avatar_url'),
   is_active: boolean('is_active').notNull().default(false),
   created_at: timestamp('created_at').notNull().defaultNow(),
   updated_at: timestamp('updated_at').notNull().defaultNow(),
   deleted_at: timestamp('deleted_at'),
});