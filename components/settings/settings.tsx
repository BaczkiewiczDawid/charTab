import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {useTableContext} from "@/context/table-context";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import {translate} from "@/components/helpers/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {useEffect} from "react";
import {Button} from "@/components/ui/button";

export const Settings = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    initialDataState,
    setEnglishTranslations,
    setPolishTranslations,
    setCellsType,
    cellsType,
  } = useTableContext()

  const tableCells = Object.keys(initialDataState[0])

  let defaultCellType: { [key: string]: string }[] = []

  Object.values(tableCells).map((cell, index) => {
    defaultCellType.push({[cell]: (typeof Object.values(initialDataState[0])[index])})
  })

  useEffect(() => {
    const initialCellTypes = tableCells.reduce((acc, cell, index) => {
      acc[cell] = typeof Object.values(initialDataState[0])[index];
      return acc;
    }, {} as { [key: string]: string });

    setCellsType(initialCellTypes);
  }, [initialDataState, setCellsType]);

  const handleCellType = (cell: string, type: string) => {
    setCellsType((prev) => ({
      ...prev,
      [cell]: type
    }))
  }

  return (
    <Dialog open={settingsOpen}>
      <DialogContent className={"min-w-[95%] h-[95%]"}>
        <DialogHeader>
          <DialogTitle>
            Ustawienia tabeli
          </DialogTitle>
          <DialogDescription>
            Opis ustawień tabeli
          </DialogDescription>
        </DialogHeader>
        <div className={"overflow-y-auto"}>
          <h2 className={"text-lg font-semibold leading-none tracking-tight"}>Typ kolumn i tłumaczenia</h2>
          <p className={"text-sm text-muted-foreground mt-4"}>Wybierz typ danych dla kolumn oraz wpisz tłumaczenia</p>
          <Table className={"mt-4"}>
            <TableHeader>
              <TableRow>
                <TableCell className={"w-6"}></TableCell>
                {tableCells.map((cell) => {
                  return (
                    <TableCell key={cell} className={"max-w-16"}>
                      {translate(cell)}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className={"w-6"}>{translate("type")}</TableCell>
                {Object.values(tableCells).map((cell, index) => {
                  let defaultValue = typeof Object.values(initialDataState[0])[index]

                  if (defaultValue !== "string" && defaultValue !== "number" && defaultValue !== "boolean") {
                    defaultValue = "string"
                  }

                  return (
                    <TableCell key={index} className={"max-w-16"}>
                      <Select defaultValue={defaultValue} onValueChange={(value) => handleCellType(cell, value)}>
                        <SelectTrigger>
                          <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className={"cursor-pointer"} value={"string"}>{translate("string")}</SelectItem>
                          <SelectItem className={"cursor-pointer"} value={"number"}>{translate("number")}</SelectItem>
                          <SelectItem className={"cursor-pointer"} value={"boolean"}>{translate("boolean")}</SelectItem>
                          <SelectItem className={"cursor-pointer"} value={"date"}>{translate("date")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell>{translate("en")}</TableCell>
                {tableCells.map((cell) => {
                  return (
                    <TableCell key={cell}>
                      <Input
                        placeholder={`${translate(cell, "en")}`}
                        type="string"
                        onChange={(event) => {
                          setEnglishTranslations((prev) => ({
                            ...prev,
                            [cell]: event.target.value
                          }));
                        }}
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell>{translate("pl")}</TableCell>
                {tableCells.map((cell) => {
                  return (
                    <TableCell key={cell}>
                      <Input
                        placeholder={`${translate(cell, "pl")}`}
                        type="string"
                        onChange={(event) => {
                          setPolishTranslations((prev) => ({
                            ...prev,
                            [cell]: event.target.value
                          }));
                        }}
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button onClick={() => setSettingsOpen(false)}>
            {translate("save")}
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}