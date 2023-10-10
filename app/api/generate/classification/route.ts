import { NextResponse, type NextRequest } from "next/server";
import { classifyImage } from "@/lib/classifyImage";

export async function POST(req: NextRequest) {
  // get the file from the request
  //   const data = await req.formData();
  //   const image = data.get("image") as File;
  const { image } = await req.json();

  const { result, status } = await classifyImage(image);

  const categories = result.categories.map((category: any) => {
    return {
      confidence: category.confidence,
      name: category.name.en,
    };
  });

  return NextResponse.json({ status, categories });
}
