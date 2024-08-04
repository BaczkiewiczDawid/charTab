"use client";

import {Table} from "@/components/table/table";
import {translations} from "@/data/lang";
import {Navigation} from "@/components/navigation";
import {TableProvider, useTableContext} from "@/context/table-context";
import {ImportCSV} from "@/components/header/import-csv";
import {Logout} from "@/components/header/logout";
import {LangSelector} from "@/components/header/lang-selector";
import {LangProps} from "@/types/lang";
import {Settings} from "@/components/settings/settings";
import {useEffect, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';

const HomeContent = ({lang}: { lang: LangProps }) => {

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
      <div className="w-full p-4 flex justify-between h-1/5">
        <p>Header</p>
        <div className="flex gap-x-4 mr-2">
          <Logout/>
          <LangSelector lang={lang}/>
          <ImportCSV/>
        </div>
      </div>
      <div className="flex w-full h-3/4 transition-all duration-300 ease-out">
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
