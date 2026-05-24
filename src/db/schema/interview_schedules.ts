import { index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from '../../lib/index_schemas';
import { applications } from "./applications";
import { interviewStatusEnum, interviewTypeEnum } from './enums';

export const interviewSchedules = pgTable(
  "interview_schedules",
  {
    id: id(),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    interviewType: interviewTypeEnum("interview_type").notNull(),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
    durationMinutes: integer("duration_minutes").notNull().default(60),
    locationOrLink: text("location_or_link"),
    status: interviewStatusEnum("status").notNull().default("scheduled"),
    notes: text("notes"),
    createdAt: createdAt,
  },
  (t) => ({
    appIdx: index("is_app_idx").on(t.applicationId),
    scheduledIdx: index("is_scheduled_at_idx").on(t.scheduledAt),
  })
);