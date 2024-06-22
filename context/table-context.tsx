import {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";
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
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({children}: { children: ReactNode }) => {
  const [ableToDelete, setAbleToDelete] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [multipleChoiceFilter, setMultipleChoiceFilter] = useState<boolean>(false)
  const [columnsToFilter, setColumnsToFilter] = useState<string[]>([])
  const [columnsOrder, setColumnsOrder] = useState<string[]>([])
  const [dataToRender, setDataToRender] = useState<Data[]>(data)
  const [initialDataState, setInitialDataState] = useState<Data[]>(data)

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
