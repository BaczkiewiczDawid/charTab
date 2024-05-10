"use client"

import {Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {data} from "@/app/data/dummyData"

export const Table = () => {
  return (
    <TableComponent className={"border border-white border-r-2"}>
      <TableHeader>
        <TableRow>
          {Object.keys(data[0]).map((key, index) => {
            return (
              <TableHead key={index} className={"text-white"}>{key}</TableHead>
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