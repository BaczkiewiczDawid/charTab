import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {useTableContext} from "@/context/table-context";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import {translate} from "@/components/helpers/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export const Settings = () => {
  const {settingsOpen, initialDataState, setEnglishTranslations, setPolishTranslations} = useTableContext()

  const tableCells = Object.keys(initialDataState[0])


  return (
    <Dialog defaultOpen={true} open={true}>
      <DialogContent className={"min-w-[95%] h-[95%]"}>
        <DialogHeader>
          <DialogTitle>
            Ustawienia tabeli
          </DialogTitle>
          <DialogDescription>
            Opis ustawień tabeli
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className={"w-6"}></TableCell>
              {tableCells.map((cell) => {
                return (
                  <TableCell key={cell} className={"max-w-16"}>
                    {translate(cell)}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className={"w-6"}>Type</TableCell>
              {Object.values(tableCells).map((cell, index) => {
                let defaultValue = typeof Object.values(initialDataState[0])[index]

                return (
                  <TableCell key={index} className={"max-w-16"}>
                    <Select defaultValue={defaultValue}>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className={"cursor-pointer"} value={"string"}>String</SelectItem>
                        <SelectItem className={"cursor-pointer"} value={"number"}>Number</SelectItem>
                        <SelectItem className={"cursor-pointer"} value={"boolean"}>Boolean</SelectItem>
                        <SelectItem className={"cursor-pointer"} value={"date"}>Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              <TableCell>English</TableCell>
              {tableCells.map((cell) => {
                return (
                  <TableCell key={cell}>
                    <Input
                      type="string"
                      onChange={(event) => {
                        setEnglishTranslations((prev) => ({
                          ...prev,
                          [cell]: event.target.value
                        }));
                      }}
                    />
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              <TableCell>Polish</TableCell>
              {tableCells.map((cell) => {
                return (
                  <TableCell key={cell}>
                    <Input
                      type="string"
                      onChange={(event) => {
                        setPolishTranslations((prev) => ({
                          ...prev,
                          [cell]: event.target.value
                        }));
                      }}
                    />
                  </TableCell>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>

      </DialogContent>
    </Dialog>
  )
}