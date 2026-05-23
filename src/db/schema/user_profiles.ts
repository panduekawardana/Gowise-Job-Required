import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const user_profiles = pgTable('user_profiles', {
    id: serial('id').primaryKey().unique(),
    user_id: uuid('user_id').notNull().unique().references(() => users.id, {onDelete: 'cascade'}),
    headline: text('headline'),
});