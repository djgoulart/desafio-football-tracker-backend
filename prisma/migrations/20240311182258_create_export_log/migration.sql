-- CreateEnum
CREATE TYPE "ExportStatus" AS ENUM ('RUNNING', 'SUCCESS', 'ERROR');

-- CreateTable
CREATE TABLE "ExportLog" (
    "id" TEXT NOT NULL,
    "rows" INTEGER NOT NULL,
    "type" "ExportStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExportLog_pkey" PRIMARY KEY ("id")
);
