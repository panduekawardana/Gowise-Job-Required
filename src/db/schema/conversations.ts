import { index, pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from '../../lib/index_schemas';
import { applications } from "./applications";
import { users } from "./users";

export const conversations = pgTable(
    "conversations",
    {
        id: id(),
        applicationId: uuid("application_id")
            .notNull()
            .unique()
            .references(() => applications.id, { onDelete: "cascade" }),
        seekerId: uuid("seeker_id")
            .notNull()
            .references(() => users.id),
        companyUserId: uuid("company_user_id")
            .notNull()
            .references(() => users.id),
        lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
        createdAt: createdAt,
    },
    (t) => ({
        appIdx: uniqueIndex("conv_app_idx").on(t.applicationId),
        seekerIdx: index("conv_seeker_idx").on(t.seekerId),
        companyIdx: index("conv_company_idx").on(t.companyUserId),
    })
);