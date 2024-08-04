import {cookies} from "next/headers";

export const logout = async () => {
  cookies().delete("currentUser")
  cookies().delete("token")
  cookies().delete("uuid")

  return {
    status: true,
    message: "Logged out"
  }
}