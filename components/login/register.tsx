"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {translate} from "@/components/helpers/translations";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";

export const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [username, setUsername] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email, password: password})
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Card className={"w-1/2"}>
        <CardHeader>
          <CardTitle>{translate("registerTitle")}</CardTitle>
          <CardDescription>{translate("loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className={"flex flex-col gap-y-4"}>
              <Label>{translate("registerUsername")}</Label>
              <Input type="string" onChange={(event) => setUsername(event.target.value)} required/>
              <Label>{translate("loginEmail")}</Label>
              <Input type="email" onChange={(event) => setEmail(event.target.value)} required/>
              <Label>{translate("loginPassword")}</Label>
              <Input type="password" onChange={(event) => setPassword(event.target.value)} required/>
            </div>
            <Button type="submit" className={"mt-8"}>{translate("loginButton")}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}