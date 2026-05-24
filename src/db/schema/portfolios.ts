import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id } from '../../lib/index_schemas';
import { job_seeker_profiles } from "./job_seeker_profiles";

export const portfolios = pgTable(
    "portfolios",
    {
        id: id(),
        profileId: uuid("profile_id")
            .notNull()
            .references(() => job_seeker_profiles.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        description: text("description"),
        url: text("url"),
        imageUrl: text("image_url"),
    },
    (t) => ({
        profileIdx: index("pf_profile_idx").on(t.profileId),
    })
);