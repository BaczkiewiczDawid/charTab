import { cookies } from "next/headers";

type UserCookies = {
  currentUser: string | undefined;
  token: string | undefined;
  uuid: string | undefined;
};

export const useServerUser = (): UserCookies => {
  const cookieStore = cookies();

  const currentUser = cookieStore.get("currentUser")?.value;
  const token = cookieStore.get("token")?.value;
  const uuid = cookieStore.get("uuid")?.value;

  return {
    currentUser,
    token,
    uuid,
  };
};