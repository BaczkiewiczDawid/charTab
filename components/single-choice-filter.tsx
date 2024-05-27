import {CommandGroup, CommandItem} from "@/components/ui/command";
import {Dispatch, SetStateAction, useCallback, } from "react";
import {Filters} from "@/components/table/table";

type Props = {
  data: any
  columnName: string
  value: string | undefined
  setValue: Dispatch<SetStateAction<string | undefined>>
  setFilters: Dispatch<SetStateAction<Filters[]>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SingleChoiceFilter = ({ data, columnName, value, setValue, setFilters, setOpen }: Props) => {
  const uniqueValues = Array.from(new Set(data.map((item: any) => String(item[columnName]))));

  const handleData = useCallback((value: string) => {
    setFilters((prev: Filters[]) => [
      ...prev,
      {
        columnName: columnName,
        value: value,
      },
    ]);
  }, [columnName, setFilters]);

  return (
    <CommandGroup>
      {uniqueValues.map((colValue, index) => (
        <CommandItem
          key={index}
          onSelect={(currentValue) => {
            setValue(currentValue === value ? "" : currentValue);
            setOpen(false);
            handleData(String(currentValue));
          }}
        >
          {colValue as string}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}