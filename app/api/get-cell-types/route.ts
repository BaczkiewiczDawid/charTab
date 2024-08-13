import {NextRequest, NextResponse} from "next/server";
import {getCellTypes} from "@/interfaces/get-cell-types";

export async function POST(req: NextRequest) {
  const body = await req.json()

  const data = await getCellTypes(body.selectedTableID)

  return NextResponse.json({ cellsType: data[0]?.types ?? {} })
}