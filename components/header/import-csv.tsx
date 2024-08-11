import {Button} from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useTableContext} from "@/context/table-context";
import {useState} from "react";
import Papa from 'papaparse';
import {translate} from "@/components/helpers/translations";
import {useUser} from "@/components/helpers/useUser";
import {Input} from "@/components/ui/input";
import {initialFilters} from "@/data/initialFilters";

export const ImportCSV = () => {
  const {setSettingsOpen, setInitialDataState} = useTableContext()
  const [fileName, setFileName] = useState('');
  const [csvData, setCsvData] = useState<any>()
  const [tableName, setTableName] = useState<string>("")

  const user = useUser()

  const handleSelectedCSV = (event: any) => {
    const file = event.target.files[0]
    setFileName(file ? file.name : '')

    Papa.parse(file, {
      complete: (result: any) => {
        setCsvData(result.data)
      }
    })
  }

  const changeDataFormat = (csvFile: string[][]) => {
    const keys = csvFile[0]
    const data = csvData.slice(1)

    return data.map((row: any) => {
      return keys.reduce((acc: any, key: any, index: number) => {
        acc[key] = row[index]
        return acc
      }, {})
    })
  }

  const uploadCsvData = async () => {
    const formattedData = changeDataFormat(csvData)

    if (csvData) {
      setInitialDataState(formattedData)
      setSettingsOpen(true)

      try {
        const response = await fetch("/api/upload-csv", {
          method: "POST",
          body: JSON.stringify({
            data: formattedData,
            user: user,
            tableName: tableName ?? fileName,
            filters: initialFilters
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>{translate("importCSV")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translate("uploadTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{translate("uploadDescription")}</AlertDialogDescription>
          <form className={"flex flex-col"}>
            <div className={"mt-4"}>
              <label>Nazwa tabeli</label>
              <Input className={"mt-4"} onChange={(event) => setTableName(event.target.value)}/>
            </div>
            <div className="mt-4 flex flex-col">
              <label>Plik CSV</label>
              <div className="mt-4 flex items-center">
                <input
                  id="file-upload"
                  className="hidden"
                  type="file"
                  accept=".csv"
                  onChange={handleSelectedCSV}
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 border border-gray-500 text-black bg-white cursor-pointer transition duration-150 ease-in-out"
                >
                  Wybierz plik
                </label>
                <span className="ml-4 text-sm">{fileName}</span>
              </div>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translate("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={uploadCsvData}>{translate("upload")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}