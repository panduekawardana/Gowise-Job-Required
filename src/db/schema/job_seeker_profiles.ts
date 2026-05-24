import { jsonb, pgTable, text, uuid, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createdAt, id } from "../../lib/index_schemas";

export const job_seeker_profiles = pgTable("job_seeker_profiles", {
    id: id(),
    userId: uuid("user_id")
        .notNull()
        .unique()
        .references(() => users.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    headline: text("headline"),
    bio: text("bio"),
    location: text("location"),
    phone: text("phone"),
    avatarUrl: text("avatar_url"),
    cvUrl: text("cv_url"),
    skills: jsonb("skills").$type<string[]>().default([]),
    socialLinks: jsonb("social_links").$type<Record<string, string>>().default({}),
    isOpenToWork: boolean("is_open_to_work").notNull().default(true),
    createdAt,
}, (t) => ({
    userIdx : uniqueIndex('jsp_user_idx').on(t.userId),
}));