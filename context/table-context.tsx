import {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";
import {Data} from "@/types/data";
import {initialFilters} from "@/data/initialFilters";

type Lang = "pl" | "en";

export interface Filters {
  [key: string]: string[];
  ableToDelete: boolean;
  showAlerts: boolean;
  multipleChoiceFilter: boolean;
  columnsToFilter: string[];
  columnsOrder: string[];
  columnsToHide: string[];
  columnsToColor: string[];
}

interface TableContextProps {
  dataToRender: Data[];
  setDataToRender: Dispatch<SetStateAction<Data[]>>;
  initialDataState: Data[];
  setInitialDataState: Dispatch<SetStateAction<Data[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  lang: Lang;
  setLang: Dispatch<SetStateAction<Lang>>;
  settingsOpen: boolean;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  englishTranslations: { [key: string]: string };
  setEnglishTranslations: Dispatch<SetStateAction<{ [key: string]: string }>>;
  polishTranslations: { [key: string]: string };
  setPolishTranslations: Dispatch<SetStateAction<{ [key: string]: string }>>;
  cellsType: { [key: string]: string };
  setCellsType: Dispatch<SetStateAction<{ [key: string]: string }>>;
  isNavVisible: boolean;
  setIsNavVisible: Dispatch<SetStateAction<boolean>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  selectedTableID: number | undefined;
  setSelectedTableID: Dispatch<SetStateAction<number | undefined>>;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({children}: { children: ReactNode }) => {
  const [dataToRender, setDataToRender] = useState<Data[]>([]);
  const [initialDataState, setInitialDataState] = useState<Data[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lang, setLang] = useState<Lang>("pl");
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [englishTranslations, setEnglishTranslations] = useState<{ [key: string]: string }>({});
  const [polishTranslations, setPolishTranslations] = useState<{ [key: string]: string }>({});
  const [cellsType, setCellsType] = useState<{ [key: string]: string }>({});
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [selectedTableID, setSelectedTableID] = useState<number | undefined>(undefined);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const contextValue = {
    dataToRender,
    setDataToRender,
    initialDataState,
    setInitialDataState,
    page,
    setPage,
    pageSize,
    setPageSize,
    lang,
    setLang,
    settingsOpen,
    setSettingsOpen,
    englishTranslations,
    setEnglishTranslations,
    polishTranslations,
    setPolishTranslations,
    cellsType,
    setCellsType,
    isNavVisible,
    setIsNavVisible,
    filters,
    setFilters,
    selectedTableID,
    setSelectedTableID,
  };

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
