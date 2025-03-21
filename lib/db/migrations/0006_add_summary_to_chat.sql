ALTER TABLE "Chat" ADD COLUMN "summary" text DEFAULT 'no summary' NOT NULL;
ALTER TABLE "Chat" ADD COLUMN "type" text DEFAULT 'personal' NOT NULL;
