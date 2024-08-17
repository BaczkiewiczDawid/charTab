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
import {updateCellTypes} from "@/components/helpers/update-cell-types";
import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {translate} from "@/components/helpers/translations";
import {OptionsSheet} from "@/components/settings/options-sheet";

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
      <div className={"flex flex-col-reverse justify-between p-4 md:flex-row xl:px-12 xl:py-8"}>
        <div className={"flex items-center justify-between"}>
          <TableSelector tablesList={tablesList}/>
          <OptionsSheet lang={lang} setSettingsOpen={setSettingsOpen}/>
        </div>
        <div className={"hidden md:flex gap-x-4 mt-4 md:mt-0 items-center"}>
          <Logout/>
          <Cog6ToothIcon className="h-6 w-6 hover:text-gray-500 cursor-pointer hidden lg:block"
                         onClick={() => setSettingsOpen(true)}/>
          <LangSelector lang={lang}/>
          <ImportCSV/>
        </div>
      </div>
      {dataToRender.length > 0 ?
        <div className="flex w-full transition-all duration-300 ease-out mt-4 xl:p-12">
          <div
            className={`hidden lg:block relative transition-all duration-300 ease-out overflow-hidden ${isNavVisible ? 'w-0 lg:w-[25%] xl:w-[30%] 2xl:w-[20%] min-w-[200px] lg:min-w-0' : 'w-0'}`}>
            <div className="p-4 h-full w-[80%]">
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
            className={`relative p-4 h-full transition-all duration-300 ease-out ${isNavVisible ? 'w-full lg:w-3/4 xl:w-full' : 'w-full'}`}>
            {!isNavVisible && (
              <div
                className="absolute inset-y-0 left-0 flex items-center justify-center p-2 cursor-pointer"
                onClick={() => setIsNavVisible(true)}
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-500"/>
              </div>
            )}
            <Settings/>
            <Table/>
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