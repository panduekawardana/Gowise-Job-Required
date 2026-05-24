import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['COMPANY', 'JOB_SEEKER', 'ADMIN']);

export const jobTypeEnum = pgEnum("job_type", [
    "full_time",
    "part_time",
    "contract",
    "internship",
    "freelance",
]);

export const workModeEnum = pgEnum("work_mode", [
    "onsite",
    "remote",
    "hybrid",
]);

export const experienceLevelEnum = pgEnum("experience_level", [
    "entry",
    "mid",
    "senior",
    "lead",
    "executive",
]);

export const jobStatusEnum = pgEnum("job_status", [
    "draft",
    "published",
    "closed",
    "archived",
]);

export const applicationStatusEnum = pgEnum("application_status_enum", [
    "submitted",
    "reviewed",
    "shortlisted",
    "interview",
    "offered",
    "hired",
    "rejected",
    "withdrawn",
]);

export const interviewTypeEnum = pgEnum("interview_type", [
    "hr_screening",
    "technical",
    "user_interview",
    "final",
]);

export const interviewStatusEnum = pgEnum("interview_status", [
    "scheduled",
    "completed",
    "cancelled",
    "rescheduled",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
    "application_received",
    "application_status_changed",
    "interview_scheduled",
    "interview_reminder",
    "message_received",
    "job_recommendation",
    "profile_view",
    "system",
]);