import { boolean, index, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, updatedAt } from '../../lib/index_schemas';
import { users } from './users';


export const companyProfiles = pgTable(
    "company_profiles",
    {
        id: id(),
        userId: uuid("user_id")
            .notNull()
            .unique()
            .references(() => users.id, { onDelete: "cascade" }),
        companyName: text("company_name").notNull(),
        industry: text("industry"),
        companySize: text("company_size"),   // e.g. "1-10", "11-50", "50+"
        website: text("website"),
        logoUrl: text("logo_url"),
        description: text("description"),
        location: text("location"),
        verified: boolean("verified").notNull().default(false),
        updatedAt: updatedAt,
    },
    (t) => ({
        userIdx: uniqueIndex("cp_user_idx").on(t.userId),
        nameIdx: index("cp_name_idx").on(t.companyName),
    })
);