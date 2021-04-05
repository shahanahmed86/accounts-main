-- AlterTable
ALTER TABLE "Credit" ADD COLUMN     "accountId" TEXT;

-- AlterTable
ALTER TABLE "Debit" ADD COLUMN     "accountId" TEXT;

-- AddForeignKey
ALTER TABLE "Credit" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debit" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
