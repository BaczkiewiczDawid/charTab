"use server"

import bcrypt from "bcryptjs-react";
import {drizzle} from "@/drizzle/db";
import {users} from "@/drizzle/schema";

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
    await drizzle.insert(users).values({username: body.username, email: body.email, password: hashedPassword})

    return {
      status: true,
      message: "Success"
    }
  });

  return {message: "Login successful", userData: {}};
};