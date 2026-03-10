/*
  Warnings:

  - Added the required column `coreConcepts` to the `Prototype` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem` to the `Prototype` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prototype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "coreConcepts" TEXT NOT NULL,
    "cursorPrompt" TEXT,
    "startDay" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,
    "githubUrl" TEXT
);
INSERT INTO "new_Prototype" ("description", "endDay", "githubUrl", "id", "name", "startDay") SELECT "description", "endDay", "githubUrl", "id", "name", "startDay" FROM "Prototype";
DROP TABLE "Prototype";
ALTER TABLE "new_Prototype" RENAME TO "Prototype";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
