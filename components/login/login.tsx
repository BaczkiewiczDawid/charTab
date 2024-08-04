"use client"

import React, {useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {translate} from "@/components/helpers/translations";
import {useRouter} from "next/navigation";

export const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("fetching");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
      });

      const data = await response.json()

      if (data.status) {
        router.push("/")
      }

      console.log(data.message)
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Card className={"w-1/2"}>
        <CardHeader>
          <CardTitle>{translate("loginTitle")}</CardTitle>
          <CardDescription>{translate("loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className={"flex flex-col gap-y-4"}>
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
  );
};
