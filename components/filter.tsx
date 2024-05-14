import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Data} from "@/types/data";
import {useState} from "react";

type Props = {
  data: Data[]
  columnName: string
}

export const Filter = ({ data, columnName }: Props ) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span>Wybierz</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                  <CommandItem key={index}>{colValue}</CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}