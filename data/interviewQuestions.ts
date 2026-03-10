export type InterviewQuestion = {
  id: number;
  question: string;
  hint: string;
};

export const interviewQuestions: InterviewQuestion[] = [
  // AI Product Design
  {
    id: 1,
    question: "How would you design an AI feature for Google Maps?",
    hint: "Think about user problem, AI capability, risks, and metrics.",
  },
  {
    id: 2,
    question:
      "How would you decide whether to build a chatbot vs. a structured form for a customer support flow?",
    hint: "Consider user intent clarity, complexity of queries, and when to hand off to humans.",
  },
  {
    id: 3,
    question:
      "How would you design an AI writing assistant that feels helpful without being intrusive?",
    hint: "Consider placement, triggers, defaults, and how users stay in control.",
  },
  {
    id: 4,
    question:
      "How would you design discovery for an AI feature that most users don’t know exists?",
    hint: "Think about context, timing, education, and measuring activation.",
  },
  {
    id: 5,
    question:
      "How would you design an AI recommendation experience so users understand why something was suggested?",
    hint: "Consider transparency, trust, and when explanation helps vs. adds noise.",
  },
  {
    id: 6,
    question:
      "How would you design the UX when an AI feature is wrong or the user disagrees?",
    hint: "Think about feedback, correction, fallback, and avoiding frustration.",
  },
  // AI Metrics
  {
    id: 7,
    question:
      "How would you measure success for an AI feature that doesn’t have a clear completion action?",
    hint: "Consider engagement, quality signals, downstream outcomes, and counter-metrics.",
  },
  {
    id: 8,
    question:
      "How would you define and track 'AI quality' in a way that’s actionable for the team?",
    hint: "Think about automated evals, human review, and tying to user outcomes.",
  },
  {
    id: 9,
    question:
      "How would you A/B test an AI feature when the output is non-deterministic?",
    hint: "Consider sample size, metrics, and how to isolate model vs. UX impact.",
  },
  {
    id: 10,
    question:
      "How would you balance cost per query and quality when choosing or tuning an LLM?",
    hint: "Think about use-case tiers, latency, and when to use smaller vs. larger models.",
  },
  {
    id: 11,
    question:
      "How would you measure whether users trust an AI feature enough to act on it?",
    hint: "Consider adoption, reliance, verification behavior, and qualitative signals.",
  },
  {
    id: 12,
    question:
      "How would you set up monitoring to detect model regression or prompt drift in production?",
    hint: "Think about input/output sampling, guardrail metrics, and alerting.",
  },
  // AI Strategy
  {
    id: 13,
    question:
      "How would you prioritize AI investments when you have limited data science and eng capacity?",
    hint: "Consider impact, feasibility, strategic fit, and build vs. buy.",
  },
  {
    id: 14,
    question:
      "How would you decide 'build vs. buy' for an LLM-based feature (e.g. use an API vs. fine-tune)?",
    hint: "Think about differentiation, data, cost, control, and time to market.",
  },
  {
    id: 15,
    question:
      "How would you explain the ROI of an AI initiative to a skeptical leadership team?",
    hint: "Consider efficiency gains, quality, retention, and how to frame experiments.",
  },
  {
    id: 16,
    question:
      "How would you evolve product strategy when a new foundation model suddenly changes what’s possible?",
    hint: "Think about re-prioritization, technical debt, and staying focused on user value.",
  },
  {
    id: 17,
    question:
      "How would you balance shipping AI features quickly vs. ensuring they’re safe and reliable?",
    hint: "Consider phased rollout, guardrails, and when 'good enough' is acceptable.",
  },
  {
    id: 18,
    question:
      "How would you position an AI product against incumbents who are adding AI to existing products?",
    hint: "Consider differentiation, workflow, and where AI-first creates advantage.",
  },
  // AI System Design
  {
    id: 19,
    question:
      "How would you design a RAG system so answers stay accurate as the knowledge base grows?",
    hint: "Think about chunking, retrieval quality, freshness, and evaluation.",
  },
  {
    id: 20,
    question:
      "How would you design an AI agent that can use multiple tools without over-calling or getting stuck?",
    hint: "Consider planning, tool design, timeouts, and fallbacks.",
  },
  {
    id: 21,
    question:
      "How would you design the architecture for an AI feature that must work offline or in low-connectivity environments?",
    hint: "Think about on-device models, caching, sync, and graceful degradation.",
  },
  {
    id: 22,
    question:
      "How would you design a pipeline that combines an LLM with structured rules and human review?",
    hint: "Consider when to automate vs. escalate, and how to keep the human loop efficient.",
  },
  {
    id: 23,
    question:
      "How would you design for latency when your AI feature depends on a slow external model API?",
    hint: "Think about streaming, caching, UX during wait, and when to use a faster model.",
  },
  {
    id: 24,
    question:
      "How would you design guardrails so they block harmful content without over-blocking valid use cases?",
    hint: "Consider layers, tuning, logging, and user feedback on blocks.",
  },
  // AI Risks
  {
    id: 25,
    question:
      "How would you mitigate the risk of an LLM hallucinating in a high-stakes domain (e.g. legal or medical)?",
    hint: "Think about grounding, citations, human review, and clear disclaimers.",
  },
  {
    id: 26,
    question:
      "How would you address the risk of prompt injection in a customer-facing chatbot?",
    hint: "Consider isolation, input sanitization, and least-privilege system prompts.",
  },
  {
    id: 27,
    question:
      "How would you think about fairness and bias when launching an AI feature that makes recommendations?",
    hint: "Consider data, evaluation by segment, and product-level safeguards.",
  },
  {
    id: 28,
    question:
      "How would you handle a case where users rely on your AI for something it wasn’t designed for?",
    hint: "Think about scope, communication, guardrails, and when to restrict use.",
  },
  {
    id: 29,
    question:
      "How would you prepare for and respond to a public incident involving your AI (e.g. harmful output or misuse)?",
    hint: "Consider detection, response playbook, communication, and post-incident changes.",
  },
  {
    id: 30,
    question:
      "How would you balance transparency (e.g. 'Generated by AI') with a smooth product experience?",
    hint: "Consider where labels help trust vs. add friction, and regulatory expectations.",
  },
];
