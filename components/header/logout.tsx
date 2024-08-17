"use client"

import {UserMinusIcon} from "@heroicons/react/24/solid";
import {useRouter} from 'next/navigation'
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {translate} from "@/components/helpers/translations";

export const Logout = () => {
  const router = useRouter()

  const logout = async () => {
    await fetch("/api/logout")

    router.push('/login')
  }

  return (
      <>
        <UserMinusIcon onClick={logout} className={"cursor-pointer h-6 w-6 mr-4 hover:text-gray-500 hidden md:block"}/>
        <Button onClick={logout} variant={"outline"} className={"md:hidden text-red-500 border-none mt-4"}>{translate("logout")}</Button>
      </>
  )
}