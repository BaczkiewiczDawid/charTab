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

export const ImportCSV = () => {
  const { setDataToRender, dataToRender, setInitialDataState } = useTableContext()

  const [csvData, setCsvData] = useState<any>()

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

  const uploadCsvData = () => {
    if (csvData) {
      setInitialDataState(changeDataFormat(csvData))
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>Import CSV</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Your CSV...</AlertDialogTitle>
          <AlertDialogDescription>Upload Your CSV file to create amazing customizable table!</AlertDialogDescription>
          <input type={"file"} accept={".csv"} onChange={handleSelectedCSV} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={uploadCsvData}>Upload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}