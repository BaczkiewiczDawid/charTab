import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useTableContext} from "@/context/table-context";
import {useEffect, useState} from "react";
import {MultipleSelector} from "@/components/multiple-selector";
import {translate} from "@/components/helpers/translations";

export const Navigation = () => {
  const {
    initialDataState,
    setDataToRender,
    cellsType,
    filters,
    setFilters,
  } = useTableContext();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  function getNumberKeys() {
    const numberKeys: string[] = [];

    for (const [key, value] of Object.entries(cellsType)) {
      if (value === "number") {
        numberKeys.push(key);
      }
    }

    return numberKeys;
  }

  const labelsList = Object.keys(initialDataState[0] || {});
  const numberLabelsList = getNumberKeys();

  return (
    <div className={"flex items-center justify-between"}>
      <div className="flex flex-col">
        <div className="flex justify-between py-2 items-center">
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
        <div className="flex justify-between py-2 items-center">
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
        <div className="flex justify-between py-2 items-center">
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
  );
};
