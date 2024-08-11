import {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch, useEffect} from "react";
import {Data} from "@/types/data";
import {data} from "@/data/dummyData";
import {initialFilters} from "@/data/initialFilters";

type Lang = "pl" | "en"

interface TableContextProps {
  dataToRender: Data[]
  setDataToRender: Dispatch<SetStateAction<Data[]>>
  initialDataState: Data[]
  setInitialDataState: Dispatch<SetStateAction<Data[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  lang: "pl" | "en",
  setLang: Dispatch<SetStateAction<Lang>>
  settingsOpen: boolean
  setSettingsOpen: Dispatch<SetStateAction<boolean>>
  englishTranslations: { [key: string]: string }
  setEnglishTranslations: Dispatch<SetStateAction<{ [key: string]: string }>>
  polishTranslations: { [key: string]: string }
  setPolishTranslations: Dispatch<SetStateAction<{ [key: string]: string }>>
  cellsType: { [key: string]: string }
  setCellsType: Dispatch<SetStateAction<{ [key: string]: string }>>
  isNavVisible: boolean
  setIsNavVisible: Dispatch<SetStateAction<boolean>>
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({children}: { children: ReactNode }) => {
  const [dataToRender, setDataToRender] = useState<Data[]>([])
  const [initialDataState, setInitialDataState] = useState<Data[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [lang, setLang] = useState<Lang>("pl")
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [englishTranslations, setEnglishTranslations] = useState<{ [key: string]: string }>({})
  const [polishTranslations, setPolishTranslations] = useState<{ [key: string]: string }>({})
  const [cellsType, setCellsType] = useState<{ [key: string]: string }>({})
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [selectedTableID, setSelectedTableID] = useState<number>()

  type Filters = {
    ableToDelete: boolean
    showAlerts: boolean
    multipleChoiceFilter: boolean
    columnsToFilter: string[]
    columnsOrder: string[]
    columnsToHide: string[]
    columnsToColor: string[]
  }

  const [filters, setFilters] = useState<Filters>(initialFilters)

  // useEffect(() => {
  //   const newColumnsToFilter = filters.columnsToFilter.filter((column) => !filters.columnsToHide.includes(column))
  //
  //   setColumnsToFilter(newColumnsToFilter)
  // }, [filters.columnsToHide])

  const contextValue = {

    dataToRender: dataToRender,
    setDataToRender: setDataToRender,
    initialDataState: initialDataState,
    setInitialDataState: setInitialDataState,
    page: page,
    setPage: setPage,
    pageSize: pageSize,
    setPageSize: setPageSize,
    lang: lang,
    setLang: setLang,
    settingsOpen: settingsOpen,
    setSettingsOpen: setSettingsOpen,
    englishTranslations: englishTranslations,
    setEnglishTranslations: setEnglishTranslations,
    polishTranslations: polishTranslations,
    setPolishTranslations: setPolishTranslations,
    cellsType: cellsType,
    setCellsType: setCellsType,
    isNavVisible: isNavVisible,
    setIsNavVisible: setIsNavVisible,
    filters: filters,
    setFilters: setFilters,
    selectedTableID: selectedTableID,
    setSelectedTableID: setSelectedTableID,
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
