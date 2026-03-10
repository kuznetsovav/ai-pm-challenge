export type Concept = {
  id: number;
  title: string;
  explanation: string;
  whyItMattersForPM: string;
  exampleUseCase: string;
  learnMoreUrls?: { label: string; url: string }[];
};

export const concepts: Concept[] = [
  {
    id: 1,
    title: "Large Language Models",
    explanation:
      "Large Language Models (LLMs) are neural networks trained on vast amounts of text to predict and generate language. They learn statistical patterns and relationships between words, enabling them to complete sentences, answer questions, and produce coherent paragraphs. Models like GPT-4 and Claude scale to billions of parameters, which allows them to handle diverse tasks without task-specific training. They form the foundation of most modern AI-powered products.",
    whyItMattersForPM:
      "PMs need to understand what LLMs can and cannot do natively so they can scope features and set realistic expectations. Knowing how they work helps you communicate with engineering and design fallbacks when the model is uncertain.",
    exampleUseCase: "ChatGPT uses an LLM to power its conversational interface for answering questions, writing, and coding assistance.",
    learnMoreUrls: [
      { label: "Wikipedia: Large language model", url: "https://en.wikipedia.org/wiki/Large_language_model" },
      { label: "OpenAI: Models overview", url: "https://platform.openai.com/docs/models" },
    ],
  },
  {
    id: 2,
    title: "Tokens",
    explanation:
      "Tokens are the basic units of text that LLMs process—roughly word fragments, words, or short phrases. A token might be a single character, a whole word, or part of a word depending on the language and tokenizer. Model limits and pricing are usually expressed in tokens (input and output), not raw characters. Tokenization is deterministic for a given model but varies across models and languages.",
    whyItMattersForPM:
      "Token limits directly affect how much context you can send and how long responses can be, which shapes feature design. Cost and latency scale with tokens, so PMs must consider token budgeting when prioritizing features and setting limits.",
    exampleUseCase: "Notion AI counts tokens to enforce context limits and show users how much of their doc is being sent to the model.",
    learnMoreUrls: [
      { label: "OpenAI: Tokenizer tool", url: "https://platform.openai.com/tokenizer" },
      { label: "OpenAI: What are tokens?", url: "https://platform.openai.com/docs/guides/tokens" },
    ],
  },
  {
    id: 3,
    title: "Context Window",
    explanation:
      "The context window is the maximum number of tokens (input plus output) an LLM can process in a single request. Everything inside the window—user message, system prompt, conversation history, or retrieved documents—is used by the model to generate a response. Larger windows allow longer conversations and more grounding material but increase cost and latency. Window sizes vary by model from a few thousand to over a million tokens.",
    whyItMattersForPM:
      "Context size constrains how much history, docs, or instructions you can include, which affects UX and architecture. PMs must design flows that fit the chosen model’s window and decide what to include or summarize when limits are reached.",
    exampleUseCase: "Claude’s 200K-token context lets users paste long documents and ask questions in one turn, as in legal or research tools.",
    learnMoreUrls: [
      { label: "Anthropic: Context window", url: "https://docs.anthropic.com/en/docs/build-with-claude/context-window" },
      { label: "OpenAI: Context window", url: "https://platform.openai.com/docs/guides/context-window" },
    ],
  },
  {
    id: 4,
    title: "Temperature",
    explanation:
      "Temperature is a sampling parameter that controls randomness in LLM output. Low temperature (e.g. 0) makes outputs more deterministic and repetitive; high temperature (e.g. 1 or above) increases variety and creativity but also the chance of off-topic or incoherent text. It does not change the model’s knowledge, only how it chooses the next token. Most product use cases use low to medium temperature for consistency.",
    whyItMattersForPM:
      "Choosing the right temperature affects whether outputs feel reliable or creative, which impacts user trust and task success. PMs should align this setting with the use case and work with eng to tune and optionally expose it where appropriate.",
    exampleUseCase: "GitHub Copilot uses relatively low temperature for code completion so suggestions stay predictable and on-task.",
    learnMoreUrls: [
      { label: "OpenAI: Temperature and top_p", url: "https://platform.openai.com/docs/guides/completions#temperature" },
    ],
  },
  {
    id: 5,
    title: "Top-p Sampling",
    explanation:
      "Top-p (nucleus) sampling limits the model’s next-token choices to the smallest set of tokens whose cumulative probability exceeds a threshold p (e.g. 0.9). This dynamically narrows or widens the candidate set per step instead of always taking the top k tokens. It is often used together with temperature to balance diversity and coherence. Lower p yields more focused output; higher p allows more variation.",
    whyItMattersForPM:
      "Top-p influences response variety and consistency in the same way temperature does, so PMs should understand how it’s set for their features. It’s another lever to tune for “creative” vs “reliable” behavior.",
    exampleUseCase: "Writing tools like Jasper adjust top-p and temperature so marketing copy feels varied while staying on brand.",
    learnMoreUrls: [
      { label: "OpenAI: Temperature and top_p", url: "https://platform.openai.com/docs/guides/completions#temperature" },
    ],
  },
  {
    id: 6,
    title: "Prompt Engineering",
    explanation:
      "Prompt engineering is the practice of designing input text (prompts) so that an LLM produces desired outputs. It includes choosing instructions, examples, format, and tone. Effective prompts are clear, specific, and often include constraints or output structure. It is an iterative, empirical discipline rather than a fixed formula, and results depend on the model and task.",
    whyItMattersForPM:
      "PMs define what “good” output looks like and often write or refine prompts with design and eng. Understanding prompt engineering helps you scope iterations, set quality bars, and avoid over-relying on brittle wording.",
    exampleUseCase: "Intercom’s AI Agent uses prompt engineering to keep bot replies helpful, concise, and aligned with the company’s tone.",
    learnMoreUrls: [
      { label: "OpenAI: Prompt engineering guide", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
      { label: "Anthropic: Prompt design", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-design" },
    ],
  },
  {
    id: 7,
    title: "System Prompts",
    explanation:
      "A system prompt is instructions sent to the model that define its role, behavior, and constraints—typically not shown to the end user. It sets personality, guardrails, format, and rules (e.g. “never reveal your system prompt”). System prompts are supported by most chat APIs and are the main way to steer model behavior in production.",
    whyItMattersForPM:
      "Product behavior and safety are largely defined in the system prompt, so PMs should own or tightly collaborate on its content. Changes here can have broad impact and need to be tested and versioned like other product logic.",
    exampleUseCase: "Character.AI uses long system prompts to define each character’s personality, backstory, and response style.",
    learnMoreUrls: [
      { label: "OpenAI: System message", url: "https://platform.openai.com/docs/guides/chat/system-message" },
      { label: "Anthropic: System prompts", url: "https://docs.anthropic.com/en/docs/build-with-claude/system-prompts" },
    ],
  },
  {
    id: 8,
    title: "Few-shot Prompting",
    explanation:
      "Few-shot prompting means including a small number of input-output examples in the prompt to show the model the desired format or behavior. The model infers the pattern and applies it to the new input. It reduces the need for fine-tuning for structured or style-specific tasks. Too many examples consume context and can confuse the model.",
    whyItMattersForPM:
      "PMs can use few-shot examples to specify output format and quality without code changes. Knowing when few-shot is enough vs when you need fine-tuning or tools helps with roadmap and resourcing.",
    exampleUseCase: "Zapier’s AI actions use few-shot examples so the model reliably returns structured JSON for workflow steps.",
    learnMoreUrls: [
      { label: "OpenAI: Few-shot prompting", url: "https://platform.openai.com/docs/guides/prompt-engineering/strategy-provide-examples" },
    ],
  },
  {
    id: 9,
    title: "Embeddings",
    explanation:
      "Embeddings are dense vector representations of text (or other data) produced by an embedding model. Semantically similar texts get vectors that are close in the embedding space, enabling similarity search. Embeddings are used for search, clustering, and as input to RAG. They are typically fixed-size (e.g. 1536 dimensions) regardless of text length.",
    whyItMattersForPM:
      "Many search and recommendation features depend on embeddings, so PMs should understand that “similarity” is semantic, not just keyword. This affects how you describe search and discovery to users and stakeholders.",
    exampleUseCase: "Notion search uses embeddings to find relevant blocks and pages by meaning, not only by exact words.",
    learnMoreUrls: [
      { label: "OpenAI: Embeddings guide", url: "https://platform.openai.com/docs/guides/embeddings" },
    ],
  },
  {
    id: 10,
    title: "Vector Similarity",
    explanation:
      "Vector similarity is a measure of how close two embedding vectors are, often computed with cosine similarity or dot product. High similarity means the corresponding texts are semantically related. It is the basis for semantic search and retrieval: you embed a query, compare it to stored embeddings, and return the nearest items.",
    whyItMattersForPM:
      "PMs need to know that “relevance” in AI search is defined by vector similarity, which can differ from keyword or behavioral relevance. This affects ranking design and how you explain results to users.",
    exampleUseCase: "Spotify uses vector similarity in recommendation to find songs and playlists that are “close” to what you like.",
    learnMoreUrls: [
      { label: "Pinecone: Vector similarity", url: "https://docs.pinecone.io/guides/vector-similarity/intro" },
    ],
  },
  {
    id: 11,
    title: "Vector Databases",
    explanation:
      "Vector databases store embeddings and support fast nearest-neighbor search over millions of vectors. They index high-dimensional vectors so queries return the most similar items by similarity score. Examples include Pinecone, Weaviate, and pgvector. They are essential for RAG, recommendations, and semantic search at scale.",
    whyItMattersForPM:
      "Choosing and scaling a vector store affects cost, latency, and what retrieval features you can ship. PMs should understand tradeoffs (e.g. managed vs self-hosted, filters, freshness) when planning search and RAG.",
    exampleUseCase: "Pinecone is used by many companies to power RAG over internal docs and knowledge bases.",
    learnMoreUrls: [
      { label: "Pinecone docs", url: "https://docs.pinecone.io" },
      { label: "pgvector", url: "https://github.com/pgvector/pgvector" },
    ],
  },
  {
    id: 12,
    title: "Semantic Search",
    explanation:
      "Semantic search finds content by meaning rather than exact keyword match. A query is embedded and compared to embeddings of documents; the closest matches are returned. It handles synonyms, paraphrasing, and conceptual queries that keyword search misses. It is often combined with keyword search in hybrid systems.",
    whyItMattersForPM:
      "PMs can promise “find by meaning” and better discovery, but must set expectations for when semantic search helps vs when filters or keywords are needed. UX and metrics (e.g. relevance, CTR) should reflect this.",
    exampleUseCase: "Slack’s AI search uses semantic search so users can ask questions in natural language and find relevant messages.",
    learnMoreUrls: [
      { label: "Pinecone: Semantic search", url: "https://docs.pinecone.io/guides/semantic-search/intro" },
    ],
  },
  {
    id: 13,
    title: "Chunking",
    explanation:
      "Chunking is the process of splitting long documents into smaller segments (chunks) before embedding and storing for retrieval. Chunk size and strategy (by paragraph, sentence, fixed tokens, or overlap) affect retrieval quality and cost. Too small chunks lose context; too large dilute relevance. Chunking is a key lever in RAG quality.",
    whyItMattersForPM:
      "Chunking strategy influences how well RAG answers match user intent and how much context is sent to the LLM. PMs should be aware of tradeoffs and support experimentation with chunk size and overlap.",
    exampleUseCase: "Many doc-based RAG products chunk help articles so the model can retrieve and cite the right section.",
    learnMoreUrls: [
      { label: "LangChain: Text splitters", url: "https://js.langchain.com/docs/modules/data_connection/document_transformers/" },
    ],
  },
  {
    id: 14,
    title: "Metadata Filtering",
    explanation:
      "Metadata filtering applies filters (e.g. date, author, category) to retrieval in addition to vector similarity. Stored documents have metadata; the query can specify filters so only matching items are considered or ranked. It reduces noise and keeps retrieval aligned with product structure (e.g. “only from this project”).",
    whyItMattersForPM:
      "Scoping retrieval by metadata is often a product requirement (e.g. “search only my team’s docs”). PMs should define which metadata exists and how users can filter, and work with eng on schema and UX.",
    exampleUseCase: "Confluence’s AI search can restrict results by space, so users only see answers from spaces they care about.",
    learnMoreUrls: [
      { label: "Pinecone: Metadata filtering", url: "https://docs.pinecone.io/guides/vector-similarity/metadata-filtering" },
    ],
  },
  {
    id: 15,
    title: "Retrieval Augmented Generation",
    explanation:
      "Retrieval Augmented Generation (RAG) fetches relevant documents (or chunks) from a store using the user’s query, then passes them to an LLM as context so the model can answer using that information. It reduces hallucination and keeps answers up to date without retraining. Quality depends on retrieval, chunking, and prompt design.",
    whyItMattersForPM:
      "RAG is the default pattern for “AI over our data,” so PMs must understand retrieval quality, latency, and cost. Defining what “our data” is and how it’s updated is a product decision.",
    exampleUseCase: "Perplexity uses RAG over the web and citations so answers are grounded in retrieved sources.",
    learnMoreUrls: [
      { label: "Anthropic: RAG", url: "https://docs.anthropic.com/en/docs/build-with-claude/rag" },
      { label: "LangChain: RAG", url: "https://js.langchain.com/docs/use_cases/question_answering/" },
    ],
  },
  {
    id: 16,
    title: "Retrieval Pipelines",
    explanation:
      "A retrieval pipeline is the end-to-end flow from query to ranked results: query rewriting, embedding, vector search, optional reranking, and metadata filtering. Pipelines can include multiple retrievers (e.g. vector + keyword) and fusion steps. Tuning each stage improves relevance and user satisfaction.",
    whyItMattersForPM:
      "PMs define the goal of retrieval (e.g. “best answer for support”) and work with eng on pipeline design. Understanding stages helps you prioritize improvements and set metrics per stage.",
    exampleUseCase: "Enterprise search products like Elasticsearch with ML use pipelines that combine vector search, keyword, and reranking.",
    learnMoreUrls: [
      { label: "LangChain: Retrievers", url: "https://js.langchain.com/docs/modules/data_connection/retrievers/" },
    ],
  },
  {
    id: 17,
    title: "Hybrid Search",
    explanation:
      "Hybrid search combines semantic (vector) search with keyword or lexical search (e.g. BM25). Results from both paths are merged, often with weighted scoring or reciprocal rank fusion. It improves recall when users use exact terms or when the embedding model misses a specific phrase.",
    whyItMattersForPM:
      "Hybrid search often yields better UX than pure semantic or pure keyword. PMs should know when to recommend it and how to explain “search by meaning and keywords” to users.",
    exampleUseCase: "Amazon search uses hybrid approaches so product names and exact terms work alongside conceptual queries.",
    learnMoreUrls: [
      { label: "Pinecone: Hybrid search", url: "https://docs.pinecone.io/guides/hybrid-search/intro" },
    ],
  },
  {
    id: 18,
    title: "Grounding",
    explanation:
      "Grounding means tying model outputs to verifiable sources (documents, links, or data) so answers are traceable and less likely to be invented. In RAG, grounding is achieved by retrieving and citing chunks. Some APIs support grounding against a specified corpus or the web and return citations.",
    whyItMattersForPM:
      "Grounding is central to trust and compliance in many products. PMs should specify when answers must be grounded, how citations are shown, and what to do when no source supports an answer.",
    exampleUseCase: "Google Search’s AI Overviews are grounded in web results and show source links for key claims.",
    learnMoreUrls: [
      { label: "Google: Grounding with Search", url: "https://ai.google.dev/gemini-api/docs/grounding" },
    ],
  },
  {
    id: 19,
    title: "Source Attribution",
    explanation:
      "Source attribution is showing users which documents or links support specific parts of an AI-generated answer. It can be inline citations, footnotes, or expandable references. It increases trust and lets users verify or dig deeper. Implementation depends on retrieval metadata and how the model is prompted to reference sources.",
    whyItMattersForPM:
      "Attribution is a product and design decision: what to show, where, and how. PMs own the UX and the policy (e.g. when to show “no source” or hide low-confidence citations).",
    exampleUseCase: "Microsoft Copilot shows source links next to answers so users can check where information came from.",
    learnMoreUrls: [
      { label: "Anthropic: Citations", url: "https://docs.anthropic.com/en/docs/build-with-claude/citations" },
    ],
  },
  {
    id: 20,
    title: "AI Agents",
    explanation:
      "AI agents are systems that use an LLM (or other model) to decide actions, call tools or APIs, and iterate toward a goal rather than answering in a single turn. They can browse, compute, or use product features. Agents add autonomy and multi-step capability but also complexity, latency, and failure modes.",
    whyItMattersForPM:
      "Agents enable richer workflows but require clear goals, tool design, and guardrails. PMs must define scope, success criteria, and what happens when the agent gets stuck or makes wrong moves.",
    exampleUseCase: "Devin and other coding agents use LLMs to plan, edit code, run commands, and fix errors in a loop.",
    learnMoreUrls: [
      { label: "OpenAI: Assistants API", url: "https://platform.openai.com/docs/assistants/overview" },
      { label: "Anthropic: Tool use", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
    ],
  },
  {
    id: 21,
    title: "Tool Calling",
    explanation:
      "Tool calling (or function calling) lets an LLM request the execution of a function—e.g. search, calculator, API—by outputting a structured call that the application runs and then returns to the model. The model uses the result to continue reasoning or responding. It is the main way to give LLMs access to external data and actions.",
    whyItMattersForPM:
      "PMs define which tools the product exposes and the contract (inputs, outputs, errors). Tool design affects what the agent can do and how often it misuses or overuses tools.",
    exampleUseCase: "ChatGPT Plugins and GPTs use tool calling so the assistant can search the web, run code, or query APIs.",
    learnMoreUrls: [
      { label: "OpenAI: Function calling", url: "https://platform.openai.com/docs/guides/function-calling" },
    ],
  },
  {
    id: 22,
    title: "Function Calling",
    explanation:
      "Function calling is the API pattern where the model returns a structured request to invoke a function (name and arguments) instead of plain text. The app executes the function and passes the result back in the conversation. It is the standard mechanism for connecting LLMs to tools, databases, and APIs in production.",
    whyItMattersForPM:
      "Understanding function calling helps PMs scope agent features: which functions exist, who defines them, and how errors and rate limits are handled. It’s core to “AI that can do things” in your product.",
    exampleUseCase: "Google’s Gemini API supports function calling so developers can add search, calendar, or custom tools to their apps.",
    learnMoreUrls: [
      { label: "OpenAI: Function calling", url: "https://platform.openai.com/docs/guides/function-calling" },
      { label: "Anthropic: Tool use", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
    ],
  },
  {
    id: 23,
    title: "Agent Planning",
    explanation:
      "Agent planning is the process by which an agent breaks a goal into steps, chooses tools, and decides the order of actions. It can be implicit (the model outputs step-by-step in one response) or explicit (a separate planner module). Good planning improves task completion; poor planning leads to loops or irrelevant actions.",
    whyItMattersForPM:
      "PMs should define what “done” looks like and what steps are in scope so planning can be evaluated and improved. Planning quality is a key metric for agent products.",
    exampleUseCase: "Travel-planning agents plan by searching flights, then hotels, then suggesting an itinerary in a logical order.",
    learnMoreUrls: [
      { label: "LangChain: Agents", url: "https://js.langchain.com/docs/modules/agents/" },
    ],
  },
  {
    id: 24,
    title: "Multi-Agent Systems",
    explanation:
      "Multi-agent systems use more than one agent, often with different roles (e.g. researcher, writer, critic) that collaborate or hand off to each other. They can improve quality and specialization but add orchestration, cost, and latency. Coordination can be sequential, parallel, or negotiated.",
    whyItMattersForPM:
      "PMs decide whether multiple agents are needed and how they interact. This affects architecture, UX (e.g. “who is talking”), and success metrics per agent.",
    exampleUseCase: "AutoGen and similar frameworks let you build systems where one agent gathers info and another synthesizes a report.",
    learnMoreUrls: [
      { label: "AutoGen", url: "https://microsoft.github.io/autogen/" },
    ],
  },
  {
    id: 25,
    title: "Hallucinations",
    explanation:
      "Hallucinations are confident but incorrect or fabricated outputs from an LLM—wrong facts, fake citations, or plausible-sounding nonsense. They arise from the model’s generative nature and training. Mitigations include RAG, lower temperature, verification steps, and clear UI when the model is uncertain.",
    whyItMattersForPM:
      "PMs must design for hallucination risk: when to show disclaimers, when to require grounding, and how to handle user reports. Trust and safety depend on how you communicate and constrain outputs.",
    exampleUseCase: "Legal and medical products often add extra checks and citations because hallucination in those domains is high-stakes.",
    learnMoreUrls: [
      { label: "Wikipedia: Hallucination (AI)", url: "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)" },
    ],
  },
  {
    id: 26,
    title: "Prompt Injection",
    explanation:
      "Prompt injection is when a user (or other input) supplies text that manipulates the model’s behavior—e.g. “ignore previous instructions” or “output private data.” It can leak system prompts, override guardrails, or cause unwanted actions if the model follows the injected instructions. Defenses include isolation, input sanitization, and least-privilege system prompts.",
    whyItMattersForPM:
      "PMs need to treat prompt injection as a security and safety risk. Product design (what user input can do, what’s in context) and policies should limit the impact of malicious or accidental injection.",
    exampleUseCase: "Customer-facing chatbots are hardened so users cannot extract system prompts or make the bot say inappropriate things.",
    learnMoreUrls: [
      { label: "OWASP: Prompt injection", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
    ],
  },
  {
    id: 27,
    title: "Model Bias",
    explanation:
      "Model bias is unfair or skewed behavior toward certain groups, topics, or viewpoints due to training data and modeling choices. It can show up in recommendations, classifications, or generated text. Mitigation includes diverse data, evaluation across segments, and product-level safeguards.",
    whyItMattersForPM:
      "PMs own fairness and inclusion goals and must prioritize evaluation and feedback by segment. Understanding bias helps you set acceptance criteria and communicate limitations to stakeholders.",
    exampleUseCase: "Hiring and lending tools evaluate and mitigate bias so outputs don’t discriminate by protected attributes.",
    learnMoreUrls: [
      { label: "Google: Responsible AI - Fairness", url: "https://ai.google.dev/responsible/fairness" },
    ],
  },
  {
    id: 28,
    title: "Guardrails",
    explanation:
      "Guardrails are rules or systems that constrain model inputs and outputs—e.g. block harmful content, enforce format, or restrict topics. They can be rule-based, model-based, or hybrid. They sit around the LLM to keep behavior within product and safety requirements.",
    whyItMattersForPM:
      "PMs define what’s in and out of bounds and work with eng and policy on guardrail design. They are part of the product contract and should be tested and versioned.",
    exampleUseCase: "Customer service bots use guardrails to refuse to discuss competitors or share internal policy details.",
    learnMoreUrls: [
      { label: "Guardrails AI", url: "https://www.guardrailsai.com/" },
    ],
  },
  {
    id: 29,
    title: "Safety Filters",
    explanation:
      "Safety filters are automated checks that block or flag harmful, unsafe, or policy-violating content in inputs or outputs. They may use classifiers, keyword lists, or dedicated safety models. They are a key part of responsible deployment and are often required by platform or compliance.",
    whyItMattersForPM:
      "PMs align filter strictness with product risk and user expectations. Too strict can frustrate users; too loose can create safety incidents. Tuning and transparency are product decisions.",
    exampleUseCase: "OpenAI and other API providers apply safety filters before returning model responses to applications.",
    learnMoreUrls: [
      { label: "OpenAI: Moderation API", url: "https://platform.openai.com/docs/guides/moderation" },
    ],
  },
  {
    id: 30,
    title: "AI Evaluation",
    explanation:
      "AI evaluation is the practice of measuring model or system quality—accuracy, relevance, safety, fairness—using automated metrics, human ratings, or both. It includes designing eval sets, defining criteria, and tracking over time. Robust evaluation is necessary to ship and iterate on AI features confidently.",
    whyItMattersForPM:
      "PMs define what “good” means and which metrics matter for the product. They prioritize eval efforts and use results to decide launches and improvements.",
    exampleUseCase: "Companies run regular evals on support bots to ensure answer quality and safety before and after model updates.",
    learnMoreUrls: [
      { label: "Anthropic: Evaluation", url: "https://docs.anthropic.com/en/docs/build-with-claude/evaluation" },
    ],
  },
  {
    id: 31,
    title: "Human Evaluation",
    explanation:
      "Human evaluation uses people to judge model outputs (e.g. relevance, helpfulness, harm) when automated metrics are insufficient. It can be done in-house or via labeling platforms. It is slower and more expensive but often necessary for nuanced quality and safety.",
    whyItMattersForPM:
      "PMs decide when to use human eval, what to measure, and how to act on results. They also own guidelines and rater quality so scores are consistent and actionable.",
    exampleUseCase: "Search engines use human raters to evaluate result quality and train or tune ranking and AI features.",
    learnMoreUrls: [
      { label: "Google: Human evaluation", url: "https://ai.google.dev/responsible/human-feedback" },
    ],
  },
  {
    id: 32,
    title: "Benchmarking",
    explanation:
      "Benchmarking is comparing models or systems on standardized tasks and datasets (e.g. MMLU, HumanEval, custom product benchmarks). It helps choose models and track progress. Benchmarks can be misleading if they don’t match real use cases, so product-specific benchmarks are often needed.",
    whyItMattersForPM:
      "PMs should know which benchmarks matter for their domain and when to invest in custom benchmarks. They use results to inform model choice and roadmap.",
    exampleUseCase: "Code assistants are often compared on HumanEval and similar coding benchmarks before selection.",
    learnMoreUrls: [
      { label: "OpenAI: Evals", url: "https://platform.openai.com/docs/guides/evals" },
    ],
  },
  {
    id: 33,
    title: "LLM Evaluation Frameworks",
    explanation:
      "LLM evaluation frameworks are tools and methodologies for assessing LLM outputs—e.g. LLM-as-judge, rubric-based scoring, or regression suites. They help automate quality checks and compare versions. Frameworks vary in cost, reliability, and alignment with product goals.",
    whyItMattersForPM:
      "PMs choose or define evaluation frameworks so the team can measure quality consistently and ship with confidence. They balance automation with human review where needed.",
    exampleUseCase: "Teams use frameworks like Giskard or custom LLM-as-judge pipelines to score summarization or Q&A quality.",
    learnMoreUrls: [
      { label: "Giskard", url: "https://giskard.ai/" },
    ],
  },
  {
    id: 34,
    title: "Latency",
    explanation:
      "Latency is the time from user input to usable output. For LLMs it includes network, queueing, and generation time. Streaming reduces perceived latency by showing tokens as they’re produced. Latency affects UX and conversion; it is traded off against cost and quality (e.g. model size, context length).",
    whyItMattersForPM:
      "PMs set latency expectations and prioritize optimizations (caching, smaller models, streaming). They decide when “fast enough” is and how to communicate wait states to users.",
    exampleUseCase: "Real-time translation and captioning products optimize for low latency so output stays in sync with speech.",
    learnMoreUrls: [
      { label: "OpenAI: Streaming", url: "https://platform.openai.com/docs/guides/streaming" },
    ],
  },
  {
    id: 35,
    title: "Cost Optimization",
    explanation:
      "Cost optimization for LLM products involves reducing spend on API calls, tokens, embedding, and infrastructure. Levers include model choice, prompt size, caching, batching, and usage limits. It is a continuous tradeoff with quality and latency.",
    whyItMattersForPM:
      "PMs balance feature set and quality with unit economics. They define usage limits, tiers, and which features use which models to keep costs sustainable.",
    exampleUseCase: "Products use smaller or cached models for simple tasks and reserve larger models for complex ones to control cost.",
    learnMoreUrls: [
      { label: "OpenAI: Caching", url: "https://platform.openai.com/docs/guides/caching" },
    ],
  },
  {
    id: 36,
    title: "Token Budgeting",
    explanation:
      "Token budgeting is allocating the context window (or a per-request limit) across system prompt, conversation history, retrieved docs, and output. It ensures the most important content fits and prevents overruns. It is a product and engineering concern as features and context grow.",
    whyItMattersForPM:
      "PMs decide what must be in context (e.g. last N turns, key docs) and what can be summarized or dropped. Budget choices affect what the model “sees” and thus answer quality.",
    exampleUseCase: "Support bots budget tokens so the latest messages and the most relevant KB articles fit within the window.",
    learnMoreUrls: [
      { label: "Anthropic: Context window", url: "https://docs.anthropic.com/en/docs/build-with-claude/context-window" },
    ],
  },
  {
    id: 37,
    title: "Streaming Responses",
    explanation:
      "Streaming returns generated tokens to the client as they are produced instead of waiting for the full response. It lowers perceived latency and allows progressive rendering (e.g. typing effect). Implementation uses server-sent events or WebSockets; the client must handle partial content and cleanup.",
    whyItMattersForPM:
      "PMs decide when streaming is required (e.g. chat) and how to handle errors or cancellation mid-stream. UX and loading states are part of the product spec.",
    exampleUseCase: "ChatGPT and Claude stream responses so users see the answer appear incrementally instead of waiting for the full reply.",
    learnMoreUrls: [
      { label: "OpenAI: Streaming", url: "https://platform.openai.com/docs/guides/streaming" },
    ],
  },
  {
    id: 38,
    title: "Fine-Tuning",
    explanation:
      "Fine-tuning continues training a base model on additional data (often task-specific) to improve performance on a narrow domain or style. It can reduce prompt length and improve consistency but requires data, compute, and ongoing maintenance. It is an option when prompting and RAG are insufficient.",
    whyItMattersForPM:
      "PMs decide when to invest in fine-tuning vs prompting or RAG based on quality gaps, data availability, and cost. They define success metrics and data requirements.",
    exampleUseCase: "Customer support teams fine-tune models on past tickets so responses match company tone and product knowledge.",
    learnMoreUrls: [
      { label: "OpenAI: Fine-tuning", url: "https://platform.openai.com/docs/guides/fine-tuning" },
    ],
  },
  {
    id: 39,
    title: "Instruction Tuning",
    explanation:
      "Instruction tuning trains a model on (instruction, response) pairs so it follows diverse instructions better. It is often done during base model development and improves zero-shot and few-shot behavior. Product teams may do additional instruction tuning on proprietary tasks.",
    whyItMattersForPM:
      "PMs should know that instruction-tuned models are better at following prompts; this affects how you design prompts and when you might need further tuning.",
    exampleUseCase: "Models like Llama and Mistral are instruction-tuned so they respond well to user requests out of the box.",
    learnMoreUrls: [
      { label: "Wikipedia: Instruction tuning", url: "https://en.wikipedia.org/wiki/Instruction_tuning" },
    ],
  },
  {
    id: 40,
    title: "Synthetic Data",
    explanation:
      "Synthetic data is machine-generated data used for training, evaluation, or testing—e.g. LLM-generated examples, paraphrases, or counterfactuals. It can scale datasets and cover edge cases but may inherit model biases or artifacts. Quality and diversity need to be validated.",
    whyItMattersForPM:
      "PMs may rely on synthetic data for evals or training when real data is scarce. They should understand limitations and support human review or hybrid approaches where quality is critical.",
    exampleUseCase: "Teams use synthetic conversations to augment training data for dialogue or support models.",
    learnMoreUrls: [
      { label: "Anthropic: Synthetic data", url: "https://www.anthropic.com/research/synthetic-data" },
    ],
  },
  {
    id: 41,
    title: "Knowledge Bases",
    explanation:
      "A knowledge base (KB) is a structured or semi-structured store of facts, docs, or Q&A used to ground AI (e.g. for RAG). It can be built from internal docs, FAQs, or curated content. Keeping the KB updated and consistent is essential for answer quality.",
    whyItMattersForPM:
      "PMs define what goes into the KB, who owns it, and how it’s updated. They also decide how the product exposes “knowledge” to users (e.g. search, Q&A, suggestions).",
    exampleUseCase: "Zendesk and other support tools use KBs so AI can answer from help articles and internal playbooks.",
    learnMoreUrls: [
      { label: "Zendesk: AI knowledge base", url: "https://www.zendesk.com/product/ai/knowledge-base/" },
    ],
  },
  {
    id: 42,
    title: "Conversational UX",
    explanation:
      "Conversational UX is the design of interfaces where users interact via natural language (chat or voice). It includes turn-taking, context handling, error recovery, and when to suggest or constrain options. Good conversational UX makes the AI feel responsive and predictable.",
    whyItMattersForPM:
      "PMs own the flow: what the bot can do, how it handles confusion, and how it hands off to humans. Conversational UX is a core product differentiator for AI features.",
    exampleUseCase: "Banking chatbots are designed so users can ask in plain language and get clear next steps or escalation.",
    learnMoreUrls: [
      { label: "Nielsen: Conversational UX", url: "https://www.nngroup.com/articles/conversational-interfaces/" },
    ],
  },
  {
    id: 43,
    title: "AI Transparency",
    explanation:
      "AI transparency means making it clear to users when and how AI is involved—e.g. “Generated by AI,” model or source disclosure, or explanation of how a decision was made. It supports trust and informed consent and is often required by policy or regulation.",
    whyItMattersForPM:
      "PMs define what to disclose and where (in-product, terms, help). Transparency is a product and policy decision that affects trust and compliance.",
    exampleUseCase: "LinkedIn labels AI-generated content so members know when they’re seeing suggested text or insights.",
    learnMoreUrls: [
      { label: "EU AI Act: Transparency", url: "https://artificialintelligenceact.eu/" },
    ],
  },
  {
    id: 44,
    title: "User Trust in AI",
    explanation:
      "User trust in AI is the willingness to rely on AI outputs for decisions or actions. It is built through accuracy, consistency, transparency, and control (e.g. undo, override). Trust can be measured via surveys, retention, and usage of AI features.",
    whyItMattersForPM:
      "PMs design for trust: when to show confidence, when to suggest verification, and how to recover from errors. Trust metrics should inform roadmap and communication.",
    exampleUseCase: "Medical or financial products often add “verify with a professional” and clear disclaimers to build appropriate trust.",
    learnMoreUrls: [
      { label: "Google: Responsible AI - Trust", url: "https://ai.google.dev/responsible/trust" },
    ],
  },
  {
    id: 45,
    title: "Failure Handling",
    explanation:
      "Failure handling is how the product behaves when the model errors, times out, returns low confidence, or is misused. It includes fallbacks (e.g. keyword search), retries, clear error messages, and escalation paths. Good failure handling keeps the product usable when AI fails.",
    whyItMattersForPM:
      "PMs define fallbacks and error UX so users aren’t left stuck. They prioritize which failures to handle first based on frequency and impact.",
    exampleUseCase: "When RAG finds no good match, support bots fall back to “I couldn’t find that—here are related articles” or human handoff.",
    learnMoreUrls: [
      { label: "Anthropic: Error handling", url: "https://docs.anthropic.com/en/api/errors" },
    ],
  },
  {
    id: 46,
    title: "AI Monitoring",
    explanation:
      "AI monitoring tracks model and system behavior in production—latency, errors, usage, quality metrics, and safety signals. It enables detection of regressions, abuse, and drift. Monitoring is essential for reliable and responsible deployment.",
    whyItMattersForPM:
      "PMs define what to monitor and which alerts or dashboards are needed. They use monitoring to decide when to roll back or prioritize fixes.",
    exampleUseCase: "Teams monitor prompt-level metrics (e.g. refusals, off-topic rate) to catch model or prompt regressions quickly.",
    learnMoreUrls: [
      { label: "LangSmith", url: "https://smith.langchain.com/" },
    ],
  },
  {
    id: 47,
    title: "Feedback Loops",
    explanation:
      "Feedback loops collect user or rater feedback on AI outputs (thumbs up/down, edits, reports) and use it to improve prompts, models, or retrieval. Closing the loop is critical for continuous improvement and aligning the system with user expectations.",
    whyItMattersForPM:
      "PMs design where and how to collect feedback and how it drives product and model improvements. They own the loop from feedback to action.",
    exampleUseCase: "ChatGPT’s thumbs up/down and “regenerate” feed into model and product improvements.",
    learnMoreUrls: [
      { label: "OpenAI: Feedback", url: "https://platform.openai.com/docs/guides/feedback" },
    ],
  },
  {
    id: 48,
    title: "Model Versioning",
    explanation:
      "Model versioning is tracking which model (and which version) is used for each request or feature. It enables A/B tests, rollbacks, and auditing. Versioning can apply to base models, fine-tunes, and prompts.",
    whyItMattersForPM:
      "PMs need versioning to ship experiments and roll back safely. They define what’s versioned (model, prompt, config) and how it’s exposed in tooling.",
    exampleUseCase: "Teams run A/B tests between model versions and use version tags to analyze quality and cost by variant.",
    learnMoreUrls: [
      { label: "OpenAI: Model versions", url: "https://platform.openai.com/docs/models" },
    ],
  },
  {
    id: 49,
    title: "Guardrail Architecture",
    explanation:
      "Guardrail architecture is how guardrails are placed in the pipeline—pre- or post-LLM, which layers (input check, output filter, policy engine), and how they scale. Good architecture keeps safety and format checks consistent and maintainable.",
    whyItMattersForPM:
      "PMs work with eng to place guardrails so they match product policy and don’t over-block. Architecture choices affect latency, cost, and flexibility.",
    exampleUseCase: "Enterprise chatbots use a layered guardrail architecture: input validation, output filters, and policy rules.",
    learnMoreUrls: [
      { label: "Guardrails AI", url: "https://www.guardrailsai.com/docs" },
    ],
  },
  {
    id: 50,
    title: "Multimodal AI",
    explanation:
      "Multimodal AI models process and generate multiple modalities—e.g. text, images, audio, video—in a single system. They enable image understanding, voice interfaces, and document analysis. Multimodal capabilities are expanding what AI products can do in one flow.",
    whyItMattersForPM:
      "PMs can scope features that combine text, images, or voice (e.g. “describe this image,” “ask about this doc”). Understanding modality limits helps set expectations and prioritize.",
    exampleUseCase: "GPT-4 Vision and similar models power features that answer questions about screenshots, diagrams, or photos.",
    learnMoreUrls: [
      { label: "OpenAI: Vision", url: "https://platform.openai.com/docs/guides/vision" },
    ],
  },
  {
    id: 51,
    title: "Diffusion Models",
    explanation:
      "Diffusion models generate images (or other data) by iteratively denoising from noise. They power many image-generation products and can be conditioned on text, style, or other inputs. They differ from LLMs in architecture and use case but are central to visual AI.",
    whyItMattersForPM:
      "PMs working on image or media features should understand diffusion for generation and editing. They inform scope, quality expectations, and safety (e.g. content filters).",
    exampleUseCase: "DALL·E, Midjourney, and Stable Diffusion use diffusion models for text-to-image generation.",
    learnMoreUrls: [
      { label: "Wikipedia: Diffusion model", url: "https://en.wikipedia.org/wiki/Diffusion_model" },
    ],
  },
  {
    id: 52,
    title: "Speech Models",
    explanation:
      "Speech models handle recognition (speech-to-text), synthesis (text-to-speech), or end-to-end dialogue. They enable voice interfaces, transcription, and accessibility. Quality depends on accents, noise, and latency.",
    whyItMattersForPM:
      "PMs define when voice is in scope and how it integrates with text and other modalities. They set expectations for accuracy and latency in real-world conditions.",
    exampleUseCase: "Otter.ai and similar tools use speech models for meeting transcription and summary.",
    learnMoreUrls: [
      { label: "OpenAI: Speech to text", url: "https://platform.openai.com/docs/guides/speech-to-text" },
    ],
  },
  {
    id: 53,
    title: "Real-Time AI",
    explanation:
      "Real-time AI delivers results with minimal delay so the experience feels immediate—e.g. live captioning, real-time translation, or streaming chat. It requires low-latency models and infrastructure and often tradeoffs with cost or quality.",
    whyItMattersForPM:
      "PMs decide when real-time is required and what “fast enough” means. They prioritize latency and set UX for buffering or partial results.",
    exampleUseCase: "Google Live Translate and real-time captioning use low-latency models so output tracks speech closely.",
    learnMoreUrls: [
      { label: "Google: Live Translate", url: "https://support.google.com/pixelphone/answer/2819522" },
    ],
  },
  {
    id: 54,
    title: "Model Context Protocol",
    explanation:
      "Model Context Protocol (MCP) is an open protocol for connecting AI applications to data sources and tools in a standardized way. It lets models access servers that expose context (e.g. docs, databases) and tools, improving interoperability.",
    whyItMattersForPM:
      "PMs may leverage MCP to integrate with existing data sources and tools without custom connectors. Understanding MCP helps with architecture and partner integrations.",
    exampleUseCase: "IDEs and AI coding tools use MCP to connect to repos, docs, and APIs for context-aware assistance.",
    learnMoreUrls: [
      { label: "Model Context Protocol", url: "https://modelcontextprotocol.io/" },
    ],
  },
  {
    id: 55,
    title: "Autonomous Agents",
    explanation:
      "Autonomous agents are AI systems that pursue goals with minimal human intervention—making decisions, using tools, and adapting over multiple steps. They sit at the high end of agency and require strong guardrails and monitoring.",
    whyItMattersForPM:
      "PMs defining autonomous features must specify goals, boundaries, and human oversight. They own the balance between autonomy and control.",
    exampleUseCase: "Research and data-analysis agents that run experiments or generate reports with limited human input are examples of autonomous agents.",
    learnMoreUrls: [
      { label: "Anthropic: Tool use", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
    ],
  },
  {
    id: 56,
    title: "AI Copilots",
    explanation:
      "AI copilots are assistant-style AI that work alongside users in a task—suggesting, drafting, or completing parts of the work while the user stays in control. They are embedded in productivity tools, IDEs, and workflows.",
    whyItMattersForPM:
      "PMs design copilot interactions: when to suggest, when to act, and how to keep the user in the loop. Copilot UX is a key product differentiator.",
    exampleUseCase: "GitHub Copilot, Microsoft Copilot, and Notion AI act as in-context assistants that suggest or draft content.",
    learnMoreUrls: [
      { label: "GitHub Copilot", url: "https://github.com/features/copilot" },
    ],
  },
  {
    id: 57,
    title: "AI Workflows",
    explanation:
      "AI workflows are multi-step processes that combine AI (e.g. LLM, classification) with other steps—approvals, APIs, human review—in a defined sequence. They automate complex tasks while keeping humans where needed.",
    whyItMattersForPM:
      "PMs design workflows: which steps are automated, where humans intervene, and how errors are handled. Workflow design is core to scaling AI in operations.",
    exampleUseCase: "Content moderation workflows use AI for first-pass classification and humans for edge cases and appeals.",
    learnMoreUrls: [
      { label: "LangChain: Workflows", url: "https://js.langchain.com/docs/expression_language/" },
    ],
  },
  {
    id: 58,
    title: "AI Feature Discovery",
    explanation:
      "AI feature discovery is helping users find and adopt AI capabilities in a product—through onboarding, prompts, suggestions, or contextual cues. It increases activation and value from AI features.",
    whyItMattersForPM:
      "PMs own discovery: how users learn what the AI can do and when to use it. Good discovery improves adoption and satisfaction with AI features.",
    exampleUseCase: "Slack and other products surface AI features in context (e.g. “Summarize this thread”) so users discover them when relevant.",
    learnMoreUrls: [
      { label: "Nielsen: AI UX", url: "https://www.nngroup.com/articles/ai-ux/" },
    ],
  },
  {
    id: 59,
    title: "AI Product Metrics",
    explanation:
      "AI product metrics measure the impact and health of AI features—usage, quality (e.g. thumbs up, task success), latency, cost, and safety. They inform prioritization, tuning, and business cases for AI investment.",
    whyItMattersForPM:
      "PMs define and track AI metrics and tie them to product and business goals. They use metrics to decide what to build next and how to improve.",
    exampleUseCase: "Teams track “assistant resolution rate” and “escalation rate” for support bots to measure effectiveness.",
    learnMoreUrls: [
      { label: "Amplitude: AI metrics", url: "https://amplitude.com/blog/ai-product-metrics" },
    ],
  },
  {
    id: 60,
    title: "Build vs Buy AI",
    explanation:
      "Build vs buy is the decision between building AI capabilities in-house (models, fine-tuning, pipelines) and using third-party APIs or platforms. It involves tradeoffs in cost, control, differentiation, and speed to market. Most products use a mix of both.",
    whyItMattersForPM:
      "PMs contribute to build vs buy by defining requirements, differentiation, and roadmap. They help weigh flexibility and cost against time to market and capability.",
    exampleUseCase: "Many products use hosted APIs for core LLM and build custom RAG and workflows on top, rather than training their own models.",
    learnMoreUrls: [
      { label: "a16z: AI build vs buy", url: "https://a16z.com/ai-build-vs-buy/" },
    ],
  }
];
