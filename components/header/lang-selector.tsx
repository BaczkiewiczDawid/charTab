"use client"

import {ChevronsUpDown} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";
import {translate} from "@/components/helpers/translations";
import {CommandList} from "cmdk";
import {useRouter} from "next/navigation";
import {LangProps} from "@/types/lang";

export const LangSelector = ({ lang }: { lang: LangProps}) => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  const handleLanguage = (locale: LangProps) => {
    setOpen(false)
    router.push(`/${locale}/`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          {translate(lang)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={translate("find")}/>
          <CommandEmpty>{translate("langNotFound")}</CommandEmpty>
          <CommandGroup>
            <CommandList>
              <CommandItem className={"cursor-pointer"} value={"pl"}
                           onSelect={(val: any) => handleLanguage(val)}>{translate("pl")}</CommandItem>
              <CommandItem className={"cursor-pointer"} value={"en"}
                           onSelect={(val: any) => handleLanguage(val)}>{translate("en")}</CommandItem>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}