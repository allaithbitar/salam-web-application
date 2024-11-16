import { getQuestions } from "@/server-actions/questions";
import { TQuestion } from "@/types/question";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as TQuestion["status"];
  const json = await request.json();
  console.log(json);

  const members = await getQuestions({ status });
  return NextResponse.json(members, { status: 200 });
}
