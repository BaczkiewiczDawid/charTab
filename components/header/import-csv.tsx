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

export const ImportCSV = () => {
  const {setSettingsOpen, setInitialDataState} = useTableContext()

  const [csvData, setCsvData] = useState<any>()

  const user = useUser()

  const handleSelectedCSV = (event: any) => {
    const file = event.target.files[0]

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
          body: JSON.stringify({data: formattedData, user: user})
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
          <input type={"file"} accept={".csv"} onChange={handleSelectedCSV}/>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translate("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={uploadCsvData}>{translate("upload")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}