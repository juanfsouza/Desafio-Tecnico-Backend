/*
  Warnings:

  - You are about to drop the column `schedule` on the `Session` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "schedule",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
