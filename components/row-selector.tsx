import {TableCell} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

type Props = {
  selectedRows: number[]
  setSelectedRows: Dispatch<SetStateAction<number[]>>
  rowId: number
}

export const RowSelector = ({selectedRows, setSelectedRows, rowId}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    if (selectedRows.length === 0) {
      setIsChecked(false)
    }
  }, [selectedRows]);

  const handleCheck = () => {
    setIsChecked(!isChecked)

    if (!isChecked) {
      setSelectedRows((prev: number[]) => [
        ...prev,
        rowId
      ])
    } else {
      const filteredRows = selectedRows.filter((row) => row !== rowId)

      setSelectedRows(filteredRows)
    }
  }

  return (
    <TableCell className={"border border-gray-600 w-2"}>
      <Checkbox checked={isChecked} onCheckedChange={handleCheck}/>
    </TableCell>
  )
}