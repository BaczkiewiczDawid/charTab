"use client"

import {Table} from "@/components/table/table"
import {translations} from "@/data/lang"
import {data} from "@/data/dummyData"

export default function Home() {

  return (
    <div className={"flex flex-col"}>
      <div className="w-full p-4">Header</div>
      <div className={"grid grid-cols-4 w-full mt-4"}>
        <div className={"p-4 col-span-1"}>Nav</div>
        <div className={"p-4 col-span-3"}>
          <Table
            data={data}
            lang={"pl"}
            translations={translations}
            ableToDelete
            showAlerts
            columnsToFilter={["name", "age", "position"]}
            multipleChoiceFilter
            columnOrder={["id", "name", "position"]}
          />
        </div>
      </div>
    </div>
  );
}
