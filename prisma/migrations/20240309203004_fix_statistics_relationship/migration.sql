/*
  Warnings:

  - You are about to drop the column `statistics_id` on the `players` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `player_statistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_statistics_id_fkey";

-- DropIndex
DROP INDEX "players_statistics_id_key";

-- AlterTable
ALTER TABLE "player_statistics" ADD COLUMN     "playerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "players" DROP COLUMN "statistics_id";

-- AddForeignKey
ALTER TABLE "player_statistics" ADD CONSTRAINT "player_statistics_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
