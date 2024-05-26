import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Data} from "@/types/data";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {Filters} from "@/components/table/table"
import {Checkbox} from "@/components/ui/checkbox";

type Props = {
  data: any[]
  columnName: string
  setDataToRender: Dispatch<SetStateAction<Data[]>>
  filters: Filters[]
  setFilters: Dispatch<SetStateAction<Filters[]>>
  initialData: any
  filterMultiple?: boolean
}

export const Filter = ({
                         data,
                         setDataToRender,
                         columnName,
                         filters,
                         setFilters,
                         initialData,
                         filterMultiple
                       }: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const uniqueValues = Array.from(new Set(data.map((item) => String(item[columnName]))));
  const filterMultipleData = Array.from(new Set(initialData.map((item: Data) => String(item[columnName]))))

  const handleData = useCallback((value: string) => {
    setFilters((prev) => [
      ...prev,
      {
        columnName: columnName,
        value: value,
      },
    ]);
  }, [columnName, setFilters]);

  const applyFilters = (data: Data[], filters: Filters[]) => {
    if (filters.length < 1) {
      return data
    }

    if (filterMultiple) {
      return data.filter((item) => {
        return filters.some((filter) => {
          return String(item[filter.columnName]) === filter?.value;
        });
      });
    } else {
      return data.filter((item) => {
        return filters.every((filter) => {
          return String(item[filter.columnName]) === filter?.value;
        });
      });
    }
  };

  useEffect(() => {
    const filtered = applyFilters(initialData, filters);

    setDataToRender(filtered);
  }, [filters, initialData])

  const clearFilters = () => {
    if (filterMultiple) {
      setFilters((prev) => prev.filter((el) => el.columnName !== columnName))
    } else {
      setFilters((prev) => prev.filter((el) => el.columnName !== columnName || el.value !== value));
    }

    setValue(undefined);
  };

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

  const countFiltersByColumnName = () => {
    return filters.reduce((acc: { [key: string]: number }, filter: Filters) => {
      const columnName = filter.columnName;
      if (acc[columnName]) {
        acc[columnName]++;
      } else {
        acc[columnName] = 1;
      }
      return acc;
    }, {});
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
          {filterMultiple ? countFiltersByColumnName()?.[columnName] > 0 ?
              <span>Wybrano: {countFiltersByColumnName()?.[columnName]}</span> : <span>{columnName}</span>
            :
            value ? <span>{value}</span> :
              <span>{columnName}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[200px]"}>
        <Command>
          <CommandInput placeholder={"znajdź..."}/>
          <CommandEmpty>Nie znaleziono</CommandEmpty>
          <CommandList>
            {filterMultiple ?
              <CommandGroup>
                {filterMultipleData.map((colValue, index) => (
                  <label htmlFor={String(index)}>
                    <CommandItem
                      key={index}
                    >
                      <Checkbox id={String(index)} checked={filters.some((filter) => filter.value === colValue)}
                                onCheckedChange={(isChecked: boolean) => {
                                  setSelectedFilters(String(colValue), isChecked)
                                }}/>
                      <span className={"ml-4"}>{String(colValue)}</span>
                    </CommandItem>
                  </label>
                ))}
              </CommandGroup> :
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
            }
          </CommandList>
          <CommandList>
            <Button className={'w-full mt-2'} onClick={clearFilters}>Clear</Button>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}