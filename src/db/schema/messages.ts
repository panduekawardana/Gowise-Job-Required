import { 
    boolean,
    index,
    pgTable,
    text,
    timestamp,
    uuid }
from "drizzle-orm/pg-core";
import { id } from '../../lib/index_schemas';
import { conversations } from "./conversations";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const messages = pgTable(
    "messages",
    {
        id: id(),
        conversationId: uuid("conversation_id")
            .notNull()
            .references(() => conversations.id, { onDelete: "cascade" }),
        senderId: uuid("sender_id")
            .notNull()
            .references(() => users.id),
        content: text("content").notNull(),
        isRead: boolean("is_read").notNull().default(false),
        sentAt: timestamp("sent_at", { withTimezone: true })
            .notNull()
            .default(sql`now()`),
    },
    (t) => ({
        convIdx: index("msg_conv_idx").on(t.conversationId),
        senderIdx: index("msg_sender_idx").on(t.senderId),
        sentAtIdx: index("msg_sent_at_idx").on(t.sentAt),
    })
);