-- DropIndex
DROP INDEX "rentals_customerId_key";

-- DropIndex
DROP INDEX "rentals_gameId_key";

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "birthday" SET DATA TYPE DATE;
