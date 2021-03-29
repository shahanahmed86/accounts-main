/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `LevelFour`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `LevelOne`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `LevelThree`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `LevelTwo`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LevelFour.name_unique" ON "LevelFour"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LevelOne.name_unique" ON "LevelOne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LevelThree.name_unique" ON "LevelThree"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LevelTwo.name_unique" ON "LevelTwo"("name");
