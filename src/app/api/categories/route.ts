import { db } from "@/lib/drizzle/drizzle";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await db.query.categories.findMany();
  // Do whatever you want
  return NextResponse.json(categories, { status: 200 });
}

export async function DELETE(request) {
  console.log(request);

  // await deleteCategoryById()
  // Do whatever you want
  return NextResponse.json(null, { status: 200 });
}
