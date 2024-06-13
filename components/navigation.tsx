import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useTableContext} from "@/context/table-context";

export const Navigation = () => {
  const {
    ableToDelete,
    setAbleToDelete,
    showAlerts,
    setShowAlerts,
    multipleChoiceFilter,
    setMultipleChoiceFilter
  } = useTableContext();

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
        <Label>multipleChoiceFilter</Label>
        <Switch checked={multipleChoiceFilter} onCheckedChange={(checked) => setMultipleChoiceFilter(checked)}/>
      </div>
    </div>
  );
};
