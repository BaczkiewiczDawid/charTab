import {NextRequest, NextResponse} from "next/server";
import {saveFilters} from "@/interfaces/save-filters";

export async function POST(req: NextRequest) {
  const body = await req.json()

  await saveFilters(body.filters, body.selectedTableID)

  return NextResponse.json({status: true})
}