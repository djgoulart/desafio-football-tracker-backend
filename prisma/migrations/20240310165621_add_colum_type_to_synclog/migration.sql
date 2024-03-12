/*
  Warnings:

  - Added the required column `type` to the `SyncLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('SUCCESS', 'ERROR');

-- AlterTable
ALTER TABLE "SyncLog" ADD COLUMN     "type" "LogType" NOT NULL;
