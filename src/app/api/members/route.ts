import {
  getMemberById,
  getMembers,
  updateMemberImage,
} from "@/server-actions/members";
import { TUpdateMemberImageDto } from "@/types/member";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const member = await getMemberById(Number(id));
    return NextResponse.json(member, { status: 200 });
  }

  const members = await getMembers();
  return NextResponse.json(members, { status: 200 });
}

export async function PUT(req: Request) {
  const formData = await req.formData();
  const image: TUpdateMemberImageDto["image"] = formData.get("image") as File;
  const memberId: TUpdateMemberImageDto["memberId"] = Number(
    formData.get("memberId") as string,
  );

  const oldImage: TUpdateMemberImageDto["oldImage"] = JSON.parse(
    formData.get("oldImage") as string,
  );

  await updateMemberImage({
    image,
    oldImage,
    memberId,
  });

  return NextResponse.json({}, { status: 200 });
}
