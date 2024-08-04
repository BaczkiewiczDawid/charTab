"use client"


import {TableProvider} from "@/context/table-context";
import {Login} from "@/components/login/login";

export default async function Page() {
  return (
    <TableProvider>
      <Login />
    </TableProvider>
  )
}