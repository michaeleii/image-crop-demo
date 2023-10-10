import { generateSound } from "@/lib/generateSound";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { classification } = await req.json();

  const output = await generateSound(classification);

  return NextResponse.json({ output });
}
