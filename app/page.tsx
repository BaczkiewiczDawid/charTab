"use client"

import { Table } from "@/components/table/table"
import { translations } from "@/app/data/lang"
import { data } from "@/app/data/dummyData"

export default function Home() {

  return (
    <div className={"flex justify-center p-4 text-white"}>
      <div className={"w-screen text-white h-screen overflow-auto"}>
        <Table
          data={data}
          lang={"pl"}
          translations={translations}
          ableToDelete
        />
      </div>
    </div>
  );
}
