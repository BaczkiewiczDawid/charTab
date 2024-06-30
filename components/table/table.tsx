"use client";

import {Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Translations} from "@/types/translations";
import {Ellipsis, Trash} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useEffect, useState} from "react";
import {Alert} from "@/components/Alert";
import {Data} from "@/types/data";
import {Filter} from "@/components/filter";
import {columnHider} from "@/components/helpers/column-hider";
import {Checkbox} from "@/components/ui/checkbox";
import {RowSelector} from "@/components/row-selector";
import {useTableContext} from "@/context/table-context";
import {PaginationFooter} from "@/components/table/pagination-footer";

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

  const {setDataToRender, initialDataState} = useTableContext();

  const handleDelete = (dataIndex: number | undefined) => {
    let filteredData = [...data];

    if (selectedRows.length !== 0) {
      filteredData = data.filter((el, index) => !selectedRows.includes(index));
    } else if (typeof dataIndex === "number") {
      filteredData = data.filter((el, index) => index !== dataIndex);
    } else {
      filteredData = data;
    }

    setDataToRender(filteredData);
    setSelectedRows([]);
  };

  const showAlert = () => {
    if (showAlerts) {
      setAlertOpen(true);
    }
  };

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

  const sortedKeys = sortKeysByOrder(Object.keys(data?.[0]), columnOrder);

  useEffect(() => {
    setDataToRender(columnHider(initialDataState, columnsToHide));
  }, [columnsToHide]);

  useEffect(() => {
    setDataToRender(sortDataByOrder(data, columnOrder));
  }, [columnOrder]);

  return (
    <div className="flex flex-col h-full">
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
                initialData={data}
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
                {sortedKeys.map((key, index) => {
                  const keyToTranslate =
                    selectedTranslations?.general && key in selectedTranslations.general
                      ? selectedTranslations.general[key]
                      : key;

                  return <TableHead key={index}>{keyToTranslate}</TableHead>;
                })}
                {ableToDelete && <TableHead></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => {
                const isOdd = index % 2 === 0;

                return (
                  <TableRow key={index} className={`${isOdd ? "bg-stone-950" : "bg-stone-900"}`}>
                    <RowSelector selectedRows={selectedRows} setSelectedRows={setSelectedRows} rowId={index}/>
                    {Object.values(row).map((value, index) => (
                      <TableCell key={index} className="border border-gray-600 whitespace-nowrap">
                        {value}
                      </TableCell>
                    ))}
                    {ableToDelete && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <TableCell className="border border-gray-600 text-center">
                            <div className="inline-block m-auto cursor-pointer">
                              <Ellipsis/>
                            </div>
                          </TableCell>
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
                                <Trash size={16} strokeWidth={2}/>
                                <span className="ml-2">
                                  {selectedRows.length > 1 ? "Delete many" : "Delete"}
                                </span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableRow>
                );
              })}
              {columnsToSum.length >= 1 && (
                <TableRow className="bg-stone-950 w-auto">
                  <TableCell className={"w-auto"}></TableCell>
                  {Object.keys(data[0]).map((el, index) => {
                    const mappedColumn = columnsToSum[columnsToSum.indexOf(el)];
                    const values: number[] = [];

                    data.map((data) => {
                      if (typeof data[mappedColumn] === "number") {
                        values.push(data[mappedColumn] as number);
                      } else {
                        return;
                      }
                    });

                    const summedColumn = values.length > 0 ? values.reduce((a, b) => a + b) : "";

                    if (mappedColumn) {
                      return (
                        <TableCell key={index} className="border border-gray-600 text-center w-auto">
                          {summedColumn}
                        </TableCell>
                      );
                    } else {
                      return <TableCell key={index} className="border border-gray-600 text-center w-auto"></TableCell>;
                    }
                  })}
                  {ableToDelete && <TableCell className="border border-gray-600 text-center w-auto"></TableCell>}
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
