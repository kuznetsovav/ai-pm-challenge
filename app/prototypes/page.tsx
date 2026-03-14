import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { prototypes as prototypesDataset } from "@/data/prototypes";
import { PrototypeCard } from "../components/PrototypeCard";

const VISITOR_COOKIE = "challenge_visitor_id";

export const dynamic = "force-dynamic";

async function getPrototypeData(visitorId: string) {
  const [challengeDaysWithPrototype, prototypes, progress] = await Promise.all([
    prisma.challengeDay.findMany({
      where: {
        OR: [
          { prototypeName: { not: null } },
          { prototypeDescription: { not: null } },
        ],
      },
      orderBy: { dayNumber: "asc" },
    }),
    prisma.prototype.findMany(),
    prisma.progress.findMany({
      where: { visitorId },
    }),
  ]);

  const prototypeByStartDay = new Map(
    prototypes.map((p) => [p.startDay, p])
  );

  const progressByDay = new Map(
    progress.map((p) => [p.dayNumber, p])
  );

  return challengeDaysWithPrototype.map((day, index) => {
    const startDay = day.dayNumber;
    const endDay = day.dayNumber + 2;
    const saved = prototypeByStartDay.get(startDay);
    const dataset = prototypesDataset[index];
    const problem = dataset?.problem ?? "";
    const coreConcepts = Array.isArray(dataset?.coreConcepts)
      ? dataset.coreConcepts.join(", ")
      : (dataset?.coreConcepts ?? "");
    const prototypeProgress = progressByDay.get(startDay);
    const isDone = !!prototypeProgress?.prototypeCompleted;

    return {
      prototypeId: saved?.id ?? null,
      name: day.prototypeName ?? "Prototype",
      description: day.prototypeDescription ?? "",
      problem,
      coreConcepts,
      startDay,
      endDay,
      githubUrl: saved?.githubUrl ?? null,
      isDone,
    };
  });
}

export default async function PrototypesPage() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    return (
      <main className="flex flex-col gap-8">
        <p className="text-zinc-600 dark:text-zinc-400">Loading…</p>
      </main>
    );
  }

  const prototypes = await getPrototypeData(visitorId);

  return (
    <main className="flex flex-col gap-8">
      <header className="pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Prototype Tracker
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Track GitHub repos for each prototype
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {prototypes.map((p) => (
          <PrototypeCard
            key={p.startDay}
            prototypeId={p.prototypeId}
            name={p.name}
            description={p.description}
            problem={p.problem}
            coreConcepts={p.coreConcepts}
            startDay={p.startDay}
            endDay={p.endDay}
            githubUrl={p.githubUrl}
            isDone={p.isDone}
          />
        ))}
      </div>
    </main>
  );
}
