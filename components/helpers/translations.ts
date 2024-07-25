const translationsList: { [key: string]: string } = {
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
}

export const translate = (nameToTranslate: string): string => {
  return translationsList[nameToTranslate] || "Translation not found";
}