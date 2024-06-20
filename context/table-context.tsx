import {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";

interface TableContextProps {
  ableToDelete: boolean;
  setAbleToDelete: Dispatch<SetStateAction<boolean>>
  showAlerts: boolean
  setShowAlerts: Dispatch<SetStateAction<boolean>>
  multipleChoiceFilter: boolean,
  setMultipleChoiceFilter: Dispatch<SetStateAction<boolean>>
  columnsToFilter: string[]
  setColumnsToFilter: Dispatch<SetStateAction<string[]>>
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({children}: { children: ReactNode }) => {
  const [ableToDelete, setAbleToDelete] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [multipleChoiceFilter, setMultipleChoiceFilter] = useState<boolean>(false)
  const [columnsToFilter, setColumnsToFilter] = useState<string[]>([])

  const contextValue = {
    ableToDelete: ableToDelete,
    setAbleToDelete: setAbleToDelete,
    showAlerts: showAlerts,
    setShowAlerts: setShowAlerts,
    multipleChoiceFilter: multipleChoiceFilter,
    setMultipleChoiceFilter: setMultipleChoiceFilter,
    columnsToFilter: columnsToFilter,
    setColumnsToFilter: setColumnsToFilter,
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
