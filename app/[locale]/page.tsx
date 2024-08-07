import { LangProps } from "@/types/lang";
import { HomeWrapper } from "@/components/home/home-wrapper"
import {getTablesForUser} from "@/app/[locale]/actions";
import {useServerUser} from "@/components/helpers/useServerUser";

export default async function Page({ params }: { params: { locale: LangProps } }) {

  const user = useServerUser()
  const userTables = await getTablesForUser(user.uuid)

  const tablesList = userTables.data

  return <HomeWrapper lang={params.locale} tablesList={tablesList} />;
}
