import {
    index,
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from '../../lib/index_schemas';
import { companyProfiles } from "./company_profiles";
import {
    experienceLevelEnum,
    jobStatusEnum,
    jobTypeEnum,
    workModeEnum
} from './enums';

export const jobPostings = pgTable(
    "job_postings",
    {
        id: id(),
        companyId: uuid("company_id")
            .notNull()
            .references(() => companyProfiles.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        description: text("description").notNull(),
        requirements: text("requirements"),
        location: text("location"),
        jobType: jobTypeEnum("job_type").notNull().default("full_time"),
        workMode: workModeEnum("work_mode").notNull().default("onsite"),
        salaryRange: text("salary_range"),
        experienceLevel: experienceLevelEnum("experience_level"),
        status: jobStatusEnum("status").notNull().default("draft"),
        requiredSkills: jsonb("required_skills").$type<string[]>().default([]),
        viewsCount: integer("views_count").notNull().default(0),
        publishedAt: timestamp("published_at", { withTimezone: true }),
        expiredAt: timestamp("expired_at", { withTimezone: true }),
        createdAt: createdAt,
        updatedAt: updatedAt,
    },
    (t) => ({
        companyIdx: index("jp_company_idx").on(t.companyId),
        statusIdx: index("jp_status_idx").on(t.status),
        publishedIdx: index("jp_published_idx").on(t.publishedAt),
        // Untuk full-text search job title
        titleIdx: index("jp_title_idx").on(t.title),
    })
);