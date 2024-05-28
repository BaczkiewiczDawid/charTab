"use client"

import {Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Translations} from "@/types/translations";
import {Ellipsis, Trash} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useEffect, useState} from "react";
import {Alert} from "@/components/Alert"
import {Data} from "@/types/data"
import {Filter} from "@/components/filter";

type TableProps = {
  // data to create table
  data: Data[]
  // Translation language
  lang: "en" | "pl"
  // translations data
  translations: Translations
  // ability to delete
  ableToDelete?: boolean
  // show delete / restore alerts
  showAlerts?: boolean
  // columns name to filter
  columnsToFilter?: string[]
  // mutli filter selector
  multipleChoiceFilter?: boolean
  // column order
  columnOrder: string[]
}

export type Filters = {
  columnName: string
  value: string
}

export const Table = ({
                        data,
                        lang,
                        translations,
                        ableToDelete,
                        showAlerts,
                        columnsToFilter,
                        multipleChoiceFilter,
                        columnOrder
                      }: TableProps) => {
  const [selectedRow, setSelectedRow] = useState<Data[]>([])
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters[]>([])
  const [dataToRender, setDataToRender] = useState<Data[]>(data)

  const selectedTranslations = translations?.[lang]

  const handleDelete = (row: Data) => {
    const filteredData: Data[] = dataToRender?.filter((el) => el.id !== row.id)

    if (showAlerts) {
      setSelectedRow(filteredData)
    } else {
      setDataToRender(filteredData)
    }
  }

  const showAlert = (row: Data) => {
    handleDelete(row)

    if (showAlerts) {
      setAlertOpen(true)
    }
  }

  const sortKeysByOrder = (keys: string[], order: string[]) => {
    return keys.sort((a, b) => {
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);

      return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB);
    });
  };

  const sortDataByOrder = (data: any, order: string[]) => {
    return data.map((item: any) => {
      const sortedKeys = sortKeysByOrder(Object.keys(item), order);
      let sortedItem = {};
      sortedKeys.forEach((key) => {
        //@ts-ignore
        sortedItem[key] = item[key];
      });
      return sortedItem;
    });
  };

  const sortedKeys = sortKeysByOrder(Object.keys(dataToRender?.[0]), columnOrder);

  useEffect(() => {
    setDataToRender(sortDataByOrder(dataToRender, columnOrder));
  }, [columnOrder])

  return (
    <div className="h-full flex flex-col">
      <div className={"flex flex-row mb-4"}>
        {columnsToFilter?.map((col, index) => {
          return (
            <div key={index} className={"[&:nth-child(n+2)]:ml-4"}>
              <Filter key={index} data={dataToRender} setDataToRender={setDataToRender} columnName={col}
                      filters={filters} setFilters={setFilters} initialData={data}
                      multipleChoiceFilter={multipleChoiceFilter}/>
            </div>
          )
        })}
      </div>
      <div className="flex-1 overflow-auto">
        <TableComponent className={"border border-gray-600 min-h-full"}>
          <TableHeader className={"bg-stone-900"}>
            <TableRow className={"border-stone-900"}>
              {sortedKeys.map((key: string, index: number) => {
                const keyToTranslate = selectedTranslations?.general && (key as keyof typeof selectedTranslations.general) in selectedTranslations.general
                  ? selectedTranslations.general[key as keyof typeof selectedTranslations.general]
                  : key;

                return (
                  <TableHead key={index}>
                    {keyToTranslate}
                  </TableHead>
                );
              })}
              {ableToDelete && <TableHead></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToRender.map((row, index) => {
              const isOdd = index % 2 === 0

              return (
                <TableRow key={index} className={`${isOdd ? 'bg-stone-950' : 'bg-stone-900'}`}>
                  {Object.values(row).map((value, index) => {
                    return (
                      <TableCell key={index} className={"border border-gray-600"}>
                        {value}
                      </TableCell>
                    )
                  })}
                  {ableToDelete &&
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <TableCell className={"border border-gray-600 text-center"}>
                                  <div className={"inline-block m-auto cursor-pointer"}><Ellipsis/></div>
                              </TableCell>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                              <DropdownMenuGroup>
                                {ableToDelete &&
                                    <DropdownMenuItem
                                        className={"flex items-center text-xs cursor-pointer"}
                                        onClick={() => showAlert(row)}
                                    >
                                        <Trash size={16} strokeWidth={2}/>
                                        <span className={"ml-2"}>Delete</span>
                                    </DropdownMenuItem>
                                }
                              </DropdownMenuGroup>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  }
                </TableRow>
              )
            })}
          </TableBody>
          <Alert
            open={alertOpen}
            onOpenChange={setAlertOpen}
            setDataToRender={setDataToRender}
            selectedRow={selectedRow}/>
        </TableComponent>
      </div>
    </div>
  );

}