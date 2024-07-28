"use client";

import {
  Table as TableComponent,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Translations } from "@/types/translations";
import { Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Alert } from "@/components/Alert";
import { Data } from "@/types/data";
import { Filter } from "@/components/filter";
import { columnHider } from "@/components/helpers/column-hider";
import { RowSelector } from "@/components/row-selector";
import { useTableContext } from "@/context/table-context";
import { PaginationFooter } from "@/components/table/pagination-footer";
import { sortDataByOrder, sortKeysByOrder } from "@/components/helpers/column-order";
import { Cell } from "@/components/table/table-cell";
import { translate } from "@/components/helpers/translations";

type TableProps = {
  data: Data[];
  lang: "en" | "pl";
  translations: Translations;
  ableToDelete?: boolean;
  showAlerts?: boolean;
  columnsToFilter?: string[];
  multipleChoiceFilter?: boolean;
  columnOrder?: string[];
  columnsToHide?: string[];
  columnsToSum?: string[];
};

export type Filters = {
  columnName: string;
  value: string;
};

export const Table = ({
                        data,
                        lang,
                        translations,
                        ableToDelete,
                        showAlerts,
                        columnsToFilter,
                        multipleChoiceFilter,
                        columnOrder = [],
                        columnsToHide = [],
                        columnsToSum = [],
                      }: TableProps) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const selectedTranslations = translations?.[lang];
  const {
    dataToRender,
    setDataToRender,
    initialDataState,
    setInitialDataState,
    columnsOrder,
    isNavVisible,
  } = useTableContext();

  const handleDelete = (dataIndex: number | undefined) => {
    let filteredData = [...data];

    if (selectedRows.length !== 0) {
      filteredData = data.filter((el, index) => selectedRows.includes(index));
    } else if (typeof dataIndex === "number") {
      filteredData = data.filter((el, index) => index === dataIndex);
    } else {
      filteredData = data;
    }

    const filteredInitialData = initialDataState.filter((data) => JSON.stringify(data) !== JSON.stringify(filteredData[0]));

    setInitialDataState(filteredInitialData);
    setSelectedRows([]);
  };

  const showAlert = () => {
    if (showAlerts) {
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    setDataToRender(columnHider(initialDataState, columnsToHide));
  }, [columnsToHide]);

  useEffect(() => {
    setDataToRender(sortDataByOrder(data, columnOrder));
  }, [columnOrder]);

  console.log(isNavVisible)

  return (
    <div className={`flex flex-col h-full ${!isNavVisible && "ml-12"}`}>
      <div className="flex flex-row mb-4">
        {columnsToFilter?.map((col, index) => {
          return (
            <div key={index} className="[&:nth-child(n+2)]:ml-4">
              <Filter
                key={index}
                data={data}
                setDataToRender={setDataToRender}
                columnName={col}
                filters={filters}
                setFilters={setFilters}
                multipleChoiceFilter={multipleChoiceFilter}
              />
            </div>
          );
        })}
      </div>
      <div className="flex-1 overflow-auto pb-4">
        <div className="overflow-x-auto overflow-y-auto">
          <TableComponent className="border border-gray-600 min-w-full">
            <TableHeader className="bg-stone-900">
              <TableRow className="border-stone-900">
                <TableHead className="w-12"></TableHead>
                {sortKeysByOrder(Object.keys(data?.[0]), columnsOrder).map((key, index) => {
                  return <TableHead key={index}>{translate(key)}</TableHead>;
                })}
                {ableToDelete && <TableHead></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortDataByOrder(data, columnsOrder).map((row: Data, index: number) => {
                const isOdd = index % 2 === 0;

                return (
                  <TableRow key={index} className={`${isOdd ? "bg-stone-950" : "bg-stone-900"}`}>
                    <RowSelector selectedRows={selectedRows} setSelectedRows={setSelectedRows} rowId={index}/>
                    {Object.values(row).map((value, index) => (
                      <Cell key={index} name={value} colName={Object.keys(dataToRender[0])[index]}/>
                    ))}
                    {ableToDelete && (
                      <Cell>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="w-full h-full">
                            <div className="flex items-center justify-center w-full h-full">
                              <Ellipsis />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              {ableToDelete && (
                                <DropdownMenuItem
                                  className="flex items-center text-xs cursor-pointer"
                                  onClick={() => {
                                    if (selectedRows.length === 0) {
                                      setSelectedRows([index]);
                                    }
                                    showAlerts ? showAlert() : handleDelete(index);
                                  }}
                                >
                                  <Trash size={16} strokeWidth={2} />
                                  <span className="ml-2">
                                    {selectedRows.length > 1 ? "Delete many" : "Delete"}
                                  </span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Cell>
                    )}
                  </TableRow>
                );
              })}
              {columnsToSum.length >= 1 && (
                <TableRow className="bg-stone-950 w-auto">
                  <Cell></Cell>
                  {Object.keys(data[0]).map((el, index) => {
                    const mappedColumn = columnsToSum[columnsToSum.indexOf(el)];
                    const values: number[] = [];

                    (sortDataByOrder(data, columnsOrder)).map((data: Data) => {
                      if (typeof data[mappedColumn] === "number") {
                        values.push(data[mappedColumn] as number);
                      } else {
                        return;
                      }
                    });

                    const summedColumn = values.length > 0 ? values.reduce((a, b) => a + b) : "";

                    if (mappedColumn) {
                      return (
                        <Cell key={index} name={summedColumn}/>
                      );
                    } else {
                      return <Cell key={index}/>
                    }
                  })}
                  {ableToDelete && <Cell/>}
                </TableRow>
              )}
            </TableBody>
            <Alert
              open={alertOpen}
              onOpenChange={setAlertOpen}
              handleDelete={handleDelete}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </TableComponent>
        </div>
      </div>
      <PaginationFooter />
    </div>
  );
};
