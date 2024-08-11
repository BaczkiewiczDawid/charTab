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
import {useEffect, useState} from "react";
import {useTableContext} from "@/context/table-context";
import {columnHider} from "@/components/helpers/column-hider";

type Table = {
  id: number
  access: string[] | null
  owner: string,
  data: any
  tableName: string
  filters: any
}

type Props = {
  tablesList: any
}

export const TableSelector = ({tablesList}: Props) => {
  const {
    setInitialDataState,
    setDataToRender,
    setSelectedTableID,
    setFilters,
  } = useTableContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedTable, setSelectedTable] = useState<Table>()


  useEffect(() => {
    if (selectedTable) {
      setFilters(selectedTable.filters)
      setSelectedTableID(selectedTable.id)
      setInitialDataState(selectedTable.data)
      setDataToRender(columnHider(selectedTable.data, selectedTable.filters.columnsToHide))
    }
  }, [selectedTable])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          className="min-w-[200px] justify-between"
        >{selectedTable ? translate(selectedTable.tableName) : translate("select")}</Button>
      </PopoverTrigger>
      <PopoverContent className={"min-w-[200px]"}>
        <Command>
          <CommandInput placeholder={translate("findLabels")}/>
          <CommandEmpty>{translate("notFound")}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {tablesList.map((table: Table, index: number) => {
                return (
                  <CommandItem
                    className={"cursor-pointer"}
                    key={index}
                    onSelect={() => {
                      setSelectedTable(table)
                      setIsOpen(false)
                    }}
                  >
                    {table.tableName}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}