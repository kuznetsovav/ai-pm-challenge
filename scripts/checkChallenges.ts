import cron from "node-cron";
import { prisma } from "../lib/prisma";
import { sendChallengeReminderEmail } from "../lib/email";

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

async function checkAndSendReminders() {
  try {
    const settings = await prisma.challengeSettings.findFirst();
    if (!settings) {
      console.warn("[checkChallenges] No ChallengeSettings found; skipping.");
      return;
    }

    const currentDayNumber = computeCurrentDayFromStart(settings.startedAt);

    // Load all users and their progress for today
    const users = await prisma.user.findMany({
      where: { email: { not: null } },
      include: {
        progress: {
          where: { dayNumber: currentDayNumber },
        },
      },
    });

    const usersNeedingReminder = users.filter((user) => {
      const todayProgress = user.progress[0];
      // Incomplete if no record or concept not completed
      if (!todayProgress) return true;
      return !todayProgress.conceptCompleted;
    });

    if (!usersNeedingReminder.length) {
      console.log(
        `[checkChallenges] No reminders to send for day ${currentDayNumber}.`
      );
      return;
    }

    console.log(
      `[checkChallenges] Sending reminders for day ${currentDayNumber} to ${usersNeedingReminder.length} user(s).`
    );

    for (const user of usersNeedingReminder) {
      if (!user.email) continue;
      try {
        await sendChallengeReminderEmail(user.email, currentDayNumber);
        console.log(
          `[checkChallenges] Sent reminder to ${user.email} for day ${currentDayNumber}.`
        );
      } catch (err) {
        console.error(
          `[checkChallenges] Failed to send reminder to ${user.email}:`,
          err
        );
      }
    }
  } catch (err) {
    console.error("[checkChallenges] Error while checking challenges:", err);
  }
}

// Schedule: 0 20 * * *  (every day at 20:00)
cron.schedule("0 20 * * *", () => {
  void checkAndSendReminders();
});

// Optional: run immediately when this script is started
void checkAndSendReminders();

