"use client";

import { Home } from "@/components/home/home";
import { TableProvider } from "@/context/table-context";
import { LangProps } from "@/types/lang";

type Props = {
  lang: LangProps
  tablesList: any
}

export const HomeWrapper = ({ lang, tablesList }: Props) => {
  return (
    <TableProvider>
      <Home lang={lang} tablesList={tablesList} />
    </TableProvider>
  );
};
