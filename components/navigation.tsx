import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {useTableContext} from "@/context/table-context";
import {useEffect, useState} from "react";

export const Navigation = () => {
  const { ableToDelete, setAbleToDelete } = useTableContext()

  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-between py-2"}>
        <Label htmlFor={"able-to-delete"}>Able to delete</Label>
        <Switch id={"able-to-delete"} />
      </div>
      <div className={"flex justify-between py-2"}>
        <Label>Show alerts</Label>
        <Switch/>
      </div>
      <div className={"flex justify-between py-2"}>
        <Label>multipleChoiceFilter</Label>
        <Switch/>
      </div>
    </div>
  )
}