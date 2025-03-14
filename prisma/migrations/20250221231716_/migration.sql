/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "discordId" TEXT NOT NULL,
    "minecraftId" TEXT NOT NULL,

    PRIMARY KEY ("discordId", "minecraftId")
);
INSERT INTO "new_User" ("discordId", "minecraftId") SELECT "discordId", "minecraftId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
