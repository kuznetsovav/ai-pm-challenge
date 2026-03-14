import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VISITOR_COOKIE = "challenge_visitor_id";

const PROGRESS_FIELDS = [
  "conceptCompleted",
  "interviewCompleted",
  "prototypeCompleted",
] as const;

type ProgressField = (typeof PROGRESS_FIELDS)[number];

function isProgressField(s: unknown): s is ProgressField {
  return typeof s === "string" && PROGRESS_FIELDS.includes(s as ProgressField);
}

export async function POST(request: NextRequest) {
  try {
    const visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
    if (!visitorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dayNumber, field, value } = body;

    if (typeof dayNumber !== "number" || dayNumber < 1 || dayNumber > 60) {
      return NextResponse.json(
        { error: "dayNumber must be a number between 1 and 60" },
        { status: 400 }
      );
    }
    if (!isProgressField(field)) {
      return NextResponse.json(
        {
          error:
            'field must be one of "conceptCompleted", "interviewCompleted", "prototypeCompleted"',
        },
        { status: 400 }
      );
    }
    if (typeof value !== "boolean") {
      return NextResponse.json(
        { error: "value must be a boolean" },
        { status: 400 }
      );
    }

    const progress = await prisma.progress.upsert({
      where: { visitorId_dayNumber: { visitorId, dayNumber } },
      create: {
        visitorId,
        dayNumber,
        conceptCompleted: false,
        interviewCompleted: false,
        prototypeCompleted: false,
        [field]: value,
      },
      update: { [field]: value },
    });

    return NextResponse.json(progress);
  } catch (e) {
    console.error("Progress update error:", e);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
