import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { id } from '../../lib/index_schemas';
import { applications } from "./applications";
import { applicationStatusEnum } from './enums';
import { users } from "./users";
import { sql } from "drizzle-orm";

export const applicationStatusLogs = pgTable(
    "application_status_logs",
    {
        id: id(),
        applicationId: uuid("application_id")
            .notNull()
            .references(() => applications.id, { onDelete: "cascade" }),
        fromStatus: applicationStatusEnum("from_status"),
        toStatus: applicationStatusEnum("to_status").notNull(),
        changedBy: uuid("changed_by")
            .notNull()
            .references(() => users.id),
        notes: text("notes"),
        changedAt: timestamp("changed_at", { withTimezone: true })
            .notNull()
            .default(sql`now()`),
    },
    (t) => ({
        appIdx: index("asl_app_idx").on(t.applicationId),
        changedAtIdx: index("asl_changed_at_idx").on(t.changedAt),
    })
);