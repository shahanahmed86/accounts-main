/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `Account`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[cell]` on the table `Account`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "email" TEXT,
ADD COLUMN     "cell" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account.email_unique" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account.cell_unique" ON "Account"("cell");
