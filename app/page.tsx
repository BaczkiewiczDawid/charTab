"use client";

import { Table } from "@/components/table/table";
import { translations } from "@/data/lang";
import { Navigation } from "@/components/navigation";
import { TableProvider, useTableContext } from "@/context/table-context";
import { ImportCSV } from "@/components/import-csv"

const HomeContent = () => {
  const { ableToDelete, showAlerts, multipleChoiceFilter, columnsToFilter, columnsOrder, dataToRender, columnsToSum, columnsToHide } = useTableContext();

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="w-full p-4 flex justify-between h-1/5">
        <p>Header</p>
        <ImportCSV />
      </div>
      <div className="grid grid-cols-4 w-full h-3/4">
        <nav className="p-4 col-span-1 h-full">
          <Navigation />
        </nav>
        <div className="p-4 col-span-3 h-full overflow-auto">
          <Table
            data={dataToRender}
            lang={"pl"}
            translations={translations}
            ableToDelete={ableToDelete}
            showAlerts={showAlerts}
            columnsToFilter={columnsToFilter}
            multipleChoiceFilter={multipleChoiceFilter}
            columnOrder={columnsOrder}
            columnsToHide={columnsToHide}
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
