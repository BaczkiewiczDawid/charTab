import {drizzle} from "@/drizzle/db";
import {tables} from "@/drizzle/schema";
import {eq} from "drizzle-orm";
import {Filters} from "@/context/table-context";

export const saveFilters = async (filtersList: Filters, tableID: number) => {
  await drizzle.update(tables).set({ filters: JSON.stringify(filtersList)}).where(eq(tables.id, tableID))
}