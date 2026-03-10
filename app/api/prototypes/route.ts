import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startDay, endDay, name, description, problem, coreConcepts, githubUrl } = body;

    if (typeof startDay !== "number" || startDay < 1 || startDay > 60) {
      return NextResponse.json(
        { error: "startDay must be a number between 1 and 60" },
        { status: 400 }
      );
    }
    if (typeof endDay !== "number" || endDay < 1 || endDay > 60) {
      return NextResponse.json(
        { error: "endDay must be a number between 1 and 60" },
        { status: 400 }
      );
    }
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400 }
      );
    }
    if (typeof description !== "string") {
      return NextResponse.json(
        { error: "description must be a string" },
        { status: 400 }
      );
    }
    if (githubUrl != null && typeof githubUrl !== "string") {
      return NextResponse.json(
        { error: "githubUrl must be a string or null" },
        { status: 400 }
      );
    }
    const problemStr = typeof problem === "string" ? problem : "";
    const coreConceptsStr = typeof coreConcepts === "string" ? coreConcepts : "";

    const url = typeof githubUrl === "string" ? githubUrl.trim() || null : null;

    const existing = await prisma.prototype.findFirst({
      where: { startDay, endDay },
    });

    const prototype = existing
      ? await prisma.prototype.update({
          where: { id: existing.id },
          data: {
            githubUrl: url,
            ...(problemStr && { problem: problemStr }),
            ...(coreConceptsStr && { coreConcepts: coreConceptsStr }),
          },
        })
      : await prisma.prototype.create({
          data: {
            name: name.trim(),
            description: description.trim(),
            problem: problemStr,
            coreConcepts: coreConceptsStr,
            startDay,
            endDay,
            githubUrl: url,
          },
        });

    return NextResponse.json(prototype);
  } catch (e) {
    console.error("Prototype save error:", e);
    return NextResponse.json(
      { error: "Failed to save prototype" },
      { status: 500 }
    );
  }
}
