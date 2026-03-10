import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCursorPrompt } from "@/lib/generateCursorPrompt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prototypeId } = body;

    if (typeof prototypeId !== "number") {
      return NextResponse.json(
        { error: "prototypeId must be a number" },
        { status: 400 }
      );
    }

    const prototype = await prisma.prototype.findUnique({
      where: { id: prototypeId },
    });

    if (!prototype) {
      return NextResponse.json(
        { error: "Prototype not found" },
        { status: 404 }
      );
    }

    const prompt = generateCursorPrompt({
      name: prototype.name,
      problem: prototype.problem,
      description: prototype.description,
      coreConcepts: prototype.coreConcepts,
    });

    await prisma.prototype.update({
      where: { id: prototypeId },
      data: { cursorPrompt: prompt },
    });

    return NextResponse.json({ prompt });
  } catch (e) {
    console.error("Generate prompt error:", e);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
