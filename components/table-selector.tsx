import {Popover, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button";
import {PopoverContent} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import {translate} from "@/components/helpers/translations";
import {useEffect} from "react";

type Props = {
  tablesList: any
}

export const TableSelector = ({ tablesList }: Props) => {
  console.log(tablesList)

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          className="min-w-[200px] justify-between"
        >Table 1</Button>
      </PopoverTrigger>
      <PopoverContent className={"min-w-[200px]"}>
        <Command>
          <CommandInput placeholder={translate("findLabels")}/>
          <CommandEmpty>No found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem>Tabela 1</CommandItem>
            </CommandGroup>
            <CommandSeparator/>
            <CommandItem className={"h-6 mt-2"}>
              <button className={"text-white p-2 text-center w-full"}
              >{translate("clear")}
              </button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}