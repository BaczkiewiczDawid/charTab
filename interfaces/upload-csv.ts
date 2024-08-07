import {drizzle} from "@/drizzle/db";
import {tables} from "@/drizzle/schema";

export const uploadCSV = async (data: any) => {
  console.log(data)

  await drizzle.insert(tables).values({data: JSON.stringify(data.data), owner: data.user.uuid})

  return {
    status: true,
    data: data,
  }
}