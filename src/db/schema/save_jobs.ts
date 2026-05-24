import {
    index,
    pgTable,
    timestamp,
    uniqueIndex,
    uuid
} from "drizzle-orm/pg-core";
import { id } from '../../lib/index_schemas';
import { users } from "./users";
import { jobPostings } from "./job_postings";
import { sql } from "drizzle-orm";

export const savedJobs = pgTable(
    "saved_jobs",
    {
        id: id(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        jobId: uuid("job_id")
            .notNull()
            .references(() => jobPostings.id, { onDelete: "cascade" }),
        savedAt: timestamp("saved_at", { withTimezone: true })
            .notNull()
            .default(sql`now()`),
    },
    (t) => ({
        uniqueSave: uniqueIndex("sj_unique_idx").on(t.userId, t.jobId),
        userIdx: index("sj_user_idx").on(t.userId),
        jobIdx: index("sj_job_idx").on(t.jobId),
    })
);