/*
  Warnings:

  - Added the required column `cars_per_month` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usdot` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cars_per_month" VARCHAR(120) NOT NULL,
ADD COLUMN     "hear" VARCHAR(120),
ADD COLUMN     "usdot" VARCHAR(80) NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL;
