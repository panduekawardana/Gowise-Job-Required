import {pgEnum, pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const employmentTypeEnum = pgEnum('employment_type_enum', ['full_time', 'part_time', 'contract', 'freelance', 'internship']);

export const workModeEnum = pgEnum('work_mode_enum', ['on_site', 'hybrid', 'remote']);

export const jobStatusEnum = pgEnum('job_status_enum', ['draft', 'published', 'closed']);

export const applicationStatusEnum = pgEnum('application_status_enum', [
    'pending',
    'reviewing',
    'shortlisted',
    'interviewed',
    'rejected',
    'hired',
    'submitted'
]);