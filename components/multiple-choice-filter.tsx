import {CommandGroup, CommandItem} from "@/components/ui/command";
import {Checkbox} from "@/components/ui/checkbox";
import {Filters} from "@/components/table/table";
import {Dispatch, SetStateAction} from "react";

type Props = {
  data: any
  filters: Filters[]
  setFilters: Dispatch<SetStateAction<Filters[]>>
  columnName: string
}

export const MultipleChoiceFilter = ({ data, filters, setFilters, columnName }: Props) => {
  const setSelectedFilters = (currentValue: string, isChecked: boolean) => {
    console.log(currentValue, isChecked)

    if (isChecked) {
      setFilters((prev) => [
        ...prev,
        {
          columnName: columnName,
          value: currentValue,
        },
      ])
    } else {
      const newFilters = filters.filter((data) => data.value !== currentValue)
      setFilters(newFilters)
    }
  }

  return (
    <CommandGroup>
      {data.map((colValue: string, index: number) => (
        <label htmlFor={String(index)} key={index}>
          <CommandItem
            key={index}
            className={"cursor-pointer"}
          >
            <Checkbox id={String(index)} checked={filters.some((filter) => filter.value === colValue)}
                      onCheckedChange={(isChecked: boolean) => {
                        setSelectedFilters(String(colValue), isChecked)
                      }}/>
            <span className={"ml-4"}>{String(colValue)}</span>
          </CommandItem>
        </label>
      ))}
    </CommandGroup>
  )
}