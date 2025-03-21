ALTER TABLE "Chat" ADD COLUMN "summary" text NOT NULL DEFAULT 'no summary' AFTER "title";
ALTER TABLE "Chat" ADD COLUMN "type" text NOT NULL DEFAULT 'personal' AFTER "userId";
