"use server"

import bcrypt from "bcryptjs-react";
import {drizzle} from "@/drizzle/db";
import {users} from "@/drizzle/schema";
import {eq} from "drizzle-orm";
import {v4 as uuidv4} from 'uuid';

bcrypt.setRandomFallback((len) => {
  const randomBuffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    randomBuffer[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(randomBuffer);
});


export const handleRegister = async (body: any) => {
  const salt = bcrypt.genSaltSync(10)

  bcrypt.hash(body.password, salt, async function (err, hashedPassword) {
    if (err) {
      console.error(err);
      return {message: "Error during password hashing"};
    }

    const usersData = await drizzle.select().from(users).where(eq(users.email, body.email))

    const uniqueId = uuidv4()

    if (usersData.length === 0) {
      await drizzle.insert(users).values({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        uuid: uniqueId,
      })

      return {
        status: true,
        message: "Success"
      }
    } else {
      return {
        status: false,
        message: "Failed"
      }
    }
  });

  return {message: "Login successful", userData: {}};
};