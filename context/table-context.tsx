import {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch, useEffect} from "react";
import {Data} from "@/types/data";
import {data} from "@/data/dummyData";

interface TableContextProps {
  ableToDelete: boolean;
  setAbleToDelete: Dispatch<SetStateAction<boolean>>
  showAlerts: boolean
  setShowAlerts: Dispatch<SetStateAction<boolean>>
  multipleChoiceFilter: boolean,
  setMultipleChoiceFilter: Dispatch<SetStateAction<boolean>>
  columnsToFilter: string[]
  setColumnsToFilter: Dispatch<SetStateAction<string[]>>
  columnsOrder: string[]
  setColumnsOrder: Dispatch<SetStateAction<string[]>>
  dataToRender: Data[]
  setDataToRender: Dispatch<SetStateAction<Data[]>>
  initialDataState: Data[]
  setInitialDataState: Dispatch<SetStateAction<Data[]>>
  columnsToSum: string[]
  setColumnsToSum: Dispatch<SetStateAction<string[]>>
  columnsToHide: string[]
  setColumnsToHide: Dispatch<SetStateAction<string[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  columnsToColor: string[]
  setColumnsToColor: Dispatch<SetStateAction<string[]>>
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({children}: { children: ReactNode }) => {
  const [ableToDelete, setAbleToDelete] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [multipleChoiceFilter, setMultipleChoiceFilter] = useState<boolean>(false)
  const [columnsToFilter, setColumnsToFilter] = useState<string[]>([])
  const [columnsOrder, setColumnsOrder] = useState<string[]>([])
  const [dataToRender, setDataToRender] = useState<Data[]>([...data])
  const [initialDataState, setInitialDataState] = useState<Data[]>([...data])
  const [columnsToSum, setColumnsToSum] = useState<string[]>([])
  const [columnsToHide, setColumnsToHide] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [columnsToColor, setColumnsToColor] = useState<string[]>([])

  useEffect(() => {
    const newColumnsToFilter = columnsToFilter.filter((column) => !columnsToHide.includes(column))

    setColumnsToFilter(newColumnsToFilter)
  }, [columnsToHide])

  const contextValue = {
    ableToDelete: ableToDelete,
    setAbleToDelete: setAbleToDelete,
    showAlerts: showAlerts,
    setShowAlerts: setShowAlerts,
    multipleChoiceFilter: multipleChoiceFilter,
    setMultipleChoiceFilter: setMultipleChoiceFilter,
    columnsToFilter: columnsToFilter,
    setColumnsToFilter: setColumnsToFilter,
    columnsOrder: columnsOrder,
    setColumnsOrder: setColumnsOrder,
    dataToRender: dataToRender,
    setDataToRender: setDataToRender,
    initialDataState: initialDataState,
    setInitialDataState: setInitialDataState,
    columnsToSum: columnsToSum,
    setColumnsToSum: setColumnsToSum,
    columnsToHide: columnsToHide,
    setColumnsToHide: setColumnsToHide,
    page: page,
    setPage: setPage,
    pageSize: pageSize,
    setPageSize: setPageSize,
    columnsToColor: columnsToColor,
    setColumnsToColor: setColumnsToColor,
  }

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): TableContextProps => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
