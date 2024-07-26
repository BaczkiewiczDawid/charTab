import {TableProvider} from "@/context/table-context";
import Home from "@/app/[locale]/page";
import {LangProps} from "@/types/lang";

export default function App({ lang }: { lang: LangProps }) {
  return (
    <TableProvider>
      <Home params={{ locale: lang }}/>
    </TableProvider>
  )
}