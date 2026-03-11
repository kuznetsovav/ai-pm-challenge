import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const PROGRESS_FIELDS = [
  "conceptCompleted",
  "interviewCompleted",
  "prototypeCompleted",
] as const;

type ProgressField = (typeof PROGRESS_FIELDS)[number];

function isProgressField(s: unknown): s is ProgressField {
  return typeof s === "string" && PROGRESS_FIELDS.includes(s as ProgressField);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id as string;

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
      where: { userId_dayNumber: { userId, dayNumber } },
      create: {
        userId,
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
