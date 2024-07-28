import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useTableContext} from "@/context/table-context";
import {useEffect, useState} from "react";
import {MultipleSelector} from "@/components/multiple-selector";
import {translate} from "@/components/helpers/translations";
import {number} from "prop-types";

export const Navigation = () => {
  const {
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
    initialDataState,
    setDataToRender,
    columnsToSum,
    setColumnsToSum,
    columnsToHide,
    setColumnsToHide,
    columnsToColor,
    setColumnsToColor,
    cellsType,
  } = useTableContext();

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  function getNumberKeys() {
    const numberKeys: any[] = []

    for (const [key, value] of Object.entries(cellsType)) {
      if (value === "number") {
        numberKeys.push(key)
      }
    }

    return numberKeys;
  }

  const labelsList = Object.keys(initialDataState[0])
  const numberLabelsList = getNumberKeys()

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-2">
        <Label htmlFor="able-to-delete">{translate("ableToDelete")}</Label>
        <Switch id="able-to-delete" name={"able-to-delete"} checked={ableToDelete}
                onCheckedChange={(checked) => setAbleToDelete(checked)}/>
      </div>
      <div className="flex justify-between py-2">
        <Label>{translate("showAlerts")}</Label>
        <Switch checked={showAlerts} onCheckedChange={(checked) => setShowAlerts(checked)}/>
      </div>
      <div className="flex justify-between py-2">
        <Label>{translate("multipleChoiceFilter")}</Label>
        <Switch checked={multipleChoiceFilter} onCheckedChange={(checked) => setMultipleChoiceFilter(checked)}/>
      </div>
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
  );
};
