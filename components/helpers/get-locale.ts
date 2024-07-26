import { usePathname } from 'next/navigation'


export function GetLocale() {
  const pathname = usePathname()

  return pathname.split("/")[1]
}
