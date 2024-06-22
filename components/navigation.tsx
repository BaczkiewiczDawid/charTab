import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useTableContext} from "@/context/table-context";
import {useEffect, useState} from "react";
import {MultipleSelector} from "@/components/multiple-selector";

type Props = {
  labelsList: string[]
}

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
  } = useTableContext();

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  function getNumberKeys(obj: any) {
    const numberKeys = [];

    for (const key in obj) {
      if (typeof obj[key] === 'number') {
        numberKeys.push(key);
      }
    }

    return numberKeys;
  }

  const labelsList = Object.keys(initialDataState[0])
  const numberLabelsList = getNumberKeys(initialDataState[0])

  console.log(initialDataState)

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-2">
        <Label htmlFor="able-to-delete">Able to delete</Label>
        <Switch id="able-to-delete" name={"able-to-delete"} checked={ableToDelete}
                onCheckedChange={(checked) => setAbleToDelete(checked)}/>
      </div>
      <div className="flex justify-between py-2">
        <Label>Show alerts</Label>
        <Switch checked={showAlerts} onCheckedChange={(checked) => setShowAlerts(checked)}/>
      </div>
      <div className="flex justify-between py-2">
        <Label>Multiple choice filter</Label>
        <Switch checked={multipleChoiceFilter} onCheckedChange={(checked) => setMultipleChoiceFilter(checked)}/>
      </div>
      <div className="flex py-2 flex-col">
        <Label>Columns to filter</Label>
        <MultipleSelector
          name={"Select columns"} data={labelsList} selectorItems={columnsToFilter}
          setData={setColumnsToFilter}/>
      </div>
      <div className="flex py-2 flex-col">
        <Label>Columns order</Label>
        <MultipleSelector
          name={"Select columns order"} data={labelsList} selectorItems={columnsOrder}
          setData={setColumnsOrder} initialDataState={initialDataState}
          setDataToRender={setDataToRender} selectedAlwaysOnTop={true}/>
      </div>
      <div className="flex py-2 flex-col">
        <Label>Columns to sum</Label>
        <MultipleSelector
          name={"Select columns to sum"} data={numberLabelsList} selectorItems={columnsToSum}
          setData={setColumnsToSum}/>
      </div>
      <div className="flex py-2 flex-col">
        <Label>Columns to hide</Label>
        <MultipleSelector
          name={"Select columns to hide"} data={labelsList} selectorItems={columnsToHide}
          setData={setColumnsToHide} initialDataState={initialDataState}
          setDataToRender={setDataToRender}/>
      </div>
    </div>
  );
};
