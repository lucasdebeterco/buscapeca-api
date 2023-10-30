/*
  Warnings:

  - You are about to alter the column `rating` on the `Loja` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `ratingCount` to the `Loja` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "ratingCount" INTEGER NOT NULL
);
INSERT INTO "new_Loja" ("id", "nome", "rating") SELECT "id", "nome", "rating" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
