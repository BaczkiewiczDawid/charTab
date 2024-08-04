"use server"

import bcrypt from "bcryptjs-react";
import {drizzle} from "@/drizzle/db";
import {users} from "@/drizzle/schema";
import {eq} from "drizzle-orm";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

bcrypt.setRandomFallback((len) => {
  const randomBuffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    randomBuffer[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(randomBuffer);
});

const JWT_SECRET = process.env.JWT_SECRET

export const handleLogin = async (body: any) => {
  const response = await drizzle.select().from(users).where(eq(users.email, body.email))

  if (response.length === 0) {
    return {
      status: false,
      message: "loginError",
      userData: {},
    }
  }

  return bcrypt.compare(body.password, response[0].password).then((res) => {
    if (res) {
      const user = response[0]

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        JWT_SECRET as string,
        {expiresIn: '1h'}
      );

      const cookieExpireTime = 60 * 60

      const options = {
        secure: true,
        maxAge: cookieExpireTime
      }

      cookies().set("currentUser", user.email, options)
      cookies().set("token", JWT_SECRET as string, options)
      cookies().set("uuid", user.uuid, options)

      return {
        status: true,
        message: "loginSuccess",
        token,
        userData: {
          id: user.id,
          email: user.email
        }
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