import { generateSound } from "@/lib/generateSound";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // get the file from the request
  //   const data = await req.formData();
  //   const image = data.get("image") as File;
  const { classification } = await req.json();

  const output = await generateSound(classification);
  console.log(output);

  return NextResponse.json({ output });
}
