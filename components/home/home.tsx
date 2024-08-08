"use client"

import {Logout} from "@/components/header/logout";
import {LangSelector} from "@/components/header/lang-selector";
import {ImportCSV} from "@/components/header/import-csv";
import {Navigation} from "@/components/navigation";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {Settings} from "@/components/settings/settings";
import {Table} from "@/components/table/table";
import {translations} from "@/data/lang";
import {useTableContext} from "@/context/table-context";
import {useEffect, useState} from "react";
import {LangProps} from "@/types/lang";
import {TableSelector} from "@/components/table-selector";

type Props = {
  lang: LangProps
  tablesList: any
}

export const Home = ({lang, tablesList}: Props) => {
  const {
    ableToDelete,
    showAlerts,
    multipleChoiceFilter,
    columnsToFilter,
    columnsOrder,
    dataToRender,
    columnsToSum,
    columnsToHide,
    isNavVisible,
    setIsNavVisible
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
      <div className={"flex items-center justify-between p-4"}>
        <div>
          <TableSelector tablesList={tablesList}/>
        </div>
        <div className={"flex items-center gap-x-4"}>
          <Logout/>
          <LangSelector lang={lang}/>
          <ImportCSV/>
        </div>
      </div>
      <div className="flex w-full h-3/4 transition-all duration-300 ease-out mt-12">
        <div
          className={`relative transition-all duration-300 ease-out overflow-hidden ${isNavVisible ? 'w-1/4 min-w-[200px]' : 'w-0'}`}>
          <div className="p-4 h-full">
            {isNavVisible && <Navigation/>}
          </div>
          {isNavVisible && (
            <div
              className="absolute inset-y-0 right-0 flex items-center justify-center p-2 cursor-pointer"
              onClick={() => setIsNavVisible(false)}
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-500"/>
            </div>
          )}
        </div>
        <div
          className={`relative p-4 h-full overflow-auto transition-all duration-300 ease-out ${isNavVisible ? 'w-3/4' : 'w-full'}`}>
          {!isNavVisible && (
            <div
              className="absolute inset-y-0 left-0 flex items-center justify-center p-2 cursor-pointer"
              onClick={() => setIsNavVisible(true)}
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-500"/>
            </div>
          )}
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
            tablesList={tablesList}
          />
        </div>
      </div>
    </div>
  );
}