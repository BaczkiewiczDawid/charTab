"use client";

import {Table} from "@/components/table/table";
import {translations} from "@/data/lang";
import {Navigation} from "@/components/navigation";
import {TableProvider, useTableContext} from "@/context/table-context";
import {ImportCSV} from "@/components/header/import-csv";
import {LangSelector} from "@/components/header/lang-selector";
import {LangProps} from "@/types/lang";
import {Settings} from "@/components/settings/settings";
import {useEffect, useState} from "react";

const HomeContent = ({lang}: { lang: LangProps }) => {
  const {
    ableToDelete,
    showAlerts,
    multipleChoiceFilter,
    columnsToFilter,
    columnsOrder,
    dataToRender,
    columnsToSum,
    columnsToHide
  } = useTableContext();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="w-full p-4 flex justify-between h-1/5">
        <p>Header</p>
        <div className="flex gap-x-4 mr-2">
          <LangSelector lang={lang}/>
          <ImportCSV/>
        </div>
      </div>
      <div className="grid grid-cols-4 w-full h-3/4">
        <nav className="p-4 col-span-1 h-full">
          <Navigation/>
        </nav>
        <div className="p-4 col-span-3 h-full overflow-auto">
          <Settings/>
          <Table
            data={dataToRender}
            lang={lang}
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
};

export default function Home({params}: { params: { locale: LangProps } }) {
  return (
    <TableProvider>
      <HomeContent lang={params.locale}/>
    </TableProvider>
  );
}
