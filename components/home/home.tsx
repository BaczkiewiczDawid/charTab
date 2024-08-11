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
import {Cog6ToothIcon} from "@heroicons/react/24/solid";
import {updateFilters} from "@/components/helpers/update-filters";

type Props = {
  lang: LangProps
  tablesList: any
}

export const Home = ({lang, tablesList}: Props) => {
  const {
    dataToRender,
    isNavVisible,
    setIsNavVisible,
    setSettingsOpen,
  } = useTableContext();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  updateFilters()

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className={"flex items-center justify-between p-4"}>
        <div>
          <TableSelector tablesList={tablesList}/>
        </div>
        <div className={"flex items-center gap-x-4"}>
          <Logout/>
          <Cog6ToothIcon className="h-6 w-6 hover:text-gray-500 cursor-pointer" onClick={() => setSettingsOpen(true)}/>
          <LangSelector lang={lang}/>
          <ImportCSV/>
        </div>
      </div>
      {dataToRender.length > 0 ?
        <div className="flex w-full transition-all duration-300 ease-out mt-4">
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
            className={`relative p-4 h-full transition-all duration-300 ease-out ${isNavVisible ? 'w-3/4' : 'w-full'}`}>
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
            />
          </div>
        </div>
        : (
          <div className={"m-auto mt-32"}>
            <h2 className={"font-bold text-3xl"}>No table selected!</h2>
          </div>
        )
      }
    </div>
  );
}