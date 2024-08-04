"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {translate} from "@/components/helpers/translations";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {LoadingButton} from "@/components/loading-button";
import Link from "next/link";

export const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)

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
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Card className={"w-1/2"}>
        <CardHeader>
          <CardTitle>{translate("registerTitle")}</CardTitle>
          <CardDescription>{translate("loginDescription")}</CardDescription>
          <CardDescription>
            {translate("haveAccount")}
            <Link className={"text-blue-400"}
                  href={"login"}>{translate("loginLink")}</Link>
          </CardDescription>
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
            <div className={"flex items-center mt-8"}>
              <LoadingButton name={"registerTitle"} isPending={isPending}/>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}