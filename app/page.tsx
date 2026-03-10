import { prisma } from "@/lib/prisma";
import { getChallengeSettings } from "@/lib/challengeSettings";
import { concepts } from "@/data/concepts";
import { TaskChecklist } from "./components/TaskChecklist";
import { ProgressGrid, type DayProgress } from "./components/ProgressGrid";
import { StartChallengeButton } from "./components/StartChallengeButton";
import { ConceptCard } from "./components/ConceptCard";
import { ConceptQuiz } from "./components/ConceptQuiz";
import { getConceptQuiz } from "@/data/conceptQuizzes";

const TOTAL_DAYS = 60;

export const dynamic = "force-dynamic";

function computeStreaks(days: DayProgress[]): {
  currentStreak: number;
  longestStreak: number;
} {
  const completedDayNumbers = new Set(
    days.filter((d) => d.conceptCompleted).map((d) => d.dayNumber)
  );

  let currentStreak = 0;
  const maxCompletedDay = Math.max(0, ...completedDayNumbers);
  for (let d = maxCompletedDay; d >= 1 && completedDayNumbers.has(d); d--) {
    currentStreak++;
  }

  let longestStreak = 0;
  let run = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    if (completedDayNumbers.has(d)) {
      run++;
      longestStreak = Math.max(longestStreak, run);
    } else {
      run = 0;
    }
  }

  return { currentStreak, longestStreak };
}

function computeCurrentDayFromStart(startedAt: Date): number {
  const start = new Date(startedAt);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  return Math.min(TOTAL_DAYS, Math.max(1, diffDays + 1));
}

async function getCurrentDayData() {
  const [settings, latestProgress, allProgress] = await Promise.all([
    getChallengeSettings(),
    prisma.progress.findFirst({
      orderBy: { dayNumber: "desc" },
    }),
    prisma.progress.findMany({
      where: { dayNumber: { gte: 1, lte: TOTAL_DAYS } },
    }),
  ]);

  const currentDayNumber = settings
    ? computeCurrentDayFromStart(settings.startedAt)
    : latestProgress
      ? latestProgress.dayNumber
      : 1;

  const [challengeDay, progress] = await Promise.all([
    prisma.challengeDay.findUnique({
      where: { dayNumber: currentDayNumber },
    }),
    prisma.progress.findUnique({
      where: { dayNumber: currentDayNumber },
    }),
  ]);

  const progressByDay = new Map(
    allProgress.map((p) => [
      p.dayNumber,
      {
        dayNumber: p.dayNumber,
        conceptCompleted: p.conceptCompleted,
        interviewCompleted: p.interviewCompleted,
        prototypeCompleted: p.prototypeCompleted,
      },
    ])
  );
  const days: DayProgress[] = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const dayNumber = i + 1;
    return (
      progressByDay.get(dayNumber) ?? {
        dayNumber,
        conceptCompleted: false,
        interviewCompleted: false,
        prototypeCompleted: false,
      }
    );
  });

  const { currentStreak, longestStreak } = computeStreaks(days);

  return {
    currentDayNumber,
    challengeDay,
    progress,
    days,
    currentStreak,
    longestStreak,
    startedAt: settings?.startedAt ?? null,
  };
}

export default async function Home() {
  const { currentDayNumber, challengeDay, progress, days, currentStreak, longestStreak, startedAt } =
    await getCurrentDayData();

  if (!startedAt) {
    return (
      <main className="flex flex-col gap-8">
        <header className="pb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            AI PM Challenge
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            60 days of AI product management concepts, interview prep, and prototypes
          </p>
        </header>
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm flex flex-col items-center gap-6 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
            Start today and work through one day at a time. Your progress will be tracked from the moment you begin.
          </p>
          <StartChallengeButton />
        </section>
      </main>
    );
  }

  if (!challengeDay) {
    return (
      <main className="flex flex-col gap-8">
        <header className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            AI PM Challenge
          </h1>
        </header>
        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <p className="text-zinc-500 dark:text-zinc-400">
            No challenge day found. Run the seed script to populate the database.
          </p>
        </section>
      </main>
    );
  }

  const conceptDone = progress?.conceptCompleted ?? false;
  const interviewDone = progress?.interviewCompleted ?? false;
  const prototypeDone = progress?.prototypeCompleted ?? false;
  const hasInterview = !!challengeDay.interviewQuestion;
  const hasPrototype = !!(
    challengeDay.prototypeName || challengeDay.prototypeDescription
  );

  return (
    <main className="flex flex-col gap-8">
      <header className="pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          AI PM Challenge
        </h1>
        <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Day {currentDayNumber} / {TOTAL_DAYS}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
          Started {startedAt.toLocaleDateString(undefined, { dateStyle: "medium" })}
        </p>
      </header>

      <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-wrap gap-6">
        <p className="text-zinc-700 dark:text-zinc-300">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Current streak:</span>{" "}
          {currentStreak} {currentStreak === 1 ? "day" : "days"}
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Longest streak:</span>{" "}
          {longestStreak} {longestStreak === 1 ? "day" : "days"}
        </p>
      </section>

      <ConceptCard
        title={challengeDay.concept}
        explanation={concepts[currentDayNumber - 1]?.explanation ?? ""}
        whyItMattersForPM={concepts[currentDayNumber - 1]?.whyItMattersForPM ?? ""}
        exampleUseCase={concepts[currentDayNumber - 1]?.exampleUseCase ?? ""}
        learnMoreUrls={concepts[currentDayNumber - 1]?.learnMoreUrls}
      />

      <ConceptQuiz
        questions={getConceptQuiz(currentDayNumber) ?? []}
        dayNumber={currentDayNumber}
        conceptCompleted={conceptDone}
      />

      {hasInterview && (
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Interview Question
          </h2>
          <p className="text-zinc-900 dark:text-zinc-100">
            {challengeDay.interviewQuestion}
          </p>
        </section>
      )}

      {hasPrototype && (
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Prototype
          </h2>
          {challengeDay.prototypeName && (
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {challengeDay.prototypeName}
            </p>
          )}
          {challengeDay.prototypeDescription && (
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {challengeDay.prototypeDescription}
            </p>
          )}
        </section>
      )}

      <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
          Tasks for today
        </h2>
        <TaskChecklist
          dayNumber={currentDayNumber}
          conceptCompleted={conceptDone}
          interviewCompleted={interviewDone}
          prototypeCompleted={prototypeDone}
          hasInterviewQuestion={hasInterview}
          hasPrototype={hasPrototype}
        />
      </section>

      <ProgressGrid days={days} currentDayNumber={currentDayNumber} />
    </main>
  );
}
