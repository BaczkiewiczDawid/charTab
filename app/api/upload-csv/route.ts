import {NextRequest, NextResponse} from "next/server";
import {uploadCSV} from "@/interfaces/upload-csv";

export async function POST(req: NextRequest) {
  const data = await req.json()

  const response = await uploadCSV(data)

  return NextResponse.json(response)
}