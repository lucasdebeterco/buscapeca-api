/*
  Warnings:

  - You are about to drop the column `likes` on the `Loja` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "rating" INTEGER
);
INSERT INTO "new_Loja" ("id", "nome") SELECT "id", "nome" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
