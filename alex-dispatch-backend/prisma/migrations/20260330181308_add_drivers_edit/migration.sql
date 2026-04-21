/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `drivers` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "passwordHash",
ADD COLUMN     "password_hash" TEXT NOT NULL;
