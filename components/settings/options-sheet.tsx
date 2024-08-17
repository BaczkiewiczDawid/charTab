import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {translate} from "@/components/helpers/translations";
import {LangSelector} from "@/components/header/lang-selector";
import {ImportCSV} from "@/components/header/import-csv";
import {Logout} from "@/components/header/logout";
import {LangProps} from "@/types/lang";
import {useTableContext} from "@/context/table-context";

type Props = {
  lang: LangProps,
  setSettingsOpen: any
}

export const OptionsSheet = ({lang, setSettingsOpen}: Props) => {
  const { selectedTableID } = useTableContext()

  return (
    <Sheet>
      <SheetTrigger asChild className={"md:hidden"}>
        <Button>{translate("options")}</Button>
      </SheetTrigger>
      <SheetContent className={"w-auto"}>
        <SheetHeader>
          <SheetTitle>{translate("options")}</SheetTitle>
        </SheetHeader>
        <div className={"flex flex-col items-center mt-4"}>
          <LangSelector lang={lang}/>
          <ImportCSV className={"w-[200px] mt-4"}/>
          {selectedTableID && <Button variant={"outline"} className={"w-[200px] mt-4"}
                                    onClick={() => setSettingsOpen(true)}>{translate("tableSettings")}</Button>}
          <Logout/>
        </div>
      </SheetContent>
    </Sheet>
  )
}