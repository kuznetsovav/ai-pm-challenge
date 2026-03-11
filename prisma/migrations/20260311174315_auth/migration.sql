/*
  Warnings:

  - Made the column `userId` on table `Progress` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "conceptCompleted" BOOLEAN NOT NULL DEFAULT false,
    "interviewCompleted" BOOLEAN NOT NULL DEFAULT false,
    "prototypeCompleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Progress" ("conceptCompleted", "dayNumber", "id", "interviewCompleted", "prototypeCompleted", "userId") SELECT "conceptCompleted", "dayNumber", "id", "interviewCompleted", "prototypeCompleted", "userId" FROM "Progress";
DROP TABLE "Progress";
ALTER TABLE "new_Progress" RENAME TO "Progress";
CREATE UNIQUE INDEX "Progress_userId_dayNumber_key" ON "Progress"("userId", "dayNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
