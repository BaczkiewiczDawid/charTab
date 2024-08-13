import {NextRequest, NextResponse} from "next/server";
import {saveCellTypes} from "@/interfaces/save-cell-types";

export async function POST(req: NextRequest) {
  const body = await req.json()

  await saveCellTypes(body.cellsType, body.selectedTableID)

  return NextResponse.json({status: true})
}