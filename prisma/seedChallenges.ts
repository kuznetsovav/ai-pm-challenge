import { PrismaClient } from "@prisma/client";
import { challengeDays } from "../scripts/generateChallenges";

// Uses DATABASE_URL from .env (e.g. file:./prisma/dev.db)
const prisma = new PrismaClient();

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
