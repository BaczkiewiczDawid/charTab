import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';

const TableContext = createContext<{
  ableToDelete: boolean;
  setAbleToDelete: any
}>({
  ableToDelete: false,
  setAbleToDelete: () => {}
});

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider = ({children}: TableProviderProps) => {
  const [ableToDelete, setAbleToDelete] = useState(false)

  const contextValue = {
    ableToDelete: ableToDelete,
    setAbleToDelete: setAbleToDelete,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  return useContext(TableContext);
};
