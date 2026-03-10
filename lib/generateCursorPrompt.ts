export type PrototypePromptInput = {
  name: string;
  problem: string;
  description: string;
  coreConcepts: string;
};

export function generateCursorPrompt(prototype: PrototypePromptInput): string {
  const { name, problem, description, coreConcepts } = prototype;

  return `# Build: ${name}

## 1. Project Overview

Build a working AI prototype quickly with clean code.

**Goal:** ${description}

This prototype should demonstrate the core AI concepts below and deliver a minimal but complete user experience.

---

## 2. User Problem

${problem}

---

## 3. Feature Requirements

- **Input interface:** Clear way for the user to provide input (text, file, or form).
- **AI processing logic:** Call the AI/LLM with appropriate prompting and handle the response.
- **Result display:** Show the AI output in a readable, well-formatted way.
- **Basic error handling:** Handle API failures, timeouts, and invalid input with clear feedback.
- **Loading states:** Indicate when a request is in progress.

---

## 4. Suggested Architecture

### Project Structure

\`\`\`
/src
  /app          # Next.js App Router pages and layouts
  /components   # Reusable UI components
  /lib          # Utilities, API client, shared logic
  /api          # API routes (if needed for server-side calls)
\`\`\`

- Keep pages thin; put business logic in \`/lib\` or API routes.
- Use \`/components\` for reusable UI (inputs, results, loading, errors).

### AI Integration

- Use the **OpenAI API** for LLM calls.
- Store the API key in an environment variable: \`OPENAI_API_KEY\`.
- Do not commit \`.env\` or expose the key in client code; call OpenAI from the server (e.g. Next.js API route or server action).
- Use structured prompts (system + user) and handle streaming if it improves perceived performance.

---

## 5. Tech Stack

- **Framework:** Next.js (App Router).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **AI:** OpenAI API (environment variable \`OPENAI_API_KEY\`).
- **Other:** Minimal dependencies; add only what is necessary.

---

## 6. Step-by-Step Build Plan

1. **Scaffold:** Create the app structure (page, layout, env example for \`OPENAI_API_KEY\`).
2. **Input:** Implement the input interface (form or upload) and validate input.
3. **API / server logic:** Add a server-side function or API route that calls OpenAI with a clear prompt.
4. **Integration:** Connect the UI to the API; show loading state while the request runs.
5. **Output:** Render the AI response in a clear layout (e.g. markdown or structured sections).
6. **Error handling:** Handle errors (network, API, validation) and show user-friendly messages.
7. **Polish:** Tidy styling, accessibility, and copy so the prototype feels complete.

---

## Core AI Concepts to Apply

${coreConcepts}

---

**Deliverable:** A working prototype that solves the user problem above, uses the listed concepts where relevant, and is built with clean, maintainable code.
`;
}
