import {NextRequest, NextResponse} from "next/server";
import {handleLogin} from "@/interfaces/login";

export async function POST(request: NextRequest) {
  const body = await request.json()

  const data = await handleLogin(body)

  return NextResponse.json(data)
}