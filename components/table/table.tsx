"use client"

import {Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Translations} from "@/app/types/translations";
import {Ellipsis, Trash} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TableProps = {
  // data to create table
  data: { [key: string]: string | number | boolean }[]
  // Translation language
  lang: "en" | "pl"
  // translations data
  translations: Translations
  // ability to delete
  ableToDelete?: boolean
}

export const Table = ({data, lang, translations, ableToDelete}: TableProps) => {
  const selectedTranslations = translations?.[lang]

  return (
    <TableComponent className={"border border-gray-600"}>
      <TableHeader className={"bg-stone-900"}>
        <TableRow className={"border-stone-900"}>
          {Object.keys(data[0]).map((key, index) => {
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
        {data.map((row, index) => {
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
                                <DropdownMenuItem className={"flex items-center text-xs cursor-pointer"}>
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
    </TableComponent>
  )
}