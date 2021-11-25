ALTER TABLE "EditLog" RENAME COLUMN "postId" TO "postSlug";
ALTER TABLE "EditLog" RENAME COLUMN "brief" TO "actionList";
ALTER TABLE "EditLog" ADD COLUMN "citation" TEXT;
