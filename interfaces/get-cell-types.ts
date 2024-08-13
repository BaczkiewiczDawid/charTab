import {cellTypes} from "@/drizzle/schema";
import {drizzle} from "@/drizzle/db";
import {eq} from "drizzle-orm";

export const getCellTypes = async (selectedTableID) => {
  return drizzle.select().from(cellTypes).where(eq(cellTypes.tableID, selectedTableID));
}