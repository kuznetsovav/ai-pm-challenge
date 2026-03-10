import { prisma } from "@/lib/prisma";

export async function getChallengeSettings(): Promise<{ startedAt: Date } | null> {
  try {
    const rows = await prisma.$queryRaw<
      { id: number; startedAt: Date }[]
    >`SELECT id, "startedAt" FROM "ChallengeSettings" LIMIT 1`;
    const row = rows[0];
    return row ? { startedAt: new Date(row.startedAt) } : null;
  } catch {
    return null;
  }
}

export async function createChallengeSettings(): Promise<{ startedAt: Date }> {
  const now = new Date();
  const iso = now.toISOString();
  await prisma.$executeRaw`INSERT INTO "ChallengeSettings" ("startedAt") VALUES (${iso})`;
  return { startedAt: now };
}
