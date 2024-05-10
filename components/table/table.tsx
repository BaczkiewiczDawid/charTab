"use client"

import {Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {data} from "@/app/data/dummyData"
import { translations } from "@/app/lang"

type TableProps = {
  lang: "en" | "pl"
}

export const Table = ({ lang }: TableProps) => {
  const selectedTranslations = translations?.[lang]

  return (
    <TableComponent className={"border border-white border-r-2"}>
      <TableHeader className={"bg-stone-950"}>
        <TableRow>
          {Object.keys(data[0]).map((key, index) => {
            const keyToTranslate = selectedTranslations?.general && (key as keyof typeof selectedTranslations.general) in selectedTranslations.general
              ? selectedTranslations.general[key as keyof typeof selectedTranslations.general]
              : key;

            return (
              <TableHead key={index} className={"text-white bg-stone-950"}>
                {keyToTranslate}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => {
          const isOdd = index % 2 === 0

          return (
            <TableRow key={index} className={`${isOdd ? "bg-stone-950" : "bg-stone-900"} hover:bg-stone-900`}>
              {Object.values(row).map((value, index) => {
                return (
                  <TableCell key={index} className={"border-white border text-nowrap"}>{value}</TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </TableComponent>
  )
}