import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

export const Combobox = () => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={"bg-stone-950 text-white hover:bg-stone-900 hover:text-white"}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Wybierz se coś
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"bg-stone-950 w-[200px]"}>
        <Command>
          <CommandInput placeholder={"znajdź..."}/>
          <CommandEmpty>Nie znaleziono</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem>
                item 1
              </CommandItem>
              <CommandItem>
                item 2
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}