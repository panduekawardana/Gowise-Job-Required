import { date, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id } from '../../lib/index_schemas';
import { job_seeker_profiles } from "./job_seeker_profiles";

export const educations = pgTable("educations", {
        id: id(),
        profileId: uuid("profile_id")
            .notNull()
            .references(() => job_seeker_profiles.id, { onDelete: "cascade" }),
        institution: text("institution").notNull(),
        degree: text("degree"),
        fieldOfStudy: text("field_of_study"),
        startedAt: date("started_at"),
        endedAt: date("ended_at"),
    },
    (t) => ({
        profileIdx: index("edu_profile_idx").on(t.profileId),
    })
);