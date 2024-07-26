import {GetLocale} from "@/components/helpers/get-locale";

const translationsList: { [key: string]: any } = {
  pl: {
    // Table translations

    id: "Id",
    name: "Nazwa",
    age: "Wiek",
    position: "Stanowisko",
    salary: "Pensja",

    // App translations

    clear: "Wyczyść",
    find: "Znajdź...",
    selected: "Wybrano",
    ableToDelete: "Możliwość usuwania",
    notFound: "Nie znaleziono",
    showAlerts: "Pokaż alerty",
    multipleChoiceFilter: "Filtry wielokrotnego wyboru",
    columnsToFilter: "Kolumny do filtrowania",
    columnsOrder: "Kolejność kolumn",
    columnsToSum: "Kolumny do sumowania",
    columnsToHide: "Ukryj kolumny",
    columnsToColor: "Kolorowania tła kolumny",
    select: "Wybierz...",
    importCSV: "Importuj CSV",
    next: "Następna",
    previous: "Poprzednia",
    pl: "Polski",
    en: "Angielski",
    langNotFound: "Nie znaleziono żadnego języka"
  },

  en: {
    // Table translations

    id: "Id",
    name: "Name",
    age: "Age",
    position: "Position",
    salary: "Salary",

    // App translations

    clear: "Clear",
    find: "Find...",
    selected: "Selected",
    ableToDelete: "Able to delete",
    notFound: "Not found",
    showAlerts: "Show alerts",
    multipleChoiceFilter: "Multiple choice filters",
    columnsToFilter: "Columns to filter",
    columnsOrder: "Column order",
    columnsToSum: "Columns to sum",
    columnsToHide: "Hidden columns",
    columnsToColor: "Columns color",
    select: "Select...",
    importCSV: "Import CSV",
    next: "Next",
    previous: "Previous",
    pl: "Polish",
    en: "English",
    langNotFound: "Language not found"
  }
}

export const translate = (nameToTranslate: string): string => {
  const locale = GetLocale()

  return translationsList[locale][nameToTranslate] || "Translation not found";
}