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
import {Checkbox} from "@/components/ui/checkbox";
import {SetStateAction} from "react";
import {Data} from "@/types/data";
import {translate} from "@/components/helpers/translations";

type Props = {
  name: string
  data: any
  selectorItems: string[]
  setData: React.Dispatch<SetStateAction<any>>
  selectedAlwaysOnTop?: boolean
  initialDataState?: Data[]
  setDataToRender?: React.Dispatch<SetStateAction<Data[]>>
}

export const MultipleSelector = ({
                                   name,
                                   data,
                                   selectorItems,
                                   setData,
                                   selectedAlwaysOnTop,
                                   initialDataState,
                                   setDataToRender
                                 }: Props) => {
  const handleIsCheckedState = (isChecked: boolean, value: string) => {
    if (selectorItems.includes(value)) {
      const filteredArray = selectorItems.filter((column) => column !== value)

      setData(filteredArray)
    } else {
      setData((prevState: any) => [
        ...prevState,
        value,
      ])
    }
  }

  if (selectedAlwaysOnTop) {
    const notSelectedData = data.filter((el: string) => !selectorItems.includes(el))

    data = [...selectorItems, ...notSelectedData]
  }

  console.log(selectorItems)

  return (
    <div className={"mt-4"}>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between"
          >{selectorItems.length > 0 ? `${translate("selected")}: ${selectorItems.length}` : name}</Button>
        </PopoverTrigger>
        <PopoverContent className={"w-[200px]"}>
          <Command>
            <CommandInput placeholder={"Find labels..."}/>
            <CommandEmpty>No found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {data.map((label: string, index: number) => {
                  return (
                    <label htmlFor={String(index)} key={index}>
                      <CommandItem
                        key={index}
                        className={"cursor-pointer"}
                      >
                        <Checkbox
                          id={String(index)}
                          checked={selectorItems.includes(label)}
                          onCheckedChange={(isChecked: boolean) => handleIsCheckedState(isChecked, label)}
                        />
                        <span className={"ml-4"}>{translate(String(label))}</span>
                      </CommandItem>
                    </label>
                  )
                })}
                <CommandSeparator/>
                <CommandItem className={"h-6 mt-2"}>
                  <button className={"text-white p-2 text-center w-full"} onClick={() => {
                    setData([])

                    if (initialDataState && setDataToRender) {
                      setDataToRender(initialDataState)
                    }
                  }}
                  >{translate("clear")}
                  </button>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}