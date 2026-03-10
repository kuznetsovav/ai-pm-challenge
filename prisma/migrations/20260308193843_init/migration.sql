-- CreateTable
CREATE TABLE "ChallengeDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dayNumber" INTEGER NOT NULL,
    "concept" TEXT NOT NULL,
    "interviewQuestion" TEXT,
    "prototypeName" TEXT,
    "prototypeDescription" TEXT
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dayNumber" INTEGER NOT NULL,
    "conceptCompleted" BOOLEAN NOT NULL DEFAULT false,
    "interviewCompleted" BOOLEAN NOT NULL DEFAULT false,
    "prototypeCompleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Prototype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,
    "githubUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeDay_dayNumber_key" ON "ChallengeDay"("dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_dayNumber_key" ON "Progress"("dayNumber");
