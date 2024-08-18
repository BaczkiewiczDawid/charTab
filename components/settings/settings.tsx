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
    setDataToRender,
    cellsType,
    setInitialDataState,
    filters,
    setFilters,
    selectedTableID,
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
    const convertedInitialData = initialDataState.map(item => {
      let convertedItem = {...item};
      for (const key in item) {
        if (cellsType[key] === "number") {
          convertedItem[key] = Number(item[key]);
        }
      }
      return convertedItem;
    });

    const isDataChanged = !initialDataState.every((item, index) =>
      Object.keys(item).every(key =>
        convertedInitialData[index][key] === item[key]
      )
    );

    if (isDataChanged) {
      setInitialDataState(convertedInitialData);
    }
  }, [cellsType, initialDataState]);


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
            <div className={"w-full flex flex-col md:flex-row justify-between mt-12 gap-y-4 md:gap-y-0"}>
              <div className="flex items-center justify-between md:justify-start">
                <Label htmlFor="able-to-delete">{translate("ableToDelete")}</Label>
                <Switch
                  id="able-to-delete"
                  name={"able-to-delete"}
                  checked={filters.ableToDelete}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      ableToDelete: checked,
                    }));
                  }}
                />
              </div>
              <div className="flex items-center justify-between md:justify-start">
                <Label>{translate("showAlerts")}</Label>
                <Switch
                  checked={filters.showAlerts}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      showAlerts: checked,
                    }));
                  }}
                />
              </div>
              <div className="flex items-center justify-between md:justify-start">
                <Label>{translate("multipleChoiceFilter")}</Label>
                <Switch
                  checked={filters.multipleChoiceFilter}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      multipleChoiceFilter: checked,
                    }));
                  }}
                />
              </div>
            </div>
            <div className={"flex justify-between flex-wrap gap-y-4 mt-12 w-full"}>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToFilter")}</Label>
                <MultipleSelector
                  name={translate("select")}
                  filterName={"columnsToFilter"}
                  data={labelsList.filter((name) => !filters.columnsToHide.includes(name))}
                  selectorItems={filters.columnsToFilter ?? []}
                />
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsOrder")}</Label>
                <MultipleSelector
                  name={translate("select")}
                  data={labelsList.filter((name) => !filters.columnsToHide.includes(name))}
                  selectorItems={filters.columnsOrder ?? []}
                  initialDataState={initialDataState}
                  setDataToRender={setDataToRender}
                  selectedAlwaysOnTop={true}
                  filterName={"columnsOrder"}
                />
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToSum")}</Label>
                <MultipleSelector
                  name={translate("select")}
                  data={numberLabelsList}
                  selectorItems={filters.columnsToSum ?? []}
                  filterName={"columnsToSum"}
                />
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToHide")}</Label>
                <MultipleSelector
                  name={translate("select")}
                  data={labelsList}
                  selectorItems={filters.columnsToHide}
                  initialDataState={initialDataState}
                  setDataToRender={setDataToRender}
                  filterName={"columnsToHide"}
                />
              </div>
              <div className="flex py-2 flex-col">
                <Label>{translate("columnsToColor")}</Label>
                <MultipleSelector
                  name={translate("select")}
                  data={numberLabelsList}
                  selectorItems={filters.columnsToColor ?? []}
                  initialDataState={initialDataState}
                  setDataToRender={setDataToRender}
                  filterName={"columnsToColor"}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={async () => {
            setSettingsOpen(false)
            await fetch("/api/save-cell-types", {
              method: "POST",
              body: JSON.stringify({cellsType: cellsType, selectedTableID: selectedTableID})
            })
          }}>
            {translate("save")}
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}