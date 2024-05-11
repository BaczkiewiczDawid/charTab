"use client"

import { Table } from "@/components/table/table"
import { translations } from "@/app/data/lang"

export default function Home() {

  return (
    <div className={"flex justify-center p-4 text-white"}>
      <div className={"w-screen text-white h-screen overflow-auto"}>
        <Table
          lang={"pl"}
          translations={translations}
          columnsToFilter={["name", "position"]}
        />
      </div>
    </div>
  );
}
