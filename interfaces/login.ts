"use server"

import bcrypt from "bcryptjs-react";
import {drizzle} from "@/drizzle/db";
import {users} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

bcrypt.setRandomFallback((len) => {
  const randomBuffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    randomBuffer[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(randomBuffer);
});


export const handleLogin = async (body: any) => {
  console.log(body);

  const response = await drizzle.select().from(users).where(eq(users.email, body.email))

  return bcrypt.compare(body.password, response[0].password).then((res) => {
    if (res) {
      return {
        status: true,
        message: "loginSuccess",
        userData: {}
      }
    } else {
      return {
        status: false,
        message: "loginError",
        userData: {},
      }
    }
  })
};