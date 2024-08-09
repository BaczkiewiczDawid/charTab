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
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {MultipleSelector} from "@/components/multiple-selector";

export const Settings = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    initialDataState,
    setEnglishTranslations,
    setPolishTranslations,
    setCellsType,
    ableToDelete,
    setAbleToDelete,
    showAlerts,
    setShowAlerts,
    multipleChoiceFilter,
    setMultipleChoiceFilter,
    columnsToFilter,
    setColumnsToFilter,
    columnsOrder,
    setColumnsOrder,
    setDataToRender,
    columnsToSum,
    setColumnsToSum,
    columnsToHide,
    setColumnsToHide,
    columnsToColor,
    setColumnsToColor,
    cellsType,
  } = useTableContext()


  const tableCells = Object.keys(initialDataState[0])
  const labelsList = Object.keys(initialDataState[0])
  const numberLabelsList = getNumberKeys()
  const [isClient, setIsClient] = useState(false)
  let defaultCellType: { [key: string]: string }[] = []


  function getNumberKeys() {
    const numberKeys: any[] = []

    for (const [key, value] of Object.entries(cellsType)) {
      if (value === "number") {
        numberKeys.push(key)
      }
    }

    return numberKeys;
  }

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


  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className={"min-w-[95%] h-[95%]"}>
        <DialogHeader>
          <DialogTitle>
            {translate("tableSettingsTitle")}
          </DialogTitle>
          <DialogDescription>
            {translate("tableSettingsDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className={"overflow-y-auto"}>
          <div className={"w-full mt-12 pr-8"}>
            <h2 className={"text-lg font-semibold leading-none tracking-tight"}>{translate("settingsTitle")}</h2>
            <p className={"text-sm text-muted-foreground mt-4"}>{translate("settingsDescription")}</p>
            <Table className={"mt-4"}>
              <TableHeader>
                <TableRow>
                  <TableCell className={"w-6"}></TableCell>
                  {tableCells.map((cell) => {
                    return (
                      <TableCell key={cell}>
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
                      <TableCell key={index} className={"min-w-36"}>
                        <Select defaultValue={defaultValue} onValueChange={(value) => handleCellType(cell, value)}>
                          <SelectTrigger>
                            <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className={"cursor-pointer"} value={"string"}>{translate("string")}</SelectItem>
                            <SelectItem className={"cursor-pointer"} value={"number"}>{translate("number")}</SelectItem>
                            <SelectItem className={"cursor-pointer"}
                                        value={"boolean"}>{translate("boolean")}</SelectItem>
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
            <h2
              className={"text-lg font-semibold leading-none tracking-tight mt-12"}>{translate("advancedSettingsTitle")}</h2>
            <p className={"text-sm text-muted-foreground mt-4"}>{translate("advancedSettingsDescription")}</p>
            <div className={"w-full flex justify-between mt-12"}>
              <div className="flex items-center">
                <Label htmlFor="able-to-delete">{translate("ableToDelete")}</Label>
                <Switch className={"ml-4"} id="able-to-delete" name={"able-to-delete"} checked={ableToDelete}
                        onCheckedChange={(checked) => setAbleToDelete(checked)}/>
              </div>
              <div className="flex items-center">
                <Label>{translate("showAlerts")}</Label>
                <Switch className={"ml-4"} checked={showAlerts} onCheckedChange={(checked) => setShowAlerts(checked)}/>
              </div>
              <div className="flex items-center">
                <Label>{translate("multipleChoiceFilter")}</Label>
                <Switch className={"ml-4"} checked={multipleChoiceFilter}
                        onCheckedChange={(checked) => setMultipleChoiceFilter(checked)}/>
              </div>
            </div>
            <div className={"flex justify-between flex-wrap gap-y-4 mt-12 w-full"}>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToFilter")}</Label>
                <MultipleSelector
                  name={translate("select")} data={labelsList.filter((name) => !columnsToHide.includes(name))}
                  selectorItems={columnsToFilter}
                  setData={setColumnsToFilter}/>
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsOrder")}</Label>
                <MultipleSelector
                  name={translate("select")} data={labelsList.filter((name) => !columnsToHide.includes(name))}
                  selectorItems={columnsOrder}
                  setData={setColumnsOrder} initialDataState={initialDataState}
                  setDataToRender={setDataToRender} selectedAlwaysOnTop={true}/>
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToSum")}</Label>
                <MultipleSelector
                  name={translate("select")} data={numberLabelsList}
                  selectorItems={columnsToSum}
                  setData={setColumnsToSum}/>
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToHide")}</Label>
                <MultipleSelector
                  name={translate("select")} data={labelsList} selectorItems={columnsToHide}
                  setData={setColumnsToHide} initialDataState={initialDataState}
                  setDataToRender={setDataToRender}/>
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToColor")}</Label>
                <MultipleSelector
                  name={translate("select")} data={numberLabelsList} selectorItems={columnsToColor}
                  setData={setColumnsToColor} initialDataState={initialDataState}
                  setDataToRender={setDataToRender}/>
              </div>
            </div>
          </div>
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