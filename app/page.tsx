"use client"

import {Table} from "@/components/table/table"
import {translations} from "@/data/lang"
import {data} from "@/data/dummyData"
import {Navigation} from "@/components/navigation";
import {TableProvider, useTableContext} from "@/context/table-context";

export default function Home() {
  const {ableToDelete} = useTableContext()

  return (
    <div className={"flex flex-col"}>
      <div className="w-full p-4">Header</div>
      <div className={"grid grid-cols-4 w-full mt-4"}>
        <nav className={"p-4 col-span-1"}>
          <Navigation/>
        </nav>
        <div className={"p-4 col-span-3"}>
          <Table
            data={data}
            lang={"pl"}
            translations={translations}
            ableToDelete={ableToDelete}
            showAlerts
            columnsToFilter={["name", "age", "position"]}
            multipleChoiceFilter
            columnOrder={["name", "position"]}
            columnsToHide={["id"]}
            columnsToSum={["salary"]}
          />
        </div>
      </div>
    </div>
  )
}
