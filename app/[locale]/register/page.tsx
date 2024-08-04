"use client"

import {Register} from "@/components/login/register";
import {TableProvider} from "@/context/table-context";

export default async function Page() {
  return (
    <TableProvider>
      <Register/>
    </TableProvider>
  )
}