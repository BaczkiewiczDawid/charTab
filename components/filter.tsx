import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandInput, CommandList} from "@/components/ui/command";
import {Data} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Filters} from "@/components/table/table"
import {MultipleChoiceFilter} from "@/components/multiple-choice-filter";
import {SingleChoiceFilter} from "@/components/single-choice-filter";
import {useTableContext} from "@/context/table-context";
import {columnHider} from "@/components/helpers/column-hider";
import {translate} from "@/components/helpers/translations";

type Props = {
  data: any[]
  columnName: string
  setDataToRender: Dispatch<SetStateAction<Data[]>>
  filters: Filters[]
  setFilters: Dispatch<SetStateAction<Filters[]>>
  multipleChoiceFilter?: boolean
}

export const Filter = ({
                         data,
                         setDataToRender,
                         columnName,
                         filters,
                         setFilters,
                         multipleChoiceFilter
                       }: Props) => {
  const { initialDataState, filters: filtersList } = useTableContext()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const filterMultipleData = Array.from(new Set(initialDataState.map((item: Data) => String(item[columnName]))))

  const applyFilters = (data: Data[], filters: Filters[]) => {
    if (filters.length < 1) {
      return data
    }

    if (multipleChoiceFilter) {
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
    const filtered = applyFilters(columnHider(initialDataState, filtersList.columnsToHide), filters);

    setDataToRender(columnHider(filtered, filtersList.columnsToHide));
  }, [filters, initialDataState])

  const clearFilters = () => {
    if (multipleChoiceFilter) {
      setFilters((prev) => prev.filter((el) => el.columnName !== columnName))
    } else {
      setFilters((prev) => prev.filter((el) => el.columnName !== columnName || el.value !== value));
    }

    setValue(undefined);
  };

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
          {multipleChoiceFilter ? countFiltersByColumnName()?.[columnName] > 0 ?
              <span>{translate("selected")}: {countFiltersByColumnName()?.[columnName]}</span> : <span>{translate(columnName)}</span>
            :
            value ? <span>{value}</span> :
              <span>{translate(columnName)}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[200px]"}>
        <Command>
          <CommandInput placeholder={translate("find")}/>
          <CommandEmpty>{translate("notFound")}</CommandEmpty>
          <CommandList>
            {multipleChoiceFilter ?
              <MultipleChoiceFilter
                data={filterMultipleData}
                filters={filters}
                setFilters={setFilters}
                columnName={columnName}
              />
              :
              <SingleChoiceFilter
                data={data}
                columnName={columnName}
                value={value}
                setValue={setValue}
                setFilters={setFilters}
                setOpen={setOpen}
              />
            }
          </CommandList>
          <CommandList>
            <Button className={'w-full mt-2'} onClick={clearFilters}>{translate("clear")}</Button>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}