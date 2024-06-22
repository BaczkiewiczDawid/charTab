"use client";

import { Table } from "@/components/table/table";
import { translations } from "@/data/lang";
import { Navigation } from "@/components/navigation";
import { TableProvider, useTableContext } from "@/context/table-context";

const HomeContent = () => {
  const { ableToDelete, showAlerts, multipleChoiceFilter, columnsToFilter, columnsOrder, dataToRender, columnsToSum } = useTableContext();

  return (
    <div className={"flex flex-col"}>
      <div className="w-full p-4">Header</div>
      <div className={"grid grid-cols-4 w-full mt-4"}>
        <nav className={"p-4 col-span-1"}>
          <Navigation />
        </nav>
        <div className={"p-4 col-span-3"}>
          <Table
            data={dataToRender}
            lang={"pl"}
            translations={translations}
            ableToDelete={ableToDelete}
            showAlerts={showAlerts}
            columnsToFilter={columnsToFilter}
            multipleChoiceFilter={multipleChoiceFilter}
            columnOrder={columnsOrder}
            columnsToHide={["id"]}
            columnsToSum={columnsToSum}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <TableProvider>
      <HomeContent />
    </TableProvider>
  );
}
