import { concepts } from "../data/concepts";
import { interviewQuestions } from "../data/interviewQuestions";
import { prototypes } from "../data/prototypes";

export type ChallengeDay = {
  dayNumber: number;
  conceptTitle: string;
  conceptExplanation: string;
  interviewQuestion?: string;
  prototypeName?: string;
  prototypeDescription?: string;
};

export function generateChallenges(): ChallengeDay[] {
  const challengeDays: ChallengeDay[] = [];

  for (let dayNumber = 1; dayNumber <= 60; dayNumber++) {
    const concept = concepts[dayNumber - 1];
    if (!concept) {
      throw new Error(`Missing concept for day ${dayNumber}`);
    }

    const hasInterviewQuestion = dayNumber % 2 === 0;
    const interviewQuestionIndex = hasInterviewQuestion
      ? dayNumber / 2 - 1
      : -1;
    const interviewQuestion = hasInterviewQuestion
      ? interviewQuestions[interviewQuestionIndex]?.question
      : undefined;

    const hasPrototype = dayNumber % 3 === 0;
    const prototypeIndex = hasPrototype ? dayNumber / 3 - 1 : -1;
    const prototype = hasPrototype ? prototypes[prototypeIndex] : undefined;

    challengeDays.push({
      dayNumber,
      conceptTitle: concept.title,
      conceptExplanation: concept.explanation,
      ...(interviewQuestion && { interviewQuestion }),
      ...(prototype && {
        prototypeName: prototype.name,
        prototypeDescription: prototype.description,
      }),
    });
  }

  return challengeDays;
}

export const challengeDays = generateChallenges();
