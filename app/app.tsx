import {TableProvider} from "@/context/table-context";
import Home from "@/app/page";

export default function App() {
  return (
    <TableProvider>
      <Home />
    </TableProvider>
  )
}