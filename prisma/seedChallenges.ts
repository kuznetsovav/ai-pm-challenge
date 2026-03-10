import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { challengeDays } from "../scripts/generateChallenges";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.challengeDay.deleteMany({});

  const records = challengeDays.map((day) => ({
    dayNumber: day.dayNumber,
    concept: day.conceptTitle,
    interviewQuestion: day.interviewQuestion ?? null,
    prototypeName: day.prototypeName ?? null,
    prototypeDescription: day.prototypeDescription ?? null,
  }));

  await prisma.challengeDay.createMany({
    data: records,
  });

  console.log(`Seeded ${records.length} challenge days.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
