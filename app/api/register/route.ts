import {NextRequest, NextResponse} from "next/server";
import {handleRegister} from "@/interfaces/register";

export async function POST(request: NextRequest) {
  const body = await request.json()

  const data = await handleRegister(body)

  return NextResponse.json(data)
}