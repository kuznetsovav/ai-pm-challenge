export type Prototype = {
  id: number;
  name: string;
  problem: string;
  description: string;
  coreConcepts: string[];
};

export const prototypes: Prototype[] = [
  {
    id: 1,
    name: "AI Meeting Summarizer",
    problem:
      "Stakeholders miss meetings or need a quick way to catch up; key decisions and action items get lost in long recordings or notes.",
    description:
      "A tool that ingests meeting transcripts or audio, produces concise summaries with decisions, action items, and owners, and optionally surfaces follow-ups. Demonstrates understanding of async collaboration and reducing meeting load—a high-impact PM problem.",
    coreConcepts: [
      "Summarization",
      "Named entity extraction",
      "Structured output",
      "Streaming / async processing",
    ],
  },
  {
    id: 2,
    name: "AI Support Ticket Classifier",
    problem:
      "Support teams waste time triaging and routing tickets; wrong routing delays resolution and hurts satisfaction.",
    description:
      "A classifier that reads ticket content and suggests category, priority, and team (or routing rules). Shows ability to improve operations with AI and think about metrics like time-to-triage and misroute rate.",
    coreConcepts: [
      "Text classification",
      "Few-shot or fine-tuning",
      "Confidence scores",
      "Human-in-the-loop",
    ],
  },
  {
    id: 3,
    name: "RAG Documentation Chatbot",
    problem:
      "Teams struggle to find answers in large doc sets; search is keyword-bound and doesn’t answer “how do I…?” questions.",
    description:
      "A chatbot grounded in your docs (or a sample corpus) that answers questions with citations. Highlights RAG, chunking, and source attribution—core skills for “AI over our data” product work.",
    coreConcepts: [
      "Retrieval Augmented Generation",
      "Embeddings",
      "Chunking",
      "Source attribution",
    ],
  },
  {
    id: 4,
    name: "AI User Feedback Analyzer",
    problem:
      "Product teams are overwhelmed by qualitative feedback from surveys, reviews, and support; themes and priorities are hard to see.",
    description:
      "A tool that ingests feedback text, clusters themes, detects sentiment and urgency, and surfaces representative quotes. Demonstrates turning unstructured feedback into actionable insights—a classic PM need.",
    coreConcepts: [
      "Clustering / embeddings",
      "Sentiment analysis",
      "Theme extraction",
      "Summarization",
    ],
  },
  {
    id: 5,
    name: "AI PRD Generator",
    problem:
      "Writing PRDs is time-consuming and inconsistent; good templates exist but filling them with clear problem, scope, and success criteria is still manual.",
    description:
      "A generator that takes a brief (problem statement, context, or bullet points) and produces a structured PRD draft with sections like problem, goals, scope, and success metrics. Shows you understand PRD structure and can scope an AI writing assistant.",
    coreConcepts: [
      "Structured generation",
      "Prompt engineering",
      "Templates / few-shot",
      "Iterative refinement",
    ],
  },
  {
    id: 6,
    name: "AI Feature Idea Generator",
    problem:
      "Roadmap and backlog sessions need fresh, user-informed ideas; teams get stuck in the same patterns.",
    description:
      "A tool that takes inputs (user pain points, strategy themes, or constraints) and suggests feature ideas with brief rationale. Demonstrates combining AI creativity with product thinking and prioritization framing.",
    coreConcepts: [
      "Idea generation",
      "Constraint-based prompting",
      "Structured output",
      "Bias and safety",
    ],
  },
  {
    id: 7,
    name: "AI Experiment Hypothesis Generator",
    problem:
      "Teams run experiments but struggle to articulate clear, testable hypotheses and metrics.",
    description:
      "A helper that turns a product change or question into a well-formed hypothesis (e.g. “If we X, then Y will improve because Z”) and suggests primary and guardrail metrics. Shows experimentation literacy and clarity of thinking.",
    coreConcepts: [
      "Structured output",
      "Prompt engineering",
      "Metrics design",
      "Counter-metrics",
    ],
  },
  {
    id: 8,
    name: "AI Roadmap Assistant",
    problem:
      "Roadmap planning involves many inputs (strategy, capacity, dependencies, risk) and is often ad hoc or spreadsheet-heavy.",
    description:
      "An assistant that takes strategy goals, constraints, and backlog items and suggests phased themes, dependencies, or tradeoffs. Demonstrates understanding of roadmap mechanics and how AI can support (not replace) planning.",
    coreConcepts: [
      "Multi-turn reasoning",
      "Structured output",
      "Constraint handling",
      "RAG over strategy docs",
    ],
  },
  {
    id: 9,
    name: "AI Research Interview Summarizer",
    problem:
      "User research produces long transcripts; synthesizing across interviews to find patterns is slow and subjective.",
    description:
      "A tool that summarizes individual interviews and synthesizes themes, quotes, and insights across a set. Shows you value research rigor and can design AI that supports (not replaces) researchers.",
    coreConcepts: [
      "Summarization",
      "Cross-document synthesis",
      "Quote extraction",
      "Theme clustering",
    ],
  },
  {
    id: 10,
    name: "AI Competitor Analyzer",
    problem:
      "Keeping track of competitor features and positioning is manual and quickly goes stale.",
    description:
      "A tool that ingests competitor pages, reviews, or articles and answers questions like “How does X compare to Y?” or “What’s new in Z?” with citations. Demonstrates competitive intelligence and RAG applied to a PM workflow.",
    coreConcepts: [
      "RAG",
      "Comparative analysis",
      "Source attribution",
      "Freshness / updates",
    ],
  },
  {
    id: 11,
    name: "AI Onboarding Assistant",
    problem:
      "New users get lost in product complexity; static tours and docs don’t adapt to context or behavior.",
    description:
      "A contextual assistant that suggests next steps, answers “how do I…?” questions, and adapts to where the user is in the product. Shows understanding of activation and in-context help as a product lever.",
    coreConcepts: [
      "Conversational UX",
      "Context window / state",
      "RAG over help content",
      "Personalization",
    ],
  },
  {
    id: 12,
    name: "AI Product Analytics Interpreter",
    problem:
      "Non-analysts need to ask questions of data in plain language and get clear, accurate answers.",
    description:
      "A natural-language layer over analytics (or a demo dataset) that turns questions into interpretations and suggested follow-ups, with clear caveats. Demonstrates bridging data and product decisions and handling ambiguity.",
    coreConcepts: [
      "Text-to-query / NL interfaces",
      "Interpretation and caveats",
      "Structured data grounding",
      "Guardrails on claims",
    ],
  },
  {
    id: 13,
    name: "AI Release Notes Generator",
    problem:
      "Writing release notes is repetitive and often inconsistent in tone and structure.",
    description:
      "A generator that takes a list of changes (tickets, PRs, or bullet points) and produces user-facing release notes in a chosen tone and format. Shows you care about communication quality and can scope a focused writing tool.",
    coreConcepts: [
      "Summarization",
      "Tone and style",
      "Structured output",
      "Templates",
    ],
  },
  {
    id: 14,
    name: "AI FAQ Bot",
    problem:
      "Support and success teams answer the same questions repeatedly; deflection and self-serve could scale better.",
    description:
      "A bot that answers common questions from a curated FAQ or knowledge base, with escalation and “was this helpful?” feedback. Demonstrates deflection design, RAG, and measuring bot effectiveness.",
    coreConcepts: [
      "RAG",
      "Intent detection",
      "Deflection metrics",
      "Fallback and escalation",
    ],
  },
  {
    id: 15,
    name: "AI Customer Journey Mapper",
    problem:
      "Mapping journeys from raw feedback, support data, and analytics is manual and often inconsistent.",
    description:
      "A tool that ingests feedback, support tickets, or event summaries and suggests journey stages, pain points, and moments of truth. Shows systems thinking and ability to turn messy data into narrative.",
    coreConcepts: [
      "Synthesis",
      "Journey / stage inference",
      "Clustering",
      "Structured output",
    ],
  },
  {
    id: 16,
    name: "AI Product Risk Detector",
    problem:
      "Risks (reputation, safety, fairness) are often spotted late because they’re buried in content or behavior.",
    description:
      "A detector that scans user-facing content, feature descriptions, or feedback for potential risks (bias, safety, compliance) and flags for review. Demonstrates responsible product development and human-in-the-loop design.",
    coreConcepts: [
      "Classification",
      "Bias and safety",
      "Human review",
      "Guardrails",
    ],
  },
  {
    id: 17,
    name: "AI User Story Generator",
    problem:
      "Writing clear, consistent user stories and acceptance criteria takes time and varies by author.",
    description:
      "A generator that turns a feature or requirement into draft user stories and acceptance criteria in a consistent format. Shows agile literacy and ability to automate part of the backlog refinement process.",
    coreConcepts: [
      "Structured generation",
      "Templates",
      "Acceptance criteria",
      "Prompt engineering",
    ],
  },
  {
    id: 18,
    name: "AI Insight Dashboard",
    problem:
      "Dashboards show metrics but don’t explain what changed or what to do next.",
    description:
      "A layer that interprets key metric changes, suggests possible causes, and surfaces “so what?” insights and next steps. Demonstrates connecting data to decisions and designing for action, not just visibility.",
    coreConcepts: [
      "Time-series interpretation",
      "Causal framing",
      "Recommendations",
      "Uncertainty and caveats",
    ],
  },
  {
    id: 19,
    name: "AI Market Research Agent",
    problem:
      "Market and landscape research is time-consuming and hard to keep current.",
    description:
      "An agent that can search, summarize, and compare market reports, trends, and players given a query (e.g. “AI tools for PMs”) and return a synthesized brief with sources. Shows research workflow and multi-step AI design.",
    coreConcepts: [
      "Agents",
      "Tool use / search",
      "Synthesis",
      "Source attribution",
    ],
  },
  {
    id: 20,
    name: "AI Product Copilot",
    problem:
      "PMs context-switch between tools (docs, Jira, analytics, research) and lose time reassembling context.",
    description:
      "A copilot that sits across PM tools (or a subset) and answers questions like “What’s the status of X?” or “Summarize last week’s feedback” by pulling from connected sources. Demonstrates workflow integration and cross-tool reasoning.",
    coreConcepts: [
      "Multi-source RAG",
      "Tool calling",
      "Context assembly",
      "Copilot UX",
    ],
  },
];
