import {drizzle} from "@/drizzle/db";
import {eq} from "drizzle-orm";
import {cellTypes} from "@/drizzle/schema";

export const saveCellTypes = async (cellTypesData: any, selectedTableID: number) => {
  const data = await drizzle.select().from(cellTypes).where(eq(cellTypes.tableID, selectedTableID))

  if (Array.isArray(data) && data.length > 0) {
    await drizzle.update(cellTypes).set({types: JSON.stringify(cellTypesData)}).where(eq(cellTypes.tableID, selectedTableID))
  } else {
    await drizzle.insert(cellTypes).values({tableID: selectedTableID, types: JSON.stringify(cellTypesData)})
  }
}