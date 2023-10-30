-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "rating" REAL,
    "ratingCount" INTEGER
);
INSERT INTO "new_Loja" ("id", "nome", "rating", "ratingCount") SELECT "id", "nome", "rating", "ratingCount" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
