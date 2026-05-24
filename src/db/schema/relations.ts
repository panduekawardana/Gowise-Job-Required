import { relations } from "drizzle-orm"
import { users } from "./users"
import { job_seeker_profiles } from "./job_seeker_profiles";
import { companyProfiles } from "./company_profiles";
import { notifications } from "./notifications";
import { savedJobs } from "./save_jobs";
import { messages } from "./messages";
import { applicationStatusLogs } from "./application_status_logs";
import { experiences } from "./experiences";
import { educations } from "./educations";
import { portfolios } from "./portfolios";
import { applications } from "./applications";
import { jobPostings } from "./job_postings";
import { interviewSchedules } from "./interview_schedules";
import { conversations } from "./conversations";

// USERS RELATIONS -> USER PROFILES
export const userRalations = relations(users, ({ one, many }) => ({
   seekerProfile: one(job_seeker_profiles, {
      fields: [users.id],
      references: [job_seeker_profiles.id],
   }),
   companyProfile: one(companyProfiles, {
      fields: [users.id],
      references: [companyProfiles.userId],
   }),
   notifications: many(notifications),
   savedJobs: many(savedJobs),
   sentMessages: many(messages),
   statusLogs: many(applicationStatusLogs),
}));

export const jobSeekerProfilesRelations = relations(job_seeker_profiles, ({ one, many }) => ({
   user: one(users, {
      fields: [job_seeker_profiles.id],
      references: [users.id],
   }),
   experiences: many(experiences),
   educations: many(educations),
   portfolios: many(portfolios),
   applications: many(applications),
}));

export const companyProfilesRelations = relations(
   companyProfiles,
   ({ one, many }) => ({
      user: one(users, {
         fields: [companyProfiles.userId],
         references: [users.id],
      }),
      jobPostings: many(jobPostings),
   })
);

export const experiencesRelations = relations(experiences, ({ one }) => ({
   profile: one(job_seeker_profiles, {
      fields: [experiences.profileId],
      references: [job_seeker_profiles.id],
   }),
}));

export const educationsRelations = relations(educations, ({ one }) => ({
   profile: one(job_seeker_profiles, {
      fields: [educations.profileId],
      references: [job_seeker_profiles.id],
   }),
}));

export const portfoliosRelations = relations(portfolios, ({ one }) => ({
   profile: one(job_seeker_profiles, {
      fields: [portfolios.profileId],
      references: [job_seeker_profiles.id],
   }),
}));

export const jobPostingsRelations = relations(jobPostings, ({ one, many }) => ({
   company: one(companyProfiles, {
      fields: [jobPostings.companyId],
      references: [companyProfiles.id],
   }),
   applications: many(applications),
   savedBy: many(savedJobs),
}));

export const applicationsRelations = relations(
   applications,
   ({ one, many }) => ({
      job: one(jobPostings, {
         fields: [applications.jobId],
         references: [jobPostings.id],
      }),
      seeker: one(job_seeker_profiles, {
         fields: [applications.seekerId],
         references: [job_seeker_profiles.id],
      }),
      statusLogs: many(applicationStatusLogs),
      interviewSchedule: one(interviewSchedules, {
         fields: [applications.id],
         references: [interviewSchedules.applicationId],
      }),
      conversation: one(conversations, {
         fields: [applications.id],
         references: [conversations.applicationId],
      }),
   })
);

export const applicationStatusLogsRelations = relations(
   applicationStatusLogs,
   ({ one }) => ({
      application: one(applications, {
         fields: [applicationStatusLogs.applicationId],
         references: [applications.id],
      }),
      changedBy: one(users, {
         fields: [applicationStatusLogs.changedBy],
         references: [users.id],
      }),
   })
);

export const interviewSchedulesRelations = relations(
   interviewSchedules,
   ({ one }) => ({
      application: one(applications, {
         fields: [interviewSchedules.applicationId],
         references: [applications.id],
      }),
   })
);

export const conversationsRelations = relations(
   conversations,
   ({ one, many }) => ({
      application: one(applications, {
         fields: [conversations.applicationId],
         references: [applications.id],
      }),
      seeker: one(users, {
         fields: [conversations.seekerId],
         references: [users.id],
         relationName: "seeker_conversations",
      }),
      companyUser: one(users, {
         fields: [conversations.companyUserId],
         references: [users.id],
         relationName: "company_conversations",
      }),
      messages: many(messages),
   })
);

export const messagesRelations = relations(messages, ({ one }) => ({
   conversation: one(conversations, {
      fields: [messages.conversationId],
      references: [conversations.id],
   }),
   sender: one(users, {
      fields: [messages.senderId],
      references: [users.id],
   }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
   user: one(users, {
      fields: [notifications.userId],
      references: [users.id],
   }),
}));

export const savedJobsRelations = relations(savedJobs, ({ one }) => ({
   user: one(users, {
      fields: [savedJobs.userId],
      references: [users.id],
   }),
   job: one(jobPostings, {
      fields: [savedJobs.jobId],
      references: [jobPostings.id],
   }),
}));