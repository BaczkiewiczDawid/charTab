"use client"

import { lang } from "@/app/lang"
import { Table } from "@/components/table/table"

export default function Home() {
  console.log(lang)

  return (
    <div className={"flex justify-center p-4 text-white"}>
      <div className={"w-screen bg-stone-950 text-white h-screen overflow-auto"}>
        <Table />
      </div>
    </div>
  );
}
