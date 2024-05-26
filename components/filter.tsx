import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Data} from "@/types/data";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {Filters} from "@/components/table/table"

type Props = {
  data: Data[]
  columnName: string
  setDataToRender: Dispatch<SetStateAction<Data[]>>
  filters: Filters[]
  setFilters: Dispatch<SetStateAction<Filters[]>>
  initialData: any
}

export const Filter = ({data, setDataToRender, columnName, filters, setFilters, initialData}: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const uniqueValues = Array.from(new Set(data.map((item) => String(item[columnName]))));

  const handleData = useCallback((value: string) => {
    setFilters((prev) => [
      ...prev,
      {
        columnName: columnName,
        value: value,
      },
    ]);
  }, [columnName, setFilters]);

  console.log(data)

  const applyFilters = (data: Data[], filters: Filters[]) => {
    return data.filter((item) => {
      return filters.every((filter) => {
        return String(item[filter.columnName]) === filter?.value;
      });
    });
  };

  useEffect(() => {
    const filtered = applyFilters(initialData, filters);

    setDataToRender(filtered);
  }, [filters, initialData])

  const clearFilters = () => {
    setFilters((prev) => prev.filter((el) => el.columnName !== columnName || el.value !== value));
    setValue(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? <span>{value}</span> : <span>{columnName}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[200px]"}>
        <Command>
          <CommandInput placeholder={"znajdź..."}/>
          <CommandEmpty>Nie znaleziono</CommandEmpty>
          <CommandList>
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
                  {colValue}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandList>
            <Button className={'w-full mt-2'} onClick={clearFilters}>Clear</Button>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}