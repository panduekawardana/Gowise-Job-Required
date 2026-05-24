CREATE TYPE "public"."application_status_enum" AS ENUM('submitted', 'reviewed', 'shortlisted', 'interview', 'offered', 'hired', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('entry', 'mid', 'senior', 'lead', 'executive');--> statement-breakpoint
CREATE TYPE "public"."interview_status" AS ENUM('scheduled', 'completed', 'cancelled', 'rescheduled');--> statement-breakpoint
CREATE TYPE "public"."interview_type" AS ENUM('hr_screening', 'technical', 'user_interview', 'final');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('draft', 'published', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('full_time', 'part_time', 'contract', 'internship', 'freelance');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('application_received', 'application_status_changed', 'interview_scheduled', 'interview_reminder', 'message_received', 'job_recommendation', 'profile_view', 'system');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('COMPANY', 'JOB_SEEKER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."work_mode" AS ENUM('onsite', 'remote', 'hybrid');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"saved_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "educations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"institution" text NOT NULL,
	"degree" text,
	"field_of_study" text,
	"started_at" date,
	"ended_at" date
);
--> statement-breakpoint
CREATE TABLE "portfolios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"url" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text,
	"started_at" date NOT NULL,
	"ended_at" date,
	"is_current" boolean DEFAULT false NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"seeker_id" uuid NOT NULL,
	"cv_snapshot_url" text NOT NULL,
	"cover_letter" text,
	"status" "application_status_enum" DEFAULT 'submitted' NOT NULL,
	"rejection_reason" text,
	"applied_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_postings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"requirements" text,
	"location" text,
	"job_type" "job_type" DEFAULT 'full_time' NOT NULL,
	"work_mode" "work_mode" DEFAULT 'onsite' NOT NULL,
	"salary_range" text,
	"experience_level" "experience_level",
	"status" "job_status" DEFAULT 'draft' NOT NULL,
	"required_skills" jsonb DEFAULT '[]'::jsonb,
	"views_count" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone,
	"expired_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"seeker_id" uuid NOT NULL,
	"company_user_id" uuid NOT NULL,
	"last_message_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "conversations_application_id_unique" UNIQUE("application_id")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"body" text,
	"meta" jsonb DEFAULT '{}'::jsonb,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_name" text NOT NULL,
	"industry" text,
	"company_size" text,
	"website" text,
	"logo_url" text,
	"description" text,
	"location" text,
	"verified" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "company_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "interview_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"interview_type" "interview_type" NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"duration_minutes" integer DEFAULT 60 NOT NULL,
	"location_or_link" text,
	"status" "interview_status" DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_seeker_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"headline" text,
	"bio" text,
	"location" text,
	"phone" text,
	"avatar_url" text,
	"cv_url" text,
	"skills" jsonb DEFAULT '[]'::jsonb,
	"social_links" jsonb DEFAULT '{}'::jsonb,
	"is_open_to_work" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "job_seeker_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "application_status_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"from_status" "application_status_enum",
	"to_status" "application_status_enum" NOT NULL,
	"changed_by" uuid NOT NULL,
	"notes" text,
	"changed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_job_id_job_postings_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_postings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educations" ADD CONSTRAINT "educations_profile_id_job_seeker_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."job_seeker_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_profile_id_job_seeker_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."job_seeker_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_profile_id_job_seeker_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."job_seeker_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_job_postings_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_postings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_seeker_id_job_seeker_profiles_id_fk" FOREIGN KEY ("seeker_id") REFERENCES "public"."job_seeker_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_company_id_company_profiles_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_seeker_id_users_id_fk" FOREIGN KEY ("seeker_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_company_user_id_users_id_fk" FOREIGN KEY ("company_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_schedules" ADD CONSTRAINT "interview_schedules_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_seeker_profiles" ADD CONSTRAINT "job_seeker_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_status_logs" ADD CONSTRAINT "application_status_logs_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_status_logs" ADD CONSTRAINT "application_status_logs_changed_by_users_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "msg_conv_idx" ON "messages" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "msg_sender_idx" ON "messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "msg_sent_at_idx" ON "messages" USING btree ("sent_at");--> statement-breakpoint
CREATE UNIQUE INDEX "sj_unique_idx" ON "saved_jobs" USING btree ("user_id","job_id");--> statement-breakpoint
CREATE INDEX "sj_user_idx" ON "saved_jobs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sj_job_idx" ON "saved_jobs" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "edu_profile_idx" ON "educations" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "pf_profile_idx" ON "portfolios" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "exp_profile_idx" ON "experiences" USING btree ("profile_id");--> statement-breakpoint
CREATE UNIQUE INDEX "app_unique_idx" ON "applications" USING btree ("job_id","seeker_id");--> statement-breakpoint
CREATE INDEX "app_job_idx" ON "applications" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "app_seeker_idx" ON "applications" USING btree ("seeker_id");--> statement-breakpoint
CREATE INDEX "app_status_idx" ON "applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "jp_company_idx" ON "job_postings" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "jp_status_idx" ON "job_postings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "jp_published_idx" ON "job_postings" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "jp_title_idx" ON "job_postings" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "conv_app_idx" ON "conversations" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX "conv_seeker_idx" ON "conversations" USING btree ("seeker_id");--> statement-breakpoint
CREATE INDEX "conv_company_idx" ON "conversations" USING btree ("company_user_id");--> statement-breakpoint
CREATE INDEX "notif_user_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notif_read_idx" ON "notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "notif_created_idx" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "cp_user_idx" ON "company_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "cp_name_idx" ON "company_profiles" USING btree ("company_name");--> statement-breakpoint
CREATE INDEX "is_app_idx" ON "interview_schedules" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX "is_scheduled_at_idx" ON "interview_schedules" USING btree ("scheduled_at");--> statement-breakpoint
CREATE UNIQUE INDEX "jsp_user_idx" ON "job_seeker_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "asl_app_idx" ON "application_status_logs" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX "asl_changed_at_idx" ON "application_status_logs" USING btree ("changed_at");