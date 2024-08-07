import {NextRequest, NextResponse} from "next/server";
import {getCSV} from "@/interfaces/get-csv";

export async function GET(req: NextRequest) {
  const body = await req.json()

  console.log(body)

  const res = await getCSV()

  return NextResponse.json(res)
}