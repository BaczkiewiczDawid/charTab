import {logout} from "@/interfaces/logout";
import {NextResponse} from "next/server";

export async function GET() {
  await logout()

  return NextResponse.json({message: 'Logged out'})
}