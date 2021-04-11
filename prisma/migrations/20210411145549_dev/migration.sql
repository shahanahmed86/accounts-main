/*
  Warnings:

  - Made the column `email` on table `Account` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `cell` on table `Account` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "cell" SET NOT NULL;
