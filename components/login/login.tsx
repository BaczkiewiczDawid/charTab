"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {translate} from "@/components/helpers/translations";

export const Login = () => {
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Card className={"w-1/2"}>
        <CardHeader>
          <CardTitle>{translate("loginTitle")}</CardTitle>
          <CardDescription>{translate("loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className={"flex flex-col gap-y-4"}>
              <Label>{translate("loginEmail")}</Label>
              <Input/>
              <Label>{translate("loginEmail")}</Label>
              <Input/>
            </div>
            <Button className={"mt-8"}>{translate("loginButton")}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}