import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Data} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

type Props = {
  data: Data[]
  columnName: string
  setDataToRender: Dispatch<SetStateAction<Data[]>>
}

export const Filter = ({data, setDataToRender, columnName}: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()

  const handleData = (value: string) => {
    const filteredData = data.filter((el) => String(el[columnName]) === String(value))

    setDataToRender(filteredData)
  }


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
      <PopoverContent className={"bg-stone-950 w-[200px]"}>
        <Command>
          <CommandInput placeholder={"znajdź..."}/>
          <CommandEmpty>Nie znaleziono</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {data?.flatMap((data: Data, index) => {
                const colValue = Object(data)[columnName];

                return (
                  <CommandItem key={index} onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    handleData(String(currentValue))
                  }}>{colValue}</CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}