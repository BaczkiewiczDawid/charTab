import {drizzle} from "@/drizzle/db";
import {tables} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

export const saveFilters = async (filtersList, tableID) => {
  await drizzle.update(tables).set({ filters: JSON.stringify(filtersList)}).where(eq(tables.id, tableID))
}