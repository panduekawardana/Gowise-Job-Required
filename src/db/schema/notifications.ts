import { boolean, index, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from '../../lib/index_schemas';
import { users } from './users';
import { notificationTypeEnum } from './enums';

export const notifications = pgTable(
    "notifications",
    {
        id: id(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: notificationTypeEnum("type").notNull(),
        title: text("title").notNull(),
        body: text("body"),
        meta: jsonb("meta").$type<Record<string, unknown>>().default({}),
        isRead: boolean("is_read").notNull().default(false),
        createdAt: createdAt,
    },
    (t) => ({
        userIdx: index("notif_user_idx").on(t.userId),
        isReadIdx: index("notif_read_idx").on(t.isRead),
        createdIdx: index("notif_created_idx").on(t.createdAt),
    })
);