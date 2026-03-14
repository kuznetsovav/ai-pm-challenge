import { prisma } from "@/lib/prisma";

export async function getChallengeSettings(): Promise<{ startedAt: Date } | null> {
  const row = await prisma.challengeSettings.findFirst();
  return row ? { startedAt: row.startedAt } : null;
}

export async function createChallengeSettings(): Promise<{ startedAt: Date }> {
  const now = new Date();
  await prisma.challengeSettings.create({ data: { startedAt: now } });
  return { startedAt: now };
}
