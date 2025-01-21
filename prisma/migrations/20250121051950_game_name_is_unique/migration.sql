/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");
