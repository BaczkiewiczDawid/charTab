import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Dispatch, SetStateAction} from "react";

type Props = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  handleDelete: any
  selectedRows: number[]
  setSelectedRows: Dispatch<SetStateAction<number[]>>
}

export const Alert = ({open, onOpenChange, handleDelete, selectedRows, setSelectedRows}: Props) => {
  const handleContinue = () => {
    handleDelete()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>{selectedRows.length > 1 ? `You will delete ${selectedRows.length} rows` : `You will delete one row`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            if (selectedRows.length === 1) {
              setSelectedRows([])
            }
          }}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}