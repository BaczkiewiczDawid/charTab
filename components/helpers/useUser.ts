import {cookies} from "next/headers";

export const useUser = () => {
  const email = cookies().get("currentUser")
  const token = cookies().get("token")
  const uuid = cookies().get("uuid")

  return {
    email: email,
    token: token,
    uuid: uuid,
  }
}