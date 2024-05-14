"use client"

import {Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Translations} from "@/types/translations";
import {Check, ChevronsUpDown, Ellipsis, Trash} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState} from "react";
import {Alert} from "@/components/Alert"
import {Data} from "@/types/data"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Filter} from "@/components/filter";

type TableProps = {
  // data to create table
  data: Data[]
  // Translation language
  lang: "en" | "pl"
  // translations data
  translations: Translations
  // ability to delete
  ableToDelete?: boolean
  // show delete / restore alerts
  showAlerts?: boolean
}

export const Table = ({data, lang, translations, ableToDelete, showAlerts}: TableProps) => {
  const [dataToRender, setDataToRender] = useState<Data[]>(data)
  const [selectedRow, setSelectedRow] = useState<Data[]>([])
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState("")

  const selectedTranslations = translations?.[lang]


  const handleDelete = (row: Data) => {
    const filteredData: Data[] = dataToRender.filter((el) => el.id !== row.id)


    if (showAlerts) {
      setSelectedRow(filteredData)
    } else {
      setDataToRender(filteredData)
    }
  }

  const showAlert = (row: Data) => {
    handleDelete(row)

    if (showAlerts) {
      setAlertOpen(true)
    }
  }

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

  const columnsToFilter = ["name", "age"]

  return (
    <div>
      <div>
        {columnsToFilter.map((col, index) => {
          return (
            <Filter key={index} data={dataToRender} columnName={col} />
          )
        })}
      </div>
      <TableComponent className={"border border-gray-600"}>
        <TableHeader className={"bg-stone-900"}>
          <TableRow className={"border-stone-900"}>
            {Object.keys(dataToRender?.[0]).map((key, index) => {
              const keyToTranslate = selectedTranslations?.general && (key as keyof typeof selectedTranslations.general) in selectedTranslations.general
                ? selectedTranslations.general[key as keyof typeof selectedTranslations.general]
                : key

              return (
                <TableHead key={index}>
                  {keyToTranslate}
                </TableHead>
              )
            })}
            {ableToDelete && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataToRender.map((row, index) => {
            const isOdd = index % 2 === 0

            return (
              <TableRow key={index} className={`${isOdd ? 'bg-stone-950' : 'bg-stone-900'}`}>
                {Object.values(row).map((value, index) => {
                  return (
                    <TableCell key={index} className={"border border-gray-600"}>
                      {value}
                    </TableCell>
                  )
                })}
                {ableToDelete &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <TableCell className={"border border-gray-600 text-center"}>
                                <div className={"inline-block m-auto cursor-pointer"}><Ellipsis/></div>
                            </TableCell>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                              {ableToDelete &&
                                  <DropdownMenuItem
                                      className={"flex items-center text-xs cursor-pointer"}
                                      onClick={() => showAlert(row)}
                                  >
                                      <Trash size={16} strokeWidth={2}/>
                                      <span className={"ml-2"}>Delete</span>
                                  </DropdownMenuItem>
                              }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
              </TableRow>
            )
          })}
        </TableBody>
        <Alert
          open={alertOpen}
          onOpenChange={setAlertOpen}
          setDataToRender={setDataToRender}
          selectedRow={selectedRow}/>
      </TableComponent>
    </div>
  )
}