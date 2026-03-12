import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CONCEPTS = [
  "LLM basics",
  "Tokens",
  "Prompt engineering",
  "Embeddings",
  "Vector databases",
  "RAG",
  "AI agents",
  "Tool calling",
  "Evaluation",
  "Guardrails",
];

const INTERVIEW_QUESTIONS = [
  "How would you explain this concept to a non-technical stakeholder?",
  "What trade-offs would you consider when shipping a feature using this?",
  "How would you measure success for a product built on this concept?",
  "What risks or limitations should PMs be aware of?",
  "How would you prioritize this against other roadmap items?",
  "What’s one question you’d ask engineering before scoping this?",
  "How would you validate user need before investing in this?",
  "What’s the simplest version you’d ship first?",
  "How would you explain the ROI of this to leadership?",
  "What dependencies or integrations would you plan for?",
];

const PROTOTYPES: { name: string; description: string }[] = [
  {
    name: "AI meeting summarizer",
    description: "Summarize meetings and extract action items and decisions.",
  },
  {
    name: "AI support classifier",
    description: "Classify support tickets by topic and priority using NLP.",
  },
  {
    name: "AI research assistant",
    description: "Search and synthesize research with cited sources.",
  },
  {
    name: "AI PRD generator",
    description: "Draft PRDs from briefs and existing product context.",
  },
  {
    name: "AI feedback analyzer",
    description: "Analyze user feedback and surface themes and sentiment.",
  },
  {
    name: "AI doc search (RAG)",
    description: "Semantic search over docs with RAG and citations.",
  },
];

async function main() {
  const challengeDays = [];

  for (let dayNumber = 1; dayNumber <= 60; dayNumber++) {
    const concept = CONCEPTS[(dayNumber - 1) % CONCEPTS.length];
    const hasInterviewQuestion = dayNumber % 2 === 0;
    const hasPrototype = dayNumber % 3 === 0;

    const interviewQuestion = hasInterviewQuestion
      ? INTERVIEW_QUESTIONS[(dayNumber / 2 - 1) % INTERVIEW_QUESTIONS.length]
      : null;

    const prototypeIndex = hasPrototype ? dayNumber / 3 - 1 : 0;
    const prototype = hasPrototype
      ? PROTOTYPES[prototypeIndex % PROTOTYPES.length]
      : null;

    challengeDays.push({
      dayNumber,
      concept,
      interviewQuestion: interviewQuestion ?? undefined,
      prototypeName: prototype?.name ?? undefined,
      prototypeDescription: prototype?.description ?? undefined,
    });
  }

  await prisma.challengeDay.deleteMany({});
  await prisma.challengeDay.createMany({
    data: challengeDays,
  });

  console.log(`Seeded ${challengeDays.length} challenge days.`);
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
