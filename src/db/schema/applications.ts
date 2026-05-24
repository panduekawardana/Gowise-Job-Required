import { index, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, updatedAt } from '../../lib/index_schemas';
import { jobPostings } from "./job_postings";
import { job_seeker_profiles } from "./job_seeker_profiles";
import { applicationStatusEnum } from './enums';
import { sql } from "drizzle-orm";

export const applications = pgTable(
    "applications",
    {
        id: id(),
        jobId: uuid("job_id")
            .notNull()
            .references(() => jobPostings.id, { onDelete: "cascade" }),
        seekerId: uuid("seeker_id")
            .notNull()
            .references(() => job_seeker_profiles.id, { onDelete: "cascade" }),
        cvSnapshotUrl: text("cv_snapshot_url").notNull(), // immutable snapshot
        coverLetter: text("cover_letter"),
        status: applicationStatusEnum("status").notNull().default("submitted"),
        rejectionReason: text("rejection_reason"),
        appliedAt: timestamp("applied_at", { withTimezone: true })
            .notNull()
            .default(sql`now()`),
        updatedAt: updatedAt,
    },
    (t) => ({
        // Satu pelamar hanya boleh melamar satu job satu kali
        uniqueApplication: uniqueIndex("app_unique_idx").on(t.jobId, t.seekerId),
        jobIdx: index("app_job_idx").on(t.jobId),
        seekerIdx: index("app_seeker_idx").on(t.seekerId),
        statusIdx: index("app_status_idx").on(t.status),
    })
);