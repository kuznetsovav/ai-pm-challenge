import { NextResponse } from "next/server";
import { getChallengeSettings, createChallengeSettings } from "@/lib/challengeSettings";

export async function POST() {
  try {
    const existing = await getChallengeSettings();

    if (existing) {
      return NextResponse.json(
        { startedAt: existing.startedAt.toISOString(), alreadyStarted: true }
      );
    }

    const settings = await createChallengeSettings();

    return NextResponse.json({
      startedAt: settings.startedAt.toISOString(),
      alreadyStarted: false,
    });
  } catch (e) {
    console.error("Start challenge error:", e);
    return NextResponse.json(
      { error: "Failed to start challenge" },
      { status: 500 }
    );
  }
}
