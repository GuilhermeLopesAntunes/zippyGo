/*
  Warnings:

  - You are about to drop the column `classroomId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_classroomId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "classroomId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "classroomId";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
