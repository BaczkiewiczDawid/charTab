import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTableContext } from "@/context/table-context";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  labelsList: string[]
}

export const Navigation = ({ labelsList }: Props) => {
  const {
    ableToDelete,
    setAbleToDelete,
    showAlerts,
    setShowAlerts,
    multipleChoiceFilter,
    setMultipleChoiceFilter,
    columnsToFilter,
    setColumnsToFilter,
  } = useTableContext();

  const handleIsCheckedState = (isChecked: boolean, value: string) => {
    if (columnsToFilter.includes(value)) {
      const filteredArray = columnsToFilter.filter((column) => column !== value)

      setColumnsToFilter(filteredArray)
    } else {
      setColumnsToFilter((prevState) => [
        ...prevState,
        value,
      ])
    }
  }

  // Dodaj stan do zarządzania renderowaniem po stronie klienta
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // lub dowolny komponent ładowania
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-2">
        <Label htmlFor="able-to-delete">Able to delete</Label>
        <Switch id="able-to-delete" name={"able-to-delete"} checked={ableToDelete}
                onCheckedChange={(checked) => setAbleToDelete(checked)} />
      </div>
      <div className="flex justify-between py-2">
        <Label>Show alerts</Label>
        <Switch checked={showAlerts} onCheckedChange={(checked) => setShowAlerts(checked)} />
      </div>
      <div className="flex justify-between py-2">
        <Label>Multiple choice filter</Label>
        <Switch checked={multipleChoiceFilter} onCheckedChange={(checked) => setMultipleChoiceFilter(checked)} />
      </div>
      <div className="flex py-2 flex-col">
        <Label>Columns to filter</Label>
        <div className={"mt-4"}>
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                role="combobox"
                className="w-[200px] justify-between"
              >Select columns</Button>
            </PopoverTrigger>
            <PopoverContent className={"w-[200px]"}>
              <Command>
                <CommandInput placeholder={"Find labels..."} />
                <CommandEmpty>No found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {labelsList.map((label: string, index: number) => {
                      return (
                        <label htmlFor={String(index)} key={index}>
                          <CommandItem
                            key={index}
                            className={"cursor-pointer"}
                          >
                            <Checkbox
                              id={String(index)}
                              checked={columnsToFilter.includes(label)}
                              onCheckedChange={(isChecked: boolean) => handleIsCheckedState(isChecked, label)}
                            />
                            <span className={"ml-4"}>{String(label)}</span>
                          </CommandItem>
                        </label>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
