import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Dispatch, SetStateAction} from "react";
import { Data } from "@/types/data";

type Props = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  setDataToRender: Dispatch<SetStateAction<Data[]>>
  selectedRow: Data[]
}

export const Alert = ({open, onOpenChange, setDataToRender, selectedRow}: Props) => {
  const handleContinue = () => {
    setDataToRender(selectedRow)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>some description</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}