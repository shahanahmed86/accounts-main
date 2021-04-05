/*
  Warnings:

  - Made the column `accountId` on table `Credit` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `Debit` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "accountId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Debit" ALTER COLUMN "accountId" SET NOT NULL;
