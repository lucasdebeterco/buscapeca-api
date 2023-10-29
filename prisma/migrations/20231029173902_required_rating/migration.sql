/*
  Warnings:

  - Made the column `rating` on table `Loja` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "rating" INTEGER NOT NULL
);
INSERT INTO "new_Loja" ("id", "nome", "rating") SELECT "id", "nome", "rating" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
