import {GetLocale} from "@/components/helpers/get-locale";
import {useTableContext} from "@/context/table-context";
import {useEffect} from "react";

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
    langNotFound: "Nie znaleziono żadnego języka",
    save: "Zapisz",
    uploadDescription: "Importuj plik CSV aby stworzyć wspaniałą tabele!",
    uploadTitle: "Importuj plik CSV...",
    cancel: "Anuluj",
    upload: "Wgraj",
    string: "Tekst",
    number: "Liczba",
    boolean: "Tak/Nie",
    date: "Data",
    type: "Typ",
    findLabels: "Znajdź kolumny...",
    settingsTitle: "Typ kolumn i tłumaczenia",
    settingsDescription: "Wybierz typ danych dla kolumn oraz wpisz tłumaczenia",
    tableSettingsTitle: "Ustawienia tabeli",
    tableSettingsDescription: "Spersonalizuj tabele dla Twojego zespołu",
    advancedSettingsTitle: "Zaawansowane ustawienia tabeli",
    advancedSettingsDescription: "Wybierz ustawienia takie jak możliwość usuwania wartości, sumowanie, kolejność, ukrywanie kolumn i wiele więcej",
    loginTitle: "Zaloguj sie",
    loginDescription: "Aby zapisywać swoje skonfigurowane tabele",
    loginEmail: "E-Mail",
    loginPassword: "Hasło",
    loginEnterEmail: "Wpisz E-Mail...",
    loginEnterPassword: "Wpisz hasło...",
    loginButton: "Zaloguj sie",
    registerTitle: "Zarejestruj sie",
    registerUsername: "Nazwa użytkownika",
    registerEnterUsername: "Wpisz nazwe użytkownika...",
    noAccount: "Nie masz konta? ",
    registerLink: "Zarejestruj sie!",
    haveAccount: "Masz już konto? ",
    loginLink: "Zaloguj sie!",
    add: "Dodaj nowe dane",
    isRequired: "Pole jest wymagane",
    insertValue: "Wprowadź wartość...",
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
    langNotFound: "Language not found",
    save: "Save",
    uploadDescription: "Upload Your CSV file to create amazing customizable table!",
    uploadTitle: "Upload Your CSV...",
    cancel: "Cancel",
    upload: "Upload",
    string: "String",
    number: "Number",
    boolean: "Boolean",
    date: "Date",
    type: "Type",
    findLabels: "Find Labels...",
    settingsTitle: "Column type and translations",
    settingsDescription: "Select data types for columns and enter translations",
    tableSettingsTitle: "Table settings",
    tableSettingsDescription: "Personalize the table for your team",
    advancedSettingsTitle: "Advanced table settings",
    advancedSettingsDescription: "Choose settings such as ability to delete values, summing, ordering, hiding columns and much more",
    loginTitle: "Log in",
    loginDescription: "To save your configured tables!",
    loginEmail: "E-Mail",
    loginPassword: "Password",
    loginEnterEmail: "Enter E-Mail...",
    loginEnterPassword: "Enter password...",
    loginButton: "Log in",
    registerTitle: "Register",
    registerUsername: "Username",
    registerEnterUsername: "Enter username...",
    noAccount: "Don't have an account? ",
    registerLink: "Register now!",
    add: "Add new data",
    isRequired: "Field is required",
    insertValue: "Insert value...",
  }
}

export const translate = (nameToTranslate: string, lang?: "pl" | "en"): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {polishTranslations, englishTranslations} = useTableContext();

  translationsList["pl"] = {...translationsList["pl"], ...polishTranslations};
  translationsList["en"] = {...translationsList["en"], ...englishTranslations}

  const locale = GetLocale()

  return translationsList[lang ?? locale][nameToTranslate] || nameToTranslate;
}