import { NextResponse, type NextRequest } from "next/server";
import { classifyImage } from "@/lib/classifyImage";

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  const output = await classifyImage(image);

  return NextResponse.json({ output });
}

// export async function POST(req: NextRequest) {
//   const { image } = await req.json();

//   const { result, status } = await classifyImage(image);

//   const categories = result.categories.map((category: any) => {
//     return {
//       confidence: category.confidence,
//       name: category.name.en,
//     };
//   });

//   return NextResponse.json({ status, categories });
// }
