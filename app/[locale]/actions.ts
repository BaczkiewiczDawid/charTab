"use server"

import {drizzle} from "@/drizzle/db";
import {tables} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

export const getTablesForUser = async (uuid?: string) => {
  if (!uuid) {
    throw new Error("No uuid detected")
  }

  const data = await drizzle.select().from(tables).where(eq(tables.owner, uuid))

  return {
    status: true,
    data: data ?? []
  }
}