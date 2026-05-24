import { boolean, date, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from '../../lib/index_schemas';
import { job_seeker_profiles } from "./job_seeker_profiles";

export const experiences = pgTable("experiences", {
        id: id(),
        profileId: uuid("profile_id")
            .notNull()
            .references(() => job_seeker_profiles.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        company: text("company").notNull(),
        location: text("location"),
        startedAt: date("started_at").notNull(),
        endedAt: date("ended_at"),
        isCurrent: boolean("is_current").notNull().default(false),
        description: text("description"),
        createdAt: createdAt,
    },
    (t) => ({
        profileIdx: index("exp_profile_idx").on(t.profileId),
    })
)