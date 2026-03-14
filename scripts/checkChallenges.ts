import cron from "node-cron";
import { prisma } from "../lib/prisma";

const TOTAL_DAYS = 60;

function computeCurrentDayFromStart(startedAt: Date): number {
  const start = new Date(startedAt);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  return Math.min(TOTAL_DAYS, Math.max(1, diffDays + 1));
}

async function checkProgress() {
  try {
    const settings = await prisma.challengeSettings.findFirst();
    if (!settings) {
      console.warn("[checkChallenges] No ChallengeSettings found; skipping.");
      return;
    }

    const currentDayNumber = computeCurrentDayFromStart(settings.startedAt);

    const completedCount = await prisma.progress.count({
      where: { dayNumber: currentDayNumber, conceptCompleted: true },
    });

    const totalVisitors = await prisma.progress.groupBy({
      by: ["visitorId"],
    });

    console.log(
      `[checkChallenges] Day ${currentDayNumber}: ${completedCount}/${totalVisitors.length} visitors completed today's concept.`
    );
  } catch (err) {
    console.error("[checkChallenges] Error while checking challenges:", err);
  }
}

cron.schedule("0 20 * * *", () => {
  void checkProgress();
});

void checkProgress();
