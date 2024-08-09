"use client"

import {UserMinusIcon} from "@heroicons/react/24/solid";
import {useRouter} from 'next/navigation'

export const Logout = () => {
  const router = useRouter()

  const logout = async () => {
    await fetch("/api/logout")

    router.push('/login')
  }

  return (
    <UserMinusIcon onClick={logout} className=" cursor-pointer h-6 w-6 mr-4 hover:text-gray-500"/>
  )
}